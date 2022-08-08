const config = require(process.cwd() + `/config/worker.js`)
const work = config.user_info
const worker = config.user_info
const reason = config.user_info

const {SlashCommandBuilder} = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const {QuickDB} = require("quick.db")
const srv_settings = require("../../../handlers/check_srv_settings")
module.exports = {
    name: "userinfo",
    name_en: "userinfo",
    work: worker,
    isSlash: true,

    data: new SlashCommandBuilder()
    .setName('userinfo')
    .setDescription('informacje o urzytkownikó')

.addUserOption(option => 
    option.setName('urzytkownik')
    .setDescription('urzytkownik o kturym hcesz zobaczyć informacje')
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

            //load server settings user_info
        const guildId = inter.guild.id
        const command_name = "user_info"
        srv_settings(command_name,guildId)

    const member = inter.options.getMember("urzytkownik");
    
    const embed = new MessageEmbed()
    .setColor('AQUA')
    .setTitle(`Informacje o uzytkowniku ${member.displayName}`)
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
            name: 'Data dołączenia do serwera',
            value: `<t:${parseInt(member.joinedTimestamp / 1000)}:R>`
        },
        {
            name: 'Data założenia konta',
            value: `<t:${parseInt(member.user.createdTimestamp / 1000)}:R>`
        }
    )
    inter.reply({
        embeds: [embed]
    })
}}}
