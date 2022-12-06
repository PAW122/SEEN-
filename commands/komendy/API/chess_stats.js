const axios = require('axios');
const Discord = require("discord.js");

module.exports = {
    name: "chess",

    execute: async (message, args, client) => {
        if (args[0] == "profil") profil()
        if (args[0] == "stats") stats()

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

            console.log(res)
            const chess_rapid = res.data.chess_rapid
            const tactics = res.data.tactics

            console.log(chess_rapid)
            console.log(tactics)//do dokończenia od tego momentu
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
            const name = res.data.name
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
                    { name: "usage", value: `$chess stats <nickname>` }
                )
            return message.channel.send({ embeds: [embed] });
        }

        function format_time(s) {
            const date = (new Date(s * 1000).toISOString().slice(0, 19).replace('T', ' '));
            return date;
        }
    }
}