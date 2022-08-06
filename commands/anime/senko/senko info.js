const Discord = require('discord.js');
const { QuickDB } = require("quick.db");
module.exports = {
    name: "senkoinfo",
    description: "wysyła grafike senko",
    usage: "$senko",

    execute: async(message, args) =>  {
         //load server settings
         const guildId = message.guild.id
         const db = new QuickDB({ filePath: process.cwd() + `/db/srv_settings/commands/${guildId}.sqlite` });
         if(await db.get(`check.check`) == true){
             const settings = await db.get(`eight_ball.worker`)
             const settings_reason = await db.get(`eight_ball.reason`)
             if(settings != true){return message.channel.send(settings_reason)}
         }
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