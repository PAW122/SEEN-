const axios = require("axios");
const Discord = require("discord.js");
const uuid = require("./UUIDs.json");

const Ascent = uuid.maps.Ascent
const Split = uuid.maps.Split
const Bind = uuid.maps.Bind
const Icebox = uuid.maps.Icebox
const The_Range = uuid.maps.The_Range
const Shooting_Range = uuid.maps.Shooting_Range
const Haven = uuid.maps.Haven

module.exports = (message, args, client) => {

    async function main() {

        if (!args[1]) {
            return message.reply("type map name. usage: $valo maps <map name>\n example: **$valo maps Ascent**\n use **$valo maps list** to get map list")
        }

        if (args[1] == "list") {
            return message.reply("``Haven``" + "," + "``Shooting_Range``"
                + "," + "``The_Range``" + "," + "``Icebox``" + "," + "``Bind``"
                + "," + "``Split``" + "," + "``Ascent``")
        }

        if (args[1] != "Ascent" && args[1] != "Split" && args[1]
            != "Bind" && args[1] != "Icebox" && args[1] != "The_Range"
            && args[1] != "Shooting_Range" && args[1] != "Haven") {
            return message.reply("Bad map name try use")
        }

        const map_name = args[1]
        if (map_name == "Ascent") var link = `https://valorant-api.com/v1/maps/${Ascent}`;
        if (map_name == "Split") var link = `https://valorant-api.com/v1/maps/${Split}`;
        if (map_name == "Bind") var link = `https://valorant-api.com/v1/maps/${Bind}`;
        if (map_name == "Icebox") var link = `https://valorant-api.com/v1/maps/${Icebox}`;
        if (map_name == "The_Range") var link = `https://valorant-api.com/v1/maps/${The_Range}`;
        if (map_name == "Shooting_Range") var link = `https://valorant-api.com/v1/maps/${Shooting_Range}`;
        if (map_name == "Haven") var link = `https://valorant-api.com/v1/maps/${Haven}`;


        const response = await axios.get(link).then(res => {

            const map = res.data.data.displayIcon
            const displayName = res.data.data.displayName
            const listViewIcon = res.data.data.listViewIcon

            const embed_pl = new Discord.MessageEmbed()
                .setColor(`BLUE`)//PL
                .setTitle(`${displayName}`)
                .setImage(`${map}`)
                .setThumbnail(`${listViewIcon}`)
                .setFooter(message.author.tag, message.author.avatarURL({ dynamic: true }));
            return message.channel.send({ embeds: [embed_pl] });


        }).catch(err => {
            console.log(err);
        })
    }
    main()
}