const Discord = require('discord.js');
const dane = "./anime.json"
const {senko_odc_1} = require(dane)
const {senko_odc_2} = require(dane)
const {senko_odc_3} = require(dane)
const {senko_odc_4} = require(dane)
const {senko_odc_5} = require(dane)
const {senko_odc_6} = require(dane)
const {senko_odc_7} = require(dane)
const {senko_odc_8} = require(dane)
const {senko_odc_9} = require(dane)
const {senko_odc_10} = require(dane)
const {senko_odc_11} = require(dane)
const {senko_odc_12} = require(dane)

module.exports = {
    name: "senko_odc",//dodac do helpów
    description: "wysyła grafike senko",
    usage: "$senko",

    execute: async(message, args) =>  {
        
        console.log(senko_odc_1)
        
        if(args[0] == "help"){
            return message.reply("$senko_odc <nr odc>\n przykład: $senko_odc 1")
        }

        if(args[0] == "1"){
            return message.reply(senko_odc_1)
        }
        if(args[0] == "2"){
            return message.reply(senko_odc_2)
        }
        if(args[0] == "3"){
            return message.reply(senko_odc_3)
        }
        if(args[0] == "4"){
            return message.reply(senko_odc_4)
        }
        if(args[0] == "5"){
            return message.reply(senko_odc_5)
        }
        if(args[0] == "6"){
            return message.reply(senko_odc_6)
        }
        if(args[0] == "7"){
            return message.reply(senko_odc_7)
        }
        if(args[0] == "8"){
            return message.reply(senko_odc_8)
        }
        if(args[0] == "9"){
            return message.reply(senko_odc_9)
        }
        if(args[0] == "10"){
            return message.reply(senko_odc_10)
        }
        if(args[0] == "11"){
            return message.reply(senko_odc_11)
        }
        if(args[0] == "12"){
            return message.reply(senko_odc_12)
        }
        
    }
}