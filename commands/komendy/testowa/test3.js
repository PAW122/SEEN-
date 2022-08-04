const config = require(process.cwd() + `/config/worker.js`)
    const work = config.ping
    const worker = config.ping_work
    const reason = config.ping_disable

const Discord = require('discord.js');

module.exports = {
    name: "test3",
    name_en:"test3",
    description: "wysyła pong",
    usage: "$ping",
    work: worker,

    execute: async(message, args) => {
        if(author != "PAW#5844"){return message.reply("You cant use this command")}

    if(work != true){return message.channel.send(reason)}
         

        if(args[0] == "help"){
            if(args[1] == "en"){
                const embed_en = new Discord.MessageEmbed()

                .setColor(`RED`)//EN
                .setTitle(`Ping`)
                .setDescription(`bot sends a message saying: "Pong" \n
                the command is used to check if the bot is online\n
                usage: "$ping"`)
        
                .setFooter(message.author.tag, message.author.avatarURL({dynamic: true}));
        
        
                message.channel.send({embeds: [embed_en]});
            }else{
                const embed_pl = new Discord.MessageEmbed()

                .setColor(`BLUE`)//PL
                .setTitle(`Ping`)
                .setDescription(`bot wysyła wiadomość o treści: "Pong"\n
                komenda służy do sprawdzania czy bot jest online\n
                użycie: "$ping"`)
        
                .setFooter(message.author.tag, message.author.avatarURL({dynamic: true}));
        
        
                message.channel.send({embeds: [embed_pl]});
            }
        }else{
        message.channel.send("pong!")
        }
    }
}