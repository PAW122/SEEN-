const { QuickDB } = require("quick.db");
const Discord = require("discord.js")

module.exports = {
    name: "automod",

    execute: async(message,args,client) => {
        if(args[0] == "help"){

            const embed = new Discord.MessageEmbed()
                .setTitle('Auto Mod')
                .setColor('RANDOM')
                .setDescription(`AutoMod is a feature that automatically deletes messages containing words added as banned by administrations`)
                .setFields(
                    {name: "$automod on", value: "turn on automod", inline: true},
                    {name: "$automod off", value: "turn off automod", inline: true},
                    {name: "$automod channel <channelID>", value: "specify on what channel bot send all automod actions", inline: true},
                    {name: "$automod word <word>", value: "Add banned word", inline: true},
                    {name: "$automod channel-off", value: "turn off notification of message deletion", inline: true},
                    {name: "$automod channel-on", value: "turn on notification of message deletion", inline: true},
                )
           return message.reply({ embeds: [embed] });
        }

        async function main(){
            //wczytaj 
            const guildId = message.guild.id
            const db = new QuickDB({ filePath: process.cwd() + `/db/automod/${guildId}.sqlite` });
            const db_words = new QuickDB({ filePath: process.cwd() + `/db/automod/wrds/worlds.sqlite` });

            if(args[0] == "word") {
                if(!args[1]) return message.reply("You dont type word");

                if(args[1] == "$help") return message.reply("U cant do that")
                if(args[1] == "$replrt") return message.reply("U cant do that")

                await db_words.push(`${guildId}.worldlist`, args[1])
                return message.reply(`Word '${args[1]}' is added to baned words`)
            }

            if(args[0] == "worddel") {
                await db_words.del(`${guildId}.worldlist`)
                await db.set(`${guildId}.check`, false)
                return message.reply(`Word list is deleted`)
            }

            if(args[0] == "channel"){

                if(!args[1] || isNaN(args[1])) return message.reply(`You dont type channel id **$automod channel <channelID>**`)
                const channelId = args[1]

                await db.set(`${guildId}.channel`, channelId)
                await db.set(`${guildId}.channelcheck`, true)

                return message.reply("set")
            }

            if(args[0] == "channel-off"){
                await db.set(`${guildId}.channelcheck`, false)
                return message.reply("set")
            }

            if(args[0] == "channel-on"){
                await db.set(`${guildId}.channelcheck`, true)
                return message.reply("set")
            }

            if(args[0] == "on") {
                if(await db.get(`${guildId}.check`) != true){
                    return setDeafult()
                }

                //turn on automod
                await db.set(`${guildId}.status`, true)
                return message.reply("Auto mod ON")
            }

            if(args[0] == "off") {
                if(await db.get(`${guildId}.check`) != true){
                    return setDeafult()
                }
                await db.set(`${guildId}.status`, false)
                return message.reply("Auto mod OFF")
            }

            async function setDeafult() {
                await db.set(`${guildId}.check`, true)
                await db.set(`${guildId}.status`, false)
               return message.reply("Your server profil is created")
            }
        }
        main()
    }
}