const { SlashCommandBuilder } = require('@discordjs/builders');
//dodać do helpa
module.exports = {
    name: "kontakt",
    name_en: "contact",
    isSlash: true,


    data: new SlashCommandBuilder()
        .setName('kontakt')
        .setDescription('wysyła dane kontaktowe'),

    executeInteraction: async (inter) => {
        inter.reply(`Discord bot Suport: https://discord.gg/ATsqW78A4F
        or user $report to send me message
        \n
        \n
        if you want to have your bot or are looking for hosting, contact us in a private message:   PAW#5844`)

    },

    execute: async (message, args) => {



        message.channel.send(`Discord bot Suport: https://discord.gg/ATsqW78A4F
        or user $report to send me message
        \n
        \n
        if you want to have your bot or are looking for hosting, contact us in a private message:   PAW#5844`)
    }

}


