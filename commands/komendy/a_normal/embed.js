const config = require(process.cwd() + `/config/worker.js`)
    const work = config.embed
    const worker = config.embed_work
    const reason = config.embed_disable

const Discord = require('discord.js');
//$embed
//$embed help
//$embed help en
module.exports = {
    name: "embed",
    name_en:"embed",
    description: "wysyła embeda",
    usage: "$embed",
    work: worker,

    execute: async(message, args) => {

        
    if(work != true){return message.channel.send(reason)}
         

        if(args[0] == "help"){
            if(args[1] == "en"){
                const embed_en = new Discord.MessageEmbed()

                .setColor(`RED`)//EN
                .setTitle(`Embed`)
                .setDescription(`the bot sends an example embed message \n
                this is a test command\n
                usage: "$embed"`)
        
                .setFooter(message.author.tag, message.author.avatarURL({dynamic: true}));
        
        
                message.channel.send({embeds: [embed_en]});
            }else{
                const embed_pl = new Discord.MessageEmbed()

            .setColor(`BLUE`)//PL
            .setTitle(`Embed`)
            .setDescription(`bot wysyła przykładową wiadomość embed\n
            jest to komenda testowa\n
            użycie: "$embed"`)
    
            .setFooter(message.author.tag, message.author.avatarURL({dynamic: true}));
    
    
            message.channel.send({embeds: [embed_pl]});
            }
        }else{

        
        const embed = new Discord.MessageEmbed()

        .setColor("RED")
        .setTitle("tytuł")
        .setDescription("opis")
        .addFields(//inline-w embedzie zamiast po dobą będą obok siebie
            {name: "nazwa1",value: "opis1", inline: true},
            {name: "nazwa2",value: "opis2",inline: true},
            )
        //.setImage("https://www.google.com/imgres?imgurl=https%3A%2F%2Fstatic.wikia.nocookie.net%2Fsewayaki-kitsune-no-senkosan%2Fimages%2F0%2F0a%2FSenko.png%2Frevision%2Flatest%2Ftop-crop%2Fwidth%2F360%2Fheight%2F450%3Fcb%3D20190425152125&imgrefurl=https%3A%2F%2Fsenkosan.fandom.com%2Fwiki%2FSenko&tbnid=KZhhApuoUouAuM&vet=12ahUKEwjn46qGloP4AhUIxosKHYc5DaoQMygAegUIARC6AQ..i&docid=Bb25KfiFD89K3M&w=360&h=450&q=senko%20san&client=opera-gx&ved=2ahUKEwjn46qGloP4AhUIxosKHYc5DaoQMygAegUIARC6AQ")
        .setTimestamp()
//daje grafike w prawym górnym rogu embeda
        .setThumbnail("https://ibb.co/6sP5y16")
        .setFooter(message.author.tag, message.author.avatarURL({dynamic: true}));

        message.channel.send({embeds: [embed]});
        }
    }
}