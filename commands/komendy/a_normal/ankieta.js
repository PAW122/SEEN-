const config = require(process.cwd() + `/config/worker.js`)
const work = config.ankieta
const worker = config.ankieta_work
const reason = config.ankieta_disable
const { QuickDB } = require("quick.db");
const Discord = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const srv_settings = require("../../../handlers/check_srv_settings")
//$anikieta
//$ankieta help
//$anikieta help en
module.exports = {
    name: "ankieta",
    name_en: "questionnaire",
    description: "towrzy nakiete",
    usage: "$ankieta <treść ankiety>",
    work: worker,
    isSlash: true,

    data: new SlashCommandBuilder()
        .setName('ankieta')
        .setDescription('Wyświetla aktualny ping bota')

        .addStringOption((option) =>
            option
                .setName("tu_napisz_tytuł_ankiety")
                .setDescription("w wyznaczonym polu umieść tytuł ankiety")
                .setRequired(true)
        )
        .addStringOption((option) =>
            option
                .setName("tu_napisz_treść_ankiety")
                .setDescription("w wyznaczonym polu umieść całą treść która ma się znajdować w ankiecie")
                .setRequired(true)
        ),
    executeInteraction: async (inter) => {
        if (work != true) {
            const embed_worker = new Discord.MessageEmbed()
                .setTitle('**ankieta**')
                .setColor('RANDOM')
                .setDescription(`${reason}`)
            inter.reply({ embeds: [embed_worker] });
            return (console.log("command id disabled"))
        } else {
            //load server settings ankieta
            const guildId = inter.guild.id
            const command_name = "ankieta"
            srv_settings(command_name, guildId)

            const tytuł = inter.options.getString('tu_napisz_tytuł_ankiety')
            const treść = inter.options.getString('tu_napisz_treść_ankiety')

            const embed = new Discord.MessageEmbed()
                .setColor("BLUE")
                .setTitle(tytuł)
                .setDescription(treść)

            inter.reply({ embeds: [embed] });
        }
    },

    execute: async (message, args, client) => {
        //load server settings
        const guildId = message.guild.id
        const command_name = "ankieta"
        srv_settings(command_name, guildId)

        if (work != true) { return message.channel.send(reason) }


        if (args[0] == "help") {
            if (args[1] == "en") {
                const embed_en = new Discord.MessageEmbed()

                    .setColor(`RED`)//EN
                    .setTitle(`help`)
                    .setDescription(`creates a poll with the content specified by the user \n
                use: "$questionnaire <content_questionnaire>"
                example: "$questionnaire SEEN is the best discord bot"`)

                    .setFooter(message.author.tag, message.author.avatarURL({ dynamic: true }));


                message.channel.send({ embeds: [embed_en] });
            } else {
                const embed_pl = new Discord.MessageEmbed()

                    .setColor(`BLUE`)//PL
                    .setTitle(`help`)
                    .setDescription(`tworzy ankiete o treści podanej przez urzytkownika\n
                użycie: "$ankieta <treść_ankety>"
                przykład: "$ankieta SEEN to najlepszy discord bot"`)

                    .setFooter(message.author.tag, message.author.avatarURL({ dynamic: true }));


                message.channel.send({ embeds: [embed_pl] });
            }
        } else {


            const msg = message.content.slice(8) //zostają same argumenty
            const msg2 = message.content.slice(14)//zostają same argumenty dla questionare



            if (message.deletable) {
                message.delete();
            }


            const embed = new Discord.MessageEmbed()
                .setColor("BLUE")
                .setTitle("Ankieta:")
                .setDescription(msg)
                .setTimestamp()
                .setFooter(message.author.tag, message.author.avatarURL({ dynamic: true }));

            const embed2 = new Discord.MessageEmbed()
                .setColor("RED")
                .setTitle("questionnaire:")
                .setDescription(msg2)
                .setTimestamp()
                .setFooter(message.author.tag, message.author.avatarURL({ dynamic: true }));


            const switch_ln = message.content.slice(1)//usówa prefix

            if (switch_ln.startsWith("ankieta")) {
                try {
                    message.channel.send({ embeds: [embed] }).then(embedMessage => {
                        embedMessage.react("✅");
                        embedMessage.react("❌");
                    });
                } catch (err) {
                    message.channel.send("Upewnij się że podałeś treść ankiety")
                    console.log(err);
                }
            } else {
                try {//wersja ang
                    message.channel.send({ embeds: [embed2] }).then(embedMessage => {
                        embedMessage.react("✅");
                        embedMessage.react("❌");
                    });
                } catch (err) {
                    message.channel.send("Make sure you have entered the content of the survey")
                    console.log(err);
                }
            }

        }

    }
}