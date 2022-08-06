//Yofukashi No Uta
//$zapoiwedzi anime
const Discord = require('discord.js');
const { QuickDB } = require("quick.db");
// spychu12@gmail.com
module.exports = {
    name: "yofukashi_no_uta_zapowiedz",
    name_en: "yofukashi_no_uta_announcements",
    description: "wysyła pong",
    usage: "$ping",

    execute: async(message, args) => {
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
        .setTitle("Yofukashi No Uta")
        .setDescription(`08.07.2022\n
        Kou Yamori tylko z pozoru wygląda jak zwyczajny uczeń szkoły średniej.
         Stosunkowo dobry w nauce i miły wobec kolegów z klasy, w rzeczywistości
          wkłada wiele wysiłku w utrzymanie tej fasady. Jednak pewnego dnia stwierdza,
           że nie warto udawać i rzuca szkołę, cierpiąc na bezsenność w 
           wyniku braku możliwości spożytkowania energii w ciągu dnia.
            W czasie samotnych, nocnych spacerów czuje się nieznacznie lepiej,
             choć ma świadomość, że jego niezdolność do snu stanowi poważny problem.
             Na jednym z takich spacerów Kou spotyka dziwną dziewczynę,
              Nazunę Nanakusę, która diagnozuje przyczynę jego bezsenności
               — mimo przemian w swoim życiu, chłopak wciąż wstrzymuje się 
               przed doświadczeniem prawdziwej wolności. Mówi, że nie będzie
                mógł zasnąć, jeśli nie będzie zadowolony z tego, jak spędza
                 czas na jawie. W momencie, gdy wydaje się, że jego obecne
                  zmartwienia zostały rozwiązane, Nazuna zaprasza go do swojego
                   mieszkania, aby podzielić się miejscem do spania. Po pewnym
                    czasie spędzonym w domu, Nazuna, nieświadoma, iż Kou tylko
                    udaje, że śpi, pochyla się nad nim i... gryzie go w szyję!
                    
                    Daty emisji odcinków:
          **1:**2022-07-08
          **2:**2022-07-15
          **3:**2022-07-22
          **4:**2022-07-29
          **5:**2022-08-05
          **6:**2022-08-12
          **7:**2022-08-19	
          **8:**2022-08-26
          **9:**2022-09-02
          **10:**2022-09-09
          **11:**2022-09-16
          **12:**2022-09-23
          **13:**2022-09-30`)

        message.channel.send({embeds: [embed]});
    }

}


