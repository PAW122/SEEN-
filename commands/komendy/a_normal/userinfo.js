const config = require(process.cwd() + `/config/worker.js`)
const work = config.user_info
const worker = config.user_info
const reason = config.user_info

const {SlashCommandBuilder} = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const {QuickDB} = require("quick.db")
const Discord = require("discord.js")

const help_embed = new Discord.MessageEmbed()

    .setColor(`RANDOM`)
    .setTitle(`userinfo`)
    .setFields(
        {name: "$userinfo", value: "send informations aonut user"},
        {name: "usage", value: "/userinfo"}
    )

module.exports = {
    name: "userinfo",
    help: help_embed,
    work: worker,
    isSlash: true,

    data: new SlashCommandBuilder()
    .setName('userinfo')
    .setDescription('Information about the user')

.addUserOption(option => 
    option.setName('użytkownik')
    .setDescription('The user that you want to see information about')
    .setRequired(true)),

    executeInteraction: async (inter) => {
        if(work != true){
            const embed_worker = new Discord.MessageEmbed()
            .setTitle('**userinfo**')
            .setColor('RANDOM')
            .setDescription(`${reason}`)
        inter.reply({ embeds: [embed_worker] });
        return(console.log("command id disabled"))
        }else{

            //load server settings
        const guildId = inter.guild.id
        const db = new QuickDB({ filePath: process.cwd() + `/db/srv_settings/commands/${guildId}.sqlite` });
        if(await db.get(`check.check`) == true){
            const settings = await db.get(`user_info.worker`)
            const settings_reason = await db.get(`user_info.reason`)
            if(settings != true){return message.channel.send(settings_reason)}
        }

    const member = inter.options.getMember("użytkownik");
    
    const embed = new MessageEmbed()
    .setColor('AQUA')
    .setTitle(`Information about the user ${member.displayName}`)
    .setThumbnail(member.displayAvatarURL({ dynamic: true }))
    .addFields(
        {
            name: 'Id',
            value: `${member.id}`
        },
        {
            name: `Role`,
            value: `${member.roles.cache.map(r => r).join(" ").replace("@everyone", " ") || 'Nie ma roli'}`
        },
        {
            name: 'Date of joining the server',
            value: `<t:${parseInt(member.joinedTimestamp / 1000)}:R>`
        },
        {
            name: 'Date of account creation',
            value: `<t:${parseInt(member.user.createdTimestamp / 1000)}:R>`
        }
    )
    inter.reply({
        embeds: [embed]
    })
}}}
