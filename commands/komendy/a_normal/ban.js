const config = require(process.cwd() + `/config/worker.js`)
    const work = config.ban
    const worker = config.ban_work
    const reason = config.ban_disable

//$ban
//$ban help
//$ban help en
const Discord = require('discord.js');
module.exports = {
    name: "ban",
    description: "usówa wiadomości",
    usage: "$clear <ilość wiadomości>",
    work: worker,

    execute: async(message, args,client) => {

        
    if(work != true){return message.channel.send(reason)}
         

        if(args[0] == "help"){
            if(args[1] == "en"){
                const embed_en = new Discord.MessageEmbed()

            .setColor(`RED`)
            .setTitle(`Ban`)
            .setDescription(`ban the user from the server \n
            use: "$ban @user"`)
    
            .setFooter(message.author.tag, message.author.avatarURL({dynamic: true}));
    
    
            message.channel.send({embeds: [embed_en]});
            }else{
                const embed_pl = new Discord.MessageEmbed()

            .setColor(`BLUE`)//PL
            .setTitle(`Ban`)
            .setDescription(`banuje urzytkownika z serwera\n
            użycie: "$ban @user"`)
    
            .setFooter(message.author.tag, message.author.avatarURL({dynamic: true}));
    
    
            message.channel.send({embeds: [embed_pl]}); 
            }
        }else{
        

        //permisje
        if(!message.member.permissions.has("BAN_MEMBERS")) {
            return message.channel.send("nie masz uprawnień do banowania")
        }


        //bot sprawdza czy ma permisje do usówania na dc
        if(!message.guild.me.permissions.has("KICK_MEMBERS")) {
            return message.channel.send("Nie posiadam uprawnień do banowania")
        }

        const target = message.mentions.members.first()

        //console.log(target)
        //console.log(args)
        if(target == true){
        target.ban()
        }else{message.channel.send("nie mogę wykonać tego polecenia")}

    }
    }
}