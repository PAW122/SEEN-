const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports = {
	isSlash: true,
	data: new SlashCommandBuilder().setName("info").setDescription("Displays info about the currently playing song"),
	executeInteraction: async (interaction, client) => {
		const queue = client.player.getQueue(interaction.guildId)

		if (!queue) return await interaction.editReply("There are no songs in the queue")

		let bar = queue.createProgressBar({
			queue: false,
			length: 19,
		})

        const song = queue.current

		await interaction.editReply({
			embeds: [new MessageEmbed()
            .setThumbnail(song.thumbnail)
            .setDescription(`Currently Playing [${song.title}](${song.url})\n\n` + bar)
        ],
		})
	},
}