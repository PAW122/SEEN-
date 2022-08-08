const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
const client = require("../../../main")
module.exports = {
    isSlash: true,
	data: new SlashCommandBuilder().setName("info").setDescription("Displays info about the currently playing song"),
	executeInteraction: async (inter) => {
        
		const queue = client.player.getQueue(inter.guildId)

		if (!queue) return await inter.editReply("There are no songs in the queue")

		let bar = queue.createProgressBar({
			queue: false,
			length: 19,
		})

        const song = queue.current

		await inter.editReply({
			embeds: [new MessageEmbed()
            .setThumbnail(song.thumbnail)
            .setDescription(`Currently Playing [${song.title}](${song.url})\n\n` + bar)
        ],
		})
	},
}