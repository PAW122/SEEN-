//Isekai Yakkyoku
//$zapoiwedzi anime
const Discord = require('discord.js');
// spychu12@gmail.com
module.exports = {
    name: "isekai_yakkyoku_zapowiedz",
    name_en: "isekai_yakkyoku_announcements",
    description: "wysyła pong",
    usage: "$ping",

    execute: async(message, args) => {

        const embed = new Discord.MessageEmbed()
        
        .setColor("BLUE")
        .setTitle("Isekai Yakkyoku")
        .setDescription(`10.07.2022\n
        Kanji Yakutani był światowej sławy farmaceutą, który po utracie swojej młodszej
         siostry z powodu nieuleczalnej choroby postanowił poświęcić swoje życie wynajdowaniu
          nowych leków. W wieku 31 lat aptekarz umiera z powodu przepracowania i reinkarnuje
           się jako 10-letni chłopiec w alternatywnej, średniowiecznej Europie. W świecie,
            gdzie istnieje magia udzielana poprzez błogosławieństwo bóstw opiekuńczych, Falma,
             bo tak ma na imię nasz bohater po odrodzeniu, dowiaduje się, że został pobłogosławiony
              przez bóstwo opiekuńcze medycyny. Otrzymuje zdolność molekularnego tworzenia i 
              niszczenia, jak i również natychmiastowej diagnozy chorób w ludzkim ciele. Mając te zdolności
               i wiedzę z poprzedniego życia, główny bohater postanawia założyć własną aptekę i poprawić
                stan opieki zdrowotnej, gdyż medycyna w świecie, gdzie został odrodzony, jest bardzo nieskuteczna i tylko szlachta może sobie na nią pozwolić.
                
                Daty emisji odcinków:
          **1:**2022-07-10	
          **2:**2022-07-17
          **3:**2022-07-24
          **4:**2022-07-31
          **5:**2022-08-07
          **6:**2022-08-14	
          **7:**2022-08-21	
          **8:**2022-08-28
          **9:**2022-09-04
          **10:**2022-09-11
          **11:**2022-09-18
          **12:**2022-09-25`)

        message.channel.send({embeds: [embed]});
    }

}


