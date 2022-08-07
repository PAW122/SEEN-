//Isekai Meikyuu De Harem Wo
//$zapoiwedzi anime
const Discord = require('discord.js');
const { QuickDB } = require("quick.db");
const srv_settings = require("../../../handlers/check_srv_settings")
// spychu12@gmail.com
module.exports = {
    name: "isekai_meikyuu_de_harem_wo_zapowiedz",
    name_en: "isekai_meikyuu_de_harem_wo_announcements",
    description: "wysyła pong",
    usage: "$ping",

    execute: async(message, args) => {
        //load server settings
        const guildId = message.guild.id
        const command_name = "anime_zapowiedzi"
      srv_settings(command_name,guildId)

        const embed = new Discord.MessageEmbed()
        
        .setColor("BLUE")
        .setTitle("Isekai Meikyuu De Harem Wo")
        .setDescription(`??.07.2022\n
        Uczeń szkoły średniej Michio Kaga ma dość swojego życia i postanawia ze sobą skończyć.
         Zanurza się więc w otchłań internetu, poszukując najlepszej metody na samobójstwo. 
         W trakcie poszukiwań natrafia na dziwną stronę, która zadaje mu dużą ilość pytań i posiada
          system punktowy pozwalający stworzyć własne umiejętności i specjalności dla postaci.
           Zainteresowany możliwościami strony zaczął tworzyć własną postać. Gdy skończył, wyświetlił
            mu się komunikat: „Zostaniesz teraz przeniesiony do innego świata z ustawieniami, jakie wybrałeś,
             powrót nie będzie możliwy, nadal chcesz kontynuować”, nie zwlekając ani sekundy, wybrał 
             opcje TAK i w tym samym momencie znalazł się w nowym świecie wraz z wybranymi przez siebie umiejętnościami.
             
             Daty emisji odcinków:
          **1:**2022-07-06
          **2:**2022-07-13	
          **3:**2022-07-20	
          **4:**2022-07-27
          **5:**2022-08-03
          **6:**2022-08-10
          **7:**2022-08-17	
          **8:**2022-08-24	
          **9:**2022-08-31
          **10:**2022-09-07
          **11:**2022-09-14
          **12:**2022-09-21`)

        message.channel.send({embeds: [embed]});
    }

}


