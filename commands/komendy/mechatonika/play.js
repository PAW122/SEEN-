//rozpoczyna test
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
po włączeniu testu db będzie dla danego urzytkownika
zawsze resetowana od 0
po tescie bot wyśle ile % dobrze, wyśle jakie odp były dobrze a jakie żle
*/

const { QuickDB } = require("quick.db")
const data = require("./data.json")
const Discord = require("discord.js")
var question_number = 1
//Egzamin styczeń 2019

module.exports = {
    name: "test",

    execute: async (message, args, client) => {
        process.setMaxListeners(100);

        //dodać do sutawnień serwerowych i dodać workera

        const author = message.author.id
        const guildId = message.guild.id
        const db = new QuickDB({ filePath: process.cwd() + `/db/mechatronika/${author}.sqlite` });

        if (args[0] == "help") {
            return message.reply("Quiz\n**Kwalifikacja E18 Eksploatacja urządzeń i systemów mechatronicznych**")
        }

        const questions = 39 //(-1)

            //pentla z zadawanymi pytaniami
            //losowanie pytania
            const rng = Math.floor(Math.random() * questions) + 1;
            //zaminić na po kolei!!

            //wyślij odpowiedzi i pytanie

            message.channel.send(`Pytanie: **${data[rng][0]}**
            \nodp:${data[rng][1]}\n odp:${data[rng][2]}\n odp:${data[rng][3]}\n odp:${data[rng][4]}`);



            //jeżeli posiada plik (1)
            if (data[rng][6] == true) {
                const filename = data[rng][7]
                const attachment = new Discord.MessageAttachment(`commands/komendy/mechatonika/files/${filename}`)
                const embed_pl = new Discord.MessageEmbed()
                    .setColor(`BLUE`)//PL
                    .setTitle(`You have 10s to type: **A**/**B**/**C**/**D**`)

                    .setFooter(message.author.tag, message.author.avatarURL({ dynamic: true }));
                message.channel.send({ embeds: [embed_pl], files: [attachment] });
            } else if (data[rng][6] == false) {
                const embed_pl = new Discord.MessageEmbed()
                    //nie posiada pliku
                    .setColor(`BLUE`)//PL
                    .setTitle(`You have 10s to type: **A**/**B**/**C**/**D**`)

                    .setFooter(message.author.tag, message.author.avatarURL({ dynamic: true }));
                message.channel.send({ embeds: [embed_pl] });
            }

            //ilość wiadomości
            var x = 1;

            client.on('messageCreate', async message => {
                var x = x + 1
            });
            await new Promise(r => setTimeout(r, 10000));

            //pobierz odp
            const good_anwser = data[rng][5]
            message.channel.messages.fetch({ limit: x }).then(messages => {
                let lastMessage = messages.first();

                if (!lastMessage.author.bot) {
                    if (lastMessage.author.id == message.author.id && lastMessage.content == good_anwser) {
                        const user_inpur = lastMessage.content
                        right_anwser(user_inpur)
                    } else if (lastMessage.author.id == message.author.id && (lastMessage.content.toLowerCase() == "a" || lastMessage.content.toLowerCase() == "b" || lastMessage.content.toLowerCase() == "c" || lastMessage.content.toLowerCase() == "d")) {
                        const user_inpur = lastMessage.content
                        bad_anwser(user_inpur)
                    }
                } else {
                    bad_anwser()
                }

            })

            async function right_anwser(user_inpur) {
                safe_answers(question_number,true,user_inpur)
                message.reply("dobrze")

                if(question_number == 40) {
                    return end_test()
                }

                await db.set({last_question: `${question_number}`})
                //zapisz do db nr pytania i informacje poprawna odpowiedż
                
            }
            async function bad_anwser(user_inpur) {
                safe_answers(question_number,false)
                message.reply(`żle. poprawna odp to: ${good_anwser}`)
                if(question_number == 40) {
                    return end_test()
                }
                //zapisz do db nr pytania i informacje niepoprawna odpowiedż
            }

            async function safe_answers(question_number,answer,user_inpur) {
                if(answer == false) {
                    //zapisz nr pytania i oznacz jako błąd (oznacz co wybrał urzytkownik)
                    await db.set(`question_nr`,question_number)
                    await db.set("user_answer",user_inpur)
                    await db.set("is_corrext", false)
                    await db.set("check", true)

                }else if(answer == true) {
                    //zapisz nr pytania i oznacz jako poprawnie (oznacz co wybrał urzytkownik)
                    await db.set("question_nr",question_number)
                    await db.set("user_answer",user_inpur)
                    await db.set("is_corrext", true)
                    await db.set("check", true)
                }
            }

            async function end_test() {
                //gdy urzytkownik odpowiedział już na wszytkie pytania
                message.channel.send("test end")
            }

    }
}