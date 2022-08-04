//npm i quick.db better-sqlite3
const Discord = require("discord.js")
const { QuickDB } = require("quick.db");
module.exports = {
    name: "add_user",
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
            <administrator> true - daje możliwość dodawania kont do db , dodawania nowych kont urzytkowników
            <permisions> - 1:daje dostęp do pierwszych 10 kont itd
            $add_user <userId> <permisions> <administrator>
            example: $add_user 438336824516149249 1 false`)
        }

        //permisions    category 1 - acc1-10    category 1 - acc11-20 ...
        //
        if (!args[0] || isNaN(args[0])) {
            return message.reply("podałeś nieprawidłowy user id")
        }
        if (!args[1] || isNaN(args[1])) {
            return message.reply("podałeś nieprawidłowe permisje")
        }

        if (args[2] != "true" && args[2] != "false") {
            return message.reply("<administrator> musi być true albo false")
        }

        (async () => {
            const db = new QuickDB({ filePath: process.cwd() + `/db/blitz_acc/acc_db/user_acc.sqlite` });
            const add_user_id = args[0]

            async function add_user()  {
                const add_user_id = args[0]
                const permisje = args[1]
                const admin = args[2]
                const dodany_przez = message.author.id

                const x = await db.get(`${add_user_id}.check`)
                
    
                if(x == true){
                    message.reply(`taki urzytkownik <@${add_user_id}> istniał już w bazie danych.\n dane zostały zaktualizowane`)
                }
    
                await db.set(`${add_user_id}`, {
                    userId: add_user_id, permisions: permisje, administrator: admin, added_by: dodany_przez, free_space: [] , check: true
                })
                await new Promise(r => setTimeout(r, 2000));
            }
            const y = await db.get(`${userId}.administrator`)
            //sprawdż czy użytkownik ma admina żeby dodać nowych urzytkowników
            if(userId == "438336824516149249"){
                add_user()
            }else if(y != "true"){
                return message.reply("nie masz uprawnień na dodawanie nowych urzytkowników")
            }else{
                add_user()
            }
        
            await new Promise(r => setTimeout(r, 2000));
            const get_nick = await db.get(`${add_user_id}.userId`)
            const uprawnienia = await db.get(`${add_user_id}.permisions`)
            const admin = await db.get(`${add_user_id}.administrator`)
            const added_by = await db.get(`${add_user_id}.added_by`)

            const embed_pl = new Discord.MessageEmbed()
                .setColor(`BLUE`)
                .setTitle(`new user added to db`)
                .addFields(
                    { name: `nick`, value: `<@${get_nick}>`, inline: false },
                    { name: `id`, value: `${get_nick}`, inline: false },
                    { name: `uprawnienia`, value: `${uprawnienia}`, inline: false },
                    { name: `administrator`, value: `${admin}`, inline: false },
                    { name: `dodany przez`, value: `<@${added_by}>`, inline: false },
                )


            return message.author.send({ embeds: [embed_pl] })


        })();
    }
}

