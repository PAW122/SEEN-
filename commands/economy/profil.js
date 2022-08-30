const { QuickDB } = require("quick.db");
const check_db = require("./economy_handler")
const config = require("../../config/eco_config")
const emoji = config.economy_emoji
module.exports = {
    name: "profil",

    execute: async (message, args) => {
        //load server settings
        const guildId = message.guild.id
        const db2 = new QuickDB({ filePath: process.cwd() + `/db/srv_settings/commands/${guildId}.sqlite` });
        if (await db2.get(`check.check`) == true) {
            const settings = await db2.get(`economy_command.worker`)
            const settings_reason = await db2.get(`economy_command.reason`)
            if (settings == false) { return message.channel.send(settings_reason) }
        }


        const db = new QuickDB({ filePath: process.cwd() + `/db/economy/local_economy/${guildId}.sqlite` });
        const userId = message.author.id

        if (await db.get(userId) == null) {
            check_db(message)
            await new Promise(r => setTimeout(r, 2000))
            return message.reply("Your profile has been created")
        }
        const coins = await db.get(`${userId}.coins`);

        var eq_check1 = false
        var eq_check2 = false

        //przedmiot vip
        if (await db.get(`${userId}.eq[0]`) == "vip") {
            var eq1 = "vip"
        }else{
            var eq1 = ""
        }


        if (await db.get(`${userId}.eq[1]`) == "luckypotion") {
            var eq2 = "luckypotion"
        }else{
            var eq2 = ""
        }

        var eq = `Items: ${eq1}, ${eq2}`


        message.reply(`masz ${coins} ${emoji}
        \n${eq}`)
    }

}