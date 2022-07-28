const config = require(process.cwd() + `/config/worker.js`)
const work = config.ping
const worker = config.ping_work
const reason = config.ping_disable
const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
//$ping
//$ping help
//$ping help en
module.exports = {
    name: "ping",
    name_en: "ping",
    description: "wysyła pong",
    usage: "$ping",
    work: worker,
    isSlash: true,


    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Wyświetla aktualny ping bota'),
    executeInteraction: async (inter) => {
        if(work != true){
            const embed_worker = new Discord.MessageEmbed()
            .setTitle('**ping**')
            .setColor('RANDOM')
            .setDescription(`${reason}`)
        inter.reply({ embeds: [embed_worker] });
        }
        const embed = new Discord.MessageEmbed()
            .setTitle('**PONG!**')
            .setColor('RANDOM')
            .setDescription(`${Date.now() - inter.createdTimestamp}ms`)
        inter.reply({ embeds: [embed] });
    },


    execute: async (message, args) => {

        if (work != true) { return message.channel.send(reason) }


        if (args[0] == "help") {
            if (args[1] == "en") {
                const embed_en = new Discord.MessageEmbed()

                    .setColor(`RED`)//EN
                    .setTitle(`Ping`)
                    .setDescription(`bot sends a message saying: "Pong" \n
                the command is used to check if the bot is online\n
                usage: "$ping"`)

                    .setFooter(message.author.tag, message.author.avatarURL({ dynamic: true }));


                message.channel.send({ embeds: [embed_en] });
            } else {
                const embed_pl = new Discord.MessageEmbed()

                    .setColor(`BLUE`)//PL
                    .setTitle(`Ping`)
                    .setDescription(`bot wysyła wiadomość o treści: "Pong"\n
                komenda służy do sprawdzania czy bot jest online\n
                użycie: "$ping"`)

                    .setFooter(message.author.tag, message.author.avatarURL({ dynamic: true }));


                message.channel.send({ embeds: [embed_pl] });
            }
        } else {
            message.channel.send("pong!")
        }
    }
}

