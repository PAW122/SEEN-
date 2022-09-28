//$zapoiwedzi anime
const Discord = require('discord.js');
// spychu12@gmail.com
const { QuickDB } = require("quick.db");
module.exports = {
    name: "kontynuacje",
    name_en: "continuations",
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
                message.channel.send("sends an anime continuation list for summer 2022 \ n usage: $continuations <season> \n Example $continuations summer2022")
            }else{
                message.channel.send("wysyła liste kontynuacji anime na lato 2022\n użycie:$kontynuacje <sezon>\nPrzykład $kontynuacje lato2022")
            }
        }else{
        if(!args[0]){return message.channel.send("use:\n $kontynuacje lato2022 \n $continuations summer2022")}


        
        const embed = new Discord.MessageEmbed()
        
        .setColor("BLUE")
        .setTitle("Anime")
        .setDescription("Kontunuacje anime:")
        .addFields(
        {name: "JESIEŃ 2022 Kontynuacje",value: "------------------------------------------------------------------------", inline: false},
        {name: "1.BLEACH",value: "", inline: false},
        {name: "2.SPYxFAMILY",value: "", inline: false},
        {name: "3.Mob Psycho Hundred",value: "", inline: false},
        {name: "4.My Hero Academia",value: "", inline: false},
        {name: "5.Iruma Kun",value: "??.??.2022", inline: false},
        {name: "6.**Fumetsu no Anata e**",value: "23.10.2022", inline: false},
        {name: "7.**Golden Kamuy**",value: "03.10.2022 ", inline: false},
        {name: "8.**The Witch from Mercury**",value: "", inline: false},
        {name: "9.**KanColle: Itsuka Ano Umi de**",value: "", inline: false},
        {name: "9.**Uzaki-chan s2**",value: "", inline: false},
        {name: "9.**Muv-Luv Alternative s2**",value: "", inline: false},
        {name: "9.**Pop Team Epic**",value: "", inline: false},
        {name: "9.**Yowamushi Pedal: Limit Break**",value: "", inline: false},
        {name: "9.**yamano susume next summit**",value: "", inline: false},
        {name: "9.** idolish seven third bit part 2**",value: "", inline: false},
        {name: "9.**Megaton Musashi s2**",value: "", inline: false},
        )

        const embed_en = new Discord.MessageEmbed()
        
        .setColor("BLUE")
        .setTitle("Anime")
        .setDescription("Continuations anime:")
        .addFields(
        {name: "autumn 2022 Continuations",value: "------------------------------------------------------------------------", inline: false},
        {name: "1.BLEACH",value: "", inline: false},
        {name: "2.SPYxFAMILY",value: "", inline: false},
        {name: "3.Mob Psycho Hundred",value: "", inline: false},
        {name: "4.My Hero Academia",value: "", inline: false},
        {name: "5.Iruma Kun",value: "??.??.2022", inline: false},
        {name: "6.**Fumetsu no Anata e**",value: "23.10.2022", inline: false},
        {name: "7.**Golden Kamuy**",value: "03.10.2022 ", inline: false},
        {name: "8.**The Witch from Mercury**",value: "", inline: false},
        {name: "9.**KanColle: Itsuka Ano Umi de**",value: "", inline: false},
        {name: "9.**Uzaki-chan s2**",value: "", inline: false},
        {name: "9.**Muv-Luv Alternative s2**",value: "", inline: false},
        {name: "9.**Pop Team Epic**",value: "", inline: false},
        {name: "9.**Yowamushi Pedal: Limit Break**",value: "", inline: false},
        {name: "9.**yamano susume next summit**",value: "", inline: false},
        {name: "9.** idolish seven third bit part 2**",value: "", inline: false},
        {name: "9.**Megaton Musashi s2**",value: "", inline: false},
        )

        if(args[0] == "jesień2022"){message.channel.send({embeds: [embed]});}
        if(args[0] == "autumn2022"){message.channel.send({embeds: [embed_en]});}
    }
    }
}


