//Tebesi Kenja No Isekai Life
//$zapoiwedzi anime
const Discord = require('discord.js');
// spychu12@gmail.com
module.exports = {
    name: "tebesi_kenja_no_isekai_life_zapowiedz",
    name_en: "tebesi_kenja_no_isekai_life_announcements",
    description: "wysyła pong",
    usage: "$ping",

    execute: async(message, args) => {

        const embed = new Discord.MessageEmbed()
        
        .setColor("BLUE")
        .setTitle("Tebesi Kenja No Isekai Life")
        .setDescription(`04.07.2022\n
        Historia opowiada o Yuujim Sano - pracowniku firmy
         bardzo surowej dla swoich pracowników. Pewnego razu 
         po przyniesieniu dodatkowej pracy do domu otrzymuje 
         nietypową wiadomość: 'Zostałeś wezwany do innego świata!'.
          Jak zapewne się domyślacie, trafia on do świata podobnego
           do gry pełnego pasków statusu i umiejętności. Już na 
           start nasz bohater oswaja slima zyskując tym profesję
            poskramiacza bestii. Ale to nie wszystko! Zaraz potem
            nagle budzi w sobie magiczne moce i otrzymuje drugą 
            profesję - mędrca! Oto przygoda Yujiego w towarzystwie 
            slima - podobno najsłabszego potwora w owym świecie.
            
            Daty emisji odcinków:
          **1:**2022-07-04
          **2:**2022-07-04
          **3:**2022-07-11
          **4:**2022-07-18
          **5:**2022-08-01
          **6:**2022-08-08
          **7:**2022-08-15
          **8:**2022-08-22
          **9:**2022-08-29
          **10:**2022-09-05
          **11:**2022-09-12
          **12:**2022-09-19`)

        message.channel.send({embeds: [embed]});
    }

}


