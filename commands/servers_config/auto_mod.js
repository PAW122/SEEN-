const { QuickDB } = require("quick.db");

module.exports = {
    name: "automod",

    execute: async(message,args,client) => {
        if(args[0] == "help"){
            return message.reply(`usage: **$automod on**\n turning on the automaton automatically deletes vulgar messages
            Use **$automod channel <channelID>** to specify on what channel bot send all automod actions
            Add banned word: $automod word <word>`)
        }

        async function main(){
            //wczytaj 
            const guildId = message.guild.id
            const db = new QuickDB({ filePath: process.cwd() + `/db/auto_mod/${guildId}.sqlite` });
            const db_words = new QuickDB({ filePath: process.cwd() + `/db/auto_mod/wrds/worlds.sqlite` });

            if(args[0] == "word") {
                if(!args[1]) return message.reply("You dont type word");
                await db_words.push(`${guildId}.worldlist`, args[1])
            }

            if(args[0] == "channel"){

                if(!args[1] || isNaN(args[1])) return message.reply(`You dont type channel id **$automod channel <channelID>**`)
                const channelId = args[1]

                await db.set(`${guildId}.channel`, channelId)
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