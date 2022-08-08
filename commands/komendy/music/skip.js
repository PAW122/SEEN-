const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
const client = require("../../../main")
module.exports = {
    isSlash: true,
	data: new SlashCommandBuilder().setName("skip").setDescription("Skips the current song"),
	executeInteraction: async (inter) => {
		const queue = client.player.getQueue(inter.guildId)

		if (!queue) return await inter.editReply("There are no songs in the queue")

        const currentSong = queue.current

		queue.skip()
        await inter.editReply({
            embeds: [
                new MessageEmbed().setDescription(`${currentSong.title} has been skipped!`).setThumbnail(currentSong.thumbnail)
            ]
        })
	},
}