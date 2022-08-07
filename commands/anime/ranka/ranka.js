const { MessageAttachment } = require('discord.js');
const Discord = require('discord.js');
const { QuickDB } = require("quick.db");
const srv_settings = require("../../../handlers/check_srv_settings")
module.exports = {
    name: "ranka",
    description: "wysyła grafike ranki",
    usage: "$ranka",

    execute: async(message, args) =>  {
         //load server settings
         const guildId = message.guild.id
         const command_name = "anime_seen"
         srv_settings(command_name,guildId)
        var cos= ".";
        var roz0= "jpg";
        var roz1= "jpg";
        var roz2= "jpg";
        var roz3= "jpg";
        var roz4= "jpg";
        var roz5= "jpg";
        var roz6= "jpg";
        var roz7= "jpg";
        var roz8= "jpg";
        var roz9= "jpg";
        var roz10= "jpg";
        var roz11= "jpg";
        var roz12= "jpg";
        var roz13= "jpg";
        var roz14= "jpg";
        var roz15= "jpg";
        var roz16= "jpg";
        var roz17= "jpg";
        var roz18= "gif";
        var roz19= "jpg";
        var roz20= "jpg";
        var roz21= "jpg";
        var roz22= "jpg";
        var roz23= "jpg";
        var roz24= "jpg";
        var roz25= "jpg";
        var roz26= "jpg";
        var roz27= "jpg";
        var roz28= "jpg";
        var roz29= "jpg";
        //nieurzywane \/
        var roz30= "jpg";

        const rng = Math.floor(Math.random() * 24);//od 1 do 24
        if(rng == 0){ var roz = cos.concat(roz0);}
        if(rng == 1){ var roz = cos.concat(roz1);}
        if(rng == 2){ var roz = cos.concat(roz2);}
        if(rng == 3){ var roz = cos.concat(roz3);}
        if(rng == 4){ var roz = cos.concat(roz4);}
        if(rng == 5){ var roz = cos.concat(roz5);}
        if(rng == 6){ var roz = cos.concat(roz6);}
        if(rng == 7){ var roz = cos.concat(roz7);}
        if(rng == 8){ var roz = cos.concat(roz8);}
        if(rng == 9){ var roz = cos.concat(roz9);}
        if(rng == 10){ var roz = cos.concat(roz10);}
        if(rng == 11){ var roz = cos.concat(roz11);}
        if(rng == 12){ var roz = cos.concat(roz12);}
        if(rng == 13){ var roz = cos.concat(roz13);}
        if(rng == 14){ var roz = cos.concat(roz14);}
        if(rng == 15){ var roz = cos.concat(roz15);}
        if(rng == 16){ var roz = cos.concat(roz16);}
        if(rng == 17){ var roz = cos.concat(roz17);}
        if(rng == 18){ var roz = cos.concat(roz18);}
        if(rng == 19){ var roz = cos.concat(roz19);}
        if(rng == 20){ var roz = cos.concat(roz20);}
        if(rng == 21){ var roz = cos.concat(roz21);}
        if(rng == 22){ var roz = cos.concat(roz22);}
        if(rng == 23){ var roz = cos.concat(roz23);}
        if(rng == 24){ var roz = cos.concat(roz24);}
        if(rng == 25){ var roz = cos.concat(roz25);}
        if(rng == 26){ var roz = cos.concat(roz26);}
        if(rng == 27){ var roz = cos.concat(roz27);}
        if(rng == 28){ var roz = cos.concat(roz28);}
        if(rng == 29){ var roz = cos.concat(roz29);}
               //nieurzywane\/
        if(rng == 30){ var roz = cos.concat(roz30);}
    

        
        const attachment = new MessageAttachment(`commands/anime/ranka/grafikaranka/ranka${rng}${roz}`)

        message.channel.send(`Grafika Nr:${rng}/29\n Anime:Murenase! Seton Gakuen`);
        message.channel.send({files: [attachment]});
              
    }
}