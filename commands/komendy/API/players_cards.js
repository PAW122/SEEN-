const axios = require('axios');
const Discord = require("discord.js")
module.exports = (message, args, client) => {
    async function main() {
        message.react("✅")
        //get user UUID
        const nickname = args[1]
        const tagline = args[2]

        if(!args[1] || !args[2]) {
            return message.reply("usage: **$valo player_cards <nickname> <tagline>**\n example: **$valo player_cards PAW1172016 EUNE** ")
        }
        const link = `https://api.henrikdev.xyz/valorant/v1/account/${nickname}/${tagline}`
        //console.log(link)
        const response = await axios.get(link)
            .catch(err => {
                console.log(err)
            })

        if (response.data.status == 429) { return message.reply("the bot has reached the maximum number of queries sent. Please try in a few minutes") }
        if (!response || response.data.status != 200) return message.reply("Bad informations. Check nickname and tagline.\n try use $valo help")

        const region = response.data.data.region
        const name = response.data.data.name
        const puuid = response.data.data.puuid
        const card_uuid = response.data.data.card.id
        const acc_lvl = response.data.data.account_level



        const link_card = `https://valorant-api.com/v1/playercards/${card_uuid}`

        const res = await axios.get(link_card).then(res => {
            const status = res.status
            if(status != 200) return message.reply("error")

            const card_uuid = res.data.data.uuid
            const displayName = res.data.data.displayName
            const image = res.data.data.largeArt

            const embed_pl = new Discord.MessageEmbed()
            .setColor(`BLUE`)//PL
            .setTitle(`${nickname}#${tagline} Profile Card:`)
            .setFields(
                { name: "acc lvl", value: `${acc_lvl}`},
                { name: `Name:`, value: `${displayName}` },
            )
            .setImage(image)
            .setFooter(message.author.tag, message.author.avatarURL({ dynamic: true }));
        return message.channel.send({ embeds: [embed_pl] });

        }).catch(err => {
            console.log(err)
            return message.reply("Error")//https://valorant-api.com/v1/playercards/5ab4ad52-4b9b-53e1-af4c-ae6f13a718ba

        })

    }
    main()
}