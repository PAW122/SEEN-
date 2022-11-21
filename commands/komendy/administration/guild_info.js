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
    name: "guild_info",

    execute: async(message,args,client) => {

        if (message.author.id != owner_id) {
            return 
        }

        if(args[0] == "help"){
            return message.reply("Usage: **$guild_info <serverId>")
        }

        //komenda

            if(!args[0]) return message.reply("nie podałeś guild id")

        const data = client.guilds.cache.get(`${args[0]}`);
        if(!data || data == undefined) return message.reply("Guild not found")

        const embed_en = new Discord.MessageEmbed()
        .setColor(`RED`)
        .setTitle(`Data`)
        .setFields(
            {name: "Guild Id", value: `${args[0]}`},
            {name: "Guild name", value: `${data.name}`},
            {name: "Owner Id", value: `${data.ownerId}`},
            {name: "preferredLocale", value: `${data.preferredLocale}`},
            {name: "systemChannelId", value: `${data.systemChannelId}`},
            {name: "memberCount", value: `${data.memberCount}`}

        )
        message.channel.send({ embeds: [embed_en] });

    }
}