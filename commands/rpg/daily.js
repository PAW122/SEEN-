//start tworzy profil gracza
const { QuickDB } = require("quick.db");
const Discord = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

const config = require("../../config/rpg")
const daily_basic_coins = config.daily_basic_coins

const daily_basic_daimonds_min = config.daily_basic_daimonds_min
const daily_basic_daimonds_max = config.daily_basic_daimonds_max

const daily_basic_xp_min = config.daily_basic_xp_min
const daily_basic_xp_max = config.daily_basic_xp_max

//handlers
const leveling = require("./lvling")
const daily_handler = require("./rpg_handlers/daily_handler")

module.exports = {
    isSlash: true,

    data: new SlashCommandBuilder()
        .setName('rpg_daily')
        .setDescription('odbiera nagrody'),

    executeInteraction: async (inter) => {

        //load server settings
        const guildId = inter.guild.id
        const db2 = new QuickDB({ filePath: process.cwd() + `/db/srv_settings/commands/${guildId}.sqlite` });
        if (await db2.get(`check.check`) == true) {
            const settings = await db2.get(`rpg.worker`)
            const settings_reason = await db2.get(`rpg.reason`)
            if (settings != true) { return inter.reply(settings_reason) }
        }

        var current = new Date();
        const now_rok = current.getFullYear();
        const now_month = current.getMonth() + 1;
        const now_day = current.getDate();
        const now_hour = current.getHours();

        const userId = inter.user.id
        const db = new QuickDB({ filePath: process.cwd() + `/db/rpg/${guildId}.sqlite` });

        const get_daily_h = await db.get(`${userId}.get_daily[0]`)
        const get_daily_d = await db.get(`${userId}.get_daily[1]`)

        async function create_user_account() {
            const userId = inter.user.id
            if (await db.get(`${userId}.check`) != true) {
                //user nie ma konta
                await db.set(`${userId}.check`, true)
                await db.set(`${userId}.coins`, 0)
                await db.set(`${userId}.xp`, 0)
                await db.set(`${userId}.daimonds`, 0)
                await db.set(`${userId}.get_daily[0]`, now_hour)
                await db.set(`${userId}.get_daily[1]`, now_day)

                return inter.reply("Gratulacje dołączyłeś do gry rpg. Twoje konto zostało pomyślnie stworzone")
            }
        }
        //sprawdza ile h mineło od odebrania nagrody (liczy max 1 dzień)
        function check_afk_time() {
            if (now_hour - get_daily_h == 0 || now_hour - get_daily_h < 1) return inter.reply(`Nagrode możesz odebrać maxymalnie 1 raz na godzinę\n Spróbuj za godzinę`)

            if (get_daily_d != now_day) {

                const h_za_poprzedni_dzień = 24 - get_daily_h
                const nagrody_z_x_h = now_hour + h_za_poprzedni_dzień
                daily_handler(nagrody_z_x_h,inter)
            } else {
                const nagrody_z_x_h = now_hour - get_daily_h
                daily_handler(nagrody_z_x_h,inter)
            }
        }

        async function add_redwads(mnożnik, ilość_h) {
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
            await db.set(`${userId}.xp`, exp_add)

            //daimonds
            const daimonds_rng = Math.floor(Math.random() * daily_basic_daimonds_max - daily_basic_daimonds_min) + daily_basic_daimonds_max;
            const daimonds_toadd = daimonds_rng * mnożnik
            const daimonds_now = await db.get(`${userId}.daimonds`)
            const daimonds_add = daimonds_now + daimonds_toadd
            await db.set(`${userId}.daimonds`, daimonds_add)

            //zapisz dzień i godz osebrania daily
            await db.set(`${userId}.get_daily[0]`, now_hour)
            await db.set(`${userId}.get_daily[1]`, now_day)


            const daily_embed = new Discord.MessageEmbed()

                .setColor(`RED`)//EN
                .setTitle(`Nagrody za ${ilość_h} h`)
                .setFields(
                    { name: "Coins:", value: `nagroda: ${coins_do_dodania}. Posiadasz łącznie: ${coins_set}` },
                    { name: "Xp:", value: `nagroda: ${exp_toadd}. Posiadasz łącznie: ${exp_add}` },
                    { name: "Daimonds:", value: `nagroda: ${daimonds_toadd}. Posiadasz łącznie: ${daimonds_add}` },
                )

            inter.reply({ embeds: [daily_embed] })

        }


        //wywałaj wszystkie funkcje:
        create_user_account()
        check_afk_time()

    }

}





