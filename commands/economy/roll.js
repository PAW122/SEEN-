const { QuickDB } = require("quick.db");
const check_db = require("./economy_handler")
const config = require("../../config/eco_config")
const emoji = config.economy_emoji

const seenprefilhandler = require("./seenprofil_handler")
module.exports = {
    name: "roll",

    execute: async (message, args) => {//dziennie od 50 do 100 monet

        //load server settings
        const guildId = message.guild.id
        const db2 = new QuickDB({ filePath: process.cwd() + `/db/srv_settings/commands/${guildId}.sqlite` });
        if (await db2.get(`check.check`) == true) {
            const settings = await db2.get(`economy_command.worker`)
            const settings_reason = await db2.get(`economy_command.reason`)
            if (settings == false) { return message.channel.send(settings_reason) }
        }


        const db = new QuickDB({ filePath: process.cwd() + `/db/economy/local_economy/${guildId}.sqlite` });
        var current = new Date();
        const now_rok = current.getFullYear();
        const now_month = current.getMonth() + 1;
        const now_day = current.getDate();
        const userId = message.author.id

        if (await db.get(userId) == null) {
            check_db(message)
            await new Promise(r => setTimeout(r, 2000))
            return message.reply("Your profile has been created")
        }

        const coins = await db.get(`${userId}.coins[0]`);
        // await db.set(`${userId}`,{coins: [1000],daily_coins: [rok,month,day],daily_usage: [użycia],eqipment: []   })

        if (!args[0]) {
            return message.reply(`You need to enter the amount of ${emoji} that you want to bet`)
        }
        if ((isNaN(args[0]))) {
            return message.reply("the given value must be a number")
        }
        if (coins < args[0]) {
            return message.reply(`You don't have enough ${emoji}`)
        }
        const obstawione_monet = args[0]

        const rng = Math.floor(Math.random() * 3) // 33% szans na wygranie
        //wygrywasz gdy rng == 1

        //losowanie dla osoby z luckypotion
        const rng2 = Math.floor(Math.random() * 1) + 1 // 50% szans na wygraną

        const luckypotion = await db.get(`${userId}.eq[0]`);

        const roll_info = await db.get(`${userId}.roll_usage[0]`)
 
        async function losowanie(rng, coins, obstawione_monet) {
            if (luckypotion != true) {
                if (rng != 1) {
                    const suma = coins - obstawione_monet
                    message.reply(`You lost ${obstawione_monet} ${emoji}\nyou currently have: ${suma} ${emoji}\n you use ${roll_info}/15 rols today`)
                    await db.set(`${userId}.coins[0]`, suma)
                    seenprefilhandler(message, obstawione_monet)
                } else {
                    const suma = (obstawione_monet * 2) + coins
                    message.reply(`You won ${obstawione_monet * 2} ${emoji} \n you use ${roll_info}/15 rols today\nyou currently have: ${suma} ${emoji}`)
                    await db.set(`${userId}.coins[0]`, suma)
                }
            } else {
                //urzytkownik posiada luckypotiona
                if (rng2 != 1) {

                    const suma = coins - obstawione_monet
                    message.reply(`You lost ${obstawione_monet} ${emoji} \n you use ${roll_info}/15 rols today\nyou currently have: ${suma} ${emoji}`)
                    seenprefilhandler(message, obstawione_monet)
                    await db.set(`${userId}.coins[0]`, suma)
                } else {
                    const suma = (obstawione_monet * 2) + coins
                    message.reply(`You won ${obstawione_monet * 2} ${emoji} \n you use ${roll_info}/15 rols today\nyou currently have: ${suma} ${emoji}`)
                    await db.set(`${userId}.coins[0]`, suma)
                }
            }
        }


        if (await db.get(`${userId}.roll_date[0]`) < now_rok) {
            await db.set(`${userId}.roll_date[0]`, now_rok)
            await db.set(`${userId}.roll_usage[0]`, 0)
        }

        if (await db.get(`${userId}.roll_date[1]`) < now_month) {
            await db.set(`${userId}.roll_date[1]`, now_month)
            await db.set(`${userId}.roll_usage[0]`, 0)
        }

        if (await db.get(`${userId}.roll_date[2]`) < now_day) {
            await db.set(`${userId}.roll_date[2]`, now_day)
            await db.set(`${userId}.roll_usage[0]`, 0)
        }

        if (await db.get(`${userId}.roll_usage[0]`) <= 15) {
            losowanie(rng, coins, obstawione_monet)
            const zagrania = await db.get(`${userId}.roll_usage[0]`)
            const set_zagrania = zagrania + 1
            await db.set(`${userId}.roll_usage[0]`, set_zagrania)

        } else {
            return message.reply("roll możesz użyć maksymalnie 15 razy dziennie")
        }
    }
}