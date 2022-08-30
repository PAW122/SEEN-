
const Discord = require('discord.js');

const config1 = require(process.cwd() + `/config/worker.js`)
        const work = config1.blitz_stats
        const worker = config1.blitz_stats_work
        const reason = config1.blitz_stats_disable


const { QuickDB } = require("quick.db");

const yt_notify_handler = require("./yt-notifications")
//nie wywołuje tu powiadomienia
module.exports = {
    name: "youtube",
    work: worker,

    execute: async(message, args) => {

        //load server settings
        const guildId = inter.guild.id
        const db2 = new QuickDB({ filePath: process.cwd() + `/db/srv_settings/commands/${guildId}.sqlite` });
        if (await db2.get(`check.check`) == true) {
            const settings = await db2.get(`yt_notyfications.worker`)
            const settings_reason = await db2.get(`yt_notyfications.reason`)
            if (settings == false) { return message.channel.send(settings_reason) }
        }
        

        const db = new QuickDB({ filePath: process.cwd() + `/db/yt-notify/${guildId}.sqlite` });

        if(args[0] == "help"){
            return message.reply(`
            usage: $youtube notifications <dc_channel_id> <yt_channel_link>
            maximum 1 tracked channel on the server!!`)
        }

        if(args[0] == "notifications"){

            if(!args[1] || !args[2]){
                return message.reply("you didn't provide arguments")
            }

            const dc_channel_id = args[1]
            const yt_channel_id = args[2]

            //zapisz do db

                    //stwórz profil w db
                    await db.set(`check`, { check: true })
                    await db.set(`dc_channel`, { id: dc_channel_id })
                    await db.set(`yt_channel`, { link: yt_channel_id })
                    await db.set(`free_space`, [])
                message.reply("saved")


        }
    }
    
}
