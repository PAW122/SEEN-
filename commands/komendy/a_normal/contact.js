
const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
const { QuickDB } = require("quick.db");
//$ping
//$ping help
//$ping help en
module.exports = {
    name: "kontakt",
    name_en: "contact",
    description: "wysyła pong",
    usage: "$ping",
    work: worker,
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


