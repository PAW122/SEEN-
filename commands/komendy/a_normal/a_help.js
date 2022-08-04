const config = require(process.cwd() + `/config/worker.js`)
const work = config.help
const worker = config.help_work
const reason = config.help_disable

const Discord = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const prefix = "$"
const embed_pl = new Discord.MessageEmbed()
    .setColor(`BLUE`)
    .setTitle(`Help`)
    .setDescription(`U can use '/helpen' for a description in English\nlista wszystkich komend:`)
    .addFields(//inline-w embedzie zamiast po dobą będą obok siebie
        { name: `awatar`, value: `${prefix}awatar help\n${prefix}awatar help en`, inline: true },//zobiony opis
        { name: `ping`, value: `${prefix}ping help\n${prefix}ping help en`, inline: true },//zobiony opis
        { name: `embed`, value: `${prefix}embed help\n${prefix}embed help en`, inline: true },//zobiony opis
        { name: `clear/wyczyść`, value: `${prefix}help clear\n${prefix}clear en`, inline: true },//zrobiony opis
        { name: `say/powiedz`, value: `${prefix}say help\n${prefix}say help en`, inline: true },//zrobiony opis
        { name: `botinfo`, value: `${prefix}botinfo help\n${prefix}botinfo help en`, inline: true },//zrobiony opis
        { name: `srvinfo`, value: `${prefix}srvinfo help\n${prefix}srvinfo help en`, inline: true },//zrobiony opis
        { name: `ankieta`, value: `${prefix}ankieta help\n${prefix}ankieta help en`, inline: true },//zrobiony opis
        { name: `ruletka`, value: `${prefix}ruletka help\n${prefix}ruletka help en`, inline: true },//zrobiony opis
        { name: `random`, value: `${prefix}random help\n${prefix}random help en`, inline: true },//zrobiony opis
        { name: `kick`, value: `${prefix}kick help\n${prefix}kick help en`, inline: true },//zrobiony opis
        { name: `ban`, value: `${prefix}ban help\n${prefix}ban help en`, inline: true },//zrobiony opid
        { name: `updaty`, value: `${prefix}updaty help\n${prefix}updaty help en`, inline: true },
        { name: `8ball`, value: `${prefix}8ball help\n${prefix}8ball help en`, inline: true },
        { name: `message_logs`, value: `${prefix}message_logs help\n${prefix}message_logs help en`, inline: true },
        { name: `blitzstats`, value: `${prefix}blitzstats help\n${prefix}blitzstats help en`, inline: true },
        { name: `autorole`, value: `${prefix}autorole help\n${prefix}autorole help en`, inline: true },
        { name: `------------------------------------------------------------------------`, value: `----------------------------------------------------------------------`, inline: false },
        
        { name: `Server settings`, value: `${prefix}srv_set`, inline: true },
        { name: `Economy`, value: `${prefix}helpeco`, inline: true },

        { name: `------------------------------------------------------------------------`, value: `----------------------------------------------------------------------`, inline: false },
        { name: `SEEN - ANIME`, value: `lista komend dostępna pod:\n $animeseen help`, inline: false },
        { name: `ANIME`, value: `lista komend dostępna pod:\n $anime help`, inline: false },
    )

const embed_en = new Discord.MessageEmbed()
    .setColor(`RED`)
    .setTitle(`Help`)
    .setDescription(`list of all commands:`)
    .addFields(//inline-w embedzie zamiast po dobą będą obok siebie
        { name: `avatar`, value: ` ${prefix} avatar help \n ${prefix} avatar help en`, inline: true }, // see description
        { name: `ping`, value: ` ${prefix} ping help \n ${prefix} ping help en`, inline: true }, // see description
        { name: `embed`, value: ` ${prefix} embed help \n ${prefix} embed help en`, inline: true }, // see description
        { name: `clear / clear`, value: ` ${prefix} help clear \n ${prefix} clear en`, inline: true }, // description done
        { name: `say / say`, value: ` ${prefix} say help \n ${prefix} say help en`, inline: true }, // description done
        { name: `botinfo`, value: ` ${prefix} botinfo help \n ${prefix} botinfo help en`, inline: true }, // description done
        { name: `srvinfo`, value: ` ${prefix} srvinfo help \n ${prefix} srvinfo help en`, inline: true }, // description done
        { name: `survey`, value: ` ${prefix} survey help \n ${prefix} survey help en`, inline: true }, // description done
        { name: `roulette`, value: ` ${prefix} roulette help \n ${prefix} roulette help en`, inline: true }, // description done
        { name: `random`, value: ` ${prefix} random help \n ${prefix} random help en`, inline: true }, // description done
        { name: `kick`, value: ` ${prefix} kick help \n ${prefix} kick help en`, inline: true }, // description done
        { name: `ban`, value: ` ${prefix} ban help \n ${prefix} ban help en`, inline: true }, // opid made
        { name: `updaty`, value: ` ${prefix} updaty help \n ${prefix} updaty help en`, inline: true },
        { name: `8ball`, value: ` ${prefix} 8ball help \n ${prefix} 8ball help en`, inline: true },
        { name: `message_logs`, value: ` ${prefix} message_logs help \n ${prefix} message_logs help en`, inline: true },
        { name: `blitzstats`, value: ` ${prefix} blitzstats help \n ${prefix} blitzstats help en`, inline: true },
        { name: `autorole`, value: ` ${prefix} autorole help \n ${prefix} autorole help en`, inline: true },

        { name: `---------------------------------------------- -------------------------- `, value: ` ------------------- -------------------------------------------------- -`, inline: false },
        { name: `SEEN - ANIME`, value: ` command list available at: \n $animeseen help`, inline: false },
        { name: `ANIME`, value: ` command list available at: \n $anime help`, inline: false },
    )//srv_set

module.exports = {
    name: `help`,
    name_en: `help`,
    description: `help command`,
    usage: `$help`,
    work: worker,
    isSlash: true,

    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Wyświetla aktualny ping bota'),
    executeInteraction: async (inter) => {
        if(work != true){
            const embed_worker = new Discord.MessageEmbed()
            .setTitle('**help**')
            .setColor('RANDOM')
            .setDescription(`${reason}`)
        inter.reply({ embeds: [embed_worker] });
        return(console.log("command id disabled"))
        }else{
        inter.reply({ embeds: [embed_pl] });
        }
    },

    execute: async (message, args) => {//trzeba dodać help do anime!!!!

        if (work != true) { return message.channel.send(reason) }

        const msg = message.content.slice(5) //zostają same argumenty
        console.log(msg)
        if (msg == `en` || msg == ` en` || msg == ` En` || msg == ` eN` || msg == ` EN` || msg == `En` || msg == `eN` || msg == `EN` || msg == `english` ||
            msg == `angielski` || msg == `eng`) {

            message.channel.send({ embeds: [embed_en] });
        } else {
            //wersja polska

            message.channel.send({ embeds: [embed_pl] });
        }
    }

}