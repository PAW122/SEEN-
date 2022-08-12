//npm i quick.db better-sqlite3


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
            const content = "." + args2[2]
            

            await db.push(`${userId}.title`, args2[1])
            await db.push(`${userId}.content`, content)
            console.log(args2[1])
            console.log(content)

            message.reply("pomyżlnie dodano do mal")
        }

        if (args[0] == "list") {
            console.log(await db.all())
            const data = await db.all()
            console.log(data[1])
        }

    }
}




