//npm i quick.db better-sqlite3
const Discord = require("discord.js")
const { QuickDB } = require("quick.db");
module.exports = {
    name: "get_acc",
    execute: async (message, args) => {
        const guildId = message.guild.id
        //dodawanie konta do db
        const db2 = new QuickDB({ filePath: process.cwd() + `/db/blitz_acc/acc_db/blitz_acc.sqlite` });
        const db = new QuickDB({ filePath: process.cwd() + `/db/blitz_acc/acc_db/user_acc.sqlite` });
        const userId = message.author.id
        if (args[0] == "help") {
            return message.reply(`$get_acc -- wysyła informacje  kontach, które są dla ciebie dostępne`)
        }

        const check = await db.get(`${userId}.check`)
        const check2 = await db.get(`${userId}.administrator`)
        if(check != true ){
                return message.reply("nie posiadasz uprawnień do korzystania z db")
        }
        const permisions = await db.get(`${userId}.permisions`)

        if(permisions == 1 || check2 == "true"){
        
            const data = await db2.all();
            const range = data.length
            //const dane = data[0].id

            message.author.send(`użyj $info_acc <mail>`)
            if(range >= 1) message.author.send(`${data[0].id}`)
            if(range >= 2) message.author.send(`${data[1].id}`)
            if(range >= 3) message.author.send(`${data[2].id}`)
            if(range >= 4) message.author.send(`${data[3].id}`)
            if(range >= 5) message.author.send(`${data[4].id}`)
            if(range >= 6) message.author.send(`${data[5].id}`)
            if(range >= 7) message.author.send(`${data[6].id}`)
            if(range >= 8) message.author.send(`${data[7].id}`)
            if(range >= 9) message.author.send(`${data[8].id}`)
            if(range >= 10) message.author.send(`${data[9].id}`)
        
        }
    }

}