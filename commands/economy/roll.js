const { QuickDB } = require("quick.db");
const check_db = require("./economy_handler")
const config = require("../../config/config")
const emoji = config.economy_emoji
const srv_settings = require("../../../handlers/check_srv_settings")
module.exports = {
    name: "roll",

    execute: async (message, args) => {//dziennie od 50 do 100 monet

        //load server settings
        const guildId = message.guild.id
        const command_name = "economy_command"
        srv_settings(command_name,guildId)


        const db = new QuickDB({ filePath: process.cwd() +`/db/economy/local_economy/${guildId}.sqlite` }); 
        var current = new Date();
        const now_rok = current.getFullYear();
        const now_month = current.getMonth()+1;
        const now_day = current.getDay();
        const userId = message.author.id

        if(await db.get(userId) == null){
            check_db(message)
            await new Promise(r => setTimeout(r, 2000))
            return message.reply("Twój profil właśnie został stworzony")
        }
        
        const coins = await db.get(`${userId}.coins[0]`);
        // await db.set(`${userId}`,{coins: [1000],daily_coins: [rok,month,day],daily_usage: [użycia],eqipment: []   })

        if(!args[0]){
            return message.reply(`musisz podać ilość ${emoji} które chcesz obstawić`)
        }
        if ((isNaN(args[0])) ){
            return message.reply("podana wartość musi być liczbą")
        }
        if(coins < args[0]){
            return message.reply(`masz za mało ${emoji}`)
        }
        const obstawione_monet = args[0]

        const rng = Math.floor(Math.random() * 3) // 30% szans na wygranie
        //wygrywasz gdy rng == 1
        
        async function losowanie(rng,coins,obstawione_monet){
        if(rng != 1){
            
            const suma = coins-obstawione_monet
            message.reply(`przegrałeś ${obstawione_monet} ${emoji}
            obecnie posiadasz: ${suma} ${emoji}`)
            await db.set(`${userId}.coins[0]`, suma)
        }else{
            const suma = (obstawione_monet*2) + coins
            message.reply(`wygrałeś ${obstawione_monet * 2} ${emoji}
            obecnie posiadasz: ${suma} ${emoji}`)
            await db.set(`${userId}.coins[0]`, suma)
        }
    }


    if(await db.get(`${userId}.roll_date[0]`) < now_rok){
        await db.set(`${userId}.roll_date[0]`, now_rok)
        await db.set(`${userId}.roll_usage[0]`, 0)
    }

    if(await db.get(`${userId}.roll_date[1]`) < now_month){
        await db.set(`${userId}.roll_date[1]`, now_month) 
        await db.set(`${userId}.roll_usage[0]`, 0)
    }

    if(await db.get(`${userId}.roll_date[2]`) < now_day){
        await db.set(`${userId}.roll_date[2]`, now_day) 
        await db.set(`${userId}.roll_usage[0]`, 0)
    }
    
    console.log(await db.get(`${userId}.roll_usage[0]`))
        if(await db.get(`${userId}.roll_usage[0]`) <= 15){
            losowanie(rng,coins,obstawione_monet)
            const zagrania = await db.get(`${userId}.roll_usage[0]`)
            const set_zagrania = zagrania + 1
            await db.set(`${userId}.roll_usage[0]`, set_zagrania)
            
        }else{
            return message.reply("roll możesz użyć maksymalnie 15 razy dziennie")
        }

        



    }

}