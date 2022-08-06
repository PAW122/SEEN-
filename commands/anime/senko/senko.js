const { MessageAttachment } = require('discord.js');
const Discord = require('discord.js');
const { QuickDB } = require("quick.db");

module.exports = {
    name: "senko",
    description: "wysyła grafike senko",
    usage: "$senko",

    execute: async(message, args) =>  {
         //load server settings
         const guildId = message.guild.id
         const db = new QuickDB({ filePath: process.cwd() + `/db/srv_settings/commands/${guildId}.sqlite` });
         if(await db.get(`check.check`) == true){
             const settings = await db.get(`eight_ball.worker`)
             const settings_reason = await db.get(`eight_ball.reason`)
             if(settings != true){return message.channel.send(settings_reason)}
         }

//podpisane do 50 + bread.png + bruh.jpg

var cos= ".";
var roz0= "jpg";
var roz1= "jpg";
var roz2= "png";
var roz3= "png";
var roz4= "png";
var roz5= "png";
var roz6= "jpg";
var roz7= "gif";
var roz8= "jpg";
var roz9= "gif";
var roz10= "jpg";
var roz11= "gif";
var roz12= "jpg";
var roz13= "jpg";
var roz14= "gif";
var roz15= "jpg";
var roz16= "jpg";
var roz17= "jpg";
var roz18= "gif";
var roz19= "png";
var roz20= "gif";
var roz21= "jpg";
var roz22= "jpg";
var roz23= "jpg";
var roz24= "jpg";
var roz25= "jpg";
var roz26= "jpg";
var roz27= "jpg";
var roz28= "gif";
var roz29= "png";
var roz30= "jpg";
var roz31= "jpg";
var roz32= "jpg";
var roz33= "gif";
var roz34= "jpg";
var roz35= "jpg";
var roz36= "gif";
var roz37= "jpg";
var roz38= "jpg";
var roz39= "gif";
var roz40= "jpg";
var roz41= "jpg";
var roz42= "jpg";
var roz43= "jpg";
var roz44= "gif";
var roz45= "jpg";
var roz46= "jpg";
var roz47= "jpg";
var roz48= "jpg";
var roz49= "jpg";
var roz50= "png";
var roz51= "png";
var roz52= "jpg";
var roz53= "jpg";
var roz54= "png";
var roz55= "jpg";
var roz56= "gif";
var roz57= "gif";
var roz58= "jpg";
var roz59= "jpg";
var roz60= "gif";
var roz61= "jpg";
var roz62= "jpg";
var roz63= "jpg";
var roz64= "jpg";
var roz65= "jpg";
var roz66= "jpg";
var roz67= "jpg";
var roz68= "jpg";
var roz69= "jpg";
var roz70= "jpg";
var roz71= "jpg";
var roz72= "jpg";
var roz73= "gif";
var roz74= "jpg";
var roz75= "jpg";
var roz76= "jpg";
var roz77= "jpg";
var roz78= "jpg";
var roz79= "jpg";
var roz80= "jpg";
var roz81= "jpg";
var roz82= "gif";
var roz83= "jpg";
var roz84= "jpg";
var roz85= "jpg";
var roz86= "jpg";
var roz87= "jpg";
var roz88= "jpg";
var roz89= "jpg";
var roz90= "jpg";
var roz91= "jpg";
var roz92= "jpg";
var roz93= "jpg";
var roz94= "jpg";
var roz95= "jpg";
var roz96= "gif";
var roz97= "jpg";
var roz98= "gif";
var roz99= "jpg";
var roz100= "jpg";
var roz101= "jpg";
var roz102= "jpg";
        const rng = Math.floor(Math.random() * 103);//od 1 do 103
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
        if(rng == 30){ var roz = cos.concat(roz30);}
        if(rng == 31){ var roz = cos.concat(roz31);}
        if(rng == 32){ var roz = cos.concat(roz32);}
        if(rng == 33){ var roz = cos.concat(roz33);}
        if(rng == 34){ var roz = cos.concat(roz34);}
        if(rng == 35){ var roz = cos.concat(roz35);}
        if(rng == 36){ var roz = cos.concat(roz36);}
        if(rng == 37){ var roz = cos.concat(roz37);}
        if(rng == 38){ var roz = cos.concat(roz38);}
        if(rng == 39){ var roz = cos.concat(roz39);}
        if(rng == 40){ var roz = cos.concat(roz40);}
        if(rng == 41){ var roz = cos.concat(roz41);}
        if(rng == 42){ var roz = cos.concat(roz42);}
        if(rng == 43){ var roz = cos.concat(roz43);}
        if(rng == 44){ var roz = cos.concat(roz44);}
        if(rng == 45){ var roz = cos.concat(roz45);}
        if(rng == 46){ var roz = cos.concat(roz46);}
        if(rng == 47){ var roz = cos.concat(roz47);}
        if(rng == 48){ var roz = cos.concat(roz48);}
        if(rng == 49){ var roz = cos.concat(roz49);}
        if(rng == 50){ var roz = cos.concat(roz50);}
        if(rng == 51){ var roz = cos.concat(roz51);}
        if(rng == 52){ var roz = cos.concat(roz52);}
        if(rng == 53){ var roz = cos.concat(roz53);}
        if(rng == 54){ var roz = cos.concat(roz54);}
        if(rng == 55){ var roz = cos.concat(roz55);}
        if(rng == 56){ var roz = cos.concat(roz56);}
        if(rng == 57){ var roz = cos.concat(roz57);}
        if(rng == 58){ var roz = cos.concat(roz58);}
        if(rng == 59){ var roz = cos.concat(roz59);}
        if(rng == 60){ var roz = cos.concat(roz60);}
        if(rng == 61){ var roz = cos.concat(roz61);}
        if(rng == 62){ var roz = cos.concat(roz62);}
        if(rng == 63){ var roz = cos.concat(roz63);}
        if(rng == 64){ var roz = cos.concat(roz64);}
        if(rng == 65){ var roz = cos.concat(roz65);}
        if(rng == 66){ var roz = cos.concat(roz66);}
        if(rng == 67){ var roz = cos.concat(roz67);}
        if(rng == 68){ var roz = cos.concat(roz68);}
        if(rng == 69){ var roz = cos.concat(roz69);}
        if(rng == 70){ var roz = cos.concat(roz70);}
        if(rng == 71){ var roz = cos.concat(roz71);}
        if(rng == 72){ var roz = cos.concat(roz72);}
        if(rng == 73){ var roz = cos.concat(roz73);}
        if(rng == 74){ var roz = cos.concat(roz74);}
        if(rng == 75){ var roz = cos.concat(roz75);}
        if(rng == 76){ var roz = cos.concat(roz76);}
        if(rng == 77){ var roz = cos.concat(roz77);}
        if(rng == 78){ var roz = cos.concat(roz78);}
        if(rng == 79){ var roz = cos.concat(roz79);}
        if(rng == 80){ var roz = cos.concat(roz80);}
        if(rng == 81){ var roz = cos.concat(roz81);}
        if(rng == 82){ var roz = cos.concat(roz82);}
        if(rng == 83){ var roz = cos.concat(roz83);}
        if(rng == 84){ var roz = cos.concat(roz84);}
        if(rng == 85){ var roz = cos.concat(roz85);}
        if(rng == 86){ var roz = cos.concat(roz86);}
        if(rng == 87){ var roz = cos.concat(roz87);}
        if(rng == 88){ var roz = cos.concat(roz88);}
        if(rng == 89){ var roz = cos.concat(roz89);}
        if(rng == 90){ var roz = cos.concat(roz90);}
        if(rng == 91){ var roz = cos.concat(roz91);}
        if(rng == 92){ var roz = cos.concat(roz92);}
        if(rng == 93){ var roz = cos.concat(roz93);}
        if(rng == 94){ var roz = cos.concat(roz94);}
        if(rng == 95){ var roz = cos.concat(roz95);}
        if(rng == 96){ var roz = cos.concat(roz96);}
        if(rng == 97){ var roz = cos.concat(roz97);}
        if(rng == 98){ var roz = cos.concat(roz98);}
        if(rng == 99){ var roz = cos.concat(roz99);}
        if(rng == 100){ var roz = cos.concat(roz100);}
        if(rng == 101){ var roz = cos.concat(roz101);}
        if(rng == 102){ var roz = cos.concat(roz102);}
    
        const attachment = new MessageAttachment(`commands/anime/senko/grafikasenko/senko${rng}${roz}`)

        message.channel.send(`Grafika Nr:${rng}/102\n Anime:Sewayaki Kitsune no Senko-san`);
        try{
        message.channel.send({files: [attachment]});
        }catch (error){
            console.log(error)
            message.reply(error)
        }  
    }
}