const Discord = require('discord.js');
module.exports = {
    name: "kuroha_info",
    description: "wysyła grafike senko",
    usage: "$senko",

    execute: async(message, args) =>  {
        const embed = new Discord.MessageEmbed()

        .setColor("BLUE")
        .setImage("https://shinden.pl/res/images/225x350/171668.jpg")
        .setTitle("Anime:")
        .setDescription("Gokukoku no Brynhildr\n\nFabuła opowiada o licealiście o imieniu Ryota Murakami, który nie potrafi zapomnieć o swojej zmarłej przyjaciółce z dawnych lat. Ryota obiecał udowodnić istnienie obcych cywilizacji, przez co zapisał się do klubu astronomicznego. Pewnego dnia napotyka na swojej drodze tajemniczą dziewczynę, Neko Kuroha, która wygląda identycznie jak jego zmarła przyjaciółka...")
        .addFields(//inline-w embedzie zamiast po dobą będą obok siebie
            {name: "Gatunki:",value: "Dramat,Tajemnica,Ecchi,Harem,Sci-Fi", inline: true},
            {name: "Grupy docelowe:",value: "Seinen",inline: false},
            {name: "Rodzaje postaci",value: "Uczniowie",inline: false},
            {name: "Miejsce i czas",value: "Współczesność,Japonia",inline: false},
            {name: "Pierwowzór",value: "Manga",inline: false},
            )
        
        .setTimestamp()
        .setFooter(message.author.tag, message.author.avatarURL({dynamic: true}));

        message.channel.send({embeds: [embed]});
    }
}