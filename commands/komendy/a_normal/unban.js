//dodać do helpa
const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
const { Permissions: { FLAGS } } = require('discord.js')
const { QuickDB } = require("quick.db")
const srv_settings = require("../../../handlers/check_srv_settings")
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

        //load server settings unban
        const guildId = inter.guild.id
        const command_name = "unban"
        srv_settings(command_name,guildId)

        if (!inter.member.permissions.has(FLAGS.BAN_MEMBERS)) return inter.reply({ content: 'Nie masz wystarczająco permisji aby użyć tej komendy!', ephemeral: true });
        const userId = inter.options.getString('userid');

        inter.guild.members.unban(userId).then((user) => {
            inter.reply({ content: `${user.tag} został odbanowany na serverze!` });
        })
            .catch(() => {
                inter.reply({ content: 'Prosze podać prawidłowe id użytkownika do odbanowania!' });
            })
    }
} 