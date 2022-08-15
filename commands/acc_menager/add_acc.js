//npm i quick.db better-sqlite3
const Discord = require("discord.js")
const { QuickDB } = require("quick.db");
const config = require("../../config/config")
const prefix = config.prefix
module.exports = {
    name: "add_acc",
    execute: async (message) => {

        // /-jest separatorem
        const args = message.content.slice(prefix.length).trim().split("/");


        const guildId = message.guild.id
        //dodawanie konta do db
        const db = new QuickDB({ filePath: process.cwd() + `/db/blitz_acc/acc_db/blitz_acc.sqlite` });
        const users_db = new QuickDB({ filePath: process.cwd() + `/db/blitz_acc/acc_db/user_acc.sqlite` });
        const userId = message.author.id
        if (args[1] == "help") {
            return message.reply(`how create account?
        !!<tiery> podajemy po przecinku bez spacji: 7,8,10

        use: $add_acc/accmail@gmail.com/acc_password/
         /nickname/bans/tiery/wr/all_battles/gold
         
         example: $add_acc /test@cos.cos/123/nickname/1/4,5/64%/1200/100`)
        }

        if(await users_db.get(`${userId}.administrator`) != "true"){
            return message.reply("Nie posiadasz wymaganych uprawnień do korzytania z tej komendy")
        }

        if (!args[1]) {
            return message.reply("nie podałeś maila")
        }
        if (isNaN(args[4])) {
            return message.reply("podałeś nieprawidłową ilość banów")
        }
        if ((!args[5])) {
            return message.reply("podałeś nieprawidłowy tieru")
        }
        if (!args[6]) {
            return message.reply("podałeś nieprawidłową ilość wr")
        }
        if (isNaN(args[7])) {
            return message.reply("podałeś nieprawidłową ilość bitew")
        }
        if (isNaN(args[8])) {
            return message.reply("podałeś nieprawidłową ilość golda")
        }


        (async () => {
            const userId = message.author.id


            var current = new Date();
            const rok = current.getFullYear();
            const month = current.getMonth() + 1;
            const day = current.getDay()

            //deafultowe ustawienia
            const acc_mail = args[1]
            const acc_password = args[2]
            const acc_nick = args[3]
            const bany = args[4]
            const tier = args[5]
            const wr = args[6]
            const bitwy = args[7]
            const gold = args[8]


           
            const last_user = "?"


            await db.set(`${acc_mail}`, {//
                check: true,//zmienna kontrolna
                mail: acc_mail,
                last_edit: [rok, month, day, userId],
                password: acc_password,//
                bans: bany,//
                nick_name: acc_nick,//
                tiery: tier,//
                winrate: wr,//
                battles: bitwy,//
                gold: gold,//
                last_battle: "",
                last_user: last_user,
                free_space: []//miejsce na dodatkowe dane
                ,last_battle: ""
            })

            //daje 2s żeby db się stworzyła
            await new Promise(r => setTimeout(r, 2000));
            if (await db.get(`${acc_mail}.chech`) != true) {
                await new Promise(r => setTimeout(r, 2000));
            }

            const get_mail = await db.get(`${acc_mail}.mail`)
            const get_password = await db.get(`${acc_mail}.password`)
            const get_nick_name = await db.get(`${acc_mail}.nick_name`)
            const get_tiery = await db.get(`${acc_mail}.tiery`)
            const get_winrate = await db.get(`${acc_mail}.winrate`)
            const get_battles = await db.get(`${acc_mail}.battles`)
            const get_bans = await db.get(`${acc_mail}.bans`)
            const get_gold = await db.get(`${acc_mail}.gold`)
            const get_last_edit_rok = await db.get(`${acc_mail}.last_edit[0]`)
            const get_last_edit_month = await db.get(`${acc_mail}.last_edit[1]`)
            const get_last_edit_day = await db.get(`${acc_mail}.last_edit[2]`)
            const get_last_edit_user = await db.get(`${acc_mail}.last_edit[3]`)
            const get_last_battle_rok = await db.get(`${acc_mail}.last_battle[0]`)
            const get_last_battle_month = await db.get(`${acc_mail}.last_battle[1]`)
            const get_last_battle_day = await db.get(`${acc_mail}.last_battle[2]`)

            const embed_pl = new Discord.MessageEmbed()
                .setColor(`BLUE`)
                .setTitle(`Acc add to database`)
                .addFields(
                    { name: `mail`, value: `${get_mail}`, inline: false },
                    { name: `password`, value: `${get_password}`, inline: false },
                    { name: `nickname`, value: `${get_nick_name}`, inline: false },
                    { name: `tier`, value: `${get_tiery}`, inline: false },
                    { name: `winrate`, value: `${get_winrate}`, inline: false },
                    { name: `battles`, value: `${get_battles}`, inline: false },
                    { name: `bans`, value: `${get_bans}`, inline: false },
                    { name: `gold`, value: `${get_gold}`, inline: false },
                    { name: `last edit`, value: `${get_last_edit_rok}.${get_last_edit_month}.${get_last_edit_day}`, inline: false },
                    { name: `user last edit`, value: `<@${get_last_edit_user}>`, inline: false },
                    { name: `last battle`, value: `${get_last_battle_rok}.${get_last_battle_month}.${get_last_battle_day}`, inline: false },
                )


            return message.author.send({ embeds: [embed_pl] })


        })();
    }
}

