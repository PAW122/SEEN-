//config economy db update

const { QuickDB } = require("quick.db");
const Discord = require("discord.js")

const help_embed = new Discord.MessageEmbed()

    .setColor(`RANDOM`)
    .setTitle(`birthday`)
    .setFields(
        {name: "set your birthday date to get extra coins", value: "-"},
        {name: "usage", value: "$birthday <month> <day> <year>"},
        {name: "example", value: "$birthday 2 16 2000"},
        {name: "Warring", value: "u can change your birthday date only 1 time"}
    )
module.exports = {
    name: "birthday",
    help: help_embed,

    execute: async (message, args) => {

        const guildId = message.guild.id
        const db = new QuickDB({ filePath: process.cwd() + `/db/economy/local_economy/${guildId}.sqlite` });

        var current = new Date();
        const rok = current.getFullYear();

        const userId = message.author.id

        if(args[0] == "help"){
            return message.reply(`set your birthday date to get extra coins
            usage: $birthday <month> <day> <year>
            !!u can change your birthday date only 1 time
            
            if you use $daily on your birthday you will get a reward`)
        }
        if(!args[0] || !args[1] || !args[2]){
            return message.reply("its not correct date")
        }
        if(isNaN(args[0]) || isNaN(args[1] || isNaN(args[2]))){
            return message.reply("date need by number")
        }

        const month = args[0]
        const day =  args[1]
        const year = args[2]

        const zmiany = await db.get(`${userId}.birthday_changes`)

        if(zmiany == 0){
            return message.reply("u can't change your birthday date\n user can change birthday date only 1 time")
        }else{
            zmiany - 1
        }

        await db.set(`${userId}.birthday[0]`, month)
        await db.set(`${userId}.birthday[1]`, day)
        await db.set(`${userId}.birthday[2]`, rok)
        await db.set(`${userId}.bitrhday_used_year`, rok)
        await db.set(`${userId}.birthday_changes`, zmiany)

        message.reply("set")
    }
}