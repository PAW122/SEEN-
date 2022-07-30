const config = require(process.cwd() + `/config/worker.js`)
const work = config.lvl_command
const worker = config.lvl_command_work
const reason = config.lvl_command_disable
const Discord = require("discord.js")
const Levels = require("discord-xp")
const { MessageEmbed } = require("discord.js")
const { SlashCommandBuilder } = require('@discordjs/builders');
const mongoose = require("mongoose")
module.exports = {
    name: "leaderboard",
    work: worker,
    isSlash: true,

    data: new SlashCommandBuilder()
    .setName('leaderboard')
    .setDescription('Sprawdż leaderboard'),

executeInteraction: async (inter) => {
    if(work != true){
        const embed_worker = new Discord.MessageEmbed()
        .setTitle('**lvl**')
        .setColor('RANDOM')
        .setDescription(`${reason}`)
     inter.reply({ embeds: [embed_worker] });
     return(console.log("command id disabled"))
    }else{
        console.log(mongoose.connection.readyState)
    
        const rawLeaderBoard = await Levels.fetchLeaderboard(inter.guild.id, 10)
        if(rawLeaderBoard.lenght < 1){
            return inter.followUp("Nie ma nikogo na leaderboard")
        }else{
            const leaderboard = await Levels.computeLeaderboard(
                client,
                rawLeaderBoard,
                true
            );
            let lb = await leaderboard.map((e) => {
                return `\`${e.position}\`** ${e.username}#${e.discnimination} ** \n
                Level" ${e.level} \n XP: ${e.xp.toLocaleString()}`
            });

            inter.followUp({embeds: [
                new MessageEmbed()
                .setColor("RANDOM")
                .setTitle(`** LeaderBoard of ${inter.guild.name} **`)
                .setDescription(lb.join("\n"))
                .setThumbnail(inter.user.displayAvatarURL({dynamic: true}))
                .setFooter({text: `Requested By ${inter.user.tag}`,
            iconURL: inter.user.displayAvatarURL({dynamic: true})})
            ]})
        }

    }
},


    execute: async (message, args) => {
        if (work != true) { return message.channel.send(reason) }

        
        
    }
}