
const Discord = require('discord.js');
let lastInteractionId;

//const { Permissions: { FLAGS } } = require('discord.js');
module.exports = {
    name: 'interactionCreate', async execute(inter, client) {
        if(lastInteractionId && lastInteractionId == inter.id) return;
        if (!inter.isCommand()) return;
        const command = client.commands.get(inter.commandName);
        if (!command) return;
         try {
            await command.executeInteraction(inter);
        } catch (error) {
            console.error(error);
            
            await inter.reply({ content: 'Wystąpił błąd w komendzie!', ephemeral: true });

        }
        lastInteractionId = inter.id
    }
}