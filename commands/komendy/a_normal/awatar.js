const config = require(process.cwd() + `/config/worker.js`)
    const work = config.awatar
    const worker = config.awatar_work
    const reason = config.awatar_disable

const Discord = require('discord.js');
//$awatar
//$awatar help
//$awatar help en
//$avatar
//$avatar help
//$avatar help en
module.exports = {
    name: "awatar",
    name_en:"avatar",
    description: "wysyła grafika z zdjęciem profilowym",
    usage: "$awatar <@nick>",
    work: worker,

    execute: async(message, args) => {

    if(work != true){return message.channel.send(reason)}
         

        if(args[0] == "help"){
            if(args[1] == "en"){
                const embed_en = new Discord.MessageEmbed()

            .setColor(`RED`)//EN
            .setTitle(`Avatar`)
            .setDescription(`the command sends the avatar of the marked user:\n
            usage:
            $avatar @user -- sends an avatar of the marked user\n
            $avatar --is sending your avatar`)
    
            .setFooter(message.author.tag, message.author.avatarURL({dynamic: true}));
    
    
            message.channel.send({embeds: [embed_en]});
            }else{
                const embed_pl = new Discord.MessageEmbed()

                .setColor(`BLUE`)//PL
                .setTitle(`Awatar`)
                .setDescription(`komenda wysyła awatar oznaczonego urzytkownika:\n
                sposób użycia:
                $awatar @user -- wysyła awatar oznaczonego urzytkowniaka\n
                $awatar -- wysyła twój awatar`)
        
                .setFooter(message.author.tag, message.author.avatarURL({dynamic: true}));
        
        
                message.channel.send({embeds: [embed_pl]});
            }
        }else{
        
        //towrzy zmienną do której przypisze urzytkownika
        let user = null;
        const mention = message.mentions.members.first();
//jeżeli spingujemy prawdziwą osobe
        if(mention) user = mention.user;
//jeśli nie spingujemy nikogo
        else user = message.author;
        
        const embed = new Discord.MessageEmbed()
        .setColor("DARK_GOLD")
        .setTitle('Avatar')
        .setDescription(`Avatar użytkownika ${user}\n[kliknij tutaj](${user.avatarURL({dunamic: true, size: 2048})}), aby zobaczyć awatar w większej rozdzielczośći`)
        .setImage(user.avatarURL({dynamic: true, size: 512 }))
        .setTimestamp()
        .setFooter(message.author.tag, message.author.avatarURL({dynamic: true}));
    
        message.channel.send({embeds: [embed]})
        }
    }
}