const config = require(process.cwd() + `/config/worker.js`)
const work = config.user_info
const worker = config.user_info
const reason = config.user_info

const {SlashCommandBuilder} = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

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

    executeInteraction: async (interaction) => {
        if(work != true){
            const embed_worker = new Discord.MessageEmbed()
            .setTitle('**userinfo**')
            .setColor('RANDOM')
            .setDescription(`${reason}`)
        inter.reply({ embeds: [embed_worker] });
        return(console.log("command id disabled"))
        }else{

    const member = interaction.options.getMember("urzytkownik");
    
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
    interaction.reply({
        embeds: [embed]
    })
}}}
