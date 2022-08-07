//Luminous Witches
//Kuro No Shoukanshi
//$zapoiwedzi anime
const Discord = require('discord.js');
const { QuickDB } = require("quick.db");
const srv_settings = require("../../../handlers/check_srv_settings")
// spychu12@gmail.com
module.exports = {
    name: "luminous_witches_zapowiedz",
    name_en: "luminous_witches_announcements",
    description: "wysyła pong",
    usage: "$ping",

    execute: async(message, args) => {
      //load server settings
      const guildId = message.guild.id
      const command_name = "anime_zapowiedzi"
      srv_settings(command_name,guildId)

        const embed = new Discord.MessageEmbed()
        
        .setColor("BLUE")
        .setTitle("Luminous Witches")
        .setDescription(`03.07.2022\n
        fabuła koncentruje się na eskadrze czarownic, które nie walczą. 
        Zmaiast tego eskadra śpiewa i wykonuje muzyke aby chronić usmiechy 
        tych, którzy zostali wygnani ze swoich rodzinnych miast przez neroi
        
        Daty emisji odcinków:
          **1:**
          **2:**
          **3:**
          **4:**2022-07-24
          **5:**2022-07-31
          **6:**2022-08-07
          **7:**2022-08-14
          **8:**2022-08-21
          **9:**2022-08-28
          **10:**2022-09-04
          **11:**2022-09-11
          **12:**2022-09-18`)

        message.channel.send({embeds: [embed]});
    }

}


