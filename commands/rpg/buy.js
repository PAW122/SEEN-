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
        .setDescription('wysyła liste przedmiotów do kupienia')

        .addStringOption((option) =>
            option
                .setName("zakup")
                .setDescription("wybierz ulepszenie lub zakup przedmiotu")
                .setRequired(true)
                .setChoices(
                    {name: "hełm", value: "podnosi lvl hełmu o 1"},
                    {name: "klata", value: "podnosi lvl klaty o 1"},
                    {name: "spodnie", value: "podnosi lvl spodni o 1"},
                    {name: "buty", value: "podnosi lvl buty o 1"},
                )
                    ),

    executeInteraction: async (inter) => {

        const guildId = inter.guild.id
        const userId = inter.user.id
        const db = new QuickDB({ filePath: process.cwd() + `/db/rpg/${guildId}.sqlite` });

        const now_lvl = await db.get(`${userId}.lvl`)

        const now_hełm_lvl = await db.get(`${userId}.armor[0]`)
        const now_klata_lvl = await db.get(`${userId}.armor[1]`)
        const now_spodnie_lvl = await db.get(`${userId}.armor[2]`)
        const now_buty_lvl = await db.get(`${userId}.armor[3]`)

        const koszt_up_hełmu = basic_hełm_upgrade_cost * now_hełm_lvl
        const koszt_up_klaty = basic_klata_upgrade_cost * now_klata_lvl
        const koszt_up_spodni = basic_spodnie_upgrade_cost * now_spodnie_lvl
        const koszt_up_butów = basic_buty_upgrade_cost * now_buty_lvl

        const user_coins = await db.get(`${userId}.coins`)


        const response = inter.options.getString('zakup')

            if(response == 'hełm'){
                //sprawdż czy stać kogoś na ulepszenie chełmu
                if(user_coins > koszt_up_hełmu) {
                    return inter.reply(`nie masz wystarczająco ${emoji}\n
                    koszt ulepszenia chełmu to: ${now_hełm_lvl * basic_hełm_upgrade_cost}`)
                }else{
                    const upgrade_to = now_hełm_lvl + 1
                    const user_pozostałe_coinsy = user_coins - koszt_up_hełmu
                    await db.set(`${userId}.armor[0]`, upgrade_to)
                    await db.set(`${userId}.coins`, user_pozostałe_coinsy)
                    return inter.reply(`pomyslnie ulepszono hełm do poziomu ${upgrade_to}`)
                }
            }
            
        

       
        
    }

}





