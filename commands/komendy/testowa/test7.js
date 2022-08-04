
const Discord = require('discord.js');

module.exports = {
    name: "ankieta2",


    execute: async(message, args,client) => {
        if(author != "PAW#5844"){return message.reply("You cant use this command")}
         
        const embed = new Discord.MessageEmbed()
        .setColor("BLUE")
        .setTitle("")
        .setDescription("opis")
        .setTimestamp()
        .setFooter(message.author.tag, message.author.avatarURL({dynamic: true}));


            
                message.channel.send({embeds: [embed]}).then(embedMessage => {
                embedMessage.react("✅");
                embedMessage.react("❌");
                });
            

    }
}