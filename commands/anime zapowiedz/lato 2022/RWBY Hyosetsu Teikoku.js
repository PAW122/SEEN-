//RWBY: Hyosetsu Teikoku
//$zapoiwedzi anime
const Discord = require('discord.js');
const { QuickDB } = require("quick.db");
// spychu12@gmail.com
module.exports = {
    name: "hyosetsu_teikoku_zapowiedz",
    name_en: "hyosetsu_teikoku_announcements",
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
        .setTitle("RWBY: Hyosetsu Teikoku")
        .setDescription(`03.07.2022\n
        pod okiem znanego i doswadczonego studia
         otrzymamy remake w postaci japońskiej wersji tej franczyzy
         
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
          **12:**2022-09-18`)

        message.channel.send({embeds: [embed]});
    }

}


