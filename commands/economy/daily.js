const { QuickDB } = require("quick.db");
const check_db = require("./economy_handler")
const config = require("../../config/config")
const emoji = config.economy_emoji
module.exports = {
    name: "daily",

    execute: async (message, args) => {//dziennie od 50 do 100 monet
        const guildId = message.guild.id
        const userId = message.author.id
        const db = new QuickDB({ filePath: process.cwd() +`/db/economy/local_economy/${guildId}.sqlite` }); 
     
        
        if(await db.get(userId) == null){
            check_db(message)
            await new Promise(r => setTimeout(r, 2000))
            return message.reply("Twój profil właśnie został stworzony")
        }
        var current = new Date();
        const now_rok = current.getFullYear();
        const now_month = current.getMonth()+1;
        const now_day = current.getDay();
        

        // await db.set(`${userId}`,{coins: [1000],daily_coins: [rok,month,day],daily_usage: [użycia],eqipment: []   })



        const rng = Math.floor(Math.random() * 50) + 50 //od 50 do 100 monet
        const coins2 = await db.get(`${userId}.coins[0]`);
        const coins = parseInt(coins2)
        const cash2 = rng + coins
        const cash = parseInt(cash2)

        async function coins_add(){
            if(await db.get(`${userId}.eq[0]`) == null){

            await db.set(`${userId}.coins[0]`, cash)
            message.reply(`Odebrałeś ${rng} ${emoji}
            masz łącznie ${coins + rng} ${emoji}`)

            }else{//posiada vipa == daj 2x monet
                const vip_cash = rng * 2 + coins
                await db.set(`${userId}.coins[0]`, vip_cash)

                message.reply(`Odebrałeś ${rng * 2} ${emoji}
                masz łącznie ${vip_cash} ${emoji}`)
            }
        }



        if(await db.get(`${userId}.daily_coins[0]`) < now_rok){
          
            await db.set(`${userId}.daily_coins[0]`, now_rok)
            coins_add() 

        }else if(await db.get(`${userId}.daily_coins[1]`) < now_month){
           
            await db.set(`${userId}.daily_coins[1]`, now_month)
            coins_add()  

        }else if(await db.get(`${userId}.daily_coins[2]`) < now_day){

            await db.set(`${userId}.daily_coins[2]`, now_day)
            coins_add() 
        }else{
            message.reply("Odebrałeś już dzisiejszą nagrode. Spróbuj ponownie jutro")
        }



    }

}