
const Discord = require('discord.js');

const works = require(process.cwd() + `/config/worker.js`)
const work = works.yt_notify_handler
const reason = works.yt_notify_handler_disable


const { QuickDB } = require("quick.db");

const yt_notify_handler = require("./yt-notifications")
//nie wywołuje tu powiadomienia
module.exports = {
    name: "youtube",

    execute: async(message, args) => {

        if (work != true) {return message.reply("youtube command is disabled from technic reasons")}

        //load server settings
        const guildId = message.guild.id
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
