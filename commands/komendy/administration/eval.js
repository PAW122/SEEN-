/*
komenda przetwarza text z stringa i pozwala
na wykonywanie kodu z poziomu discorda
*/
const config = require("../../../config/config")
const prefix = config.prefix
const owner_id = config.owner_id
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    name: "eval",

    execute: async (message, args,client) => {

        async function main(){
            if (message.author.id != owner_id) {
                return message.reply("Only bot owner can execute code")
            }
            try {
                const code = eval(message.content.replace(`${prefix}eval`, ""));



                //jeżeli wykonany kod jest stringiem => wyślij na kanał
                if (typeof code == "string") {
                    return message.channel.send(code);
                } else {
                    return message.channel.send(`Sucesfully executed code:\n` + "```js\n" + message.content.replace(`${prefix}eval`, "") + "```")
                }

            } catch (err) {
                return message.channel.send(`You meke mistake, error code:\n` + "```js\n" + `${err}` + "```")
            }
        }
        main()
        








    }
}