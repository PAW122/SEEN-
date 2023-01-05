const help_embed = require("./a_help2")
module.exports = {
    name: "help",

    execute:async(message,args,client) => {

        if(!args[0]) return help_embed.execute(message,args,client)

        const commandName = args[0]
        if (!client.command.has(commandName)) return message.reply("I dont found this command. try use $help")
        const command = client.command.get(commandName);//pobieramy komende
        if(!command.help) return message.reply("This command dont have help description")
        const mebed = command.help

        message.reply({embeds:[mebed]})
    }
}