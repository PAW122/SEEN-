const config = require("./config")
const play = require("./play")
const Discord = require("discord.js")
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