//dodać do helpa
const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
const { Permissions: { FLAGS } } = require('discord.js')
const { QuickDB } = require("quick.db")
module.exports = {
    name: "unban",
    description: "Sends information about the server",
    usage: "$srvinfo",
    isSlash: true,
    data: new SlashCommandBuilder()
        .setName('unban')
        .setDescription('Unbans user')
        .addStringOption((option =>
            option
                .setName('userid')
                .setDescription('Enter id of a user that you wish to unban')
                .setRequired(true)
        )),
    async execute(inter) {

        //load server settings
        const guildId = inter.guild.id
        const db = new QuickDB({ filePath: process.cwd() + `/db/srv_settings/commands/${guildId}.sqlite` });
        if (await db.get(`unban.check`) == true) {
            const settings = await db.get(`unban.worker`)
            const settings_reason = await db.get(`unban.reason`)
            if (settings != true) { return message.channel.send(settings_reason) }
        }

        if (!inter.member.permissions.has(FLAGS.BAN_MEMBERS)) return inter.reply({ content: 'You do not have permission to use this command!', ephemeral: true });
        const userId = inter.options.getString('userid');

        inter.guild.members.unban(userId).then((user) => {
            inter.reply({ content: `${user.tag} Has been unbanned!` });
        })
            .catch(() => {
                inter.reply({ content: 'Please enter a valid user id to unban!' });
            })
    }
} 