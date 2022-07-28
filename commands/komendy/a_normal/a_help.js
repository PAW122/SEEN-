const config = require(process.cwd() + `/config/worker.js`)
    const work = config.help
    const worker = config.help_work
    const reason = config.help_disable

const Discord = require('discord.js');
const prefix = "$"
module.exports = {
    name: `help`,
    name_en:`help`,
    description: `help command`,
    usage: `$help`,
    work: worker,
        
    

    execute: async(message, args) => {//trzeba dodać help do anime!!!!
    

    if(work != true){return message.channel.send(reason)}
         

        const msg = message.content.slice(5) //zostają same argumenty
        console.log(msg)
        if(msg == `en` || msg == ` en`|| msg == ` En`|| msg == ` eN`|| msg == ` EN`|| msg == `En`|| msg == `eN`|| msg == `EN`|| msg == `english`||
        msg == `angielski` || msg == `eng`){//uwzlędnia ze i bez spacji
            const embed_en = new Discord.MessageEmbed()
            .setColor(`RED`)
            .setTitle(`Help`)
            .setDescription(`list of all commands:`)
            .addFields(//inline-w embedzie zamiast po dobą będą obok siebie
            {name: `avatar`, value:`${prefix} help avatar \n ${prefix} help  avatar en`, inline: true}, // see description
            {name: `ping`, value:`${prefix} help ping \n ${prefix} help ping en`, inline: true}, // see description
            {name: `embed`, value:`${prefix} help embed \n ${prefix} help embed en`, inline: true}, // see description
            {name: `clear`, value:`${prefix} help clear \n ${prefix} help clear en`, inline: true}, // description done
            {name: `say`, value:`${prefix} help say \n ${prefix} help say en`, inline: true}, // description done
            {name: `botinfo`, value:`${prefix} help botinfo \n ${prefix} help botinfo en`, inline: true}, // description done
            {name: `srvinfo`, value:`${prefix} help srvinfo \n ${prefix} help srvinfo en`, inline: true}, // description done
            {name: `survey`, value:`${prefix} help question \n ${prefix} help question en`, inline: true}, // description done
            {name: `roulette`, value:`${prefix} help roulette \n ${prefix} help roulette en`, inline: true}, // description done
            {name: `random`, value:`${prefix} help random \n ${prefix} help random en`, inline: true}, // description done
            {name: `kick`, value:`${prefix} help kick \n ${prefix} help kick en`, inline: true}, // description done
            {name: `ban`, value:`${prefix} help ban \n ${prefix} help ban en`, inline: true}, // opid made
            {name: `animelist`, value:`${prefix} help animelist \n ${prefix} help animelist en`, inline: true}, // opid made
            {name: `announcements summer2022 `, value:`${prefix} announcements help \n ${prefix} help summer2022_ announcements en`, inline: true},
            {name: `anime episodes`, value:`${prefix} anime_odc_help \n ${prefix} anime_odc_help en`, inline: true},
            {name: `animegif`, value:`${prefix} help animegif \n ${prefix} help animegif en`, inline: true},

            {name: `---------------------------------------------- -------------------------- `, value:` ------------------- -------------------------------------------------- -`, inline: false},

            {name: `ANIME`, value:` graphics and anime info`, inline: false},
            {name: `senko`, value:` sends a random \n image senko`, inline: true},
            {name: `senkoinfo`, value:` sends information about the anime`, inline: true},
            {name: `Sewayaki Kitsune no Senko-san`, value:` sending anime info`, inline: true},

            {name: `konata`, value:` sends a random \n konata image`, inline: true},
            {name: `konatainfo`, value:` sends information about the anime`, inline: true},
            {name: `Lucky Star`, value:` sends anime info`, inline: true},

            {name: `mornings`, value:` sends a random \n mornings graphic`, inline: true},
            {name: `rankainfo`, value:` sends anime information`, inline: true},
            {name: `Murenase Seton Gakuen`, value:` sends information about the anime`, inline: true},

            {name: `kuroha`, value:` sends a random \n kurohy graphic`, inline: true},
            {name: `Kurohainfof`, value:` sends information about the anime`, inline: true},
            {name: `Gokukoku no Brynhildr`, value:` sending anime info`, inline: true},
                )
    
            .setFooter(message.author.tag, message.author.avatarURL({dynamic: true}));
    
    
            message.channel.send({embeds: [embed_en]});
        }else{
            //wersja polska
            


        const embed_pl = new Discord.MessageEmbed()

        .setColor(`BLUE`)//PL
        .setTitle(`Help`)
        .setDescription(`U can use '$help en' for a description in English\nlista wszystkich komend:`)
        .addFields(//inline-w embedzie zamiast po dobą będą obok siebie
            {name: `awatar`,value: `${prefix}awatar help\n${prefix}awatar help en`, inline: true},//zobiony opis
            {name: `ping`,value: `${prefix}ping help\n${prefix}ping help en`,inline: true},//zobiony opis
            {name: `embed`,value: `${prefix}embed help\n${prefix}embed help en`,inline: true},//zobiony opis
            {name: `clear/wyczyść`,value: `${prefix}help clear\n${prefix}clear en`,inline: true},//zrobiony opis
            {name: `say/powiedz`,value: `${prefix}say help\n${prefix}say help en`,inline: true},//zrobiony opis
            {name: `botinfo`,value: `${prefix}botinfo help\n${prefix}botinfo help en`,inline: true},//zrobiony opis
            {name: `srvinfo`,value: `${prefix}srvinfo help\n${prefix}srvinfo help en`,inline: true},//zrobiony opis
            {name: `ankieta`,value: `${prefix}ankieta help\n${prefix}ankieta help en`,inline: true},//zrobiony opis
            {name: `ruletka`,value: `${prefix}ruletka help\n${prefix}ruletka help en`,inline: true},//zrobiony opis
            {name: `random`,value: `${prefix}random help\n${prefix}random help en`,inline: true},//zrobiony opis
            {name: `kick`,value: `${prefix}kick help\n${prefix}kick help en`,inline: true},//zrobiony opis
            {name: `ban`,value: `${prefix}ban help\n${prefix}ban help en`,inline: true},//zrobiony opid
            {name: `updaty`,value: `${prefix}updaty help\n${prefix}updaty help en`,inline: true},
            {name: `8ball`,value: `${prefix}8ball help\n${prefix}8ball help en`,inline: true},
            {name: `message_logs`,value: `${prefix}message_logs help\n${prefix}message_logs help en`,inline: true},
            {name: `blitzstats`,value: `${prefix}blitzstats help\n${prefix}blitzstats help en`,inline: true},
            {name: `autorole`,value: `${prefix}autorole help\n${prefix}autorole help en`,inline: true},

            {name: `------------------------------------------------------------------------`,value: `----------------------------------------------------------------------`,inline: false},
            {name: `SEEN - ANIME`,value: `lista komend dostępna pod:\n $animeseen help`,inline: false},
            {name: `ANIME`,value: `lista komend dostępna pod:\n $anime help`,inline: false},
            // !!~mamy 27 trzeczy a max to25
        )
        .setFooter(message.author.tag, message.author.avatarURL({dynamic: true}));


        message.channel.send({embeds: [embed_pl]});
        }
    }

}