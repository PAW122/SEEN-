const Discord = require('discord.js');
module.exports = {
    name: "konatainfo",
    name_en: "Lucky☆Star",
    description: "wysyła grafike senko",
    usage: "$senko",

    execute: async(message, args) =>  {
        const embed = new Discord.MessageEmbed()

        .setColor("BLUE")
        .setImage("https://shinden.pl/res/images/genuine/173400.jpg")
        .setTitle("Anime:")
        .setDescription("Lucky☆Star\n\n'Lucky Star' opowiada o dziewczynach z pewnego liceum. Główną bohaterką jest Konata Izumi – dziewczyna wysportowana, ale nie należąca do żadnych klubów, ze względu na konieczność brania udziału w zbędnych zajęciach dodatkowych. Jest leniwa i znudzona szkołą, źle się uczy, za to uwielbia gry wideo i anime. Posiada nawet wiedzę o grach dla dorosłych, mimo że nie jest jeszcze pełnoletnia. Tsukasa Hiragii jest typową niezdarą o jasnym usposobieniu. Często popełnia kretyńskie pomyłki, co skutkuje różnymi niedorzecznymi sytuacjami. Bliźniacza siostra Tsukasy – Kagami jest jej przeciwieństwem, ma dobre stopnie, była nawet przewodniczącą klasy. Mimo że jest w równoległej klasie, często przebywa w towarzystwie naszych bohaterek. Lubi gry wideo, ale jest słaba w gotowaniu. Miyuki Takara jest młodą sprytną damą, posiadającą cenną wiedzę w przeróżnych praktycznych dziedzinach. Jest ładna, nosi okulary, lubi czytać i uwielbia spać.")
        .addFields(//inline-w embedzie zamiast po dobą będą obok siebie
            {name: "Gatunki:",value: "Komedia,Okruchy życia,Szkolne,Parodia", inline: true},
            {name: "Grupy docelowe:",value: "Shounen",inline: false},
            {name: "Rodzaje postaci",value: "Otaku,Moe,Tsundere,Uczniowie,Dere-Dere,Meganekko,Policjanci",inline: false},
            {name: "Miejsce i czas",value: "Współczesność,Japonia",inline: false},
            {name: "Pierwowzór",value: "Manga 4-koma",inline: false},
            )
        
        .setTimestamp()
        .setFooter(message.author.tag, message.author.avatarURL({dynamic: true}));

        message.channel.send({embeds: [embed]});
    }
}