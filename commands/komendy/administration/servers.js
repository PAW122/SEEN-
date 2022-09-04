/*
wysyła na kanał informacje o serweże po jego id
embeda z:
id serwera,nazwą serwera
nazwami urzytkowników,id urzytkowników,rangami urzytkowników
nazwami kanałówm,id kanałów
nazwami rang,id rang
server ownera
*/
const Discord = require("discord.js")
const config = require("../../../config/config")
const prefix = config.prefix
const owner_id = config.owner_id

module.exports = {
    name: "bot_servers",

    execute: async (message, args, client) => {
        async function main() {
            if (message.author.id != owner_id) {
                return
            }

            if (args[0] == "help") {
                return message.reply("Usage: **$guild_info <serverId>")
            }


            var string = []


            client.guilds.cache.forEach(guild => {
                string.push(guild.name, "--", guild.id, "\n")
            })


            const embed_en = new Discord.MessageEmbed()
                .setColor(`RED`)
                .setTitle(`All bot servers`)
                .setDescription(`Bot servers:\n ${string}`)


            return message.channel.send({ embeds: [embed_en] });

        }
        main()
    }
}