const Discord = require("discord.js")

const help_embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle("ping")
    .setFields(
        { name: "$ping", value: "if bot is online send pong" }
    )

module.exports = {
    name: "ping",
    help: help_embed,

    execute: async (message, args, client) => {
        message.reply("Pong!")
    }
}