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
        .setName('blitzdb_refresh_data')
        .setDescription('odświeża informacje o wszystkich konta w db')


        
    ,executeInteraction: async (inter) => {
        const guildId = inter.guild.id
        const userId = inter.user.id

        const db = new QuickDB({ filePath: process.cwd() + `/db/blitz_acc/acc_db/blitz_acc.sqlite` });
        const db_user = new QuickDB({ filePath: process.cwd() + `/db/blitz_acc/acc_db/user_acc.sqlite` });

        const nickname = inter.options.getString('nickname')

        //sprawdza uprawnienia żeby nikt nie mógł spamić bota
        const user_permisions = await db_user.get(`${userId}.permisje`)
        if(user_permisions != "true" && userId != owner_id) {
            return inter.reply("Nie posiadasz uprawnień administratora. W razie pytań użyj $report <wiadomość>")
        }

        async function data_update(nick,id) {

            const link = `https://api.wotblitz.${localization}/wotb/account/list/?application_id=${API_KEY}&search=${nick}`
            const response = await axios.get(link)

            const nickname = response.data.data[0].nickname
            const accoundId = response.data.data[0].account_id

            const personal_info_link = `https://api.wotblitz.${localization}/wotb/account/info/?application_id=${API_KEY}&account_id=${accoundId}&extra=statistics.rating`
            const personal_info = await axios.get(personal_info_link)

            const win_battles = personal_info.data.data[accoundId].statistics.all.wins
            const all_battles = personal_info.data.data[accoundId].statistics.all.battles
            const last_battle_time = personal_info.data.data[accoundId].last_battle_time
            
            const wr = (win_battles / all_battles) * 100

            var a = new Date(last_battle_time * 1000);
                    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
                    var year = a.getFullYear();
                    var month = months[a.getMonth()];
                    var date = a.getDate();
                    var hour = a.getHours();
                    var min = a.getMinutes();
                    var sec = a.getSeconds();
                    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;

            await db.set(`${accoundId}.battles`, all_battles)
            await db.set(`${accoundId}.last_battle`, time)
            await db.set(`${accoundId}.wr`, wr)
        }

        const data = await db.all()
        i = 0
    data.forEach(acc => {
        const id = data[i].id
        console.log(data[i].value)
        const acc_nickname = data[i].value.nickname
        data_update(acc_nickname,id)
        i += 1
    });

    inter.reply("Pomyślnie odświeżono informacje o wszystkich kontach");
        
    },


}