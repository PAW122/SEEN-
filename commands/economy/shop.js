const config = require("../../config/eco_config")
const emoji = config.economy_emoji
const vip_price = config.vip_price
const luckypotion_price = config.luckypotion_price
const { QuickDB } = require("quick.db");
const Discord = require("discord.js")

const help_embed = new Discord.MessageEmbed()

    .setColor(`RANDOM`)
    .setTitle(`shop`)
    .setFields(
        {name: "$shop", value: "show items to buy in shop"},
        
    )
module.exports = {
    name: "shop",
    help: help_embed,

    execute: async (message, args) => {
        //load server settings
        const guildId = message.guild.id
        const db2 = new QuickDB({ filePath: process.cwd() + `/db/srv_settings/commands/${guildId}.sqlite` });
        if (await db2.get(`check.check`) == true) {
            const settings = await db2.get(`economy_command.worker`)
            const settings_reason = await db2.get(`economy_command.reason`)
            if (settings == false) { return message.channel.send(settings_reason) }
        }


        const embed_pl = new Discord.MessageEmbed()
            .setColor(`BLUE`)
            .setTitle(`Shop`)
            .setDescription("To buy any item, type: $buy <item_name>")
            .addFields(
                { name: `1: VIP`, value: `Dubles the daily reward\n price: ${vip_price} ${emoji}`, inline: false },
                { name: `2: LuckyPotion`, value: `Boosted lucky (chanses on win in rool)\n price: ${luckypotion_price} ${emoji}`, inline: false },

            )
        message.channel.send({ embeds: [embed_pl] })
    }
}