//$flags p
const { QuickDB } = require("quick.db")
const data = require("./data.json")
const Discord = require("discord.js")

const config = require(process.cwd() + `/config/worker.js`)
const work = config.flags
const worker = config.flags_worker
const reason = config.flags_disable
module.exports = {
    execute: async (message, args, client) => {
        const author = message.author.id
        const guildId = message.guild.id
        const db = new QuickDB({ filePath: process.cwd() + `/db/srv_settings/commands/${guildId}.sqlite` });
        if (await db.get(`check.check`) == true) {
            const settings = await db.get(`game.worker`)
            const settings_reason = await db.get(`game.reason`)
            if (settings == false) { return message.channel.send(settings_reason) }
        }
        const countries = 194 //(-1)
        const channel = message.channel.id
        //narazie do dosowania będzie id od 1 do 9 bo nie ma dodanych wszystkich krajów
        //const country = data[`${rng}`][0]
        //const population = data[`${rng}`][1]
        //const land_area = data[`${rng}`][2]
        //const density = data[`${rng}`][3]

        //losuj 3 randomowe nazwy krajów        wylosowana liczba nie może być równa 0
        const rng = Math.floor(Math.random() * countries) + 1;
        const rng1 = Math.floor(Math.random() * countries) + 1;
        const rng2 = Math.floor(Math.random() * countries) + 1;
        const rng3 = Math.floor(Math.random() * countries) + 1;

        if (rng1 != rng && rng2 != rng && rng3 != rng) {

        } else {
            const rng1 = Math.floor(Math.random() * countries) + 1;
            const rng2 = Math.floor(Math.random() * countries) + 1;
            const rng3 = Math.floor(Math.random() * countries) + 1;
        }



        //losój która odp ma być poprawna

        var all_anwsers = ["A", "B", "C", "D"]

        const anwser = Math.floor(Math.random() * 3) + 1;
        if (anwser == 1) {
            message.channel.send(`Country land area (Km²):\n A: ${data[rng][2]}\nB:${data[rng1][2]}\nC:${data[rng2][2]}\nD:${data[rng3][2]}`);
            var good_anwser = "A"
        }
        if (anwser == 2) {
            message.channel.send(`Country land area (Km²):\nA: ${data[rng][2]}\nB:${data[rng1][2]}\nC:${data[rng2][2]}\nD:${data[rng3][2]}`);
            var good_anwser = "B"
        }
        if (anwser == 3) {
            message.channel.send(`Country land area (Km²):\nA: ${data[rng][2]}\nB:${data[rng1][2]}\nC:${data[rng2][2]}\nD:${data[rng3][2]}`);
            var good_anwser = "C"
        }
        if (anwser == 4) {
            message.channel.send(`Country land area (Km²):\nA: ${data[rng][2]}\nB:${data[rng1][2]}\nC:${data[rng2][2]}\nD:${data[rng3][2]}`);
            var good_anwser = "D"
        }


        const attachment = new Discord.MessageAttachment(`commands/komendy/game_flags/flags/${rng}.png`)
        const embed_pl = new Discord.MessageEmbed()

            .setColor(`BLUE`)//PL
            .setTitle(`You have 10s to type: **A**/**B**/**C**/**D**`)

            .setFooter(message.author.tag, message.author.avatarURL({ dynamic: true }));
        message.channel.send({ embeds: [embed_pl], files: [attachment] });

        var i = 1;

        client.on('messageCreate', async message => {
            var i = i + 1
        });
        await new Promise(r => setTimeout(r, 12000));//12 sekund na wysłanie wiadomości

        message.channel.messages.fetch({ limit: i }).then(messages => {
            let lastMessage = messages.first();

            if (!lastMessage.author.bot) {
                if (lastMessage.author.id == message.author.id && lastMessage.content == good_anwser) {
                    combo(true)
                    return message.reply("Good anwser")
                } else if (lastMessage.author.id == message.author.id && (lastMessage.content.toLowerCase() == "a" || lastMessage.content.toLowerCase() == "b" || lastMessage.content.toLowerCase() == "c" || lastMessage.content.toLowerCase() == "d")) {
                    combo(false)
                    return message.reply(`Bad answer. Correct answer is: **${good_anwser}**`)

                }
            }
            combo(false)
            return message.reply(`Time out. Correct answer is: **${good_anwser}**`)

        })

        async function combo(answer) {
            //true == dobra odp
            //false == zła odp
            const db = new QuickDB({ filePath: process.cwd() + `/db/flags/combo/${author}.sqlite` });
            const db2 = new QuickDB({ filePath: process.cwd() + `/db/flags/top.sqlite` });

            if (await db.get(`${author}.check`) != true) {
                await db.set(`${author}.check`, true)
                await db.set(`${author}.combo`, 0)
                await db.set(`${author}.bestcombo`, 0)
                await db.set(`${author}.combo_population`, 0)
                await db.set(`${author}.bestcombo_population`, 0)
                await db.set(`${author}.combo_la`, 1)
                await db.set(`${author}.bestcombo_la`, 0)
                await db.set(`${author}.games`, 0)
                await db.set(`${author}.spacec`, [])
                return
            }

            if (answer == true) {
                const combo = await db.get(`${author}.combo_la`)
                const setCombo = combo + 1
                await db.set(`${author}.combo_la`, setCombo)

                const games = await db.get(`${author}.games`)
                const set_games = games + 1
                await db.set(`${author}.games`, set_games)


                const bcombo = await db.get(`${author}.bestcombo_la`)

                if (bcombo < setCombo) {
                    await db.set(`${author}.bestcombo_la`, setCombo)
                    message.channel.send(`${message.author} get new best combo: **${setCombo}**`)

                    //safe user data to top list
                    await db2.set(`${author}.bestcombo_la`, bcombo)
                    await db2.set(`${author}.authorid`, author)

                }
            } else {
                //losed
                const combo = await db.get(`${author}.combo_la`)
                const setCombo = 0
                await db.set(`${author}.combo_la`, setCombo)

                const games = await db.get(`${author}.games_la`)
                const set_games = games + 1
                await db.set(`${author}.games_la`, set_games)

                const bcombo = await db.get(`${author}.bestcombo_la`)

                if (bcombo < combo) {
                    await db.set(`${author}.bestcombo_la`, setCombo)
                    message.channel.send(`${message.author} get new best combo: **${setCombo}**`)

                    //safe user data to top list
                    await db2.set(`${author}.bestcombo_la`, bcombo)
                    await db2.set(`${author}.authorid`, author)

                } else {
                    message.channel.send(`${message.author} best combo is: **${bcombo}**`)
                }
            }
        }
    }
}