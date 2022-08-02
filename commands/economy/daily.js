const { QuickDB } = require("quick.db");
const db = new QuickDB({ filePath: process.cwd() +"/db/economy/economy.sqlite" }); 
module.exports = {
    name: "daily",

    execute: async (message, args) => {//dziennie od 50 do 100 monet
        var current = new Date();
        const rok = current.getFullYear();
        const month = current.getMonth();
        const day = current.getDay();
        const userId = message.author.id
        
        if(await db.get(`${userId}.daily_year`) == null){
            await db.add(userId, { daily_year: rok }) 
            await db.add(userId, { daily_month: month })
            await db.add(userId, { daily_day: day })
            return message.reply("Daily będzie dla ciebie dostępne od godziny 00:00")
        }else if(await db.get(`${userId}.daily_month`) == null){
            await db.add(userId, { daily_year: rok }) 
            await db.add(userId, { daily_month: month })
            await db.add(userId, { daily_day: day })
            return message.reply("Daily będzie dla ciebie dostępne od godziny 00:00")
        }else if(await db.get(`${userId}.daily_day`) == null){
            await db.add(userId, { daily_year: rok }) 
            await db.add(userId, { daily_month: month })
            await db.add(userId, { daily_day: day })
            return message.reply("Daily będzie dla ciebie dostępne od godziny 00:00")
        }

        async function daily(message) {
            const coins = Math.floor(Math.random() * 50) + 50
            const monety = await db.get(`${userId}.coins`);
            message.reply(`Twoja dzisiajasz nagroda to: ${coins} monet
            Obecnie posiadasz łącznie **${monety}** monet`)
            //ustawia użycie na dzisiejszą date
            await db.add(userId, { daily_year: rok }) 
            await db.add(userId, { daily_month: month })
            await db.add(userId, { daily_day: day })
            const do_dodania = monety + coins
            await db.add(userId, { coins: do_dodania });
          }

        if(await db.get(`${userId}.daily_year`) < rok){//jeżeli rok jest miejszy pozwól użyć daily
            return daily(message)
        }else if(await db.get(`${userId}.daily_month`) < month){//jeżeli mieś jest miejszy pozwól użyć daily
            return daily(message)
        }else if(await db.get(`${userId}.daily_day`) < day){//jeżeli dnień jest miejszy pozwól użyć daily
            return daily(message)
        }else{
            message.reply("Daily można użyć maksymalnie raz dziennie")
        }


    }

}