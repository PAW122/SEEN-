//Saikin Yatotta Maid Ga Ayashii
//$zapoiwedzi anime
const Discord = require('discord.js');
const { QuickDB } = require("quick.db");
// spychu12@gmail.com
const srv_settings = require("../../../handlers/check_srv_settings")
module.exports = {
    name: "saikin_yatotta_maid_ga_ayashii_zapowiedz",
    name_en: "saikin_yatotta_maid_ga_ayashii_announcements",
    description: "wysyła pong",
    usage: "$ping",

    execute: async(message, args) => {
        //load server settings
        const guildId = message.guild.id
        const command_name = "anime_zapowiedzi"
      srv_settings(command_name,guildId)

        const embed = new Discord.MessageEmbed()
        
        .setColor("BLUE")
        .setTitle("Saikin Yatotta Maid Ga Ayashii")
        .setDescription(`24.07.2022\n
        Piękna Lilith dostaje posadę osobistej pokojówki
         młodego panicza Yurriego. Jednak chłopak podejrzewa,
          że za działaniami Lilith kryje się jakiś podstęp mający
           mu dokuczyć. Niegroźna paranoja nie stanowiła dla 
           Lilith przeszkody, aby polubić Yurriego. Czasami Lilith
           wykorzystuje nadmierną ostrożność młodego panicza
            i delikatnie mu dokucza, ale reakcje Yurriego sprawiają,
             że Lilith się zawstydza i czerwieni
             
             Daty emisji odcinków:
          **1:**24.07.2022
          **2:**
          **3:**
          **4:**
          **5:**
          **6:**
          **7:**
          **8:**
          **9:**
          **10:**
          **11:**
          **12:**`)

        message.channel.send({embeds: [embed]});
    }

}


