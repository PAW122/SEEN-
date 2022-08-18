/*
użytkownik wprowadza:
nick ,mail,hasło,tiery,ilość banów,ilość golda, 
ilość bitew i wr będzie obliczana przez bot

bot bierze nick i sprawdza z blitz api
jeżeli 1 nick z listy jest identyczny jak podany
zapisuje acc.id jako id i dalej wszystkie dane

jeżel 1 nick nie jest identyczny zwraca wiadomość

działać będą tylko konta z serwera eu

podanie ponownie tego samego nicku nadpisuje dane
*/

const Discord = require("discord.js")
const { QuickDB } = require("quick.db");
const config = require("../../config/config")
const prefix = config.prefix
const owner_id = config.owner_id
const API_KEY = config.wargaming_api_key
const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require("axios")
const localization = "eu"

module.exports = {
    isSlash: true,


    data: new SlashCommandBuilder()
        .setName('blitzdb_add_account')
        .setDescription('dodaje nowe konto do db')

        .addStringOption((option) =>
            option
                .setName("nickname")
                .setDescription("podaj nazwe konta")
                .setRequired(true)
        )
        .addStringOption((option) =>
            option
                .setName("mail")
                .setDescription("podaj nazwe mail konta")
                .setRequired(true)
        )
        .addStringOption((option) =>
            option
                .setName("password")
                .setDescription("podaj nazwe chasło konta")
                .setRequired(true)
        )
        .addStringOption((option) =>
            option
                .setName("tier")
                .setDescription("podaj tiery czołgów znajdujących się na koncie")
                .setRequired(true)
        )
        .addNumberOption((option) =>
            option
                .setName("bans")
                .setDescription("podaj ilość banów. jeżeli konto nie było banowane wpisz 0")
                .setRequired(true)
        )
        .addStringOption((option) =>
            option
                .setName("gold")
                .setDescription("podaj ilość golda znajdującą się na koncie")
                .setRequired(true)
        )
        
    ,executeInteraction: async (inter) => {
        const guildId = inter.guild.id
        const userId = inter.user.id

        const db = new QuickDB({ filePath: process.cwd() + `/db/blitz_acc/acc_db/blitz_acc.sqlite` });
        const db_user = new QuickDB({ filePath: process.cwd() + `/db/blitz_acc/acc_db/user_acc.sqlite` });

        const nickname = inter.options.getString('nickname')
        const mail = inter.options.getString('mail')
        const password = inter.options.getString('password')
        const tier = inter.options.getString('tier')
        const bans = inter.options.getNumber('bans')
        const gold = inter.options.getString('gold')

        //sprawdż czy urzytkownik ma uprawnienia
        const user_permisions = await db_user.get(`${userId}.permisje`)

        if(user_permisions != "true" && userId != owner_id) {
            return inter.reply("Nie posiadasz uprawnień administratora. W razie pytań użyj $report <wiadomość>")
        }else{
            //urzytkownik ma uprawnienia
        //sprawdz czy taki nickname istnieje

        const link = `https://api.wotblitz.${localization}/wotb/account/list/?application_id=${API_KEY}&search=${nickname}`
        const response = await axios.get(link)

        //wargaming api data:
        const get_nickname = response.data.data[0].nickname
        const accoundId = response.data.data[0].account_id

        //sprawdzenie zgodności nicków
        if(nickname != get_nickname) {
            return inter.reply("Podałes nieprawidłowy nick")
        }

        //uzyskanie personal data z wg api dla konta
        const personal_info_link = `https://api.wotblitz.${localization}/wotb/account/info/?application_id=${API_KEY}&account_id=${accoundId}&extra=statistics.rating`
        const personal_info = await axios.get(personal_info_link)
    
        //data
        const win_battles = personal_info.data.data[accoundId].statistics.all.wins
        const los_battles = personal_info.data.data[accoundId].statistics.all.losses
        const all_battles = personal_info.data.data[accoundId].statistics.all.battles
        const created_at = personal_info.data.data[accoundId].created_at
        const last_battle_time = personal_info.data.data[accoundId].last_battle_time

        //przekształcenie timesampa w czytelną date
        var a = new Date(last_battle_time * 1000);
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        var last_battle = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    
        //obliczanie wr
        const wr = (win_battles / all_battles) * 100

        //zapisywanie danych do db:
        await db.set(`${accoundId}.nickname`, nickname)
        await db.set(`${accoundId}.mail`, mail)
        await db.set(`${accoundId}.password`, password)
        await db.set(`${accoundId}.tier`, tier)
        await db.set(`${accoundId}.bans`, bans)
        await db.set(`${accoundId}.gold`, gold)

        //zapisywanie danych z db
        await db.set(`${accoundId}.last_battle`, last_battle)
        await db.set(`${accoundId}.all_battles`, all_battles)
        await db.set(`${accoundId}.wr`, wr)

        const embed_pl = new Discord.MessageEmbed()

                .setColor(`BLUE`)//PL
                .setTitle("ACC DATA")
                .setDescription("Konto zostało pomyślnie dodane do bazy danych")
                .addFields(
                {name: `nickname`, value: `${nickname}`, inline: false},
                {name: `mail`, value:`${mail}`, inline: true},
                {name: `password`, value:`${password}`, inline: true},

                {name: `tiers`, value:`${tier}`, inline: false},
                {name: `bans`, value:`${bans}`, inline: true},
                {name: `gold`, value:`${gold}`, inline: true},
                {name: `last battle`, value:`${last_battle}`, inline: true},

                {name: `all_battles`, value:`${all_battles}`, inline: false},
                {name: `wr`, value:`${wr}`, inline: false},
                )
        inter.reply({embeds: [embed_pl]});
        
    }

    },


}