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
        inter.reply(`Discord bot Suport: https://discord.gg/ATsqW78A4F`);

    },

    execute: async (message, args) => {



        message.channel.send(`Discord bot Suport: https://discord.gg/ATsqW78A4F`)
    }

}


