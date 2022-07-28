//$zapoiwedzi anime
const Discord = require('discord.js');
// spychu12@gmail.com
module.exports = {
    name: "kontynuacje",
    name_en: "continuations",
    description: "wysyła pong",
    usage: "$ping",

    execute: async(message, args) => {

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
        {name: "LATO 2022 Kontynuacje",value: "------------------------------------------------------------------------", inline: false},
        {name: "1.Overlord",value: ".07.2022", inline: false},
        {name: "2.Hataraku Maou-sama",value: ".07.2022", inline: false},
        {name: "3.Classroom of the elite",value: ".07.2022", inline: false},
        {name: "4.rent a girlfriend",value: ".07.2022", inline: false},
        {name: "5.Danmachi",value: ".07.2022", inline: false},
        {name: "6.Made in Abyss",value: ".07.2022", inline: false},
        {name: "7.Shadows House",value: ".07.2022", inline: false},
        {name: "8.Utawarerumono: Futari no Hakuoro",value: ".07.2022", inline: false},
        {name: "9.Orient",value: ".07.2022", inline: false},
        {name: "10.Jashin-chan Dropkick",value: ".07.2022", inline: false},
        )

        const embed_en = new Discord.MessageEmbed()
        
        .setColor("BLUE")
        .setTitle("Anime")
        .setDescription("Continuations anime:")
        .addFields(
        {name: "Summer 2022 Continuations",value: "------------------------------------------------------------------------", inline: false},
        {name: "1.Overlord",value: ".07.2022", inline: false},
        {name: "2.Hataraku Maou-sama",value: ".07.2022", inline: false},
        {name: "3.Classroom of the elite",value: ".07.2022", inline: false},
        {name: "4.rent a girlfriend",value: ".07.2022", inline: false},
        {name: "5.Danmachi",value: ".07.2022", inline: false},
        {name: "6.Made in Abyss",value: ".07.2022", inline: false},
        {name: "7.Shadows House",value: ".07.2022", inline: false},
        {name: "8.Utawarerumono: Futari no Hakuoro",value: ".07.2022", inline: false},
        {name: "9.Orient",value: ".07.2022", inline: false},
        {name: "10.Jashin-chan Dropkick",value: ".07.2022", inline: false},
        )

        if(args[0] == "lato2022"){message.channel.send({embeds: [embed]});}
        if(args[0] == "summer2022"){message.channel.send({embeds: [embed_en]});}
    }
    }
}


