//ma automatycznie aktualizować wsystkie informacje o koncie

const Discord = require("discord.js")
const { QuickDB } = require("quick.db");
const axios = require("axios")

const config = require(process.cwd() + `/config/config.js`)
    const API_KEY = config.wargaming_api_key
    const localization = "eu"
module.exports = {
    name: "acc_refresh",

    execute: async (message) => {
        const guildId = message.guild.id
        const userId = message.author.id

        const db = new QuickDB({ filePath: process.cwd() + `/db/blitz_acc/acc_db/blitz_acc.sqlite` });
        console.log(await db.all())

        async function data_update(nick,id) {

            const link = `https://api.wotblitz.${localization}/wotb/account/list/?application_id=${API_KEY}&search=${nick}`
            const response = await axios.get(link)

            const nickname = response.data.data[0].nickname
            const accoundId = response.data.data[0].account_id

            const personal_info_link = `https://api.wotblitz.${localization}/wotb/account/info/?application_id=${API_KEY}&account_id=${accoundId}&extra=statistics.rating`
            const personal_info = await axios.get(personal_info_link)


            const all_battles = personal_info.data.data[accoundId].statistics.all.battles
            const last_battle_time = personal_info.data.data[accoundId].last_battle_time
            
            var a = new Date(last_battle_time * 1000);
                    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
                    var year = a.getFullYear();
                    var month = months[a.getMonth()];
                    var date = a.getDate();
                    var hour = a.getHours();
                    var min = a.getMinutes();
                    var sec = a.getSeconds();
                    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;

            await db.set(`${id}.battles`, {all_battles})
            await db.set(`${id}.last_battle`, {time})
        }

        const data = await db.all()
            i = 0
        data.forEach(acc => {
            const id = data[i].id
            console.log(data[i].value)
            const acc_nickname = data[i].value.nick_name
            data_update(acc_nickname,id)
            i += 1
        });

        return message.reply("data updated")
    }
}