const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require("discord.js")
const help_embed = new Discord.MessageEmbed()

    .setColor(`RANDOM`)
    .setTitle(`link`)
    .setFields(
        { name: "$link", value: "Send invite link to bot" },
    )

module.exports = {
    name: "link",
    isSlash: true,
    help: help_embed,

    data: new SlashCommandBuilder()
        .setName('link')
        .setDescription('Send link to bot'),
    executeInteraction: async (inter) => {
        return inter.reply("** Invite bot link:** \n https://discord.com/api/oauth2/authorize?client_id=797070806885990431&permissions=8&scope=bot%20applications.commands")
    },

    execute: async (message, args, client) => {
        if (args[0] == "help") {
            return message.reply("user **$link** to get invite bot link")
        }
        return message.reply("** Invite bot link:** \n https://discord.com/api/oauth2/authorize?client_id=797070806885990431&permissions=8&scope=bot%20applications.commands")
    }
}