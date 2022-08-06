const Discord = require('discord.js');
const { QuickDB } = require("quick.db");
//ctrl F 
const dane = "./anime.json";
const {lucky_star_odc_1} = require(dane)
const {lucky_star_odc_2} = require(dane)
const {lucky_star_odc_3} = require(dane)
const {lucky_star_odc_4} = require(dane)
const {lucky_star_odc_5} = require(dane)
const {lucky_star_odc_6} = require(dane)
const {lucky_star_odc_7} = require(dane)
const {lucky_star_odc_8} = require(dane)
const {lucky_star_odc_9} = require(dane)
const {lucky_star_odc_10} = require(dane)
const {lucky_star_odc_11} = require(dane)
const {lucky_star_odc_12} = require(dane)

module.exports = {
    name: "lucky_star_odc",//dodac do helpów
    description: "wysyła grafike lucky_star",
    usage: "$lucky_star",

    execute: async(message, args) =>  {
         //load server settings
         const guildId = message.guild.id
         const db = new QuickDB({ filePath: process.cwd() + `/db/srv_settings/commands/${guildId}.sqlite` });
         if(await db.get(`check.check`) == true){
             const settings = await db.get(`eight_ball.worker`)
             const settings_reason = await db.get(`eight_ball.reason`)
             if(settings != true){return message.channel.send(settings_reason)}
         }
        
        console.log(lucky_star_odc_1)
        
        if(args[0] == "help"){
            return message.reply("$lucky_star_odc <nr odc>\n przykład: $lucky_star_odc 1")
        }

        if(args[0] == "1"){
            return message.reply(lucky_star_odc_1)
        }
        if(args[0] == "2"){
            return message.reply(lucky_star_odc_2)
        }
        if(args[0] == "3"){
            return message.reply(lucky_star_odc_3)
        }
        if(args[0] == "4"){
            return message.reply(lucky_star_odc_4)
        }
        if(args[0] == "5"){
            return message.reply(lucky_star_odc_5)
        }
        if(args[0] == "6"){
            return message.reply(lucky_star_odc_6)
        }
        if(args[0] == "7"){
            return message.reply(lucky_star_odc_7)
        }
        if(args[0] == "8"){
            return message.reply(lucky_star_odc_8)
        }
        if(args[0] == "9"){
            return message.reply(lucky_star_odc_9)
        }
        if(args[0] == "10"){
            return message.reply(lucky_star_odc_10)
        }
        if(args[0] == "11"){
            return message.reply(lucky_star_odc_11)
        }
        if(args[0] == "12"){
            return message.reply(lucky_star_odc_12)
        }
        
    }
}