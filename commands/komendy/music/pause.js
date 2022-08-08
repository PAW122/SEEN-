const { SlashCommandBuilder } = require("@discordjs/builders")
const client = require("../../../main")
module.exports = {
    isSlash: true,
	data: new SlashCommandBuilder().setName("pause").setDescription("Pauses the music"),
    executeInteraction: async (inter) => {
		const queue = client.player.getQueue(inter.guildId)

		if (!queue) return await inter.editReply("There are no songs in the queue")

		queue.setPaused(true)
        await inter.editReply("Music has been paused! Use `/resume` to resume the music")
	},
}