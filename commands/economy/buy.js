const config = require("../../config/eco_config")
const emoji = config.economy_emoji
const vip_price = config.vip_price
const luckypotion_price = config.luckypotion_price
const { QuickDB } = require("quick.db");
module.exports = {
    name: "buy",

    execute: async (message, args) => {
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

        const coins2 = await db.get(`${userId}.coins[0]`);
        const coins = parseInt(coins2)
        if (!args[0]) {
            return message.reply("you need to enter the name of the item. You can check the list of items using $shop")
        }
        //dla następnych przedmiotów dodać || <nazwa przedmiotu>
        if (args[0] != "vip" && args[0] != "luckypotion") {
            return message.reply("That item does not exist")
        }

        if (args[0] == "vip") {
            if (!coins >= vip_price) {
                return message.reply(`You don't have enough ${emoji} to buy this item`)
            } else {
                if (await db.get(`${userId}.eq[0]`) != null) {
                    return message.reply("You are already in possesion of this item: vip")
                }
                const reszta = coins - vip_price
                await db.set(`${userId}.coins[0]`, reszta)
                await db.set(`${userId}.eq[0]`, "vip")
                return message.reply("Congratulations you just bought: vip")
            }
        }

        if (args[0] == "luckypotion") {
            if (!coins >= luckypotion_price) {
                return message.reply(`You don't have enough ${emoji} to buy this item`)
            } else {
                if (await db.get(`${userId}.eq[1]`) != null) {
                    return message.reply("You are already in possesion of this item: luckypotion")
                }
                const reszta = coins - luckypotion_price
                await db.set(`${userId}.coins[0]`, reszta)
                await db.set(`${userId}.eq[1]`, "luckypotion")
                return message.reply("Congratulations you just bought: luckypotion")
            }
        }
    }
}