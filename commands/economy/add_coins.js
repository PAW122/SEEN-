const { QuickDB } = require("quick.db");
const check_db = require("./economy_handler")
const config = require("../../config/eco_config")
const emoji = config.economy_emoji
const { Permissions: { FLAGS } } = require('discord.js');
const Discord = require('discord.js');
module.exports = {
    name: "add",

    execute: async (message, args, client) => {
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


        if (!args[0]) {
            return message.reply(`You didn't enter a number ${emoji} which I should add to the user
            use: $helpeco to learn how to use commands`)
        }
        const user = message.mentions.users.first()
        if(!user) return message.reply("tag user")
        if ((isNaN(args[0]))) {
            return message.reply(`You entered wrong amount ${emoji}`)
        }

        if (!message.member.permissions.has("ADMINISTRATOR")) {
            return message.channel.send("You don't have admin authorization")
        }
        if (await db.get(user.id) == null) {
            return message.reply(`a person with this id is not participating in the game`)
        } else {
            const coins = await db.get(`${user.id}.coins[0]`);
            const add = parseInt(args[0])//zamienia string na liczbe
            const add2 = parseInt(coins)
            const to_add = add + add2
            await db.set(`${user.id}.coins[0]`, to_add)
            await db.set(`added_coins`, true)
            return message.reply(`Successfully added to user ${user} ${args[0]} ${emoji}`)
        }

    }

}