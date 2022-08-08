//Kinsou No Vermeil
//$zapoiwedzi anime
const Discord = require('discord.js');
const { QuickDB } = require("quick.db");
// spychu12@gmail.com
module.exports = {
    name: "kinsou_no_vermeil_zapowiedz",
    name_en: "kinsou_no_vermeil_announcements",
    description: "wysyła pong",
    usage: "$ping",

    execute: async(message, args) => {
      //load server settings
      const guildId = message.guild.id
      const db = new QuickDB({ filePath: process.cwd() + `/db/srv_settings/commands/${guildId}.sqlite` });
      if(await db.get(`check.check`) == true){
          const settings = await db.get(`anime_zapowiedzi.worker`)
          const settings_reason = await db.get(`anime_zapowiedzi.reason`)
          if(settings != true){return message.channel.send(settings_reason)}
      }

        const embed = new Discord.MessageEmbed()
        
        .setColor("BLUE")
        .setTitle("Kinsou No Vermeil")
        .setDescription(`05.07.2022\n
        Uczeń szkoły magii, Alto, któremu grozi powtórzenie roku szkolnego, 
        przypadkowo znajduje tajemniczą księgę, aktywując tym samym zaklęcie, 
        w wyniku czego przyzwana zostaje potężna kobieta demon o imieniu Vermeil. 
        Zaskoczony i nieco zdezorientowany bohater prosi ją, aby ta została jego 
        chowańcem. W ten sposób rozpoczyna się historia chłopaka kroczącego ramię w ramię z najsilniejszą istotą świata.
        
        Daty emisji odcinków:
          **1:**2022-07-05
          **2:**2022-07-12
          **3:**2022-07-19
          **4:**2022-07-26
          **5:**2022-08-02
          **6:**2022-08-09
          **7:**2022-08-16
          **8:**2022-08-23
          **9:**2022-08-30
          **10:**2022-09-06
          **11:**2022-09-13	
          **12:**2022-09-20`)

        message.channel.send({embeds: [embed]});
    }

}


