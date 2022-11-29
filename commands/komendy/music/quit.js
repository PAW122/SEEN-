const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
	isSlash: true,
	data: new SlashCommandBuilder().setName("quit").setDescription("Stops the bot and clears the queue"),
	executeInteraction: async (interaction, client) => {
		const queue = client.player.getQueue(interaction.guildId)

		if (!queue) return await interaction.editReply("There are no songs in the queue")

		queue.destroy()
        await interaction.editReply("Bye!")
	},
}