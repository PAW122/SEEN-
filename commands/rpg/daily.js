//start tworzy profil gracza
const { QuickDB } = require("quick.db");
const Discord = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

const config = require("../../config/config")
const daily_basic_coins = config.daily_basic_coins

const daily_basic_daimonds_min = config.daily_basic_daimonds_min
const daily_basic_daimonds_max = config.daily_basic_daimonds_max

const daily_basic_xp_min = config.daily_basic_xp_min
const daily_basic_xp_max = config.daily_basic_xp_max


const leveling = require("./lvling")

module.exports = {
    isSlash: true,

    data: new SlashCommandBuilder()
        .setName('rpg_daily')
        .setDescription('odbiera nagrody'),

    executeInteraction: async (inter) => {

        var current = new Date();
        const now_rok = current.getFullYear();
        const now_month = current.getMonth() + 1;
        const now_day = current.getDate();
        const now_hour = current.getHours();

        const guildId = inter.guild.id
        const userId = inter.user.id
        const db = new QuickDB({ filePath: process.cwd() + `/db/rpg/${guildId}.sqlite` });

        const get_daily_h = await db.get(`${userId}.get_daily[0]`)
        const get_daily_d = await db.get(`${userId}.get_daily[1]`)

        async function multiply_redwads(mnożnik,ilość_h) {
            //coinsy
            const now_coins = await db.get(`${userId}.coins`)
            const coins_do_dodania = daily_basic_coins * mnożnik
            const coins_set = now_coins + coins_do_dodania
            await db.set(`${userId}.coins`, coins_set)

            //exp
            const exp_rng = Math.floor(Math.random() * daily_basic_xp_max - daily_basic_xp_min) + daily_basic_xp_max;
            const exp_toadd = exp_rng * mnożnik
            const exp_now = await db.get(`${userId}.xp`)
            const exp_add = exp_now + exp_toadd
            await db.set(`${userId}.coins`, exp_add)

            //daimonds
            const daimonds_rng = Math.floor(Math.random() * daily_basic_daimonds_max - daily_basic_daimonds_min) + daily_basic_daimonds_max;
            const daimonds_toadd = daimonds_rng * mnożnik
            const daimonds_now = await db.get(`${userId}.daimonds`)
            const daimonds_add = daimonds_now + daimonds_toadd
            await db.set(`${userId}.coins`, daimonds_add)

            const daily_embed = new Discord.MessageEmbed()

                .setColor(`RED`)//EN
                .setTitle(`Nagrody za ${ilość_h}`)
                .setFields(
                    {name: "Coins:", value: `nagroda: ${coins_do_dodania}. Posiadasz łącznie: ${coins_set}`},
                    {name: "Xp:", value: `nagroda: ${exp_toadd}. Posiadasz łącznie: ${exp_add}`},
                    {name: "Daimonds:", value: `nagroda: ${daimonds_toadd}. Posiadasz łącznie: ${daimonds_add}`},
                )

                inter.reply({embeds: [daily_embed]})
            
        }

        async function get_daily(ilość_h) {
            if (ilość_h == 1) {const mnożnik = 1; multiply_redwads(mnożnik,ilość_h)}
            if (ilość_h == 2) {const mnożnik = 1.5; multiply_redwads(mnożnik,ilość_h)}
            if (ilość_h == 3) {const mnożnik = 2.0; multiply_redwads(mnożnik,ilość_h)}
            if (ilość_h == 4) {const mnożnik = 2.5; multiply_redwads(mnożnik,ilość_h)}
            if (ilość_h == 5) {const mnożnik = 3.0; multiply_redwads(mnożnik,ilość_h)}
            if (ilość_h == 6) {const mnożnik = 3.5; multiply_redwads(mnożnik,ilość_h)}
            if (ilość_h == 7) {const mnożnik = 4.0; multiply_redwads(mnożnik,ilość_h)}
            if (ilość_h == 8) {const mnożnik = 4.5; multiply_redwads(mnożnik,ilość_h)}
            if (ilość_h == 9) {const mnożnik = 5.0; multiply_redwads(mnożnik,ilość_h)}
            if (ilość_h == 10) {const mnożnik = 5.5; multiply_redwads(mnożnik,ilość_h)}
            if (ilość_h == 11) {const mnożnik = 6.0; multiply_redwads(mnożnik,ilość_h)}
            if (ilość_h == 12) {const mnożnik = 6.5; multiply_redwads(mnożnik,ilość_h)}
            if (ilość_h == 13) {const mnożnik = 7.0; multiply_redwads(mnożnik,ilość_h)}
            if (ilość_h == 14) {const mnożnik = 7.5; multiply_redwads(mnożnik,ilość_h)}
            if (ilość_h == 15) {const mnożnik = 8.0; multiply_redwads(mnożnik,ilość_h)}
            if (ilość_h == 16) {const mnożnik = 8.5; multiply_redwads(mnożnik,ilość_h)}
            if (ilość_h == 17) {const mnożnik = 9.0; multiply_redwads(mnożnik,ilość_h)}
            if (ilość_h == 18) {const mnożnik = 9.5; multiply_redwads(mnożnik,ilość_h)}
            if (ilość_h == 19) {const mnożnik = 10.0; multiply_redwads(mnożnik,ilość_h)}
            if (ilość_h == 20) {const mnożnik = 10.5; multiply_redwads(mnożnik,ilość_h)}
            if (ilość_h == 21) {const mnożnik = 11.0; multiply_redwads(mnożnik,ilość_h)}
            if (ilość_h == 22) {const mnożnik = 11.5; multiply_redwads(mnożnik,ilość_h)}
            if (ilość_h == 23) {const mnożnik = 12.0; multiply_redwads(mnożnik,ilość_h)}
            if (ilość_h == 24) {const mnożnik = 12.5; multiply_redwads(mnożnik,ilość_h)}
        }

        //sprawdza ile h mineło od odebrania nagrody (liczy max 1 dzień)

        if(now_hour - get_daily_h == 0 || now_hour - get_daily_h >! 0 ) return inter.reply(`Nagrode możesz odebrać maxymalnie 1 raz na godzinę\n Spróbuj za godzinę`)

        if (get_daily_d > now_day) {

            const h_za_poprzedni_dzień = 24 - get_daily_h
            const nagrody_z_x_h = now_hour + h_za_poprzedni_dzień
            get_daily(nagrody_z_x_h)
        } else {
            const nagrody_z_x_h = now_hour - get_daily_h
            get_daily(nagrody_z_x_h)
        }

        leveling(inter)
        
    }

}





