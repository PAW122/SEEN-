const Discord = require("discord.js")

const data_pl = require("./pl.json")
const records_pl = data_pl.records
//jons - records = ilość "przemyśleń w pliku"
module.exports = {
    name: "przemyślenia",

    execute: async (message, args, client) => {
        if (args[0] == "help") {
            const embed = new Discord.MessageEmbed()

                .setColor(`RANDOM`)//PL
                .setTitle(`**przemyślenia** / **thoughts**`)
                .setDescription("bot sending random thoughts")
                .setFooter(message.author.tag, message.author.avatarURL({ dynamic: true }));
            return message.channel.send({ embeds: [embed] });
        }


        const rng = Math.floor(Math.random() * records_pl) + 1;

        const embed_pl = new Discord.MessageEmbed()

            .setColor(`BLUE`)//PL
            .setTitle(`Przemyślenia: ${rng}/${records_pl}`)
            .setDescription(`${data_pl[rng]}`)
            .setFooter(message.author.tag, message.author.avatarURL({ dynamic: true }));
        return message.channel.send({ embeds: [embed_pl] });
    }
}