//$zapoiwedzi anime
const Discord = require('discord.js');
const { QuickDB } = require("quick.db");
// spychu12@gmail.com
module.exports = {
    name: "bucchigire_zapowiedz",
    name_en: "bucchigire_announcements",
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
        .setTitle("ABucchigirenime")
        .setDescription(`08.07.2022\n
        Akcja rozgrywa się w czasach, gdy Japonią rządzili samuraje.
         Jednak policja Shinsengumi została niemal całkowicie zniszczona przez nieznanego wroga,
          z wyjątkiem jednego ocalałego. Siedmiu kryminalistów zostało wybranych jako zastępcy 
          Shinsengumi. Aby zapewnić prawo i porządek w Kioto, rozpoczyna się ściśle tajna operacja wymiany.
          
          Daty emisji odcinków:
          **1:**
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


