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
                return message.reply(`$mal add/anime title/content`)
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
            const data = await db.all()
            
            const content = data[0].value.title

            const tiles = data[0].value.title
            const descriptions = data[0].value.content

            //zprawdż ile rekordów ma lista
            const records = content.length 
            console.log(`długość: ${records}`)

            //dodaj do stringu wszystkie rekordy

            var string = " "
            var i = 0
            while(i < records){
                const title ="**"+ (tiles[i])+"**"+"\n"
                const opis = (descriptions[i])
                var text2 = i+"."+title + opis
                const string2 = string.concat(text2);

                i += 1

                if( i-1 == records){//wysyła embeda

                    const embed_pl = new Discord.MessageEmbed()
        
                    .setColor(`BLUE`)//PL
                    .setTitle(`${message.author.tag} anime list`)
                    .setDescription(`${string2}`)
                    .setFooter(message.author.tag, message.author.avatarURL({dynamic: true}));
            
            
                    message.channel.send({embeds: [embed_pl]});
                }
                
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




