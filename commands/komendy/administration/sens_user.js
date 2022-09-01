

const config2 = require("../../../config/config")
const report_channel = config2.report_channel_id

const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require("discord.js")
const config = require("../../../config/config")
const prefix = config.prefix
const owner_id = config.owner_id

const { QuickDB } = require("quick.db")


module.exports = {
    name: "send_user",


    execute: async (message, args, client) => {

        
        if (message.author.id != owner_id) {
            return message.reply(`Bot owner is <@${owner_id}>`)
        }
        if(args[0] == null){
            return message.reply("nie podałeś id użytkownika")
        }
        if(isNaN(args[0])){
            return message.reply("nie podałeś id użytkownika")
        }
        const add = args[0].length

        const response_content = message.content.slice(10 + add)

        
        if(response_content == null){
            return message.reply("no content")
        }
        
        const embed = new Discord.MessageEmbed()
            .setColor(`BLUE`)
            .setTitle(`Owner Message`)
            .setDescription(`${response_content}`)


        //send_on_id.send({embeds: [embed]});
        try {
            client.users.cache.get(args[0]).send({ embeds: [embed] });
            message.reply("response send")
        } catch (err) {
            message.reply("An error occurred while sending a message")
        }
    }

}
