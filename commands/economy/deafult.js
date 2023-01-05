//nazwa $ecodeafult
const { QuickDB } = require("quick.db");
const Discord = require("discord.js")
const help_embed = new Discord.MessageEmbed()

    .setColor(`RANDOM`)
    .setTitle(`ecodeafult`)
    .setFields(
        {name: "$ecodeafult", value: `restert your economy to deafult settings and clear all users data.\n the command is mainly used to reset the economy in order to access the latest features\n only ADMINISTRATOR can use this command`}
    )

module.exports = {
    name: "ecodeafult",
    help: help_embed,

    execute: async (message, args) => {
        const guildId = message.guild.id
        const db = new QuickDB({ filePath: process.cwd() + `/db/economy/local_economy/${guildId}.sqlite` });

        if (!message.member.permissions.has("ADMINISTRATOR")) {
            return message.channel.send("you don't have admin authorization")
        }

        
        await db.deleteAll()
        return message.reply("The economy has been updated")
    }
}

