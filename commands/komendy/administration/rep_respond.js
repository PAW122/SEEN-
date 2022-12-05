

const config2 = require("../../../config/config")
const report_channel = config2.report_channel_id

const Discord = require('discord.js');


module.exports = {
    name: "response",


    execute: async (message, args, client) => {

        
        if(args[0] == "help"){
            return message.reply(`
            usage: $response <created_by_id> <examlpe-text>
            example: $response 797070806885990431 hello`)
        }

        if(message.channel != report_channel){
            return
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
            .setTitle(`Ticket response`)
            .setDescription(`${response_content}`)


        try {
            client.users.cache.get(args[0]).send({ embeds: [embed] });
            message.reply("response send")
        } catch (err) {
            message.reply("An error occurred while sending a message")
        }
    }

}
