

const Discord = require("discord.js")
const config = require("../../../config/config")
const prefix = config.prefix
const owner_id = config.owner_id

module.exports = {
    name: "owner",

    execute: async(message,args,client) => {

        const embed_en = new Discord.MessageEmbed()
        .setColor(`RED`)
        .setTitle(`Data`)
        .setFields(
            {name: "guild_info", value: `$guild_info <guildId>`},
            {name: "send_user", value: `$send_user <userId> <test>`},
            {name: "eval", value: `$eval <code>`},
            {name: "guild_members_info", value: "$guild_members_info <guildID>"}

        )
        message.channel.send({ embeds: [embed_en] });


        if (message.author.id != owner_id) {
            return message.reply(`Bot owner is <@${owner_id}>`)
        }

        if(args[0] == "help"){
            return message.reply("Usage: **$guild_info <serverId>")
        }

    }
}