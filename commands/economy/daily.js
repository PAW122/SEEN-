const { QuickDB } = require("quick.db");
const check_db = require("./economy_handler")
const config = require("../../config/eco_config")
const emoji = config.economy_emoji
const birthday_coins = config.birthday_coins
module.exports = {
    name: "daily",

    execute: async (message, args) => {//dziennie od 50 do 100 monet
        //load server settings
        const guildId = message.guild.id
        const db2 = new QuickDB({ filePath: process.cwd() + `/db/srv_settings/commands/${guildId}.sqlite` });
        if (await db2.get(`check.check`) == true) {
            const settings = await db2.get(`economy_command.worker`)
            const settings_reason = await db2.get(`economy_command.reason`)
            if (settings == false) { return message.channel.send(settings_reason) }
        }

        const userId = message.author.id
        const db = new QuickDB({ filePath: process.cwd() + `/db/economy/local_economy/${guildId}.sqlite` });


        if (await db.get(userId) == null) {
            check_db(message)
            await new Promise(r => setTimeout(r, 2000))
            return message.reply("Your profile has been created")
        }
        var current = new Date();
        const now_rok = current.getFullYear();
        const now_month = current.getMonth() + 1;
        const now_day = current.getDate();


        // await db.set(`${userId}`,{coins: [1000],daily_coins: [rok,month,day],daily_usage: [użycia],eqipment: []   })



        const rng = Math.floor(Math.random() * 50) + 50 //od 50 do 100 monet
        const coins2 = await db.get(`${userId}.coins[0]`);
        const coins = parseInt(coins2)
        const cash2 = rng + coins
        const cash = parseInt(cash2)

        async function weekly_counter() {
            const wekly = await db.get(`${userId}.get_weekly[0]`)
            const daily = 7 - wekly
            if (wekly >= 7) {
                await db.set(`${userId}.get_weekly[0]`, 0)
                await db.set(`${userId}.weekly[0]`, true)
                await new Promise(r => setTimeout(r, 2000));
            }
            if (await db.get(`${userId}.weekly[0]`) == true) {
                return message.reply("You can receive weekly reward\n use $weekly to claim your reward")
            } else {
                return message.reply(`You still need to use ${daily} to receive your weekly reward`)
            }
        }

        async function check_birthday() {
            const month = await db.get(`${userId}.birthday[0]`)
            const day = await db.get(`${userId}.birthday[1]`)
            const rok = await db.get(`${userId}.birthday[2]`)

            if (rok > now_rok && day == now_day && month == now_month) {
                const user_coins = await db.get(`${userId}.coins[0]`);
                const give = user_coins + birthday_coins
                message.reply(`Happy birthday. This is a birthday present: ${birthday_coins} ${emoji}
                you have connection ${give} ${emoji}`)

                await db.set(`${userId}.birthday[2]`, now_rok + 1)

            }
        }

        async function coins_add() {
            if (await db.get(`${userId}.eq[0]`) == null) {

                await db.set(`${userId}.coins[0]`, cash)
                message.reply(`You got ${rng} ${emoji}
                you have a total of ${coins + rng} ${emoji}`)

            } else {//posiada vipa == daj 2x monet
                const vip_cash = rng * 2 + coins
                await db.set(`${userId}.coins[0]`, vip_cash)

                message.reply(`You got ${rng * 2} ${emoji}
                you have a total of ${vip_cash} ${emoji}`)
            }
        }



        if (await db.get(`${userId}.daily_coins[0]`) < now_rok) {

            coins_add()
            weekly_counter()
            check_birthday()
            await db.set(`${userId}.daily_coins[0]`, now_rok)

        } else if (await db.get(`${userId}.daily_coins[1]`) < now_month) {

            coins_add()
            weekly_counter()
            check_birthday()
            await db.set(`${userId}.daily_coins[1]`, now_month)

        } else if (await db.get(`${userId}.daily_coins[2]`) < now_day) {

            coins_add()
            weekly_counter()
            check_birthday()
            await db.set(`${userId}.daily_coins[2]`, now_day)
        } else {
            message.reply("Odebrałeś już dzisiejszą nagrode. Spróbuj ponownie jutro")
        }



    }

}