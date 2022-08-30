const config = require(process.cwd() + `/config/worker.js`)
    const work = config.bot_info
    const worker = config.bot_info_work
    const reason = config.bot_info_disable

const Discord = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { QuickDB } = require("quick.db");
//$botinfo
//$botinfo help
//$botinfo help en


const Autor = "PAW#5844"
const version = "1.1.9"
const Engin_version = "16.9.0"
const stowrzony = "29.05.2022"
const discord_version ="13.9.1"
        const embed2 = new Discord.MessageEmbed()

        .setTitle("SEEN-")
        .setDescription(`**Autor:**${Autor}\n
        **version:**${version} \n
        **Wersja silnika:** ${Engin_version} \n
        **Wersja Discorda:** ${discord_version}\n
        **Data stworzenia bota:**${stowrzony}`)


module.exports = {
    name: "botinfo",
    name_en:"botinfo",
    description: "wysyła informacje o bocie",
    usage: "$botinfo",
    work: worker,
    isSlash: true,

    data: new SlashCommandBuilder()
    .setName('botinfo')
    .setDescription('wysyła liste anime obejrzanych przez autora bota'),
    
executeInteraction: async (inter) => {
    if (work != true) {
        const embed_worker = new Discord.MessageEmbed()
            .setTitle('**botinfo**')
            .setColor('RANDOM')
            .setDescription(`${reason}`)
        inter.reply({ embeds: [embed_worker] });
        return (console.log("command id disabled"))
    } else {
        //load server settings
const guildId = inter.guild.id
const db = new QuickDB({ filePath: process.cwd() + `/db/srv_settings/commands/${guildId}.sqlite` });
if(await db.get(`check.check`) == true){
    const settings = await db.get(`bot_info.worker`)
    const settings_reason = await db.get(`bot_info.reason`)
    if(settings != true){return message.channel.send(settings_reason)}
}
    
        const embed = new Discord.MessageEmbed()
        inter.reply({ embeds: [embed2] })

    }
},

    execute: async(message, args) => {
//load server settings
const guildId = message.guild.id
const db = new QuickDB({ filePath: process.cwd() + `/db/srv_settings/commands/${guildId}.sqlite` });
if(await db.get(`check.check`) == true){
    const settings = await db.get(`bot_info.worker`)
    const settings_reason = await db.get(`bot_info.reason`)
    if(settings != true){return message.channel.send(settings_reason)}
}

    if(work != true){return message.channel.send(reason)}
         
        

        if(args[0] == "help"){
            if(args[1] == "en"){
                    const embed_en = new Discord.MessageEmbed()
        
                    .setColor(`RED`)//EN
                    .setTitle(`botinfo`)
                    .setDescription(`information about bot \n
                    usage: "$botinfo"`)
            
                    .setFooter(message.author.tag, message.author.avatarURL({dynamic: true}));
            
            
                    message.channel.send({embeds: [embed_en]});
            }else{
                const embed_pl = new Discord.MessageEmbed()

                .setColor(`BLUE`)//PL
                .setTitle(`botinfo`)
                .setDescription(`informacje o bocie\n
                użycie: "$botinfo"`)
        
                .setFooter(message.author.tag, message.author.avatarURL({dynamic: true}));
        
        
                message.channel.send({embeds: [embed_pl]});
            }
        }else{

const Autor = "PAW#5844"
const version = "1.1.9"
const Engin_version = "16.9.0"
const stworzony = "29.05.2022"
        const embed = new Discord.MessageEmbed()

        .setTitle("SEEN-:")
        .setDescription(`**Autor:**${Autor}\n
        **version:**${version} \n
        **Wejsja silnika:** ${Engin_version} \n
        **Data stworzenia bota:**${stworzony}`)


        .setThumbnail(message.guild.iconURL({ dynamic: true }));

        message.channel.send({embeds: [embed]});
        }
    }
}