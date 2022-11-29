const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
	isSlash: true,
	data: new SlashCommandBuilder().setName("resume").setDescription("Resumes the music"),
	executeInteraction: async (interaction, client) => {
		const queue = client.player.getQueue(interaction.guildId)

		if (!queue) return await interaction.editReply("There are no songs in the queue")

		queue.setPaused(false)
        await interaction.editReply("Music has been paused! Use `/pause` to resume the music")
	},
}