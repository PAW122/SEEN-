const config = require(process.cwd() + `/config/worker.js`)
        const work = config.anime_help
        const reason = config.anime_help_disable
        const worker = config.anime_help_work
        const { QuickDB } = require("quick.db");
const Discord = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const prefix = "$"
const embed_pl = new Discord.MessageEmbed()

        .setColor(`BLUE`)//PL
        .setTitle(`Help`)
        .setDescription(`anime help`)
        .addFields(//inline-w embedzie zamiast po dobą będą obok siebie
        {name: `animegif`,value: `${prefix}animegif help\n${prefix}animegif help en`,inline: true},
        {name: `anime episodes`,value: `${prefix}anime_odc_help\n${prefix}anime_odc_help en`,inline: true},   
        {name: `announcements summer2022`,value: `${prefix}announcements help\n${prefix}announcements help en`,inline: true},
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
        .setDescription('Display list of commands from anime category'),
    executeInteraction: async (inter) => {
        if(work != true){
            const embed_worker = new Discord.MessageEmbed()
            .setTitle('**anime**')
            .setColor('RANDOM')
            .setDescription(`${reason}`)
        inter.reply({ embeds: [embed_worker] });
        return(console.log("command id disabled"))
        }else{
            //load server settings
        const guildId = inter.guild.id
        const db = new QuickDB({ filePath: process.cwd() + `/db/srv_settings/commands/${guildId}.sqlite` });
        if(await db.get(`check.check`) == true){
            const settings = await db.get(`anime_help.worker`)
            const settings_reason = await db.get(`anime_help.reason`)
            if(settings != true){return message.channel.send(settings_reason)}
        }

        inter.reply({ embeds: [embed_pl] });
        }
    },

    execute: async(message, args) => {//trzeba dodać help do anime!!!!
        //load server settings
        const guildId = message.guild.id
        const db = new QuickDB({ filePath: process.cwd() + `/db/srv_settings/commands/${guildId}.sqlite` });
        if(await db.get(`check.check`) == true){
            const settings = await db.get(`anime_help.worker`)
            const settings_reason = await db.get(`anime_help.reason`)
            if(settings != true){return message.channel.send(settings_reason)}
        }
                     
         
        if(work != true){return message.channel.send(reason)}


        const embed_pl = new Discord.MessageEmbed()

        .setColor(`BLUE`)//PL
        .setTitle(`Help`)
        .setDescription(`U can use '$help en' for a description in English\nlist of all commands:`)
        .addFields(//inline-w embedzie zamiast po dobą będą obok siebie
        {name: `animegif`,value: `${prefix}animegif help\n${prefix}animegif help en`,inline: true},
        {name: `anime episodes`,value: `${prefix}anime_odc_help\n${prefix}anime_odc_help en`,inline: true},   
        {name: `announcements summer2022`,value: `${prefix}announcements help\n${prefix}announcements help en`,inline: true},
        {name: `animelist`,value: `${prefix}animelist help\n${prefix}animelist help en`,inline: true},
        {name: `myanimelist`,value: `${prefix}myanimelist help\n${prefix}myanimelist help en`,inline: true},

        )
        .setFooter(message.author.tag, message.author.avatarURL({dynamic: false}));
    
        message.channel.send({embeds: [embed_pl]});
    }
}
