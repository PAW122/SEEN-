const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require("discord.js")
const client = require("../../../main")

module.exports = {
    //name: "play",
    //description: "wysyła pong",
    //usage: "$ping",
    //work: worker,
    isSlash: true,


    data: new SlashCommandBuilder()
        .setName('queue')
        .setDescription('displayes the current song queue')
        .addNumberOption((option) =>
            option.setName("page")
                .setDescription("page number of the queu")
                .setMinValue(1)
        ),

        executeInteraction: async (inter) => {
        const queue = client.player.getQueue(inter.guildId)
        if (!queue || !queue.playing){
            return await inter.editReply("There are no songs in the queue")
        }

        const totalPages = Math.ceil(queue.tracks.length / 10) || 1
        const page = (inter.options.getNumber("page") || 1) - 1

        if (page > totalPages) 
            return await inter.editReply(`Invalid Page. There are only a total of ${totalPages} pages of songs`)
        
        const queueString = queue.tracks.slice(page * 10, page * 10 + 10).map((song, i) => {
            return `**${page * 10 + i + 1}.** \`[${song.duration}]\` ${song.title} -- <@${song.requestedBy.id}>`
        }).join("\n")

        const currentSong = queue.current

        await inter.editReply({
            embeds: [
                new MessageEmbed()
                    .setDescription(`**Currently Playing**\n` + 
                    (currentSong ? `\`[${currentSong.duration}]\` ${currentSong.title} -- <@${currentSong.requestedBy.id}>` : "None") +
                    `\n\n**Queue**\n${queueString}`
                    )
                    .setFooter({
                        text: `Page ${page + 1} of ${totalPages}`
                    })
                    .setThumbnail(currentSong.setThumbnail)
            ]
        })
    }
}