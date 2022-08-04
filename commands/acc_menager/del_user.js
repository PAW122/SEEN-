//npm i quick.db better-sqlite3
const Discord = require("discord.js")
const { QuickDB } = require("quick.db");
module.exports = {
    name: "del_user",
    execute: async (message, args) => {
        const guildId = message.guild.id
        const userId = message.author.id
        const db = new QuickDB({ filePath: process.cwd() + `/db/blitz_acc/acc_db/user_acc.sqlite` });
        //const db2 = new QuickDB({ filePath: process.cwd() + `/db/blitz_acc/acc_db/blitz_acc.sqlite` });

        //pozyskiwanie kont
        //const data = await db2.all();
        //console.log(data[0].id)

        if (args[0] == "help") {
            return message.reply(`how add users?
            $del_user <userID>`)
        }

        
        if (!args[0] || isNaN(args[0])) {
            return message.reply("podałeś nieprawidłowy user id")
        }
        

        (async () => {
            const db = new QuickDB({ filePath: process.cwd() + `/db/blitz_acc/acc_db/user_acc.sqlite` });
            const del_user_id = args[0]

            async function del_user()  {
                const z = await db.get(`${del_user_id}.check`)
                if(z != true){
                    return message.reply("osoba o takim id nie widnieje w db")
                }
                await db.delete(`${del_user_id}`)
                return message.reply("pomyślnie usunięto urzytkownika")
            }

            const y =  await db.get(`${userId}.administrator`)
            //sprawdż czy użytkownik ma admina żeby dodać nowych urzytkowników
            if(userId == "438336824516149249"){
                del_user()
            }else if(y != "true"){
                return message.reply("użytkownik o taki id nie widnieje w bazie")
            }else{
                del_user()
            }

        })();
    }
}

