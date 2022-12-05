const Discord = require("discord.js");
const axios = require("axios");

const config = require("../../../config/config")
const API_KEY = config.wargaming_api_key

module.exports = {
    name: "wot",

    execute:async(message,args,client) => {
        if(args[0] == "help") {
            const embed_pl = new Discord.MessageEmbed()

                .setColor(`BLUE`)//PL
                .setTitle("World of thanks Stats")
                .setFields(
                    {name: "Nickname:",value: `nick`}
                )
        }
        if(!args[0]) return message.reply("type nickname")
        const nickname = args[0]
        const link = `https://api.worldoftanks.eu/wot/account/list/?application_id=${API_KEY}&search=${nickname}`
        const res = await axios.get(link).catch(err => {
            console.log(err)
        })
        //console.log(res.data)
        try{
        //if(res.data.status == "ok") return message.reply("error")
        if(res.data.status == 'error' && res.data.error.field == "search") return message.reply("Incorrect Nickname")
        }catch(err){
            console.log(err)
        }
        const nick = res.data.data[0].nickname
        const account_id = res.data.data[0].account_id

        const link2 = `https://api.worldoftanks.eu/wot/account/info/?application_id=${API_KEY}&account_id=${account_id}`
        const res2 = await axios.get(link2).catch(err => {
            console.log(err)
        })

        //console.log(res2.data)

        const last_battle_time = res2.data.data[account_id].last_battle_time
        const created_at = res2.data.data[account_id].created_at
        const global_rating = res2.data.data[account_id].global_rating
        const logout_at = res2.data.data[account_id].logout_at

        //statistic
        const stats = res2.data.data[account_id].statistics
        console.log(stats)

        const all_stats = stats.all
        const spotted = all_stats.spotted
        const max_xp = all_stats.max_xp
        const avg_damage_blocked = all_stats.avg_damage_blocked
        const hits_percents = all_stats.hits_percents
        const battles = all_stats.battles

        //staty do coliczenia

        //wr
        const all_battles = all_stats.battles
        const draws = all_stats.draws
        const wins = all_stats.wins
        const losses = all_stats.losses
        const wr = (wins/(all_battles))*100
        console.log(`wr: ${wr}`)

        //srv rate
        const survived_battles = all_stats.survived_battles
        const srv_ratio = (survived_battles/all_battles)*100
        console.log(`srv ratio: ${srv_ratio}`)

        //kpb
        const frags = all_stats.frags
        const kpb = (frags/all_battles)
        console.log(`kils per batle: ${kpb}`)

        const embed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTitle("World Of Thanks Stats")
            .setFields(
                {name: "Nickname:", value: `${nick}`},
                {name: "Winrate:",value: `${wr.toFixed(2)}%`},
                {name: "srv rate:", value: `${srv_ratio.toFixed(2)}%`},
                {name: "Kill per battle:", value: `${kpb.toFixed(2)}`},
                {name: "accurity:", value: `${hits_percents}%`},
                {name: "Battles", value: `${all_battles}`},
                {name: "global rating:",value: `${global_rating}`},
                {name: "max xp", value: `${max_xp}xp`},
                {name: "avg dmg blocked",value: `${avg_damage_blocked}`}
            )
            return message.channel.send({ embeds: [embed] });




                async function find_tank() {
                    const tank_tier = 10
                    const nation = "germany"
                    const type = "heavyTank"

                    const serach_name = "MAUS"

                    const link = `https://api.worldoftanks.eu/wot/encyclopedia/vehicles/?application_id=ebc751064d5418bfefad7af6819e9c19&nation=${nation}&tier=${tank_tier}&type=${type}`
                }
                    // zrbić to na slashu

                    //jeżeli nie znajdzie sie czołg z taka nazwą bot wysyła listę z wszystkimi nazwami czołgów wysłanymi przez api


        
    }
} 
