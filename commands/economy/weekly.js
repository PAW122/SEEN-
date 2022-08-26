const { QuickDB } = require("quick.db");
const check_db = require("./economy_handler")
const config = require("../../config/config")
const emoji = config.economy_emoji
const weekly_coins = config.weekly_coins
module.exports = {
    name: "weekly",

    execute: async (message, args) => {
        //odbierasz bonus i na następny czakasz aż 7 razy
        //odbierzesz daily

        //!! uwzględnić vipa (x1.5)

        //load server settings
        const guildId = message.guild.id
        const db2 = new QuickDB({ filePath: process.cwd() + `/db/srv_settings/commands/${guildId}.sqlite` });
        if(await db2.get(`check.check`) == true){
            const settings = await db2.get(`economy_command.worker`)
            const settings_reason = await db2.get(`economy_command.reason`)
            if(settings != true){return message.channel.send(settings_reason)}
        }

        if(args[0] == "help"){
            `claim weekly reward
            vip multiplies the amount of coins by x1.5`
        }
        
        const userId = message.author.id
        const db = new QuickDB({ filePath: process.cwd() +`/db/economy/local_economy/${guildId}.sqlite` }); 
     
        
        if(await db.get(userId) == null){
            check_db(message)
            await new Promise(r => setTimeout(r, 2000))
            return message.reply("Your profile has been created")
        }
       

        async function coins_add(){
            if(await db.get(`${userId}.eq[0]`) == null){

           const user_coins = await db.get(`${userId}.coins[0]`)
           const coins_to_add = user_coins + weekly_coins
           await db.set(`${userId}.coins[0]`, coins_to_add)

           await db.set(`${userId}.get_weekly[0]`, 0)
           await db.set(`${userId}.weekly[0]`, false)

           return message.reply(`You recived 500 ${emoji}
            You have a total of ${coins_to_add} ${emoji}`)

            }else{//posiada vipa == daj 1.5x monet
                const vip_cash = weekly_coins * 1.5
                const user_coins = await db.get(`${userId}.coins[0]`)
                const coins_to_add = user_coins + vip_cash

                await db.set(`${userId}.coins[0]`, coins_to_add)

                await db.set(`${userId}.get_weekly[0]`, 0)
           await db.set(`${userId}.weekly[0]`, false)

                return message.reply(`You received ${vip_cash} ${emoji}
                masz łącznie ${coins_to_add} ${emoji}`)
            }
        }


       if(await db.get(`${userId}.weekly[0]`) != true){
        const pozostało = await db.get(`${userId}.get_weekly[0]`)
        return message.reply(`you can't receive your Weekly Reward yet
        time remaining ${7 - pozostało} days`)
       }else{
        coins_add()
       }



    }

}