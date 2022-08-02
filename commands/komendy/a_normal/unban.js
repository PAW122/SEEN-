//dodać do helpa
const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
const { Permissions: { FLAGS } } = require('discord.js')

module.exports = {
    name: "unban",
    description: "wysyła informacje o serweże",
    usage: "$srvinfo",
    isSlash: true,
    data: new SlashCommandBuilder()
        .setName('unban')
        .setDescription('Odbanowywuje użytkownika')
        .addStringOption((option =>
            option
                .setName('userid')
                .setDescription('Podaj id użytkownika którego chcesz odbanować')
                .setRequired(true)
        )),
    async execute(inter) {
        if(!inter.member.permissions.has(FLAGS.BAN_MEMBERS)) return inter.reply({ content: 'Nie masz wystarczająco permisji aby użyć tej komendy!', ephemeral: true});
        const userId = inter.options.getString('userid');

        inter.guild.members.unban(userId).then((user) => {
            inter.reply({ content: `${user.tag} został odbanowany na serverze!`});
        })
        .catch(() => {
            inter.reply({ content: 'Prosze podać prawidłowe id użytkownika do odbanowania!'});
        })
    }
} 