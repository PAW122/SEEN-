const { QuickDB } = require("quick.db");
const db = new QuickDB({ filePath: process.cwd() +"/db/economy/test.sqlite" }); 
module.exports = {
    name: "data",

    execute: async (message, args) => {
        const userId = message.author.id

        if(args[0] == "add"){//tworzy tabele
            const add_text = args[1]
            await db.set(`${userId}`,{notatki: []})

        }
        if(args[0] == "get"){//wysyła informacje z db
            const data = await db.get(`${userId}.notatki`)
            console.log(data)
            message.channel.send(data[0])//trzeba oznaczyć który element z jsona chcemy uzyskać 
        }
        if(args[0] == "join"){//dodaje informacje do db
            const join_text = args[1]
            await db.push(`${userId}.notatki`, `${join_text}`)
        }

    }

}