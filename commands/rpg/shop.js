//start tworzy profil gracza
const { QuickDB } = require("quick.db");
const Discord = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

const config = require("../../config/config")
const emoji = config.rpg_coins_emoji
const basic_hełm_upgrade_cost = config.basic_hełm_upgrade_cost
const basic_klata_upgrade_cost = config.basic_klata_upgrade_cost
const basic_spodnie_upgrade_cost = config.basic_spodnie_upgrade_cost
const basic_buty_upgrade_cost = config.basic_buty_upgrade_cost
module.exports = {
    isSlash: true,

    data: new SlashCommandBuilder()
        .setName('rpg_shop')
        .setDescription('wysyła liste przedmiotów do kupienia'),

    executeInteraction: async (inter) => {


        const guildId = inter.guild.id
        const userId = inter.user.id
        const db = new QuickDB({ filePath: process.cwd() + `/db/rpg/${guildId}.sqlite` });

        const now_lvl = await db.get(`${userId}.lvl`)

        const now_hełm_lvl = await db.get(`${userId}.armor[0]`)
        const now_klata_lvl = await db.get(`${userId}.armor[1]`)
        const now_spodnie_lvl = await db.get(`${userId}.armor[2]`)
        const now_buty_lvl = await db.get(`${userId}.armor[3]`)


            const daily_embed = new Discord.MessageEmbed()

                .setColor(`RED`)//EN
                .setTitle(`Lista przedmiotó do kupienia\n użyj /rpg_buy <nazwa przedmiotu>`)
                .setFields(
                    {name: "upgrade hełmu:", value: `lvl: ${now_hełm_lvl +1}--koszt upradu:${basic_hełm_upgrade_cost * now_hełm_lvl} ${emoji}`},
                    {name: "upgrade klaty:", value: `lvl: ${now_klata_lvl+1}--koszt upradu:${basic_klata_upgrade_cost * now_klata_lvl} ${emoji}`},
                    {name: "upgrade spodni:", value: `lvl: ${now_spodnie_lvl+1}--koszt upradu:${basic_spodnie_upgrade_cost * now_spodnie_lvl} ${emoji}`},
                    {name: "upgrade butów:", value: `lvl: ${now_buty_lvl+1}--koszt upradu:${basic_buty_upgrade_cost * now_buty_lvl} ${emoji}`},
                    {name: "potka życia:", value: `niedługo dostępne`},
                    {name: "potka szczęścia:", value: `niedługo dostępne`},
                    {name: "potka many:", value: `niedługo dostępne`},
                )

                inter.reply({embeds: [daily_embed]})     
    }

}





