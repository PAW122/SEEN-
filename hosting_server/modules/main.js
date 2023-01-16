module.exports = {
    execute: async (run,token, msg) => {

        const Discord = require("discord.js");
        const prefix = ">"

        const Help_handler = require("./help_handler")
        const handler = require("./handler")
        const msg_handler = require("./msg_handler")

        const client = new Discord.Client({
            intents: [
                Discord.Intents.FLAGS.GUILDS,
                Discord.Intents.FLAGS.GUILD_MESSAGES
            ]
        });

        handler(client)
        Help_handler(client)

        client.once('ready', () => {
            msg.reply(`${client.user.tag} is online`)
        });

        client.on('messageCreate', async message => {
            msg_handler(client, prefix, message)
        })

        if(run != true) {
            client.destroy().then(m => {
                return console.log("Wylogowano")
            })
            return
        }
        if(run == true) {
            client.login(token)
        }
    }
}