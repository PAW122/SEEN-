const config = require(process.cwd() + `/config/worker.js`)
    const work = config.kick
    const worker = config.kick_work
    const reason = config.kick_disable
const { QuickDB } = require("quick.db");
const Discord = require('discord.js');
const srv_settings = require("../../../handlers/check_srv_settings")
//$kick
//$kick help
//$kick help en
module.exports = {
    name: "kick",
    description: "usówa wiadomości",
    usage: "$clear <ilość wiadomości>",
    work: worker,

    execute: async(message, args,client) => {
        //load server settings kick
const guildId = message.guild.id
const command_name = "kick"
        srv_settings(command_name,guildId)

        if(work != true){return message.channel.send(reason)}
         

        if(args[0] == "help"){
            if(args[1] == "en"){
                const embed_en = new Discord.MessageEmbed()

            .setColor(`RED`)//EN
            .setTitle(`Kick`)
            .setDescription(`kick the user from the server \n
            use: "$kick @user"`)
    
            .setFooter(message.author.tag, message.author.avatarURL({dynamic: true}));
    
    
            message.channel.send({embeds: [embed_en]});
            }else{
                const embed_pl = new Discord.MessageEmbed()

                .setColor(`BLUE`)//PL
                .setTitle(`Kick`)
                .setDescription(`wyrzuca urzytkownika z serwera\n
                użycie: "$kick @user"`)
        
                .setFooter(message.author.tag, message.author.avatarURL({dynamic: true}));
        
        
                message.channel.send({embeds: [embed_pl]});
            }
        }else{
        

        //permisje
        if(!message.member.permissions.has("KICK_MEMBERS")) {
            return message.channel.send("nie masz uprawnień do kikowania")
        }


        //bot sprawdza czy ma permisje do usówania na dc
        if(!message.guild.me.permissions.has("KICK_MEMBERS")) {
            return message.channel.send("Nie posiadam uprawnień do kikowania")
        }

        const target = message.mentions.members.first()

        console.log(target)
        console.log(args)
        if(target == true){
        target.kick()
        }else{message.channel.send("nie moge go wyjebać")}

    }
    }
}