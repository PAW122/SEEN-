//Yurei Deco
//$zapoiwedzi anime
const Discord = require('discord.js');
const { QuickDB } = require("quick.db");
// spychu12@gmail.com
module.exports = {
    name: "yurei_deco_zapowiedz",
    name_en: "yurei_deco_announcements",
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
        .setTitle("Yurei Deco")
        .setDescription(`??.07.2022\n
        historia zaczyna się gdy dziewczyna  z przeciętnego
         domu spotyka 'hak' dziewczynę wyglądającą jak chłopiec.
          Zauroczona hakiem Berry spotyka się z zespołem którym 
          przewodzi hak z 'Ghost dedectiv clab'. Członkowie tego
           klubu sa martwi społecznie pracując niewiodocznie w
            kontrolowanym cyfrowo społeczeństwie tomka sojera. 
            Pracując z grupa Berry dowiaduje się o 'zero' tajemniczej 
            postaci, która czai sie w podziemiach toma sojera. Ona i 
            hak postanawiają ścigac tą postać, z czasem prawda o mieście 
            zostaje ujawniona.
            
            Daty emisji odcinków:
          **1:**
          **2:**2022-07-10
          **3:**2022-07-17
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


