const config = require(process.cwd() + `/config/worker.js`)
        const work = config.tickets
        const worker = config.tickets_worker
        const reason = config.tickets_disable

const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
const {QuickDB} = require("quick.db")


module.exports = {
    name: "ticket",
    work: worker,

    execute: async (message, args) => {

        if (work != true) { return message.channel.send(reason) }

        const guildId = message.guild.id
        const db = new QuickDB({ filePath: process.cwd() + `/db/srv_settings/commands/${guildId}.sqlite` });
    
    }
        
    }
