const { ActionRowBuilder, Events, SelectMenuBuilder } = require('discord.js');

module.exports = {
    name: "ctx",

    execute:async(message) => {
        return
    }
}

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	if (interaction.commandName === 'ping') {
		const row = new ActionRowBuilder()
			.addComponents(
				new SelectMenuBuilder()
					.setCustomId('select')
					.setPlaceholder('Nothing selected')
					.addOptions(
						{
							label: 'Select me',
							description: 'This is a description',
							value: 'first_option',
						},
						{
							label: 'You can select me too',
							description: 'This is also a description',
							value: 'second_option',
						},
					),
			);

		await interaction.reply({ content: 'Pong!', components: [row] });
	}
});