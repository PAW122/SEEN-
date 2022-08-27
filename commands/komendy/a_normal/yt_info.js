const config = require(process.cwd() + `/config/worker.js`)

const Discord = require("discord.js")
const getChannelStats = require("../../../handlers/yt_stats")

const {SlashCommandBuilder} = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const {QuickDB} = require("quick.db")
module.exports = {
    name: "ytinfo",

    execute: async(message, args) => {
        
        const channelId = args[0]
        getChannelStats(channelId).then(data => {
            const embed_en = new Discord.MessageEmbed()

                .setColor(`BLUE`)
                .setTitle(`YT STATS`)
            .setFields(
                {name: "Subscribers:", value: `${data.subscribers}`},
                {name: "Wyświetlenia:", value: `${data.views}`},
                {name: "Liczba filmów:", value: `${data.videos}`}
            )
                .setFooter(message.author.tag, message.author.avatarURL({dynamic: true}));
        
        
                message.channel.send({embeds: [embed_en]});
        })
    }
   
}
