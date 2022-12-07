const { MessageAttachment } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    name: "bruh",
    isSlash: true,

    data: new SlashCommandBuilder()
        .setName('bruh')
        .setDescription('Send bruh image'),
    executeInteraction: async (inter) => {
        const attachment = new MessageAttachment(`db/images/bruh.webp`)
       return inter.channel.send({files: [attachment]});
    },
    
    execute: async(message,args,client) => {
        const attachment = new MessageAttachment(`db/images/bruh.webp`)
       return message.channel.send({files: [attachment]});
    }
}