const { QuickDB } = require("quick.db");
const check_db = require("./economy_handler")
const config = require("../../config/eco_config")
const emoji = config.economy_emoji
module.exports = {
    name: "profil",

    execute: async (message, args, client) => {

        if (args[0] == "help") {
            return message.reply("use: **$profil** to get your profil informations\n use: **$profil @user** to get someone profil informations")
        }

        //load server settings
        const guildId = message.guild.id
        const db2 = new QuickDB({ filePath: process.cwd() + `/db/srv_settings/commands/${guildId}.sqlite` });
        if (await db2.get(`check.check`) == true) {
            const settings = await db2.get(`economy_command.worker`)
            const settings_reason = await db2.get(`economy_command.reason`)
            if (settings == false) { return message.channel.send(settings_reason) }
        }


        const db = new QuickDB({ filePath: process.cwd() + `/db/economy/local_economy/${guildId}.sqlite` });
        const target = message.mentions.users.first() || message.author;
        const userId = target.id
        const botId = client.user.id

        if (botId == userId) {
            return message.reply("I have everythink <3");
        }

        if (message.author.id != userId) {
            if (await db.get(userId) == null) {
                return message.reply(`<@${userId}> dont have profil in economy system`)
            }
        }

        if (await db.get(userId) == null) {
            check_db(message)
            await new Promise(r => setTimeout(r, 2000))
            return message.reply("Your profile has been created")
        }
        const coins = await db.get(`${userId}.coins`);

        //przedmiot vip
        if (await db.get(`${userId}.eq[0]`) == "vip") {
            var eq1 = "vip"
        } else {
            var eq1 = ""
        }


        if (await db.get(`${userId}.eq[1]`) == "luckypotion") {
            var eq2 = "luckypotion"
        } else {
            var eq2 = ""
        }

        var eq = `Items: ${eq1}, ${eq2}`

        //ostatnie odebranie daily coinsów:
        const rok = await db.get(`${userId}.daily_coins[0]`)
        const month = await db.get(`${userId}.daily_coins[1]`)
        const day = await db.get(`${userId}.daily_coins[2]`)


        message.reply(`\nposziadasz: ${coins} ${emoji}
        \nostatnie urzycie daily: ${day}.${month}.${rok}
        \n${eq}`)
    }

}