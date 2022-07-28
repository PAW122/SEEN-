//$zapoiwedzi anime
const Discord = require('discord.js');
// spychu12@gmail.com
module.exports = {
    name: "hoshi_no_samidare_zapowiedz",
    name_en: "hoshi_no_samidare_announcements",
    description: "wysyła pong",
    usage: "$ping",

    execute: async(message, args) => {

        const embed = new Discord.MessageEmbed()
        
        .setColor("BLUE")
        .setTitle("Hoshi No Samidare")
        .setDescription(`09.07.2022\n
        Światu grozi śmiertelne niebezpieczeństwo. Sir Noi Crezant,
         Jaszczurzy Rycerz, został wysłany na Ziemię z misją pozyskania 
         pomocy u wielkiego wojownika, Amamiyi Yuuhiego. Ma to na celu
          odnalezienie Księżniczki Samidare oraz ochronę planety przed niesamowitym
           Ciastkowym Młotem skierowanym tak, aby ją przepołowić. Niestety, Yuuhi
            odmawia udziału, a Księżniczka nie wydaje się promienistą bohaterką sprawiedliwości, którą wyobrażał sobie Noi.
            
            Daty emisji odcinków:
          **1:**
          **2:**2022-07-16
          **3:**2022-07-23
          **4:**2022-07-30
          **5:**2022-08-06
          **6:**2022-08-13
          **7:**2022-08-20	
          **8:**2022-08-27
          **9:**2022-09-03	
          **10:**2022-09-10
          **11:**2022-09-17
          **12:**2022-09-24`)

        message.channel.send({embeds: [embed]});
    }

}


