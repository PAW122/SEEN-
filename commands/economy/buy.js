const config = require("../../config/config")
const emoji = config.economy_emoji
const { QuickDB } = require("quick.db");
const srv_settings = require("../../../handlers/check_srv_settings")
module.exports = {
    name: "buy",

    execute: async (message, args) => {
        //load server settings
        const guildId = message.guild.id
        const command_name = "economy_command"
        srv_settings(command_name,guildId)

        const userId = message.author.id
        const db = new QuickDB({ filePath: process.cwd() + `/db/economy/local_economy/${guildId}.sqlite` });

        if(await db.get(userId) == null){
            check_db(message)
            await new Promise(r => setTimeout(r, 2000))
            return message.reply("Twój profil właśnie został stworzony")
        }

        const coins2 = await db.get(`${userId}.coins[0]`);
        const coins = parseInt(coins2)
        if (!args[0]) {
            return message.reply("musisz podać nazwe przedmiotu. L:istę przedmiotów morzesz sprawdzić używając $shop")
        }
        //dla następnych przedmiotów dodać || <nazwa przedmiotu>
        if (args[0] != "vip") {
            return message.reply("taki przedmiot nie istnieje")
        }

        if (args[0] == "vip") {
            if (!coins >= 25000) {
                return message.reply(`nie masz wystarczająco ${emoji} aby kupić ten przedmiot`)
            } else {
                if (await db.get(`${userId}.eq[0]`) != null) {
                    return message.reply("posiadasz już przedmot: vip")
                }
                const reszta = coins - 25000
                await db.set(`${userId}.coins[0]`, reszta)
                await db.set(`${userId}.eq[0]`, "vip")
                return message.reply("Gratulacje zakupiłeś: vip")
            }
        }
    }
}