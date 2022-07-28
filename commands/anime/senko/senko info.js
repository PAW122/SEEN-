const Discord = require('discord.js');
module.exports = {
    name: "senkoinfo",
    description: "wysyła grafike senko",
    usage: "$senko",

    execute: async(message, args) =>  {
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