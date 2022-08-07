const config = require("../../config/config")
const emoji = config.economy_emoji
const Discord = require("discord.js")
const { QuickDB } = require("quick.db");
const srv_settings = require("../../../handlers/check_srv_settings")
module.exports = {
    name: "shop",

    execute: async (message, args) => {
        //load server settings economy_command
        const guildId = message.guild.id
        const command_name = "economy_command"
        srv_settings(command_name,guildId)


        const embed_pl = new Discord.MessageEmbed()
    .setColor(`BLUE`)
    .setTitle(`Shop`)
    .setDescription("Aby kupić przedmit wpisz: $buy <nazwa_przedmiotu>")
    .addFields(
        { name: `1: VIP`, value: `podwaja dzienną nagrode\nkoszt: 25.000 ${emoji}`, inline: false },

    )
    message.channel.send({embeds: [embed_pl] })
    }
}