module.exports = {
    execute: async (run, token, msg) => {

        const Discord = require("discord.js");
        const prefix = ">"

        const Help_handler = require("./help_handler")
        const handler = require("./handler")
        const msg_handler = require("./msg_handler")

        const client = new Discord.Client({
            intents: 32767
        });

        handler(client)
        Help_handler(client)

        client.once('ready', () => {
            msg.reply(`${client.user.tag} is online`)
            client.user.setActivity({ name: 'power by SEEN Discord Bot', type: 'PLAYING', text: "power by SEEN Discord Bot", status: "ready" },);
        });

        client.on('messageCreate', async message => {
            msg_handler(client, prefix, message)
        })

        if (run != true) {
            client.destroy()
            return console.log("Wylogowano")
        }
        if (run == true) {
            client.login(token)
            console.log("Zalogowano")
            setTimeout(() => {
                client.destroy();
                msg.reply(`${client.user.tag} is offline`)
                console.log("Wylogowano")
            }, 600000);//10min

        }
    }
}