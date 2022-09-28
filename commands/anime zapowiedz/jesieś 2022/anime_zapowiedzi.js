//$zapoiwedzi anime
// spychu12@gmail.com
const Discord = require('discord.js');
const { QuickDB } = require("quick.db");
module.exports = {
    name: "zapowiedzi",
    name_en: "announcements",
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

        if(args[0] == "help"){
            if(args[1] == "en"){
                return message.channel.send("sending list of anime announcements on season\n $announcements <season>\n example: $announcements summer2022")
            }else{
                return message.channel.send("Wysyła liste zapowiedzi anime na sezon\n $zapowiedzi <sezon> \n przykład: $zapowiedzi lato2022")
            }
        }else{


        if(!args[0]){return message.channel.send("use: $zapowiedzi lato2022 \n $announcements summer2022")}

        const embed_2022 = new Discord.MessageEmbed()
        .setColor("BLUE")
        .setTitle("Anime")
        .setDescription("Zapowiedzi anime:")
        .addFields(
        {name: "JESIEŃ 2022",value: "------------------------------------------------------------------------", inline: false},
        //kanojo_okarishimasu_zapowiedz
        {name: "1.**ARKNIGHTS: Reimei Zensou**",value: "28.10.2022", inline: false},
        {name: "2.**akuyaku reijou nano de last boss wo kattemimashita**",value: "24.09.2022", inline: false},
        {name: "3.**BLUE LOCK**",value: "08.10.2022", inline: false},
        {name: "4.**bocchi the rock**",value: "08.10.2022", inline: false},
        {name: "5.**chainsaw man**",value: "11.10.2022", inline: false},
        {name: "6.**do it yourself**",value: "05.10.2022", inline: false},
        {name: "7.**futoku no guild**",value: "05.10.2022", inline: false},
        {name: "8.**fuufu ijou, koibito miman**",value: "09.10.2022", inline: false},
        {name: "9.**housing complex c**",value: "02.10.2022", inline: false},
        {name: "10.**kokyu no karasu**",value: "01.10.2022", inline: false},
        {name: "11.**legend of mana -the trardrop crystal-**",value: "07.10.2022", inline: false},
        {name: "12.**mushikaburi-hime**",value: "06.10.2022", inline: false},
        {name: "13.**noumin kanren no skill bakka agetetara nazeka tsuyoku natta**",value: "01.10.2022", inline: false},
        {name: "14.**renai flops**",value: "12.10.2022", inline: false},
        {name: "15.**romantic killer",value: "27.10.2022", inline: false},
        {name: "16.**shinami reninjutsushi no tenpo keie**",value: "03.10.2022", inline: false},
        {name: "17.**shinobi no ittoki**",value: "04.10.2022", inline: false},
        {name: "18.**tensei shitara ken deshita**",value: "28.09.2022", inline: false},
        {name: "19.**the eminence in shadow**",value: "05.10.2022", inline: false},
        {name: "20.**urusei yatsura**",value: "13.10.2022", inline: false},
        {name: "21.**yuusha party wo tsuihou sareta beast tamer**",value: "01.10.2022", inline: false},
        )
        const embed_2022_en = new Discord.MessageEmbed()
        .setColor("BLUE")
        .setTitle("Anime")
        .setDescription("announcements anime:")
        .addFields(
        {name: "autumn 2022",value: "------------------------------------------------------------------------", inline: false},
        
        {name: "1.**ARKNIGHTS: Reimei Zensou**",value: "28.10.2022", inline: false},
        {name: "2.**akuyaku reijou nano de last boss wo kattemimashita**",value: "24.09.2022", inline: false},
        {name: "3.**BLUE LOCK**",value: "08.10.2022", inline: false},
        {name: "4.**bocchi the rock**",value: "08.10.2022", inline: false},
        {name: "5.**chainsaw man**",value: "11.10.2022", inline: false},
        {name: "6.**do it yourself**",value: "05.10.2022", inline: false},
        {name: "7.**futoku no guild**",value: "05.10.2022", inline: false},
        {name: "8.**fuufu ijou, koibito miman**",value: "09.10.2022", inline: false},
        {name: "9.**housing complex c**",value: "02.10.2022", inline: false},
        {name: "10.**kokyu no karasu**",value: "01.10.2022", inline: false},
        {name: "11.**legend of mana -the trardrop crystal-**",value: "07.10.2022", inline: false},
        {name: "12.**mushikaburi-hime**",value: "06.10.2022", inline: false},
        {name: "13.**noumin kanren no skill bakka agetetara nazeka tsuyoku natta**",value: "01.10.2022", inline: false},
        {name: "14.**renai flops**",value: "12.10.2022", inline: false},
        {name: "15.**romantic killer",value: "27.10.2022", inline: false},
        {name: "16.**shinami reninjutsushi no tenpo keie**",value: "03.10.2022", inline: false},
        {name: "17.**shinobi no ittoki**",value: "04.10.2022", inline: false},
        {name: "18.**tensei shitara ken deshita**",value: "28.09.2022", inline: false},
        {name: "19.**the eminence in shadow**",value: "05.10.2022", inline: false},
        {name: "20.**urusei yatsura**",value: "13.10.2022", inline: false},
        {name: "21.**yuusha party wo tsuihou sareta beast tamer**",value: "01.10.2022", inline: false},
        )

        if(args[0] == "autumn2022"){message.channel.send({embeds: [embed_2022_en]});}
        if(args[0] == "jesień2022" || args[0] == "jesien2022"){message.channel.send({embeds: [embed_2022]});}
        }
    }
}


