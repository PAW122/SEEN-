//Kumichou Musume To Sewagakari
//$zapoiwedzi anime
const Discord = require('discord.js');
const { QuickDB } = require("quick.db");
// spychu12@gmail.com
module.exports = {
    name: "kumichou_musume_to_sewagakari_zapowiedz",
    name_en: "kumichou_musume_to_sewagakari_announcements",
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
        .setTitle("Kumichou Musume To Sewagakari")
        .setDescription(`07.07.2022\n
        Tooru Kirishima jest prawą ręką rodziny przestępczej Sakuragi. 
        Praca jest dla niego doskonałą wymówką, by dać upust swoim brutalnym
        instynktom, dzięki czemu zyskał on przydomek „Demona Sakuragi”.
         Wydaje się, że nic nie stanie na przeszkodzie jego okrutnej naturze.
          Ale pewnego dnia otrzymuje od szefa zadanie, jakiego jeszcze nie było
           — niańczenie jego córki! Rozgrzewająca (a może mrożąca krew w żyłach?)
            historia małej dziewczynki i jej opiekuna z yakuzy!
            
            Daty emisji odcinków:
          **1:**2022-07-07
          **2:**2022-07-14
          **3:**2022-07-21
          **4:**2022-07-28
          **5:**2022-08-04
          **6:**2022-08-11	
          **7:**2022-08-18
          **8:**2022-08-25
          **9:**2022-09-01
          **10:**2022-09-08
          **11:**2022-09-15
          **12:**2022-09-22`)

        message.channel.send({embeds: [embed]});
    }

}


