const config = require(process.cwd() + `/config/worker.js`)
    const work = config.ping
    const worker = config.ping_work
    const reason = config.ping_disable

const Discord = require('discord.js');
const { MessageAttachment } = require('discord.js');
module.exports = {
    name: "message_logs",
    name_en:"message_logs",
    work: worker,

    execute: async(message, args) => {

    if(work != true){return message.channel.send(reason)}
         

        if(args[0] == "help"){
            if(args[1] == "en"){
                const embed_en = new Discord.MessageEmbed()

                .setColor(`RED`)//EN
                .setTitle(`logs`)
                .setDescription(`bot sends a text file with all messages sent to the server
                usage: $message_logs`)
        
                .setFooter(message.author.tag, message.author.avatarURL({dynamic: true}));
        
        
                message.channel.send({embeds: [embed_en]});
            }else{
                const embed_pl = new Discord.MessageEmbed()

                .setColor(`BLUE`)//PL
                .setTitle(`logs`)
                .setDescription(`bot wysyła plik textowy z wszystkimi
                 wiadomościami wysłanymi na serweże
                 użycie: $message_logs`)
        
                .setFooter(message.author.tag, message.author.avatarURL({dynamic: true}));
        
        
                message.channel.send({embeds: [embed_pl]});
            }
        }else{
            if(!message.member.permissions.has("ADMINISTRATOR")) {
                return message.channel.send("nie masz uprawnień do usówania wiadomości")
            }

            const srv = message.guild.id + ".txt"
            const attachment = new MessageAttachment(`${process.cwd()}/config/logs/${srv}`)
            try{
                message.channel.send({files: [attachment]});
            }catch (error){
                console.log(error)
                message.reply("nie znaleziono pliku")
            }  
        }
    }
}