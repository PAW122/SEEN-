//Kuro No Shoukanshi
//$zapoiwedzi anime
const Discord = require('discord.js');
const { QuickDB } = require("quick.db");
// spychu12@gmail.com
module.exports = {
    name: "kuro_no_shoukanshi_zapowiedz",
    name_en: "kuro_no_shoukanshi_announcements",
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
        .setTitle("Kuro No Shoukanshi")
        .setDescription(`??.07.2022\n
        Budząc się w nieznanym miejscu, bez wspomnień ze swojego 
        poprzedniego życia, Kelvin zrozumiał, że zostały one wymienione 
        na potężne zdolności podczas jego niedawnej przemiany. Wkraczając
         w zupełnie nowy świat jako Przywoływacz - wraz ze swoją Towarzyszką,
          boginią, która go tutaj przyzwała - Kelvin rozpoczyna swoje nowe
           życie poszukiwacza przygód. Pokonując przeciwnika za przeciwnikiem,
            szybko zdaje sobie sprawę ze swojego uzależnienia od walki. 
            Z kim przyjdzie mu się zmierzyć za chwilę, gdzie uda się następnie,
             napięcie wzrasta.Śledź losy Kelvina i jego kompanów przemierzających świat,
              by zapisać się na kartach historii, w tej epickiej i porywającej przygodzie.
              
              Daty emisji odcinków:
          **1:**2022-07-09
          **2:**2022-07-16
          **3:**2022-07-23
          **4:**2022-07-30	
          **5:**2022-08-06	
          **6:**2022-08-13
          **7:**2022-08-20
          **8:**2022-08-27
          **9:**2022-09-03
          **10:**2022-09-10
          **11:**2022-09-17
          **12:**2022-09-24`)

        message.channel.send({embeds: [embed]});
    }

}


