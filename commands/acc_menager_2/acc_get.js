/*
pobiera dane na temat konta z db
urzytkownik musi być dodany do db,
musi podać nickname konta
gdzieś w logach powinno się zapisywać kiedy i do jakiego konta rał dane

*/


const Discord = require("discord.js")
const { QuickDB } = require("quick.db");
const config = require("../../config/config")
const prefix = config.prefix
const owner_id = config.owner_id
const API_KEY = config.wargaming_api_key
const axios = require("axios")
const localization = "eu"
const fs = require("fs")

const { SlashCommandBuilder } = require('@discordjs/builders');


module.exports = {
    isSlash: true,


    data: new SlashCommandBuilder()
        .setName('blitzdb_get_account')
        .setDescription('pozwala pobrać dane o koncie przez urzytkownika')

        .addStringOption((option) =>
            option
                .setName("nickname")
                .setDescription("podaj nazwe konta")
                .setRequired(true)
        )


    , executeInteraction: async (inter) => {

        const acc_nickname = inter.options.getString('nickname')

        var current = new Date();
        const now_rok = current.getFullYear();
        const now_month = current.getMonth() + 1;
        const now_day = current.getDate();


        const guildId = inter.guild.id
        const userId = inter.user.id

        const db = new QuickDB({ filePath: process.cwd() + `/db/blitz_acc/acc_db/blitz_acc.sqlite` });
        const db_user = new QuickDB({ filePath: process.cwd() + `/db/blitz_acc/acc_db/user_acc.sqlite` });

        //sprawdż czy urzytkownik ma uprawnienia
        const user_permisions = await db_user.get(`${userId}.permisje`)

        if ((user_permisions != "true" || user_permisions != "false")&& userId != owner_id) {
            return inter.reply("Nie posiadasz uprawnień administratora. W razie pytań użyj $report <wiadomość>")
        }

        //pobranie danych i wpis do logów

        //sprawdż nick i pobierz id konta
        const link = `https://api.wotblitz.${localization}/wotb/account/list/?application_id=${API_KEY}&search=${acc_nickname}`
        const response = await axios.get(link)

        //wargaming api data:
        const get_nickname = response.data.data[0].nickname
        const accoundId = response.data.data[0].account_id

        if(!get_nickname) return inter.reply("podałeś niepoprawny nick")

        //sprawdż czy w db jest konto z takim nickiem
        const db_nickname = await db.get(`${accoundId}.nickname`)
        if(db_nickname == null) { 
            return inter.reply("podałeś nieprawidłowy nick")
        }

        const mail = await db.get(`${accoundId}.mail`)
        const password = await db.get(`${accoundId}.password`)
        const tier = await db.get(`${accoundId}.tier`)
        const bans = await db.get(`${accoundId}.bans`)
        const gold = await db.get(`${accoundId}.gold`)
        const last_battle = await db.get(`${accoundId}.last_battle`)
        const all_battles = await db.get(`${accoundId}.all_battles`)
        const wr = await db.get(`${accoundId}.wr`)



        //wpis do logów
        const path = process.cwd() + `/db/blitz_acc/acc_db/logs.txt`
        const time = new Date().toLocaleTimeString().slice(0,5)
        const dane = `${time} -- ${now_rok}.${now_month}.${now_day} -- ${userId} in ${guildId} get data about: ${acc_nickname} \n`
        fs.appendFile(path,dane, function (err) {
            if (err) throw err;
            });


            const embed_pl = new Discord.MessageEmbed()

                .setColor(`BLUE`)//PL
                .setTitle("ACC DATA")
                .setDescription("dane konta")
                .addFields(
                    {name: `nickname`, value: `${db_nickname}`, inline: false},
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

    },


}