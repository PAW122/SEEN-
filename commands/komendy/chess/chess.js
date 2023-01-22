const config = require("./config")
const play = require("./play")
const Discord = require("discord.js")
const owner = config.owner
module.exports = {
    name: "seen-chess",

    execute:async(message,args,client) => {

        if(args[0] == "help") {
            const embed = new Discord.MessageEmbed()
            .setTitle("Bot server informations:")
            .setColor("RANDOM")
            .setFields(
                {name: "$chess play @user", value: "play 1 vs 1 with another player"},
                {name: "$chess leave", value: "leave from game"}
            )
            return message.reply({embeds: [embed]})
        }

        if(message.author.id != owner) {
            return message.reply("Ta komenda nie została jeszcze ukończona\n prace trwają i komenda jest dostępna tylko dla dewelopweów\n komenda będzie dostępna dla urzytkowników gdy pojawi się w liście komend $help\n mamy nadzieję, że stanie się to niedługo <3")
        }

        if(args[0] == "play") {
            play.execute(message,args,client, true)
            message.react("✅")
            return
        }
        if(args[0] == "leave") {
            play.execute(message,args,client, false)
            message.react("✅")
            return
        }
    }
}