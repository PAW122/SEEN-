//$zapoiwedzi anime
const Discord = require('discord.js');
const { QuickDB } = require("quick.db");
// spychu12@gmail.com
module.exports = {
    name: "engage_kiss_zapowiedz",
    name_en: "engage_kiss_announcements",
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
        .setTitle("Engage Kiss")
        .setDescription(`03.07.2022\n
        Akcja rozgrywa się w Baylong City na sztucznej wyspie na Pacyfiku,
         utworzonej w celu pozyskiwania surowców naturalnych. Historia skupa 
         się na trójce bohaterów. Pierwszym z nich jest Shu, który prowadzi
          małą firmę, a przez swoją rozrzutność, zawsze jest bez grosza przy duszy
          . Następna jest Kisara, która wiecznie się o niego martwi. Jest uczennicą
           liceum w Baylong City i podejmie się każdego zadania, od pracy biurowej,
            po obowiązki domowe. Ostatnią jest Ayano - była dziewczyna i współpracowniczka Shu.
            
            Daty emisji odcinków:
          **1:**2022-07-03	
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
          **12:**2022-09-18
          **13:**2022-09-25`)

        message.channel.send({embeds: [embed]});
    }

}


