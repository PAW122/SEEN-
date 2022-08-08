const { SlashCommandBuilder } = require("@discordjs/builders")
const client = require("../../../main")
module.exports = {
    isSlash: true,
	data: new SlashCommandBuilder().setName("quit").setDescription("Stops the bot and clears the queue"),
	executeInteraction: async (inter) => {
		const queue = client.player.getQueue(inter.guildId)

		if (!queue) return await inter.editReply("There are no songs in the queue")

		queue.destroy()
        await inter.editReply("Bye!")
	},
}