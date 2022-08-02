const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
const { Permissions: { FLAGS } } = require('discord.js')
module.exports = {
    name: "suggest",
    description: "wysyła informacje o serweże",
    usage: "$srvinfo",
    isSlash: true,

    data: new SlashCommandBuilder()
        .setName('sugestia')
        .setDescription('To jest sugestia')
        .addStringOption((option) =>
            option
                .setName('type')
                .setDescription('Wybierz opcję')
                .setRequired(true)
                .setChoices(
                    { name: 'Komenda', value: 'Komenda' },
                    { name: 'Emoji', value: 'Emoji' },
                    { name: 'Gra', value: 'Gra' },
                    { name: 'Inny', value: 'Inny' },
                ))
        .addStringOption((option) =>
            option
                .setName('suggestion')
                .setDescription('Twoja sugestia')
                .setRequired(true)
        ),

        executeInteraction: async (inter) => {
        if (!inter.member.permissions.has(FLAGS.ADMINISTRATOR)) return inter.reply({ content: 'Nie masz wystarczająco permisji aby użyć tej komendy!', ephemeral: true });
        const {guildId, member, user } = inter;
        const Type = inter.options.getString('type');
        const Suggestion = inter.options.getString('suggestion');

        const embed = new Discord.MessageEmbed()
        .setColor('NAVY')
        .setAuthor({ name: `${user.tag}`, iconURL: user.displayAvatarURL({dynamic: true}) })
        .addFields(
            {name: 'Sugestia:', value: Suggestion, inline: false},
            {name: 'Typ:', value: Type, inline: true},
            {name: 'Status:', value: 'Oczekiwanie', inline: false}
        )
        .setTimestamp()

        const buttons = new Discord.MessageActionRow()
        .addComponents(
            new Discord.MessageButton()
            .setCustomId('suggest-accept')
            .setLabel('✅ Akcpetuj')
            .setStyle('PRIMARY'),
            new Discord.MessageButton()
            .setCustomId('suggest-decline')
            .setLabel('⛔ Odrzuć')
            .setStyle('SECONDARY')
        )

        try {
            await inter.reply({embeds: [embed], components: [buttons], fetchReply: true})
        }
        catch (error) {
            console.log(error);
        }
    }
} 