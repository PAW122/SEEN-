const config = require(process.cwd() + `/config/worker.js`)
        const work = config.anime_help
        const reason = config.anime_help_disable
        const worker = config.anime_help_work

const Discord = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const prefix = "$"
const embed_pl = new Discord.MessageEmbed()

        .setColor(`BLUE`)//PL
        .setTitle(`Help`)
        .setDescription(`anime help`)
        .addFields(//inline-w embedzie zamiast po dobą będą obok siebie
        {name: `animegif`,value: `${prefix}animegif help\n${prefix}animegif help en`,inline: true},
        {name: `odcinki anime`,value: `${prefix}anime_odc_help\n${prefix}anime_odc_help en`,inline: true},   
        {name: `zapowiedzi lato2022`,value: `${prefix}zapowiedzi help\n${prefix}zapowiedzi help en`,inline: true},
        {name: `animelist`,value: `${prefix}animelist help\n${prefix}animelist help en`,inline: true},
        {name: `myanimelist`,value: `${prefix}myanimelist help\n${prefix}myanimelist help en`,inline: true},

        )

module.exports = {
    name: `anime`,
    name_en:`anime`,
    description: `help command`,
    usage: `$help`,
    work: worker,
    isSlash: true,
    
    data: new SlashCommandBuilder()
        .setName('anime')
        .setDescription('Wyświetla liste komend z kateori anime'),
    executeInteraction: async (inter) => {
        if(work != true){
            const embed_worker = new Discord.MessageEmbed()
            .setTitle('**anime**')
            .setColor('RANDOM')
            .setDescription(`${reason}`)
        inter.reply({ embeds: [embed_worker] });
        return(console.log("command id disabled"))
        }else{
        inter.reply({ embeds: [embed_pl] });
        }
    },

    execute: async(message, args) => {//trzeba dodać help do anime!!!!
                     
         
        if(work != true){return message.channel.send(reason)}


        const embed_pl = new Discord.MessageEmbed()

        .setColor(`BLUE`)//PL
        .setTitle(`Help`)
        .setDescription(`U can use '$help en' for a description in English\nlist of all commands:`)
        .addFields(//inline-w embedzie zamiast po dobą będą obok siebie
        {name: `animegif`,value: `${prefix}animegif help\n${prefix}animegif help en`,inline: true},
        {name: `odcinki anime`,value: `${prefix}anime_odc_help\n${prefix}anime_odc_help en`,inline: true},   
        {name: `zapowiedzi lato2022`,value: `${prefix}zapowiedzi help\n${prefix}zapowiedzi help en`,inline: true},
        {name: `animelist`,value: `${prefix}animelist help\n${prefix}animelist help en`,inline: true},
        {name: `myanimelist`,value: `${prefix}myanimelist help\n${prefix}myanimelist help en`,inline: true},

        )
        .setFooter(message.author.tag, message.author.avatarURL({dynamic: false}));
    
        message.channel.send({embeds: [embed_pl]});
    }
}
