

const config2 = require("../../../config/config")
const black_list = config2.black_list
const ban_channel_id = config2.ban_channel_id

const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
const { QuickDB } = require("quick.db")


module.exports = {
    name: "blacklist",


    execute: async (message, args, client) => {

        if (black_list != true) { return message.channel.send("command id off") }

        if (args[0] == "help") {
            return message.reply(`
            daje możliwość dodania ludzi na blackliste
            uniemożliwia ona wysyłanie reportów
            usage: $blacklist ban <user_id> 
            usage: $blacklist unban <user_id> `)
        }

        if(message.channel.id != ban_channel_id){
            return message.reply("u cant do it here")
        }

        if (args[0] != "ban" && args[0] != "unban") {
            return message.reply("podaj działanie (ban/unban")
        }

        if (args[1] == null || isNaN(args[1])) {
            return message.reply("nieprawidłowy user id")
        }
        if (args[0] == "ban") {
            const userId = args[1]
            const db = new QuickDB({ filePath: process.cwd() + `/db/blacklist/blacklist.sqlite` });
            await db.set(`${userId}`, { check: true })
            return message.reply(`user ${userId} banned`)
            //await db.get(`${userId}.check`)
        }
        if (args[0] == "unban") {
            const userId = args[1]
            const db = new QuickDB({ filePath: process.cwd() + `/db/blacklist/blacklist.sqlite` });
            await db.set(`${userId}`, { check: false })
            return message.reply(`user ${userId} unbanned`)
            //await db.get(`${userId}.check`)
        }
    }

}
