//Murenase! Seton Gakuen
const Discord = require('discord.js');
module.exports = {
    name: "rankainfo",
    description: "wysyła grafike senko",
    usage: "$senko",

    execute: async(message, args) =>  {
        const embed = new Discord.MessageEmbed()

        .setColor("BLUE")
        .setImage("https://shinden.pl/res/images/225x350/252358.jpg")
        .setTitle("Anime:")
        .setDescription("Murenase! Seton Gakuen\n\nAkademia Seton, szkoła pełna zwierząt, w której ze wszystkich stworzeń najmniej jest ludzi. Mazama Jin, nienawidzący zwierząt i jedyny człowiek w swojej klasie, zakochuje się w Hino Hitomi, pierwszej kobiecie, którą spotyka w szkole. Niestety zadawanie się z Hino nie przyniesie mu szczęścia, gdyż w jej klasie spotka 'stado' wilka Ranki")
        .addFields(//inline-w embedzie zamiast po dobą będą obok siebie
            {name: "Gatunki:",value: "Komedia,Szkolne", inline: true},
            {name: "Grupu Docelowe", value: "Shounen"},
            {name: "Rodzaje postaci",value: "Loli,Kemonomimi,Zmiana płci,Tsundere,Uczniowie,Nauczyciele,Genki",inline: false},
            {name: "Miejsce i czas",value: "Współczesność",inline: false},
            {name: "Pierwowzór",value: "manga",inline: false},
            )
        
        .setTimestamp()
        .setFooter(message.author.tag, message.author.avatarURL({dynamic: true}));

        message.channel.send({embeds: [embed]});
    }
}