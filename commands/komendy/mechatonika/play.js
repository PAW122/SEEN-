//rozpoczyna mechatronic
//json: nr pytania,treść pytanioa, a,b,c,d,
//posiadane załączniki?(true/false), nazwa grafiki(1.jpg)
//false -- koniec

//albo

//json: nr pytania,treść pytanioa, a,b,c,d,
//posiadane załączniki?(true/false), nazwa grafiki(1.jpg),
//true , nazwa grafiki

/*
usunąć informacje o poprawnej lub błędnej odpowiedzy,
każda błędna i poprawna odp będzie zapisywana w bazie danych
po włączeniu mechatronicu db będzie dla danego urzytkownika
zawsze resetowana od 0
po tescie bot wyśle ile % dobrze, wyśle jakie odp były dobrze a jakie żle
*/

/*
użycie (nowe)
$mehatronika mechatronic: nrmechatronicu zad:nrazd
$odp <nazwamechatronicu> <nrzad>
*/

const { QuickDB } = require("quick.db")
const data = require("./data.json")
const Discord = require("discord.js")
//Egzamin styczeń 2019

module.exports = {
    name: "mechatronic",

    execute: async (message, args, client) => {
        process.setMaxListeners(100);

        //dodać do sutawnień serwerowych i dodać workera

        const author = message.author.id
        const guildId = message.guild.id
        const db = new QuickDB({ filePath: process.cwd() + `/db/mechatronika/${author}.sqlite` });

        if (args[0] == "help") {
            const embed_pl = new Discord.MessageEmbed()
                .setColor(`BLUE`)
                .setTitle(`kfalifikacja zawodowa mechatronik E18`)
                .addFields(
                    {name: "zadanie:", value: "**$mechatronic <nr pytania>**\nprzykład **$mechatronic 1**"},
                    {name: "sprawdzanie odpowiedzi", value: "**$mechatronic odp <nr_pytania>**\n przykład **$mechatronic odp 1**"}
                )

                .setFooter(message.author.tag, message.author.avatarURL({ dynamic: true }));
            return message.channel.send({ embeds: [embed_pl] });
        }

        const records = data.records

        if (args[0] == "odp") {
            return user_input()
        }


        const question_nr = args[0]
        if (isNaN(question_nr) || question_nr < 1 || question_nr > records) {
            return message.reply(`Wybierz nr pytania od 1 do ${records}`)
        }

        //jeżeli posiada plik (1)
        if (data[question_nr][6] == true) {
            const filename = data[question_nr][7]
            const attachment = new Discord.MessageAttachment(`commands/komendy/mechatonika/files/${filename}`)
            const embed_pl = new Discord.MessageEmbed()
                .setColor(`BLUE`)//PL
                .setTitle(`Pytanie: **${data[question_nr][0]}**`)
                .setDescription(`${data[question_nr][1]}\n ${data[question_nr][2]}\n ${data[question_nr][3]}\n ${data[question_nr][4]} \n użyj:** $mechatronic odp ${question_nr}** aby sprawdzić poprawną odpowiedż`)

                .setFooter(message.author.tag, message.author.avatarURL({ dynamic: true }));
            message.channel.send({ embeds: [embed_pl], files: [attachment] });
        } else if (data[question_nr][6] == false) {
            const embed_pl = new Discord.MessageEmbed()
                //nie posiada pliku
                .setColor(`BLUE`)//PL
                .setTitle(`Pytanie: **${data[question_nr][0]}**`)
                .setDescription(`${data[question_nr][1]}\n ${data[question_nr][2]}\n ${data[question_nr][3]}\n ${data[question_nr][4]}`)

                .setFooter(message.author.tag, message.author.avatarURL({ dynamic: true }));
            message.channel.send({ embeds: [embed_pl] });
        }

        //------------------------------------------------------------------------------------------------------------------------------------------------
        //sprawdzanie odpowiedzi
        //------------------------------------------------------------------------------------------------------------------------------------------------


        function user_input() {
            const question_nr = args[1]
            if (isNaN(question_nr) || question_nr < 1 || question_nr > records) {
                return message.reply(`Wybierz nr putania od 0 do ${records}`)
            }

            const embed_pl = new Discord.MessageEmbed()
                .setColor(`BLUE`)
                .setTitle(`Pytanie: **${data[question_nr][0]}**`)
                .setDescription(`Poprawna odpowiedź to: **${data[question_nr][5]}**`)

                .setFooter(message.author.tag, message.author.avatarURL({ dynamic: true }));
            message.channel.send({ embeds: [embed_pl] });
        }

    }
}