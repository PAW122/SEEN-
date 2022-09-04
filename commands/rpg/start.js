//start tworzy profil gracza
const { QuickDB } = require("quick.db");
const Discord = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

const start_handler = require("./rpg_handlers/start_handler");
module.exports = {
    isSlash: true,

    data: new SlashCommandBuilder()
        .setName('rpg_start')
        .setDescription('tworzy profil gracza'),

    executeInteraction: async (inter) => {

        //load server settings
        const guildId = inter.guild.id
        const db2 = new QuickDB({ filePath: process.cwd() + `/db/srv_settings/commands/${guildId}.sqlite` });
        if (await db2.get(`check.check`) == true) {
            const settings = await db2.get(`rpg.worker`)
            const settings_reason = await db2.get(`rpg.reason`)
            if (settings != true) { return message.channel.send(settings_reason) }
        }

        start_handler(inter)


    }

}





