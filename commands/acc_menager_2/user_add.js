/*
dodawanie nowych użytkowników:
dodawanie użytkowników po id
możliwości uprawnień: administrator- true/false
true -- pozwala dodaawać inne osoby
false -- użytkownik moze tylko odczytywanć konta

do zrobienia na slashah

jeżeli taki urzytkownik istniał już w db jego dane zostaną nadpisane
*/

//npm i quick.db better-sqlite3
const Discord = require("discord.js")
const { QuickDB } = require("quick.db");
const config = require("../../config/config")
const prefix = config.prefix
const owner_id = config.owner_id
const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
    isSlash: true,


    data: new SlashCommandBuilder()
        .setName('blitzdb_add_user')
        .setDescription('dodaje urzytkownika do systemu blitzdb')
        .addStringOption((option) =>
            option
                .setName("user")
                .setDescription("podaj id urzytkownika dla którego chcesz podjąć działanie")
                .setRequired(true)
        )
        .addStringOption((option) =>
            option
                .setName("action")
                .setDescription("add.del user acc")
                .setRequired(true)
                .setChoices(
                    { name: "add user", value: "add" },
                    { name: "del user", value: "del" },
                )
        )
        .addStringOption((option) =>
            option
                .setName("administrator")
                .setDescription("jakie uprawnienia ma posiadać urzytkownik")
                .setRequired(true)
                .setChoices(
                    { name: "true", value: "true" },
                    { name: "false", value: "false" },
                )
        ),
    executeInteraction: async (inter) => {
        const guildId = inter.guild.id
        const userId = inter.user.id
        const db = new QuickDB({ filePath: process.cwd() + `/db/blitz_acc/acc_db/user_acc.sqlite` });

        //sprawdzanie czy urzytkownik ma uprawnienia admina
        //438336824516149249 -- moje Id

        const user_acces = await db.get(`${userId}.permisje`)

        //opcja na usówanie lub dodawanie konta
        const action = inter.options.getString('action')
        if(action != "add"){
            if (isNaN(add_user_id)) return inter.reply("niepoprawny user id")

            const add_user_id = inter.options.getString('user')
            //usówanie konta
            if (userId != owner_id && user_acces != true) {
                return inter.reply("Nie posiadasz uprawnień na dodawanie nowych osób do db \n w celu uzyskania informacji użyj $report <wiadomość>")
            }

            //zabezpieczenie nie pozwalająde usunać samego siebie
            if(userId == add_user_id){
                return inter.reply("Nie możesz usunąć własnego profilu. \n jeżeli chcesz aby usunięto twój profil wyślij prożbe przy użyciu $report <prośba o usunięcie z db>")
            }


            //usówa cału profil urzytkownika ze wszystkimi danymi
            await db.delete(add_user_id)
            return inter.reply("pomyślnie usunięto urzytkownika")

        }else{
            //dodawanie konta
            
        if (userId != owner_id && user_acces != true) {
            return inter.reply("Nie posiadasz uprawnień na dodawanie nowych osób do db \n w celu uzyskania informacji użyj $report <wiadomość>")
        } else {
            const add_user_id = inter.options.getString('user')
            //zabezpieczenie nie pozwalająde usunać samego siebie
            if(userId == add_user_id){
                return inter.reply("Nie możesz dodać ani edytować własnego profilu. \n w razie pytań użyj: $report <pytanie>")
            }

            //użytkownik ma uprawnienia
            //trzeba stworzyć nowy profil dla nowego urzytkownika
            
            //jeżeli w user id jest coś co nie jest liczbą odrzuć
            if (isNaN(add_user_id)) return inter.reply("niepoprawny user id")

            await db.set(`${userId}.add_user_id`, add_user_id)

            const uprawnienia = inter.options.getString('administrator')
            if (userId != owner_id) {
                if (uprawnienia != "true" && uprawnienia != "false") return inter.reply("wystąpił błąd. Możesz to zgłosić za pomocą $report <wiadomość>")
            }
            await db.set(`${userId}.permisje`, uprawnienia)

            return inter.reply(`Pomyślnioe dodano urzytkownika o id: ${add_user_id}\n uprawnienia administratora: ${uprawnienia}`)

        }
    }
    },


}

