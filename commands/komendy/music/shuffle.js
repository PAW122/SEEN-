const { SlashCommandBuilder } = require("@discordjs/builders")
const client = require("../../../main")
module.exports = {
    isSlash: true,
	data: new SlashCommandBuilder().setName("shuffle").setDescription("Shuffles the queue"),
	executeInteraction: async (inter) => {
		const queue = client.player.getQueue(inter.guildId)

		if (!queue) return await inter.editReply("There are no songs in the queue")

		queue.shuffle()
        await inter.editReply(`The queue of ${queue.tracks.length} songs have been shuffled!`)
	},
}