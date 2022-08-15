//start tworzy profil gracza
const { QuickDB } = require("quick.db");
const Discord = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
    isSlash: true,

    data: new SlashCommandBuilder()
        .setName('rpg_start')
        .setDescription('tworzy profil gracza'),

    executeInteraction: async (inter) => {

        var current = new Date();
        const now_rok = current.getFullYear();
        const now_month = current.getMonth() + 1;
        const now_day = current.getDate();
        const now_hour = current.getHours();

        const guildId = inter.guild.id
        const userId = inter.user.id
        const db = new QuickDB({ filePath: process.cwd() + `/db/rpg/${guildId}.sqlite` });

           await db.set(`${userId}`, {
            profil_created: [now_rok,now_month,now_day],
            userId: userId,
            xp: 0,
            lvl: 0,
            coins: 0,
            daimonds: 0,
            armor: [],
            wepon: [],
            potions: [],
            healt: 100,
            healt_regeneration_time: [],
            get_daily: [now_hour,now_day]
           })

           inter.reply("twój profil został stworzony")
        } 

}


    


