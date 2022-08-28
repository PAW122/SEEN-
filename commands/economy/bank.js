const { QuickDB } = require("quick.db");
const Discord = require("discord.js")

module.exports = {
    name: "bank",

    execute: async (message, args, client) => {

        const guildId = message.guild.id
        const userId = message.author.id

    const localdb = new QuickDB({ filePath: process.cwd() + `/db/economy/local_economy/${guildId}local.sqlite` });
    const globaldb = new QuickDB({ filePath: process.cwd() + `/db/economy/local_economy/${guildId}global.sqlite` });
    const userdb = new QuickDB({ filePath: process.cwd() + `/db/economy/local_economy/${guildId}.sqlite` });


        const user_lost_coins = await userdb.get(`${userId}.roll_lost`)
        const server_lost_coins = await localdb.get(`coins`)
        const global_lost_coins = await globaldb.get(`roll_lost`)

        const embed = new Discord.MessageEmbed()

            .setColor(`BLUE`)//EN
            .setTitle(`Bank Status`)
            .setDescription("How many coins been losed using rool command?")
            .setFields(
                {name: "You", value: `${user_lost_coins}`},
                {name: "Server", value: `${server_lost_coins}`},
                {name: "All servers (Global)", value: `${global_lost_coins}`}
            )
        message.channel.send({ embeds: [embed] })//.then(msg => {msg.delete(5000)})

    }
}