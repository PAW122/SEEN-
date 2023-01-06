const config = require(process.cwd() + `/config/worker.js`)
const work = config.ping
const worker = config.ping_work
const reason = config.ping_disable

var fs = require("fs");

const Discord = require('discord.js');
const { MessageAttachment } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

const help_embed = new Discord.MessageEmbed()

    .setColor(`RANDOM`)
    .setTitle(`message_logs`)
    .setFields(
        {name: "$message_logs", value: "send txt file with all messages sended on the server from moment when bot was added"},
    )

module.exports = {
    name: "message_logs",
    work: worker,
    isSlash: true,
    help: help_embed,

    data: new SlashCommandBuilder()
        .setName('message_logs')
        .setDescription('wysyła plik .txt z logami wszystkich wiadomości wysłanych na serwerze podczas działania bota'),

    executeInteraction: async (inter) => {
        if (work != true) {
            const embed_worker = new Discord.MessageEmbed()
                .setTitle('**message logs**')
                .setColor('RANDOM')
                .setDescription(`${reason}`)
            inter.reply({ embeds: [embed_worker] });
            return (console.log("command id disabled"))
        } else {
            const srv = inter.guild.id + ".txt"
            const file = `${process.cwd()}/config/logs/${srv}`
            const attachment = new MessageAttachment(`${process.cwd()}/config/logs/${srv}`)
            check_file_inter(file)

            inter.reply({ files: [attachment] })

        }
        function check_file_inter(file) {
            var stats = fs.statSync(file)
            var fileSizeInBytes = stats.size;
            // Convert the file size to megabytes
            var fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);
            if (fileSizeInMegabytes > 1.5) {
                return inter.reply("Your file probably is to big use **$message_logs clear** to delete file")
            }
        }
    },

    execute: async (message, args) => {


        if (work != true) { return message.channel.send(reason) }

        if (args[0] == "clear") {
            if (!message.member.permissions.has("ADMINISTRATOR")) {
                return message.channel.send("nie masz uprawnień do usuwania wiadomości")
            }
            return message.reply("this function been added in the future")
            try{
            const srv = message.guild.id + ".txt"
            const file = `${process.cwd()}/config/logs/${srv}`
            var filePath = file;
            fs.unlinkSync(filePath);
            }catch(err){
                console.log(err)
            }
        }

        if (args[0] == "help") {
            if (args[1] == "en") {
                const embed_en = new Discord.MessageEmbed()

                    .setColor(`RED`)//EN
                    .setTitle(`logs`)
                    .setDescription(`bot sends a text file with all messages sent to the server
                usage: $message_logs
                to clear logs file use: **$message_logs clear**`)

                    .setFooter(message.author.tag, message.author.avatarURL({ dynamic: true }));


                message.channel.send({ embeds: [embed_en] });
            } else {
                const embed_pl = new Discord.MessageEmbed()

                    .setColor(`BLUE`)//PL
                    .setTitle(`logs`)
                    .setDescription(`bot wysyła plik textowy z wszystkimi wiadomościami wysłanymi na serwerze po dodaniu bota
                 użycie: $message_logs
                 aby usunąć plik z logami użyj: **$message_logs clear**`)

                    .setFooter(message.author.tag, message.author.avatarURL({ dynamic: true }));


                message.channel.send({ embeds: [embed_pl] });
            }
        } else {
            if (!message.member.permissions.has("ADMINISTRATOR")) {
                return message.channel.send("nie masz uprawnień do usuwania wiadomości")
            }

            const srv = message.guild.id + ".txt"
            const file = `${process.cwd()}\\config\\logs\\${srv}`
            const attachment = new MessageAttachment(`${process.cwd()}/config/logs/${srv}`)
            check_file(file)
            try {
                message.channel.send({ files: [attachment] });
            } catch (error) {
                console.log(error)
                message.reply("nie znaleziono pliku")
            }
        }
        function check_file(file) {
            var stats = fs.statSync(file)
            var fileSizeInBytes = stats.size;
            // Convert the file size to megabytes
            var fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);
            if (fileSizeInMegabytes > 1.5) {
                return message.channel.send("Your file probably is to big use **$message_logs clear** to delete file")
            }
        }
    }
}