const config = require(process.cwd() + `/config/worker.js`)
    const work = config.bot_info
    const worker = config.bot_info_work
    const reason = config.bot_info_disable

const Discord = require('discord.js');
//$botinfo
//$botinfo help
//$botinfo help en
module.exports = {
    name: "botinfo",
    name_en:"botinfo",
    description: "wysyła informacje o bocie",
    usage: "$botinfo",
    work: worker,

    execute: async(message, args) => {

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
const stowrzony = "29.05.2022"
        const embed = new Discord.MessageEmbed()

        .setTitle("SEEN-:")
        .setDescription(`**Autor:**${Autor}\n
        **version:**${version} \n
        **Wejsja silnika:** ${Engin_version} \n
        **Data stworzenia bota:**${stowrzony}`)


        .setThumbnail(message.guild.iconURL({ dynamic: true }));

        message.channel.send({embeds: [embed]});
        }
    }
}