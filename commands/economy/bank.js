const { QuickDB } = require("quick.db");
const Discord = require("discord.js")

const help_embed = new Discord.MessageEmbed()

    .setColor(`RANDOM`)
    .setTitle(`bank`)
    .setFields(
        {name: "$bank", value: "show how many coins user lost"},
        {name: "$bank deafult", value: "restart bank"},
        {name: "$bank mydeafult", value: "set your losed coins to 0"},
        {name: "$bank status?", value: "displays information whether the user has had coins added by the administrator using the command"}
    )


module.exports = {
    name: "bank",
    help: help_embed,

    execute: async (message, args, client) => {

        if(args[0] == "help"){
            return message.reply("$bank -- users lost coins\n $bank deafult -- reset data \n $bank mydeafult -- set your losed coins to 0")
        }

        if(args[0] == "deafult"){
            const guildId = message.guild.id
            const userId = message.author.id

            //sprawdż uprawnienia admina
            if (!message.member.permissions.has("ADMINISTRATOR")) {
                return message.reply("You don't have admin authorization")
            }

            //user ma admina
            const localdb = new QuickDB({ filePath: process.cwd() + `/db/economy/local_economy/${guildId}local.sqlite` });
            const globaldb = new QuickDB({ filePath: process.cwd() + `/db/economy/local_economy/${guildId}global.sqlite` });
            const userdb = new QuickDB({ filePath: process.cwd() + `/db/economy/local_economy/${guildId}.sqlite` });
        
            //od globala odejmij coinsy które były na serweże
            const server_coins = await localdb.get(`coins`)
            const global_coins = await globaldb.get(`roll_lost`)

            const global_coins_set = parseInt(global_coins) - parseInt(server_coins)
            await globaldb.set(`roll_lost`, global_coins_set)

            //usuń wszystko
            await localdb.deleteAll()
            await userdb.set(`${userId}.roll_lost`, 0)

            return message.reply("Set data to deafult")
        }

        if(args[0] == "mydeafult"){
            if (!message.member.permissions.has("ADMINISTRATOR")) {
                return message.reply("You don't have admin authorization")
            }
            await userdb.set(`${userId}.roll_lost`, 0)
            return message.reply("Your loset coins is set on 0")
        }

        if(args[0] == "status"){
            return message.reply("you meant **status?**")
        }

        if(args[0] == "status?") {
            const embed = new Discord.MessageEmbed()
        .setColor(`RED`)
        .setTitle(`Status informations`)
        .setDescription(`Status -- displays information whether the user has had coins added by the administrator using the command
        false == user had coins added
        true == user dont have coins added
        if user had added coins his coins do not count towards the global bank`)
       return message.channel.send({ embeds: [embed] });
        }

        const guildId = message.guild.id
        const userId = message.author.id

        const localdb = new QuickDB({ filePath: process.cwd() + `/db/economy/local_economy/${guildId}local.sqlite` });
        const globaldb = new QuickDB({ filePath: process.cwd() + `/db/economy/local_economy/${guildId}global.sqlite` });
        const userdb = new QuickDB({ filePath: process.cwd() + `/db/economy/local_economy/${guildId}.sqlite` });


        const user_lost_coins = await userdb.get(`${userId}.roll_lost`)
        const server_lost_coins = await localdb.get(`coins`)
        const global_lost_coins = await globaldb.get(`roll_lost`)
        const acc_status = await localdb.get(`check`)

        const embed = new Discord.MessageEmbed()

            .setColor(`BLUE`)//EN
            .setTitle(`Bank Status`)
            .setDescription("How many coins been losed using rool command?\n what is acc status?: use **$bank status?** to get informations")
            .setFields(
                { name: "Your losed coins", value: `${user_lost_coins}` },
                { name: "Server losed coins", value: `${server_lost_coins}` },
                { name: "All servers (Global) losed coins", value: `${global_lost_coins}` },
                { name: "acc Status", value: `${acc_status}` },
                )
        message.channel.send({ embeds: [embed] })//.then(msg => {msg.delete(5000)})

    }
}