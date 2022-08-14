const config = require(process.cwd() + `/config/worker.js`)
    const work = config.anime_seen_help
    const worker = config.anime_seem_work
    const reason = config.anime_seem_help_disable
    const { QuickDB } = require("quick.db");
    const Discord = require('discord.js');
    const { SlashCommandBuilder } = require('@discordjs/builders');

    const embed_pl = new Discord.MessageEmbed()

    .setColor(`BLUE`)//PL
    .setTitle(`Help`)
    .setDescription(`U can use '$help en' for a description in English\nlista wszystkich komend:`)
    .addFields(//inline-w embedzie zamiast pod sobą będą obok siebie
    {name: `ANIME SEEN`,value: `images and information about anime`,inline: false},
    {name: `senko`,value: `sends a random\n image of senko`,inline: true},
    {name: `senkoinfo`,value: `sends information about anime`,inline: true},
    {name: `Sewayaki Kitsune no Senko-san`,value: `sends information about anime`,inline: true},
    {name: `senko_odc`,value: `sends a link to anime episode\n usage: $senko_odc <nr_odc> \n example: $senko_odc 2`,inline: true},
    
    {name: `------------------------------------------------------------------------`,value: `----------------------------------------------------------------------`,inline: false},

    {name: `konata`,value: `sends a random\n image of konata`,inline: true},
    {name: `konatainfo`,value: `sends information about anime`,inline: true},
    {name: `Lucky Star`,value: `sends information about anime`,inline: true},
    {name: `lucky_star_odc`,value: `sends a link to anime episode \n usage: $lucky_star_odc <nr_odc> \n example: $lucky_star_odc 2`,inline: true},
    
    {name: `------------------------------------------------------------------------`,value: `----------------------------------------------------------------------`,inline: false},

    {name: `ranka`,value: `sends a random\n image of ranka`,inline: true},
    {name: `rankainfo`,value: `sends information about anime`,inline: true},
    {name: `Murenase Seton Gakuen`,value: `sends information about anime`,inline: true},
    
    {name: `------------------------------------------------------------------------`,value: `----------------------------------------------------------------------`,inline: false},

    {name: `kuroha`,value: `sends a random\n image of kuroha`,inline: true},
    {name: `Kurohainfof`,value: `sends information about anime`,inline: true},
    {name: `Gokukoku no Brynhildr`,value: `sends information about anime`,inline: true},

    {name: `------------------------------------------------------------------------`,value: `----------------------------------------------------------------------`,inline: false},

    {name: `amnesia`,value: `sends a description of anime`,inline: true},
    {name: `heroine_info`,value: `sends a description of anime`,inline: true},
    {name: `heroine`,value: `ssends a random anime character image`,inline: true},
    {name: `amnestia_odc`,value: `sends a link to anime episode \n użycie: $amnestia_odc <nr_odc> \n example: $amnestia_odc 2`,inline: true},
    )

