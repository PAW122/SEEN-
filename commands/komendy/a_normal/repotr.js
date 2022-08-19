const config = require(process.cwd() + `/config/worker.js`)
const work = config.report
const worker = config.report_worker
const reason = config.report_disable

const config2 = require("../../../config/config")
const report_channel = config2.report_channel_id

const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
const { QuickDB } = require("quick.db")

//const client = require("../../../main")

module.exports = {
    name: "report",
    work: worker,
    isSlash: true,


    data: new SlashCommandBuilder()
        .setName('report')
        .setDescription('send report to bot support')
        .addStringOption((option) =>
            option
                .setName("messages")
                .setDescription("type here your question / bug report")
                .setRequired(true)
        ),

    executeInteraction: async (inter,client) => {
        if (work != true) {
            const embed_worker = new Discord.MessageEmbed()
                .setTitle('**report**')
                .setColor('RANDOM')
                .setDescription(`${reason}`)
            inter.reply({ embeds: [embed_worker] });
            return (console.log("command id disabled"))
        } else {
            //load server settings
            const author = inter.user.id
            const author_tag = inter.user.tag
            const guildId = inter.guild.id
            const db = new QuickDB({ filePath: process.cwd() + `/db/srv_settings/commands/${guildId}.sqlite` });
            if (await db.get(`report.check`) == true) {
                const settings = await db.get(`report.worker`)
                const settings_reason = await db.get(`report.reason`)
                if (settings != true) { return message.channel.send(settings_reason) }
            }

            const message_content = inter.options.getString('messages')


            const embed = new Discord.MessageEmbed()
            .setColor(`BLUE`)
            .setTitle(`Ticket created by ${author}/${author_tag} on server ${inter.guild.id}`)
            .setDescription(`${message_content}`)


            try {
                client.channels.cache.get(report_channel).send({ embeds: [embed] });

                inter.reply("Thank you for informing about the errors\n We will try to answer your question as soon as possible")
            } catch (err) {
                console.log(err)
                inter.reply("An error occurred while sending a message")
            }

        }
    },



    execute: async (message, args, client) => {


        if (work != true) { return message.channel.send(reason) }
        const db = new QuickDB({ filePath: process.cwd() + `/db/blacklist/blacklist.sqlite` });

        if (args[0] == "help") {
            return message.reply(`send questions / send bug reports
            usage: $report <example-text>
            example: $report how is this command working?`)
        }

        if (await db.get(`${message.author.id}.check`) == true) {
            return message.reply("you have been banned by the reporting system")
        }


        const report_content = message.content.slice(7)

        if (report_content == null) {
            return message.reply("use $report help to get information about using this command")
        }

        const embed = new Discord.MessageEmbed()
            .setColor(`BLUE`)
            .setTitle(`Ticket created by ${message.author.id}/${message.author.tag} on server ${message.guild.id}`)
            .setDescription(`${report_content}`)


        //send_on_id.send({embeds: [embed]});
        try {
            client.channels.cache.get(report_channel).send({ embeds: [embed] });
            message.reply("Thank you for informing about the errors\n We will try to answer your question as soon as possible")
        } catch (err) {
            message.reply("An error occurred while sending a message")
        }
    }

}
