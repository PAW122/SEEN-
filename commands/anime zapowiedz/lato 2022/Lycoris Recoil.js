//$zapoiwedzi anime
const Discord = require('discord.js');
// spychu12@gmail.com
module.exports = {
    name: "lycoris_recoil_zapowiedz",
    name_en: "lycoris_recoil_announcements",
    description: "wysyła pong",
    usage: "$ping",

    execute: async(message, args) => {

        const embed = new Discord.MessageEmbed()
        
        .setColor("BLUE")
        .setTitle("Lycoris Recoil")
        .setDescription(`??.07.2022\n
        japońska kawiarnia w tokio serwująca pyszną kawę,
         supersłodkie smakołyki i wiele więcej doświadczeń.
          Od robienia lkalnych dostaw przez opiekę po pozbycie
           sie zombie a nawet z gigantycznym potworem.'bez względu
            na problem wpadnij na wizytę, bez względu na 
            zamówienie zostaw to nam' tak właśnie zachęca nas 
            2 już produkcja sezonu lato tworzona przez A1 
            
            Daty emisji odcinków:
          **1:**2022-07-02
          **2:**2022-07-09
          **3:**2022-07-16
          **4:**2022-07-23
          **5:**2022-07-30
          **6:**2022-08-06
          **7:**2022-08-13
          **8:**2022-08-20
          **9:**2022-08-27
          **10:**2022-09-03
          **11:**2022-09-10
          **12:**2022-09-17
          **13:**2022-09-24`)

        message.channel.send({embeds: [embed]});
    }

}


