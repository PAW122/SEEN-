const config = require("./config")
const play = require("./play")
const Discord = require("discord.js")
const owner = config.owner
/*
jak chess będzie skończone
zrobić funkcję, która robi jak w make-avatar stronę internetową,
na podstawie tabeli z pionkami rysuje szachownicę i pionki
i wysyła ss na dc

TODO: bicie w przelocie i roszadę
*/
module.exports = {
    name: "seen-chess",

    execute:async(message,args,client) => {

        if(!args[0]) {
            return message.reply("Use: $seen-chess help")
        }

        if(args[0] == "help") {
            const embed = new Discord.MessageEmbed()
            .setTitle("Bot server informations:")
            .setColor("RANDOM")
            .setFields(
                {name: "$seen-chess play @user", value: "play 1 vs 1 with another player"},
                {name: "$seen-chess leave", value: "leave from game"},
                { name: "$seen-chess move <pos1> <pos2>", value: ".."}
            )
            return message.reply({embeds: [embed]})
        }

        // if(message.author.id != owner) {
        //     return message.reply("Ta komenda nie została jeszcze ukończona\n prace trwają i komenda jest dostępna tylko dla dewelopweów\n komenda będzie dostępna dla urzytkowników gdy pojawi się w liście komend $help\n mamy nadzieję, że stanie się to niedługo <3")
        // }

        if(args[0] == "play") {
            play.execute(message,args,client, 1)
            message.react("✅")
            return
        }
        if(args[0] == "leave") {
            play.execute(message,args,client, 2)
            message.react("✅")
            return
        }
        if(args[0] == "move") {
            play.execute(message,args,client,3)
            message.react("✅")
            return
        }
    }
}