//ustawia dany kanał jako kanał do odpowiedzi dla ai

const { QuickDB } = require("quick.db")
module.exports ={
    name: "ai_set",

    execute: async (message, args, client) => {

    const guildId = message.guild.id
    const db = new QuickDB({ filePath: process.cwd() + `/db/ai/ai_guilds.sqlite` });

    if(args[0] == "help"){
        return message.reply("u need type channel id for ai")
    }
    if(isNaN(args[0])){
        return message.reply("You type wrong channel id")
    }

    const ai_chammel = args[0]

    try {
        let channel = await client.channels.fetch(ai_chammel)
      } catch (err) {
        if (err == "DiscordAPIError: Unknown Channel") {
          return message.reply("Wrong channel id")
        } else {
          return console.log(err)
        }
      }

    //zapisz do db
    await db.set(`${guildId}.guild`, guildId)
    await db.set(`${guildId}.channelid`, ai_chammel)
    await db.set(`${guildId}.check`, true)
    return message.channel.send(`Sucesfully saved now <#${ai_chammel}> be writen by SEEN AI`)

    }
}