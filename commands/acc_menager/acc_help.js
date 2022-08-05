//npm i quick.db better-sqlite3
const Discord = require("discord.js")
const { QuickDB } = require("quick.db");
module.exports = {
    name: "acc_help",
    execute: async (message, args) => {

        const embed_pl = new Discord.MessageEmbed()
            .setColor(`BLUE`)
            .setTitle(`Acc_megager`)
            .setDescription("System dostępny tylko dla użytkowników wcześniej dodanych przez <@478480083498041356>")
            .addFields(
                {
                    name: `oddawanie nowego konta`,
                    value: `użycie: $add_acc <accmail@gmail.com> <acc_password> <nickname> <bans> <tiery> <wr> <all_battles> <gold>
                     przykład: $add_acc accmail@gmail.com 123pass456 nick_name_123 0 8,9,10 56.42 13257 100
                     wymagane uprawnienia: Administrator`, inline: false
                },


                {
                    name: `dodawanie noewgo użytkownika`,
                    value: `użycie: $add_user <userId> <permisions> <administrator>
                     przykład: $add_user 438336824516149249 1 false
                     wymagane uprawnienia: Administrator`, inline: false
                },

                {
                    name: `usówanie konta użytkownika`,
                    value: `$del_user <userID>
                     wymagane uprawnienia: Administrator`, inline: false
                },
                {
                    name: `uzyskiwanie informacji o koncie`,
                    value: `użycie: $info_acc <acc_mail>
                     przykład: $info_acc test@gmail.com
                     wymagane: permisions: 1
                     
                     użytkownik posiadający permisje:1 może pobrać dane na temat każdego konta w db, ale
                     musi pidać email konta żeby pobrać informacje`, inline: false
                },

            )


        return message.author.send({ embeds: [embed_pl] })



    }
}

