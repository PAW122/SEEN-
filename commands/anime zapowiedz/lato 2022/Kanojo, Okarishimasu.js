
const Discord = require('discord.js');
const { QuickDB } = require("quick.db");
const srv_settings = require("../../../handlers/check_srv_settings")
module.exports = {
    name: "kanojo_okarishimasu_zapowiedz",
    name_en: "kanojo_okarishimasu_announcements",
    description: "wysyła pong",
    usage: "$ping",

    execute: async(message, args) => {
        //load server settings
        const guildId = message.guild.id
        const command_name = "anime_zapowiedzi"
      srv_settings(command_name,guildId)

        const embed = new Discord.MessageEmbed()
        
        .setColor("BLUE")
        .setTitle("Kanojo Okarishimasu")
        .setDescription(`2020-07-11\n
        Rzucony przez swoją dziewczynę, rozbity emocjonalnie student Kazuya 
        Kinoshita próbuje wypełnić pustkę w swoim sercu za pomocą wypożyczonej
         dziewczyny z mobilnej aplikacji. Na początku Chizuru Mizuhara wydaje 
         się idealną dziewczyną ze wszystkim, o co mógłby poprosić: wspaniałym 
         wyglądem i słodką, troskliwą osobowością. Widząc mieszane opinie na jej
          profilu po ich pierwszej randce i nadal dręczony przez swój poprzedni związek,
           Kazuya uważa, że Chizuru po prostu bawi się sercami mężczyzn i pozostawia jej negatywną ocenę.
            Wściekła na brak szacunku dla niej ze strony klienta,
             Chizuru ujawnia swoją prawdziwą naturę: szorstką i temperamentną,
              będącą całkowitym przeciwieństwem pierwszego wrażenia Kazuyi.
               W tym momencie Kazuya otrzymuje wiadomość o wypadku swojej babci i 
               jest zmuszony zabrać ze sobą Chizuru do szpitala. Choć okazuje się,
                że to nic poważnego, jego babcia jest zachwycona, że Kazuya znalazł
                 wreszcie poważną dziewczynę, co zawsze było jej życzeniem. 
                 Nie mogąc powiedzieć jej prawdy, Kazuya i Chizuru są zmuszeni 
                 do fałszywego związku — zachowują się tak, jakby byli prawdziwymi kochankami.
                
                Daty emisji odcinków:
          **1:**2020-07-11
          **2:**2022-07-18
          **3:**2022-07-25
          **4:**2022-08-01
          **5:**2022-08-08
          **6:**2022-08-15	
          **7:**2022-08-22	
          **8:**2022-08-29
          **9:**2022-09-05
          **10:**2022-09-12
          **11:**2022-09-19
          **12:**2022-09-26`)

        message.channel.send({embeds: [embed]});
    }

}


