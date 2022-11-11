const axios = require("axios")
const Discord = require("discord.js")
module.exports = {
    name: "valo",

    execute: async (message, args, client) => {

        if (args[0] == "help") {
            const embed_pl = new Discord.MessageEmbed()

                .setColor(`BLUE`)//PL
                .setTitle("ACC STATS")
                .addFields(
                    { name: `how to use`, value: `$valo mmr <nickname> <tagline>\n example: $valo mmr PAW1172016 EUNE`, inline: false },
                    { name: `mmr history`, value: `see your last 10 ranking match\n$valo mmrHistory <nickname> <tagline>\nexample: $valo mmrHistory PAW1172016 EUNE` },
                    { name: `last mathces`, value: `show your last 5 matches\n usage: **$valo last_mathces <match type>**\n example: $valo last_mathces deathmatch` },
                    { name: 'get_article', value: "show last valorant articles\n usage: **$valo get_article <type>** \n example: **$valo get_article game_updates**\n type list: game_updates, dev, esports, announcments" }
                )

                .setFooter(message.author.tag, message.author.avatarURL({ dynamic: true }));


            return message.channel.send({ embeds: [embed_pl] });
        }

        const nickname = args[1]
        const tagline = args[2]

        if (args[0] == "mmr") mmr()
        if (args[0] == "mmrHistory") mmr_History()
        if (args[0] == "last_mathces") last_mathces()
        if (args[0] == "get_article") get_article()

        async function mmr() {
            const link = `https://api.henrikdev.xyz/valorant/v1/account/${nickname}/${tagline}`
            console.log(link)
            const response = await axios.get(link)
                .catch(err => {
                    console.log(err)
                })

            if (response.data.status == 429) { return message.reply("the bot has reached the maximum number of queries sent. Please try in a few minutes") }
            if (!response || response.data.status != 200) return message.reply("Bad informations. Check nickname and tagline.\n try use $valo help")

            // response =>
            const region = response.data.data.region
            const name = response.data.data.name
            const puuid = response.data.data.puuid

            // get MMR data
            const url = `https://api.henrikdev.xyz/valorant/v1/by-puuid/mmr/${region}/${puuid}`
            const mmr = await axios.get(url).catch(err => {
                console.log(err)
            })


            const rank = mmr.data.data.currenttierpatched
            const mmr_change_to_last_game = mmr.data.data.mmr_change_to_last_game
            const elo = mmr.data.data.elo

            const embed_pl = new Discord.MessageEmbed()
                .setColor(`BLUE`)//PL
                .setTitle("ACC STATS")
                .addFields(
                    { name: `nickname:`, value: `${nickname}#${tagline}`, inline: false },
                    { name: `region:`, value: `${region}`, inline: false },
                    { name: `rank:`, value: `${rank}` },
                    { name: `mmr change to last game:`, value: `${mmr_change_to_last_game}` },
                    { name: `elo:`, value: `${elo}` }
                    //{name: ``, value: ``}
                )
                //.setImage(`${card_image}`)
                .setFooter(message.author.tag, message.author.avatarURL({ dynamic: true }));
            return message.channel.send({ embeds: [embed_pl] });
        }

        async function mmr_History() {
            const link = `https://api.henrikdev.xyz/valorant/v1/account/${nickname}/${tagline}`
            console.log(link)
            const response = await axios.get(link)
                .catch(err => {
                    console.log(err)
                })

            if (response.data.status == 429) { return message.reply("the bot has reached the maximum number of queries sent. Please try in a few minutes") }
            if (!response || response.data.status != 200) return message.reply("Bad informations. Check nickname and tagline.\n try use $valo help")

            const region = response.data.data.region
            const name = response.data.data.name
            const puuid = response.data.data.puuid

            //get MEE History
            const url_hisotry = `https://api.henrikdev.xyz/valorant/v1/by-puuid/mmr-history/${region}/${puuid}`
            const mmr_history = await axios.get(url_hisotry).catch(err => {
                console.log(err)
            })

            //niewiem co dostane jak informację zwrotną jeżeli urzytkownik zagrał miej niż 10 rankedów

            const match1_stats = mmr_history.data.data[0]
            const match2_stats = mmr_history.data.data[1]
            const match3_stats = mmr_history.data.data[2]
            const match4_stats = mmr_history.data.data[3]
            const match5_stats = mmr_history.data.data[4]
            const match6_stats = mmr_history.data.data[5]
            const match7_stats = mmr_history.data.data[6]
            const match8_stats = mmr_history.data.data[7]
            const match9_stats = mmr_history.data.data[8]
            const match10_stats = mmr_history.data.data[9]


            const embed_pl = new Discord.MessageEmbed()
                .setColor(`BLUE`)//PL
                .setTitle("ACC STATS")
                .addFields(
                    {
                        name: `match1:`, value: `
            rank: ${match1_stats.currenttierpatched}
            mmr change to last game: ${match1_stats.mmr_change_to_last_game}
            elo: ${match1_stats.elo}
            date: ${match1_stats.date}`, inline: false
                    },

                    {
                        name: `match2:`, value: `
            rank: ${match2_stats.currenttierpatched}
            mmr change to last game: ${match2_stats.mmr_change_to_last_game}
            elo: ${match2_stats.elo}
            date: ${match2_stats.date}`, inline: false
                    },

                    {
                        name: `match3:`, value: `
            rank: ${match3_stats.currenttierpatched}
            mmr change to last game: ${match3_stats.mmr_change_to_last_game}
            elo: ${match3_stats.elo}
            date: ${match3_stats.date}`, inline: false
                    },

                    {
                        name: `match4:`, value: `
            rank: ${match4_stats.currenttierpatched}
            mmr change to last game: ${match4_stats.mmr_change_to_last_game}
            elo: ${match4_stats.elo}
            date: ${match4_stats.date}`, inline: false
                    },

                    {
                        name: `match5:`, value: `
            rank: ${match5_stats.currenttierpatched}
            mmr change to last game: ${match5_stats.mmr_change_to_last_game}
            elo: ${match5_stats.elo}
            date: ${match5_stats.date}`, inline: false
                    },

                    {
                        name: `match6:`, value: `
            rank: ${match6_stats.currenttierpatched}
            mmr change to last game: ${match6_stats.mmr_change_to_last_game}
            elo: ${match6_stats.elo}
            date: ${match6_stats.date}`, inline: false
                    },

                    {
                        name: `match7:`, value: `
            rank: ${match7_stats.currenttierpatched}
            mmr change to last game: ${match7_stats.mmr_change_to_last_game}
            elo: ${match7_stats.elo}
            date: ${match7_stats.date}`, inline: false
                    },

                    {
                        name: `match8:`, value: `
            rank: ${match8_stats.currenttierpatched}
            mmr change to last game: ${match8_stats.mmr_change_to_last_game}
            elo: ${match8_stats.elo}
            date: ${match8_stats.date}`, inline: false
                    },

                    {
                        name: `match9:`, value: `
            rank: ${match9_stats.currenttierpatched}
            mmr change to last game: ${match9_stats.mmr_change_to_last_game}
            elo: ${match9_stats.elo}
            date: ${match9_stats.date}`, inline: false
                    },

                    {
                        name: `match10:`, value: `
            rank: ${match10_stats.currenttierpatched}
            mmr change to last game: ${match10_stats.mmr_change_to_last_game}
            elo: ${match10_stats.elo}
            date: ${match10_stats.date}`, inline: false
                    },

                )
                //.setImage(`${card_image}`)
                .setFooter(message.author.tag, message.author.avatarURL({ dynamic: true }));
            return message.channel.send({ embeds: [embed_pl] });
        }

        async function last_mathces() {
            //escalation, spikerush, deathmatch, competitive, unrated, replication
            if (!args[1]) return message.reply("you dont specify match type");

            if (args[1] != "escalation" && args[1] != "spikerush" && args[1] != "deathmatch" && args[1] != "competitive" && args[1] != "unrated" && args[1] != "replication") {
                return message.reply("tru use one from this list:\n escalation, spikerush, deathmatch, competitive, unrated, replication");
            }

            return message.reply("w trakcie prac");
            //ma pokazywać po 5 ostatnich zagranych meczy +
            //zrobić coś ala premium i będzie pokazywał 25 ostatnich meczy
        }

        async function get_article() {

            if (!args[1]) return message.reply("you dont specify article type. \n use **$valo help** to get more informations how use this command")
            const type = args[1]
            if (type != "game_updates" && type != "dev" && type != "esports" && type != "announcments") {
                return message.reply("you dont specify article type. \n use **$valo help** to get more informations how use this command")
            }


            const link = `https://api.henrikdev.xyz/valorant/v1/website/en-us?filter=${type}`
            console.log(link)
            const response = await axios.get(link)
                .catch(err => {
                    console.log(err)
                })

            if (response.data.status == 429) { return message.reply("the bot has reached the maximum number of queries sent. Please try in a few minutes") }
            if (!response || response.data.status != 200) return message.reply("Bad informations. Check nickname and tagline.\n try use $valo help")

            const one = response.data.data[0]
            const two = response.data.data[1]
            const three = response.data.data[2]
            const four = response.data.data[3]
            const five = response.data.data[4]

            const embed_pl = new Discord.MessageEmbed()
                .setColor(`BLUE`)//PL
                .setTitle(`Last 5 ${type} articles`)
                .addFields(
                    { name: `${one.title}`, value: `**category: ${one.category}**\n date: ${one.date}\n url: ${one.url}`, inline: false },
                    { name: `${two.title}`, value: `**category: ${two.category}**\n date: ${two.date}\n url: ${two.url}`, inline: false },
                    { name: `${three.title}`, value: `**category: ${three.category}**\n date: ${three.date}\n url: ${three.url}`, inline: false },
                    { name: `${four.title}`, value: `**category: ${four.category}**\n date: ${four.date}\n url: ${four.url}`, inline: false },
                    { name: `${five.title}`, value: `**category: ${five.category}**\n date: ${five.date}\n url: ${five.url}`, inline: false }
                )
                .setFooter(message.author.tag, message.author.avatarURL({ dynamic: true }));
            return message.channel.send({ embeds: [embed_pl] });
        }






    }
}