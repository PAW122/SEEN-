//$Sewayaki Kitsune no Senko-san
const { QuickDB } = require("quick.db");
const Discord = require('discord.js');
const srv_settings = require("../../../handlers/check_srv_settings")
module.exports = {
    name: "sewayaki",
    description: "wysyła grafike senko",
    usage: "$senko",

    execute: async(message, args) =>  {
         //load server settings
         const guildId = message.guild.id
         const command_name = "anime_seen"
        srv_settings(command_name,guildId)

        //sprawdza człość
        if(args[0] !== "Kitsune"){return message.reply("spróbuj :$Sewayaki Kitsune no Senko-san")}
        if(args[1] !== "no"){return message.reply("spróbuj :$Sewayaki Kitsune no Senko-san")}
        if(args[2] !== "Senko-san"){return message.reply("spróbuj :$Sewayaki Kitsune no Senko-san")}
         
        
        const embed = new Discord.MessageEmbed()

        .setColor("BLUE")
        .setImage("https://shinden.pl/res/images/225x350/252358.jpg")
        .setTitle("Anime:")
        .setDescription("Sewayaki Kitsune no Senko-san\n\nTytuł skupia się na Nakano - pracowniku wyzyskującej czarnejfirmy, który pewnego dnia, po powrocie do domu, zastaje tam lisiego ducha o imieniu Senko.Jak się okazuje, duch mimo wyglądu młodej dziewczyny... ma 800 lat! A jej misją jest łagodzenie ciemności nękającej ludzkość!Tak się zaczyna nowe życie Nakano... pełne tej lisiej dziewczyny wprowadzające do jego życia ciepło i... puszystość!")
        .addFields(//inline-w embedzie zamiast po dobą będą obok siebie
            {name: "Gatunki:",value: "Komedia,Nadprzyrodzone,Okruchy życia", inline: true},
            {name: "Rodzaje postaci",value: "Loli,Kemonomimi,Youkai,Dorośli,Pracownicy biurowi,Bóstwa,Kitsune,Albios",inline: false},
            {name: "Miejsce i czas",value: "Współczesność,Japonia",inline: false},
            {name: "Pierwowzór",value: "Web manga",inline: false},
            )
        
        .setTimestamp()
        .setFooter(message.author.tag, message.author.avatarURL({dynamic: true}));

        message.channel.send({embeds: [embed]});
    }
}