const prefix = "$"
module.exports = {
    name: `animeseen`,
    name_en:`animeseen`,
    description: `help command`,
    usage: `$help`,
    work: worker,
    isSlash: true,
    
    data: new SlashCommandBuilder()
        .setName('animeseen')
        .setDescription('display list of all animeseen commands'),
    executeInteraction: async (inter) => {
        if(work != true){
            const embed_worker = new Discord.MessageEmbed()
            .setTitle('**animeseen**')
            .setColor('RANDOM')
            .setDescription(`${reason}`)
        inter.reply({ embeds: [embed_worker] });
        return(console.log("command id disabled"))
        }else{
            //load server settings
        const guildId = inter.guild.id
        const db = new QuickDB({ filePath: process.cwd() + `/db/srv_settings/commands/${guildId}.sqlite` });
        if(await db.get(`check.check`) == true){
            const settings = await db.get(`anime_seem_help.worker`)
            const settings_reason = await db.get(`anime_seem_help.reason`)
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
            const settings = await db.get(`anime_seem_help.worker`)
            const settings_reason = await db.get(`anime_seem_help.reason`)
            if(settings != true){return message.channel.send(settings_reason)}
        }


        if(work != true){return message.channel.send(reason)}
         

        const embed_pl = new Discord.MessageEmbed()

        .setColor(`BLUE`)//PL
        .setTitle(`Help`)
        .setDescription(`U can use '$help en' for a description in English\nlista wszystkich komend:`)
        .addFields(//inline-w embedzie zamiast po dobą będą obok siebie
        {name: `ANIME SEEN`,value: `grafiki i informacje o anime`,inline: false},
        {name: `senko`,value: `wysyła randomową\n grafike senko`,inline: true},
        {name: `senkoinfo`,value: `wysyła informacje o anime`,inline: true},
        {name: `Sewayaki Kitsune no Senko-san`,value: `wysyła informacje o anime`,inline: true},
        {name: `senko_odc`,value: `wysyła link do odcinka anime \n użycie: $senko_odc <nr_odc> \n przykład: $senko_odc 2`,inline: true},
        
        {name: `------------------------------------------------------------------------`,value: `----------------------------------------------------------------------`,inline: false},

        {name: `konata`,value: `wysyła randomową\n grafike konaty`,inline: true},
        {name: `konatainfo`,value: `wysyła informacje o anime`,inline: true},
        {name: `Lucky Star`,value: `wysyła informacje o anime`,inline: true},
        {name: `lucky_star_odc`,value: `wysyła link do odcinka anime \n użycie: $lucky_star_odc <nr_odc> \n przykład: $lucky_star_odc 2`,inline: true},
        
        {name: `------------------------------------------------------------------------`,value: `----------------------------------------------------------------------`,inline: false},

        {name: `ranka`,value: `wysyła randomową\n grafike ranki`,inline: true},
        {name: `rankainfo`,value: `wysyła informacje o anime`,inline: true},
        {name: `Murenase Seton Gakuen`,value: `wysyła informacje o anime`,inline: true},
        
        {name: `------------------------------------------------------------------------`,value: `----------------------------------------------------------------------`,inline: false},

        {name: `kuroha`,value: `wysyła randomową\n grafike kurohy`,inline: true},
        {name: `Kurohainfof`,value: `wysyła informacje o anime`,inline: true},
        {name: `Gokukoku no Brynhildr`,value: `wysyła informacje o anime`,inline: true},

        {name: `------------------------------------------------------------------------`,value: `----------------------------------------------------------------------`,inline: false},

        {name: `amnesia`,value: `wysyła opis anime`,inline: true},
        {name: `heroine_info`,value: `wysyła opis anime`,inline: true},
        {name: `heroine`,value: `wysyła randomową grafike postaci anime`,inline: true},
        {name: `amnestia_odc`,value: `wysyła link do odcinka anime \n użycie: $amnestia_odc <nr_odc> \n przykład: $amnestia_odc 2`,inline: true},
           
        )
        .setFooter(message.author.tag, message.author.avatarURL({dynamic: true}));

        const embed_en = new Discord.MessageEmbed()

        .setColor(`BLUE`)//PL
        .setTitle(`Help`)
        .setDescription(`U can use '$help en' for a description in English\nlist of all commands:`)
        .addFields(//inline-w embedzie zamiast po dobą będą obok siebie
        {name: `ANIME`, value:` graphics and anime info`, inline: true},
        {name: `senko`, value:` sends a random \n image senko`, inline: true},
        {name: `senkoinfo`, value:` sends information about the anime`, inline: true},
        {name: `Sewayaki Kitsune no Senko-san`, value:` sending anime info`, inline: true},
        
        {name: `konata`, value:` sends a random \n konata image`, inline: true},
        {name: `konatainfo`, value:` sends information about the anime`, inline: true},
        {name: `Lucky Star`, value:` sends anime info`, inline: true},
        
        {name: `mornings`, value:` sends a random \n mornings graphic`, inline: true},
        {name: `rankainfo`, value:` sends anime information`, inline: true},
        {name: `Murenase Seton Gakuen`, value:` sends information about the anime`, inline: true},
        
        {name: `kuroha`, value:` sends a random \n kuroha graphic`, inline: true},
        {name: `Kurohainfof`, value:` sends information about the anime`, inline: true},
        {name: `Gokukoku no Brynhildr`, value:` sending anime info`, inline: true},
        
           
        )
        .setFooter(message.author.tag, message.author.avatarURL({dynamic: true}));
    

        if(!args[0]){message.reply("try use: $anime help")}

        if(args[0] == "help"){
            if(args[1] == "en"){//wersja en
                message.channel.send({embeds: [embed_en]});
            }else{//wersja pl
                message.channel.send({embeds: [embed_pl]});
            }
    
        }
    }
}
