const axios = require('axios');
const Discord = require("discord.js");

module.exports = {
    name: "chess",

    execute: async (message, args, client) => {
        if(!args[0] || args[0] == "help") help()
        if (args[0] == "profil") profil()
        if (args[0] == "stats") stats()
        if (args[0] == "daily") daily()

        async function daily() {
            const nickname = args[1]
            if (!nickname) {
                message.reply("You dont type nickname")
                return help()
            }
            const link = ` https://api.chess.com/pub/player/${nickname}/games`
            const res = await axios.get(link)
                .catch(err => {
                    return console.log(err)
                })

            if(res.status != 200) {
                return message.reply("Check nickname and try again")
            }

            const daily = res.data.games
            if(daily.length <= 0) return message.reply(`${nickname} dont play today any games`)
        }

        async function stats() {
            const nickname = args[1]
            if (!nickname) {
                message.reply("You dont type nickname")
                return help()
            }

            const link = `https://api.chess.com/pub/player/${nickname}/stats`
            const res = await axios.get(link)
                .catch(err => {
                    return console.log(err)
                })

            if(res.status != 200) {
                return message.reply("Check nickname and try again")
            }

            const rating = res.data.chess_rapid.last.rating
            const rating_date = format_time(res.data.chess_rapid.last.date)

            const best_rating = res.data.chess_rapid.best.rating
            const best_rating_date = format_time(res.data.chess_rapid.best.date)

            const record_wins = res.data.chess_rapid.record.win
            const record_loss = res.data.chess_rapid.record.loss
            const record_draw = res.data.chess_rapid.record.draw

            try{
                var highest = res.data.tactics.highest.rating
                var highest_date = format_time(res.data.tactics.highest.date)
                var lowest = res.data.tactics.lowest.rating
                var lowest_date = format_time(res.data.tactics.highest.date)
            } catch (err) {
                console.log(err)
                var highest = "no data"
                var highest_date= "no data"
                var lowest= "no data"
                var lowest_date = "no data"
            }
            


            const embed = new Discord.MessageEmbed()
                .setTitle("Chess Stats")
                .setFields(
                    { name: "Nickname", value: `**${nickname}**` },
                    { name: "rating", value: `${rating}/${rating_date}` },
                    { name: "best_rating", value: `${best_rating}/${best_rating_date}` },
                    { name: "wins", value: `${record_wins}` },
                    { name: "loss", value: `${record_loss}` },
                    { name: "draws", value: `${record_draw}` },
                    { name: "highest", value: `${highest}/${highest_date}` },
                    { name: "lowest", value: `${lowest}/${lowest_date}` }
                )
            return message.channel.send({ embeds: [embed] });
        }

        async function profil() {

            const nickname = args[1]
            if (!nickname) {
                message.reply("You dont type nickname")
                return help()
            }

            const link = `https://api.chess.com/pub/player/${nickname}`

            const res = await axios.get(link)
                .catch(err => {
                    return
                })

            if(res.status != 200) {
                return message.reply("Check nickname and try again")
            }

            const awatar_link = res.data.avatar
            var name = res.data.name
            if(!name || name == undefined)  var name = "no data"
            const player_id = res.data.player_id
            const username = res.data.username
            const followers = res.data.followers
            const country_link = res.data.country
            const profile_link = res.data.url
            const status = res.data.status
            const is_streamer = res.data.is_streamer
            const last_online = format_time(res.data.last_online)
            const joined = format_time(res.data.joined)
            const verified = res.data.verified

            const country = await axios.get(country_link)
            const country_tag = country.data.code
            const country_name = country.data.name


            const embed = new Discord.MessageEmbed()
                .setTitle("Chess Stats")
                .setFields(
                    { name: "Nickname/username", value: `**${name}**/**${username}**` },
                    { name: "followers", value: `${followers}` },
                    { name: "Country code/name", value: `${country_tag}/${country_name}` },
                    { name: "Profile link", value: `${profile_link}` },
                    { name: "status", value: `${status}` },
                    { name: "Whether the user is a streamer?", value: `${is_streamer}` },
                    { name: "Last time online", value: `${last_online}` },
                    { name: "Joined", value: `${joined}` },
                    { name: "verified?", value: `${verified}` }

                )
                .setThumbnail(awatar_link)
            return message.channel.send({ embeds: [embed] });

        }

        function help() {
            const embed = new Discord.MessageEmbed()
                .setTitle("Chess Help")
                .setDescription("Stats from Chess.com")
                .setFields(
                    { name: "profil", value: `$chess profil <nickname>` },
                    { name: "stats", value: `$chess stats <nickname>` },
                    { name: "daily", value: `$chess daily <nickname>` }
                )
            return message.channel.send({ embeds: [embed] });
        }

        function format_time(s) {
            const date = (new Date(s * 1000).toISOString().slice(0, 19).replace('T', ' '));
            return date;
        }
    }
}