//Isekai Ojisan
//Isekai Meikyuu De Harem Wo
//$zapoiwedzi anime
const Discord = require('discord.js');
const { QuickDB } = require("quick.db");
// spychu12@gmail.com
module.exports = {
    name: "isekai_ojisan_zapowiedz",
    name_en: "isekai_ojisan_announcements",
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
        .setTitle("Isekai Ojisan")
        .setDescription(`??.07.2022\n
        Wujek Takafumiego przez siedemnaście lat leżał w śpiączce po tym,
         jak uderzyła go ciężarówka. Kiedy w końcu się wybudził, nasz bohater
          poznał tajemnicę kryjącą się za tym wydarzeniem: jego wujek przez cały 
          ten czas był bohaterem w innym świecie i nauczył się tam magii! A teraz
           powrócił i Takafumi musi pomóc mu zaadaptować się w świecie, który bardzo się zmienił przez te dwie dekady.
           
           Daty emisji odcinków:
          **1:**2022-07-06	
          **2:**2022-07-13	
          **3:**2022-07-20	
          **4:**2022-07-27
          **5:**2022-08-03
          **6:**2022-08-10	
          **7:**2022-08-17
          **8:**2022-08-24
          **9:**2022-08-31	
          **10:**2022-09-07
          **11:**2022-09-14
          **12:**2022-09-21`)

        message.channel.send({embeds: [embed]});
    }

}


