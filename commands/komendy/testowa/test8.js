const Discord = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
    name: ".",

    execute: async (message, args, client) => {
        const emoji = await message.react(client.emojis.cache.get("1082765583323512983"));
        message.react(`${emoji}`)
    }

}