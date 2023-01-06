const Discord = require("discord.js")
const { QuickDB } = require("quick.db");
//dodać opdje podania własnego linku

const help_embed = new Discord.MessageEmbed()

    .setColor(`RANDOM`)
    .setTitle(`backgrounds`)
    .addFields(
        { name: "bot background images list", value: "$backgrounds list" },
        { name: "set your background", value: "$backgrounds custom <link>" },
        { name: "set bot background", value: "$backgrounds set <background Id> \n example: $backgrounds set 3" },

    )
module.exports = {
    name: "backgrounds",
    help: help_embed,

    execute: async (message, args, client) => {


        //return message.reply("this feature is temporarily disabled. Work on restoring it to functioning is ongoing")


        const guildId = message.guild.id
        const db = new QuickDB({ filePath: process.cwd() + `/db/srv_settings/commands/${guildId}.sqlite` });

        if (args[0] == "list") {
            const embed_pl = new Discord.MessageEmbed()
                .setColor(`BLUE`)
                .setTitle(`Help`)
                .addFields(
                    { name: "1", value: "https://i.imgur.com/zvWTUVu.jpg" },
                    { name: "2", value: "https://wallpaperaccess.com/full/2071603.jpg" },
                    { name: "3", value: "https://www.geeklawblog.com/wp-content/uploads/sites/528/2018/12/liprofile.png" },
                    { name: "4", value: "https://pbs.twimg.com/media/FUJ8dDrXEAIGk3o?format=jpg&name=large" },
                    { name: "5", value: "https://cdn.wallpapersafari.com/39/38/SimM0C.jpg" },
                    { name: "ANIME:", value: "---------------------------------------" },
                    { name: "6", value: "https://img.freepik.com/free-vector/japanese-street-pastel-colours_52683-44714.jpg?w=2000" },
                    { name: "7", value: "https://i.pinimg.com/736x/35/3b/fa/353bfaa8b76b23dc8dfaf1af6482d220.jpg" },
                    { name: "8", value: "https://t4.ftcdn.net/jpg/03/08/24/29/360_F_308242904_BNor0M6K6I19nVW6AVv8Qg9fWtuU9hMB.jpg" },
                    { name: "9", value: "https://t3.ftcdn.net/jpg/04/49/19/08/360_F_449190831_i2whvIQdDIGtuIVWT6QfenWwmRApVJ5l.jpg" },
                    { name: "10", value: "https://impuls.nzsug.pl/wp-content/uploads/2020/01/HXcsVY5.png" },



                )
            return message.channel.send({ embeds: [embed_pl] });
        }

        if (args[0] == "set") {

            if (!args[1]) return message.channel.send("you dont type nackground id")
            if (isNaN(args[1])) return message.reply("wrong id. Id need to be nunber")
            if (args[1] < 1 || args[1] > 10) {
                return message.reply("worng id. type if form 1 to 10")
            }

            // await db.set(`background`, { check: true,custom:false,type: 1})
            await db.set(`background`, { check: true, custom: false, type: args[1] })
            return message.reply("set")
        }

        if (args[0] == "custom") {

            await db.set(`background`, { check: true, custom: true, type: args[1] })
            await db.set(`bglink`, { link: `${args[1]}`, check: true })
            return message.reply("set")
        }


        const embed_pl = new Discord.MessageEmbed()
            .setColor(`BLUE`)
            .setTitle(`Help`)
            .addFields(
                { name: "bot background images list", value: "$backgrounds list" },
                { name: "set your background", value: "$backgrounds custom <link>" },
                { name: "set bot background", value: "$backgrounds set <background Id> \n example: $backgrounds set 3" },

            )
        return message.channel.send({ embeds: [embed_pl] });

    }
}
