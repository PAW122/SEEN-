module.exports = (client,interaction) => {

    client.on('interactionCreate', async interaction => {
        if (interaction.isButton) {
            if (interaction.customId == 'role1') {
                const roleId = '1001069879148953673';
                const role = interaction.guild.roles.cache.get(roleId);

                if (interaction.member.roles.cache.has(roleId)) {
                    await interaction.member.roles.remove(role);
                    await interaction.reply({ content: `Usunięto rolę <@&${roleId}>`, ephemeral: true });
                } else {
                    await interaction.member.roles.add(roleId);
                    await interaction.reply({ content: `Dodano rolę <@&${roleId}>`, ephemeral: true });
                }

                // await interaction.deferUpdate();
            }

            if (interaction.customId == 'role2') {
                const roleId = '1001069963437686824';
                const role = interaction.guild.roles.cache.get(roleId);

                if (interaction.member.roles.cache.has(roleId)) {
                    await interaction.member.roles.remove(role);
                    await interaction.reply({ content: `Usunięto rolę <@&${roleId}>`, ephemeral: true });
                } else {
                    await interaction.member.roles.add(roleId);
                    await interaction.reply({ content: `Dodano rolę <@&${roleId}>`, ephemeral: true });
                }

                // await interaction.deferUpdate();
            }
        }

        //select menu
        if(interaction.isSelectMenu()) {//wywala error (wykonuje się 2 razy)
            interaction.reply({ content: `${interaction.values[0]}`})
        }

    })
    
}