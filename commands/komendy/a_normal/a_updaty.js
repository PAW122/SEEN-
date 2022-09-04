const config = require(process.cwd() + `/config/worker.js`)
const work = config.updaty
const worker = config.updaty_work
const reason = config.updaty_disable
const { QuickDB } = require("quick.db");
const Discord = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const embed = new Discord.MessageEmbed()
    .setColor(`BLUE`)//PL
    .setTitle(`aktualizacje`)
    .addFields(
        { name: "24.06.2022", value: "optymalizacja plików", inline: false },
        { name: "25.06.2022", value: "poprawiona komenda help \n optymalizacja plików", inline: false },
        { name: "28.06.2022", value: "dodane nowe anime do animelist", inline: false },
        { name: "29.06.2022", value: "naprawiony błąd w komendzie ruletka", inline: false },
        { name: "30.06.2022", value: "dodanie nowej komendy: updaty/aktualizacje \n dodanie funkcji help dla komend z kategori anime", inline: false },
        { name: "31.06.2022", value: "aktualizacja serwera", inline: false },
        { name: "1.07.2022", value: "optymalizacja plików \n nowa komenda: 8ball", inline: false },
        { name: "2.07.2022", value: "dodany system odtwarzania muzykiz yt i wszystkie powiązane komendy\n optymalizacja serwera\n optymalizacja plików", inline: false },
        { name: "4.07.2022", value: "aktualizacja serwera", inline: false },
        { name: "6.07.2022", value: "optymalizacja kodu", inline: false },
        { name: "17.07.2022", value: "dodanie konfiguracji włączonych komend,dodano powiadomienia z powodami wyłączenia poszczególnych komend podczas próby ich użycia", inline: false },
        { name: "21.07.2022", value: "dodanie dat przemier odcinków anime z kategori anime zapowiedzi", inline: false },
        { name: "ciekawostka", value: "na obecny moment bot zajmuje +/-3900 linijek kodu", inline: false },
        { name: "28.07.2022", value: "dodanie slashcommands", inline: false },
        { name: "07.08.2022", value: "dodana: ekonomia, ustawienia serwerowe", inline: false },

    )
const embed2 = new Discord.MessageEmbed()
    .setColor(`BLUE`)//PL
    .setTitle(`update`)
    .addFields(
        { name: "06/24/2022", value: "file optimization", inline: false },
        { name: "06/25/2022", value: "corrected help command \n file optimization", inline: false },
        { name: "06/28/2022", value: "new anime added to animelist", inline: false },
        { name: "06/29/2022", value: "fixed error in the roulette command", inline: false },
        { name: "30/06/2022", value: "added command: updates / updates \n added help command for anime category", inline: false },
        { name: "6/31/2022", value: "server update", inline: false },
        { name: "1/07/2022", value: "file optimization \ n new command: 8ball", inline: false },
        { name: "2/07/2022", value: "yt music playback system added as well as all related commands \ n server optimization \ n file optimization", inline: false },
        { name: "4/07/2022", value: "server update", inline: false },
        { name: "6/07/2022", value: "code optimization", inline: false },
        { name: "07/17/2022", value: "added configuration of enabled commands, added notifications with reasons to disable individual commands when trying to use them", inline: false },
        { name: "07/21/2022", value: "added dates of anime premiere episodes from the preview anime category", inline: false },
    )
//aktualizacje
//aktualizacje help
//aktualizacje help en
//updaty
//updaty help
//updaty help en
module.exports = {
    name: "aktualizacje",
    name_en: "updaty",
    description: "wysyła pong",
    usage: "$ping",
    work: worker,
    isSlash: true,

    data: new SlashCommandBuilder()
    .setName('aktualizacje')
    .setDescription('wysyła liste zmian wprowadzonych do bota'),
executeInteraction: async (inter) => {
    if(work != true){
        const embed_worker = new Discord.MessageEmbed()
        .setTitle('**aktualizacje**')
        .setColor('RANDOM')
        .setDescription(`${reason}`)
    inter.reply({ embeds: [embed_worker] });
    return(console.log("command id disabled"))
    }else{
        //load server settings
        const guildId = inter.guild.id
        const db = new QuickDB({ filePath: process.cwd() + `/db/srv_settings/commands/${guildId}.sqlite` });
        if(await db.get(`check.check`) == true){
            const settings = await db.get(`anime_help.worker`)
            const settings_reason = await db.get(`anime_help.reason`)
            if(settings != true){return message.channel.send(settings_reason)}
        }

    inter.reply({ embeds: [embed] });
    }
},


    execute: async (message, args) => {
        //load server settings
        const guildId = message.guild.id
        const db = new QuickDB({ filePath: process.cwd() + `/db/srv_settings/commands/${guildId}.sqlite` });
        if(await db.get(`check.check`) == true){
            const settings = await db.get(`anime_help.worker`)
            const settings_reason = await db.get(`anime_help.reason`)
            if(settings != true){return message.channel.send(settings_reason)}
        }


        if (work != true) { return message.channel.send(reason) }


        if (args[0] == "help") {
            if (args[1] == "en") {
                const embed_en = new Discord.MessageEmbed()

                    .setColor(`RED`)//EN
                    .setTitle(`updaty`)
                    .setDescription(`Display a list of bot updates`)

                    .setFooter(message.author.tag, message.author.avatarURL({ dynamic: true }));


                message.channel.send({ embeds: [embed_en] });
            } else {
                const embed_pl = new Discord.MessageEmbed()

                    .setColor(`BLUE`)//PL
                    .setTitle(`aktualizacje`)
                    .setDescription(`Wysyła liste aktualizacji bota`)

                    .setFooter(message.author.tag, message.author.avatarURL({ dynamic: true }));


                message.channel.send({ embeds: [embed_pl] });
            }
        } else {


            if (message.content.startsWith("$aktualizacje")) {
                message.channel.send({ embeds: [embed] });
            } else {
                message.channel.send({ embeds: [embed2] });
            }

        }
    }
}

