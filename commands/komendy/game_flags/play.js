// zrobić 4 tryby gry:
//kraje -- wysyła flage. musisz zgadnąć naazwe kraju
//population -- wysyła nazwe kraju. muzisz zadnąć liczbe ludności (można się  pomylić o 10%)
//Land Area -- wysyła nazwe kraju. musisz zgadnąć liczbe km2 (też pomyłka do 10%)
//Density -- wysyła nazwe kraju.. musisz zgadnąć liczbe ludności na km2

const data = require("./data.json")
const Discord = require("discord.js")
module.exports = {
    name: "game",

    execute: async (message, args, client) => {

        //tryb na zgadywanie nazwy kraju po fladze
        async function get_random_country() {
            const channel = message.channel.id
            //narazie do dosowania będzie id od 1 do 9 bo nie ma dodanych wszystkich krajów
            const rng = Math.floor(Math.random() * 8) + 1;//od 1 do podanej wartości
            const country = data[`${rng}`][0]
            //const population = data[`${rng}`][1]
            //const land_area = data[`${rng}`][2]
            //const density = data[`${rng}`][3]

            //losuj 3 randomowe nazwy krajów
            const rng1 = Math.floor(Math.random() * 9);
            const rng2 = Math.floor(Math.random() * 9);
            const rng3 = Math.floor(Math.random() * 9);

            if (rng1 != rng && rng2 != rng && rng3 != rng) {

            } else {
                const rng1 = Math.floor(Math.random() * 8) + 1;
                const rng2 = Math.floor(Math.random() * 8) + 1;
                const rng3 = Math.floor(Math.random() * 8) + 1;
            }
            console.log(rng1, rng2, rng3)

            //losój która odp ma być poprawna

            const anwser = Math.floor(Math.random() * 3) + 1;
            console.log(anwser)
            if (anwser == 1) {
                message.channel.send(`A: ${data[rng][0]}\nB:${data[rng1][0]}\nC:${data[rng2][0]}\nD:${data[rng3][0]}`);
            }
            if (anwser == 2) {
                message.channel.send(`A: ${data[rng1][0]}\nB:${data[rng][0]}\nC:${data[rng2][0]}\nD:${data[rng3][0]}`);
            }
            if (anwser == 3) {
                message.channel.send(`A: ${data[rng1][0]}\nB:${data[rng2][0]}\nC:${data[rng][0]}\nD:${data[rng3][0]}`);
            }
            if (anwser == 4) {
                message.channel.send(`A: ${data[rng1][0]}\nB:${data[rng2][0]}\nC:${data[rng3][0]}\nD:${data[rng][0]}`);
            }

            const attachment = new Discord.MessageAttachment(`commands/komendy/game_flags/flags/${rng}.png`)

            message.channel.send({ files: [attachment] })
                .then(msg => {
                    msg.react("🇦"),
                    msg.react("🇧")
                    , msg.react("🇨")
                    , msg.react("🇩")
                }).catch();

            const a_emoji = "🇦"
            const b_emoji = "🇧"
            const c_emoji = "🇨"
            const d_emoji = "🇩"

                
            client.on("messageReactionAdd", async (reaction, user) => {
                console.log(user)
                if (reaction.message.partial) await reaction.message / fetch();
                if (reaction.partial) await reaction.fetch();
                if (user.bot) return;
                if (!reaction.message.guild) return;

                if (reaction.message.channel.id == channel) {

                    if (anwser == 1) {
                        if (reaction.emoji.name === a_emoji) {

                            return message.reply("dobra odpowiedż")
                        } else {

                            return message.reply("błędna odpowiedż")
                        }
                    }

                    if (anwser == 2) {
                        if (reaction.emoji.name === b_emoji) {

                            return message.reply("dobra odpowiedż")
                        } else {

                            return message.reply("błędna odpowiedż")
                        }
                    }

                    if (anwser == 3) {
                        if (reaction.emoji.name === c_emoji) {

                            return message.reply("dobra odpowiedż")
                        } else {

                            return message.reply("błędna odpowiedż")
                        }
                    }

                    if (anwser == 4) {
                        if (reaction.emoji.name === d_emoji) {

                            return message.reply("dobra odpowiedż")
                        } else {

                            return message.reply("błędna odpowiedż")
                        }
                    }



                }
            });

        }
        get_random_country()
    }

}