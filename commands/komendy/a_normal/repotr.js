const config = require(process.cwd() + `/config/worker.js`)
const work = config.report
const worker = config.report_worker
const reason = config.report_disable

const config2 = require("../../../config/config")
const report_channel = config2.report_channel_id

const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
const { QuickDB } = require("quick.db")


module.exports = {
    name: "report",
    work: worker,

    execute: async (message, args, client) => {
        

        if (work != true) { return message.channel.send(reason) }
        const db = new QuickDB({ filePath: process.cwd() + `/db/blacklist/blacklist.sqlite` });
        
        if(args[0] == "help"){
            return message.reply(`send questions / send bug reports
            usage: $report <example-text>
            example: $report how is this command working?`)
        }

        if(await db.get(`${message.author.id}.check`) == true){
            return message.reply("you have been banned by the reporting system")
        }
       

        const report_content = message.content.slice(7)
        
        if(report_content == null){
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
