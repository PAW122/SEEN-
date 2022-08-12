//https://api.worldoftanks.eu/wot/account/list/?application_id=ebc751064d5418bfefad7af6819e9c19
const axios = require("axios")
const Discord = require('discord.js');

const config1 = require(process.cwd() + `/config/worker.js`)
        const work = config1.blitz_stats
        const worker = config1.blitz_stats_work
        const reason = config1.blitz_stats_disable

const config = require(process.cwd() + `/config/config.js`)
    const API_KEY = config.wargaming_api_key
    

const localization = "eu"
const { QuickDB } = require("quick.db");

//blitzstats
//blitzstats help
//blitzstats help en
module.exports = {
    name: "blitzstats",
    work: worker,

    execute: async(message, args) => {
        //load server settings
const guildId = message.guild.id
const db = new QuickDB({ filePath: process.cwd() + `/db/srv_settings/commands/${guildId}.sqlite` });
if(await db.get(`check.check`) == true){
    const settings = await db.get(`blitz_stats.worker`)
    const settings_reason = await db.get(`blitz_stats.reason`)
    if(settings != true){return message.channel.send(settings_reason)}
}


                const embed_help_pl = new Discord.MessageEmbed()

                .setColor(`BLUE`)//PL
                .setTitle("blitzstats help")
                .setDescription(`
                użycie: $blitzstats <nickname>
                przykład: $blitzstats __PAW
                help command in english: $blitzstats help en`)
        
                .setFooter(message.author.tag, message.author.avatarURL({dynamic: true}));

                const embed_help_en = new Discord.MessageEmbed()

                .setColor(`BLUE`)//PL
                .setTitle("blitzstats help")
                .setDescription(`
                usage: $blitzstats <nickname>
                example: $blitzstats __PAW
                help command in polish: $blitzstats help`)
        
                .setFooter(message.author.tag, message.author.avatarURL({dynamic: true}));

        if(args[0] == "help"){
            if(args[1] == "en"){
                message.channel.send({embeds: [embed_help_en]});
            }else{
                message.channel.send({embeds: [embed_help_pl]});
            }
        }else{

            if(work != true){return message.channel.send(reason)}

            const nick = args[0]
            const link = `https://api.wotblitz.${localization}/wotb/account/list/?application_id=${API_KEY}&search=${nick}`
            
        if(!nick){
            return message.reply("Nie podałeś nicku")
        }

                //personal
                const response = await axios.get(link)
                //console.log(response.data)
                
                const nickname = response.data.data[0].nickname
                const accoundId = response.data.data[0].account_id
                //console.log(nickname)
                //console.log(accoundId)

                //clan
                const clan_info_link = `https://api.wotblitz.${localization}/wotb/clans/accountinfo/?application_id=${API_KEY}&account_id=${accoundId}`
                const clan_info = await axios.get(clan_info_link)

                

                try{
                    const clan_id = clan_info.data.data[accoundId].clan_id
                    const clan_join_timesamp = clan_info.data.data[accoundId].joined_at
                


               //clan data
                
               const clan_data_link = `https://api.wotblitz.${localization}/wotb/clans/info/?application_id=${API_KEY}&clan_id=${clan_id}`
               const clan_data = await axios.get(clan_data_link)
               console.log(`clan data: ${clan_data}`)
               if(clan_data.data.data == null){
                   var clan_name = "brak"
               }else{
               var clan_name = clan_data.data.data[clan_id].name
               }
               //153067
            
            }catch(err){

            }


                //personal data
                const personal_info_link = `https://api.wotblitz.${localization}/wotb/account/info/?application_id=${API_KEY}&account_id=${accoundId}&extra=statistics.rating`
                const personal_info = await axios.get(personal_info_link)

                const win_battles = personal_info.data.data[accoundId].statistics.all.wins
                const los_battles = personal_info.data.data[accoundId].statistics.all.losses
                const all_battles = personal_info.data.data[accoundId].statistics.all.battles
                const created_at = personal_info.data.data[accoundId].created_at
                const last_battle_time = personal_info.data.data[accoundId].last_battle_time


                const wr = "w trakcie prac"
                const draw_battles = all_battles-(win_battles+los_battles)

                
                    var a = new Date(created_at * 1000);
                    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
                    var year = a.getFullYear();
                    var month = months[a.getMonth()];
                    var date = a.getDate();
                    var hour = a.getHours();
                    var min = a.getMinutes();
                    var sec = a.getSeconds();
                    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
                    
                    var a2 = new Date(last_battle_time * 1000);
                    var months2 = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
                    var year2 = a2.getFullYear();
                    var month2 = months2[a2.getMonth()];
                    var date2 = a2.getDate();
                    var hour2 = a2.getHours();
                    var min2 = a2.getMinutes();
                    var sec2 = a2.getSeconds();
                    var time2 = date2 + ' ' + month2 + ' ' + year2 + ' ' + hour2 + ':' + min2 + ':' + sec2 ;
                    


                const embed_pl = new Discord.MessageEmbed()

                .setColor(`BLUE`)//PL
                .setTitle("ACC STATS")
                .addFields(
                {name: `nickname`, value:`${nickname}`, inline: false},
                {name: `winrate`, value:`${wr}`, inline: true},
                {name: `clan`, value:`${clan_name}`, inline: true},

                {name: `battles`, value:`${all_battles}`, inline: false},
                {name: `win battles`, value:`${win_battles}`, inline: true},
                {name: `los battles`, value:`${los_battles}`, inline: true},
                {name: `draw battles`, value:`${draw_battles}`, inline: true},

                {name: `last battle`, value:`${time2}`, inline: false},
                {name: `account created at`, value:`${time}`, inline: false},
                )
        
                .setFooter(message.author.tag, message.author.avatarURL({dynamic: true}));
        
        
                message.channel.send({embeds: [embed_pl]});
            
        
    }
    }
}
