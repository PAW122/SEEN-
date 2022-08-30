/*
wysyła embeda z listą top 5 naj graczy + pokazuje personal best i ilość gier,
dodać opcje resetowania konta do 0 statystyk
*/

//to będzie handler wywyływany w play.js

const { QuickDB } = require("quick.db")
const Discord = require("discord.js")

module.exports = (message, client) => {
    async function main() {
        const author = message.author.id
        const db = new QuickDB({ filePath: process.cwd() + `/db/flags/combo/${author}.sqlite` });
        const db2 = new QuickDB({ filePath: process.cwd() + `/db/flags/top.sqlite` });

        if (await db.get(`${author}.check`) != true) {
            await db.set(`${author}.check`, true)
            await db.set(`${author}.combo`, 0)
            await db.set(`${author}.bestcombo`, 0)
            await db.set(`${author}.games`, 0)
            await db.set(`${author}.spacec`, [])
            return message.channel.send("you haven't played any games before")
        }

        //personal data
        const personalBest = await db.get(`${author}.bestcombo`)
        const combo = await db.get(`${author}.combo`)
        const games = await db.get(`${author}.games`)
/*
        //top list
        const data = db2.all()

        const bests = []
        const users = []
        let i = 0

        data.then(function (result) {
        console.log(result[i].value.bestcombo)
        console.log(result[i].value.authorid)
        })

        console.log(data[i].value.bestcombo)

        
        data.then(function (result) {
            result.forEach(result => {
                bests.push(result[i].value.bestcombo)
                users.push(result[i].value.authorid)
                i += 1
            })
        })
        

        console.log(bests)
        console.log(users)
        */

        const embed = new Discord.MessageEmbed()

            .setColor(`BLUE`)//PL
            .setTitle(`Flags Top`)
            .setFields(
                { name: "Your personal best combo", value: `${personalBest}` },
                { name: "current combo", value: `${combo}` },
                { name: "number of played games", value: `${games}` },
            )

            .setFooter(message.author.tag, message.author.avatarURL({ dynamic: true }));


        message.channel.send({ embeds: [embed] });
    }
    main()

}