const config = require("../../../config/config")
const openAI_api_key = config.openAI_api_key

const Discord = require("discord.js")
const { OpenAIApi, Configuration } = require("openai")
const openaiconfig = new Configuration({
    apiKey: openAI_api_key
})

const openai = new OpenAIApi(openaiconfig)

const embed = new Discord.MessageEmbed()
.setTitle("gpt Help")
.setColor("RANDOM")
.setFields(
    {name: "usage:" , value: "$gpt <your message>"},
    {name: "example", value: "$gtp hello"},
    {name: "informations:", value: "the gpt command can continue the conversation with a history of up to the last 5 messages"}
)

module.exports = {
    name: "gpt",
    help: embed,

    execute: async (message, args, client) => {
        message.channel.sendTyping()

        const PAST_MESSAGES = 5

        let messages = Array.from(await message.channel.messages.fetch({
            limit: PAST_MESSAGES,
            before: message.id
        }))
        messages = messages.map(m => m[1])
        messages.unshift(message)

        let users = [...new Set([...messages.map(m => m.member.displayName), client.user.username])]

        let lastUser = users.pop()

        let prompt = `The following is a conversation between ${users.join(", ")}, and ${lastUser}. \n\n`

        for (let i = messages.length - 1; i >= 0; i--) {
            const m = messages[i]
            prompt += `${m.member.displayName}: ${m.content}\n`
        }
        prompt += `${client.user.username}:`

        const res = await openai.createCompletion({
            prompt,
            model: "text-davinci-003",
            max_tokens: 500,
            stop: ["\n"]
        })
        .catch(err => {
            console.log(err)
            message.reply("Error\n pleas use $report to sane us informations what is happend")
            return
        })
        message.reply(res.data.choices[0].text)
    }
}
