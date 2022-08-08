const { SlashCommandBuilder } = require("@discordjs/builders")
const client = require("../../../main")
module.exports = {
    isSlash: true,
	data: new SlashCommandBuilder().setName("skipto").setDescription("Skips to a certain track #")
    .addNumberOption((option) => 
        option.setName("tracknumber").setDescription("The track to skip to").setMinValue(1).setRequired(true)),
        executeInteraction: async (inter) => {
		const queue = client.player.getQueue(inter.guildId)

		if (!queue) return await inter.editReply("There are no songs in the queue")

        const trackNum = inter.options.getNumber("tracknumber")
        if (trackNum > queue.tracks.length)
            return await inter.editReply("Invalid track number")
		queue.skipTo(trackNum - 1)

        await inter.editReply(`Skipped ahead to track number ${trackNum}`)
	},
}