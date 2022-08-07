//Soredemo Ayumu Wa Yoserekuru
//$zapoiwedzi anime
const Discord = require('discord.js');
const { QuickDB } = require("quick.db");
// spychu12@gmail.com
const srv_settings = require("../../../handlers/check_srv_settings")
module.exports = {
    name: "soredemo_ayumu_wa_yoserekuru_zapowiedz",
    name_en: "soredemo_ayumu_wa_yoserekuru_announcements",
    description: "wysyła pong",
    usage: "$ping",

    execute: async(message, args) => {
        //load server settings
        const guildId = message.guild.id
        const command_name = "anime_zapowiedzi"
      srv_settings(command_name,guildId)

        const embed = new Discord.MessageEmbed()
        
        .setColor("BLUE")
        .setTitle("Soredemo Ayumu Wa Yoserekuru")
        .setDescription(`08.07.2022\n
        Nastoletni Ayumu Tanaka opuszcza szkolny klub kendo 
        i dołącza do klubu shogi, któremu przewodzi dziewczyna
         imieniem Urushi Yaotome. Ayumu zamierza wyznać jej swoje
          uczucia, kiedy w końcu uda mu się zwyciężyć z nią w shogi.
          
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
          **12:**2022-09-23`)

        message.channel.send({embeds: [embed]});
    }

}


