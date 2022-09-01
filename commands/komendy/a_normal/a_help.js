const workerhandler = require(process.cwd() + `/config/worker.js`)
const work = workerhandler.help
const worker = workerhandler.help_work
const reason = workerhandler.help_disable
const config = require("../../../config/config")
const Discord = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const prefix = config.prefix
const embed_pl = new Discord.MessageEmbed()
    .setColor(`BLUE`)
    .setTitle(`Help Page 1/2`)
    .setDescription(`command list:`)
    .addFields(//inline-w embedzie zamiast po dobą będą obok siebie
        { name: `awatar`, value: `${prefix}awatar help\n${prefix}awatar help en`, inline: true },//zobiony opis
        { name: `ping`, value: `${prefix}ping help\n${prefix}ping help en`, inline: true },//zobiony opis
        { name: `embed`, value: `${prefix}embed help\n${prefix}embed help en`, inline: true },//zobiony opis
        { name: `clear/wyczyść`, value: `${prefix}clear help\n${prefix}clear help en`, inline: true },//zrobiony opis
        { name: `say`, value: `${prefix}say help\n${prefix}say help en`, inline: true },//zrobiony opis
        { name: `botinfo`, value: `${prefix}botinfo help\n${prefix}botinfo help en`, inline: true },//zrobiony opis
        { name: `srvinfo`, value: `/srvinfo`, inline: true },//zrobiony opis
        { name: `ankieta`, value: `${prefix}ankieta help\n${prefix}ankieta help en`, inline: true },//zrobiony opis
        { name: `ruletka`, value: `${prefix}ruletka help\n${prefix}ruletka help en`, inline: true },//zrobiony opis
        { name: `random`, value: `${prefix}random help\n${prefix}random help en`, inline: true },//zrobiony opis
        { name: `kick`, value: `${prefix}kick help\n${prefix}kick help en`, inline: true },//zrobiony opis
        { name: `ban`, value: `${prefix}ban help\n${prefix}ban help en`, inline: true },//zrobiony opid
        { name: `8ball`, value: `${prefix}8ball help\n${prefix}8ball help en`, inline: true },
        { name: `message_logs`, value: `${prefix}message_logs help\n${prefix}message_logs help en`, inline: true },
        { name: `blitzstats`, value: `${prefix}blitzstats help\n${prefix}blitzstats help en`, inline: true },
        { name: `autorole`, value: `${prefix}autorole help\n${prefix}autorole help en`, inline: true },
        { name: `report`, value: `send question to as\n ${prefix}report help`, inline: true },
        { name: `lvl`, value: `send informatiuon about your lvl stats\n ${prefix}lvl`, inline: true },
        { name: `contact`, value: `link to bot support server\n ${prefix}report help`, inline: true },
        { name: `flags`, value: `play flags game\n ${prefix}flags`, inline: true },
        { name: `------------------------------------------------------------------------`, value: `----------------------------------------------------------------------`, inline: false },
        
        { name: `Server settings`, value: `${prefix}srv_set`, inline: true },
        { name: `Economy`, value: `${prefix}helpeco`, inline: true },
        { name: `Server logs`, value: `${prefix}srv_logs help`, inline: true },
    )
    const embed_pl2 = new Discord.MessageEmbed()
    .setColor(`BLUE`)
    .setTitle(`Help Page 2/2`)
    .setDescription(`U can use '${prefix}helpen' for a description in English\nlista wszystkich komend:`)
    .addFields(
        { name: `------------------------------------------------------------------------`, value: `----------------------------------------------------------------------`, inline: false },
        { name: `animegif`,value: `${prefix}animegif help\n${prefix}animegif help en`,inline: true},
        { name: `Bank`, value: `check how many coins u losed using $roll:\n $bank help`, inline: true },
        { name: `SEEN - ANIME`, value: `lista komend dostępna pod:\n $animeseen help`, inline: true },
        { name: `ANIME`, value: `lista komend dostępna pod:\n $anime help`, inline: true },
    )


module.exports = {
    name: `help`,
    description: `help command`,
    usage: `$help`,
    work: worker,
    isSlash: true,

    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('display current ping'),
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
            //wersja polska
            message.channel.send({ embeds: [embed_pl] });
            message.channel.send({ embeds: [embed_pl2] });
        
    }

}