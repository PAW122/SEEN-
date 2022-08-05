//szczegułowe informacje o koncie
//musi sprawdzać permisje (1 = dostęp do pierwszych 10 kont)
const Discord = require("discord.js")
const { QuickDB } = require("quick.db");
module.exports = {
    name: "info_acc",
    execute: async (message, args) => {
        const guildId = message.guild.id
        const acc_db = new QuickDB({ filePath: process.cwd() + `/db/blitz_acc/acc_db/blitz_acc.sqlite` });
        const users_db = new QuickDB({ filePath: process.cwd() + `/db/blitz_acc/acc_db/user_acc.sqlite` });
        const userId = message.author.id
        if (args[0] == "help") {
            return message.reply(`$info_acc <acc_mail>
            `)
        }
        if(!args[0]){
            return message.reply("Nie podałeś argumentu")
        }
        //sprawdż czy użytkownik istnieje
        const check = await users_db.get(`${userId}.check`)
        if(check != true){
            return message.reply("nie znajdujesz się na liście użytkowników")
        }

        

        //sprawdzanie uprawnień dla pierwszych 10 kont
        const check_admin = await users_db.get(`${userId}.administrator`)
        const check_permisions = await users_db.get(`${userId}.permisions`)
        if(check_admin == "true"){

        }else if(check_permisions != "1" && check_permisions != "2"){
            return message.reply("aby użyć tej komendy twoje uprawnienia muszą wynosić: 1")
        }


        const informacje_o_koncie = args[0]

        //sprawdż czy takie konto istnieje
        const check_acc = await acc_db.get(`${informacje_o_koncie}.check`)
        if(check_acc != true){
            return message.reply("takie konto nie istnieje")
        }

        const get_mail = await acc_db.get(`${informacje_o_koncie}.mail`)
        const get_password = await acc_db.get(`${informacje_o_koncie}.password`)
        const get_nick_name = await acc_db.get(`${informacje_o_koncie}.nick_name`)
        const get_tiery = await acc_db.get(`${informacje_o_koncie}.tiery`)
        const get_winrate = await acc_db.get(`${informacje_o_koncie}.winrate`)
        const get_battles = await acc_db.get(`${informacje_o_koncie}.battles`)
        const get_bans = await acc_db.get(`${informacje_o_koncie}.bans`)
        const get_gold = await acc_db.get(`${informacje_o_koncie}.gold`)
        const get_last_edit_rok = await acc_db.get(`${informacje_o_koncie}.last_edit[0]`)
        const get_last_edit_month = await acc_db.get(`${informacje_o_koncie}.last_edit[1]`)
        const get_last_edit_day = await acc_db.get(`${informacje_o_koncie}.last_edit[2]`)
        const get_last_edit_user = await acc_db.get(`${informacje_o_koncie}.last_edit[3]`)
        const get_last_battle_rok = await acc_db.get(`${informacje_o_koncie}.last_battle[0]`)
        const get_last_battle_month = await acc_db.get(`${informacje_o_koncie}.last_battle[1]`)
        const get_last_battle_day = await acc_db.get(`${informacje_o_koncie}.last_battle[2]`)

        const embed_pl = new Discord.MessageEmbed()
            .setColor(`BLUE`)
            .setTitle(`Acc info`)
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
    }

}