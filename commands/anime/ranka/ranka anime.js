//$Murenase Seton Gakuen
const { QuickDB } = require("quick.db");
const Discord = require('discord.js');
const srv_settings = require("../../../handlers/check_srv_settings")
module.exports = {
    name: "murenase",
    name_en: "Lucky", 
    description: "wysyła grafike senko",
    usage: "$senko",

    execute: async(message, args) =>  {
         //load server settings
         const guildId = message.guild.id
         const command_name = "anime_seen"
        srv_settings(command_name,guildId)

        const embed = new Discord.MessageEmbed()

        .setColor("BLUE")
        .setImage("https://shinden.pl/res/images/225x350/269773.jpg")
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

//$Murenase! Seton Gakuen
        //sprawdza człość
        if(args[0] !== "Seton"){if(args[0] !== "seton"){
            return message.reply("spróbuj :$Murenase Seton Gakuen")
        }}

        if(args[0] == "Seton"||args[0] == "seton"){
            if(args[1] == "Gakuen"||args[1] == "gakuen"){
                message.channel.send({embeds: [embed]});
            }
        }
        
    }
}