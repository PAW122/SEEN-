//$zapoiwedzi anime
const Discord = require('discord.js');
const { QuickDB } = require("quick.db");
// spychu12@gmail.com
module.exports = {
    name: "mamahaha_no_tsurego_ga_motokano_datta_zapowiedz",
    name_en: "mamahaha_no_tsurego_ga_motokano_datta_announcements",
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
        .setTitle("Mamahaha No Tsurego Ga Motokano Datta")
        .setDescription(`06.07.2022\n
        Mizuto i Yume byli parą od gimnazjum. Częste kłótnie 
        i irytacja na siebie sprawiły jednak, że zerwali wkrótce
         po egzaminach końcowych. Prawdopodobnie ich drogi
          rozeszłyby się na dobre, gdyby nie ślub ich rodziców.
           Teraz więc, choć oboje się nienawidzą, dla dobra związku
            rodzicieli biorą rozejm. Jak jednak może zakończyć się
             historia osób, które są ciągle na siebie skazane, a w 
             dodatku wygląda na to, że ich uczucia do siebie nie wyparowały?
             
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


