//npm i quick.db better-sqlite3
const Discord = require("discord.js")

const { QuickDB } = require("quick.db");
const create_profil = require("./mal_handler")
const db = new QuickDB({ filePath: process.cwd() + `/db/animelist/mal.sqlite` });
module.exports = {
    name: "mal",



    execute: async (message, args) => {
        const userId = message.author.id

        if (await db.get(userId) == null) {
            create_profil(userId)
            return message.reply("twój profil został właśnie sworzony. użyj komendy ponownie aby dodać coś do mal")
        }


        if (args[0] == "add") {

            const args2 = message.content.slice(1).trim().split("/");
            if (args[0] == "help") {
                return message.reply(`$mal add/anime title/content
                $mal list <page>
                $mal del <id>`)
            }
            if (!args2[1]) {
                return message.reply("nie podałeś tytułu")
            }
            //można nie podawać opisu
            const content =args2[2] + "."
            

            await db.push(`${userId}.title`, args2[1])
            await db.push(`${userId}.content`, content)

            message.reply("pomyżlnie dodano do mal")
        }

        //odczytuje dane z listy i wysyła na embedzie
        if (args[0] == "list") {

            if(!args[1]){
                return message.reply(`use: $mal list <page>
                example: $mal list 1`)
            }

            const page = args[1]
            const data = await db.all()
            
            const content = data[0].value.title

            const tiles = data[0].value.title
            const descriptions = data[0].value.content

            const records = content.length 

            if(page == 1){
                const embed = new Discord.MessageEmbed()
                .setColor("RED")
                .setTitle("tytuł")
                .setDescription(`${message.author.tag} ani list page ${page}`)
                .addFields(
                    {name: `0:${tiles[0]}`,value: `${descriptions[0]}`, inline: false},
                    {name: `1:${tiles[1]}`,value: `${descriptions[1]}`, inline: false},
                    {name: `2:${tiles[2]}`,value: `${descriptions[2]}`, inline: false},
                    {name: `3:${tiles[3]}`,value: `${descriptions[3]}`, inline: false},
                    {name: `4:${tiles[4]}`,value: `${descriptions[4]}`, inline: false},
                    {name: `5:${tiles[5]}`,value: `${descriptions[5]}`, inline: false},
                    {name: `6:${tiles[6]}`,value: `${descriptions[6]}`, inline: false},
                    {name: `7:${tiles[7]}`,value: `${descriptions[7]}`, inline: false},
                    {name: `8:${tiles[8]}`,value: `${descriptions[8]}`, inline: false},
                    {name: `9:${tiles[9]}`,value: `${descriptions[9]}`, inline: false},
                    {name: `10:${tiles[10]}`,value: `${descriptions[10]}`, inline: false},
                    )
                .setTimestamp()
                .setFooter(message.author.tag, message.author.avatarURL({dynamic: true}));
                message.channel.send({embeds: [embed]});
            }

            if(page == 2){
                const embed = new Discord.MessageEmbed()
                .setColor("RED")
                .setTitle("tytuł")
                .setDescription(`${message.author.tag} ani list page ${page}`)
                .addFields(
                    {name: `11:${tiles[11]}`,value: `${descriptions[11]}`, inline: false},
                    {name: `12:${tiles[12]}`,value: `${descriptions[12]}`, inline: false},
                    {name: `13:${tiles[13]}`,value: `${descriptions[13]}`, inline: false},
                    {name: `14:${tiles[14]}`,value: `${descriptions[14]}`, inline: false},
                    {name: `15:${tiles[15]}`,value: `${descriptions[15]}`, inline: false},
                    {name: `16:${tiles[16]}`,value: `${descriptions[16]}`, inline: false},
                    {name: `17:${tiles[17]}`,value: `${descriptions[17]}`, inline: false},
                    {name: `18:${tiles[18]}`,value: `${descriptions[18]}`, inline: false},
                    {name: `19:${tiles[19]}`,value: `${descriptions[19]}`, inline: false},
                    {name: `20:${tiles[20]}`,value: `${descriptions[20]}`, inline: false},
                    )
                .setTimestamp()
                .setFooter(message.author.tag, message.author.avatarURL({dynamic: true}));
                message.channel.send({embeds: [embed]});
            }
        

        }

        if(args[0] == "del") {
            if(!args[1]){
                return message.reply("podaj nómer anime które chcesz usunąć z listy")
            }
            const delete_id = args[1]
            await db.delete(`${userId}.title[${delete_id}]`)
            await db.delete(`${userId}.content[${delete_id}]`)

            return message.reply(`usunięto wpis nr ${delete_id}`)
        }

    }
}




