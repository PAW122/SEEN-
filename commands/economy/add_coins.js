const { QuickDB } = require("quick.db");
const check_db = require("./economy_handler")
const config = require("../../config/config")
const emoji = config.economy_emoji
const { Permissions: { FLAGS } } = require('discord.js');
const Discord = require('discord.js');
const srv_settings = require("../../handlers/check_srv_settings")
module.exports = {
    name: "add",

    execute: async (message, args, client) => {
        //load server settings economy_command
        const guildId = message.guild.id
        const command_name = "economy_command"
        srv_settings(command_name,guildId)
        
        

        const db = new QuickDB({ filePath: process.cwd() +`/db/economy/local_economy/${guildId}.sqlite` }); 
        const userId = message.author.id
        

        if(!args[0]){
            return message.reply(`nie podałeś liczby ${emoji} które mam dodać urzytkownikowi
            użyj: $helpeco aby dowiedzieć się jak używać koend`)
        }
        if(!args[1]){
            return message.reply(`nie podałeś id urztkownika
            użyj: $helpeco aby dowiedzieć się jak używać koend`)
        }
        if ((isNaN(args[0])) ){
            return message.reply(`podałeś błędną ilość ${emoji}`)
        }
        if ((isNaN(args[1])) ){
            return message.reply(`podałeś błędne id`)
        }

        if (!message.member.permissions.has("ADMINISTRATOR")) {
            return message.channel.send("nie masz uprawnień Administratora")
        }
        if(await db.get(args[1]) == null){
            return message.reply(`osoba o takim id nie bierze udziału w grze`)
        }else{
            const coins = await db.get(`${args[1]}.coins[0]`);
            const add = parseInt(args[0])//zamienia string na liczbe
            const add2 = parseInt(coins)
            const to_add = add + add2
            await db.set(`${args[1]}.coins[0]`, to_add)
            return message.reply(`Pomyślnie dodano urzytkownikowi <@${args[1]}> ${args[0]} ${emoji}`)
        }

    }

}