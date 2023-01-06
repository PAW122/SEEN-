const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require("discord.js")
//dodać do helpa

const help_embed = new Discord.MessageEmbed()

    .setColor(`RANDOM`)
    .setTitle(`kontakt / contact`)
    .setFields(
        {name: "$contact", value: "Send link to bot support and comunity server"},
    )

module.exports = {
    name: "kontakt",
    name_en: "contact",
    help: help_embed,
    isSlash: true,


    data: new SlashCommandBuilder()
        .setName('kontakt')
        .setDescription('wysyła dane kontaktowe'),

    executeInteraction: async (inter) => {
        inter.reply(`Discord bot Suport: https://discord.gg/ATsqW78A4F
        Discord comunity server: https://discord.gg/q2Zgj4Z
        \nor user $report to send me message`)

    },

    execute: async (message, args) => {



        message.channel.send(`Discord bot Suport: https://discord.gg/ATsqW78A4F
        or user $report to send me message`)
    }

}


