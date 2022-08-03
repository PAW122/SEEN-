const config = require("../../config/config")
const emoji = config.economy_emoji
const Discord = require("discord.js")
module.exports = {
    name: "shop",

    execute: async (message, args) => {


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