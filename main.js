const Discord = require('discord.js');//wymaga discord.js
const fs = require('fs');//wymaga fs
require('dotenv').config();
const consola = require('consola')

const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { Player} = require("discord-player");
const { QuickDB } = require("quick.db");
//wczytywanie configu
const config = require("./config/config.js")
const test_token = config.token
const token = process.env.TOKEN
let prefix = config.prefix
const commands_logs = config.commands_logs
const welcomeChannelId = config.welcomeChannelId
const logs_dir = config.logs_dir
const error_logs_dir = config.error_logs_dir
const save_messages_logs = config.save_messages_logs
const save_messages_logs_dir = config.save_messages_logs_dir
const test_bot = config.test_bot

const test_clientId = '869587877477101590';//id SEEN
const clientId = '797070806885990431';//id SEEN


//wczytywanie command handlera
const handler = require("./handlers/handler.js")

//wczytywanie command emoji-reactions
const emoji_reactions = require("./handlers/emoji-reactions.js")

//wczytywanie powitania
const generateImage = require("./handlers/welcome")

//wczytywanie logów
const logs = require("./handlers/logs")

//slash_commands_handler
const slash_handler = require("./handlers/slash_commands_handler")

//wczytywanie msg handlera
const msg_handler = require("./handlers/msg_handler")

//wczytuje interaction handler
const interaction_handler = require("./handlers/interaction_handler")

//yt notifcation handler
const yt_notify = require("./commands/komendy/API/yt-notifications")


const client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,//reakcje emoji
        Discord.Intents.FLAGS.GUILD_MEMBERS,//dołączanie ludzi
        Discord.Intents.FLAGS.GUILD_VOICE_STATES
    ]
});
client.commands = new Discord.Collection()
client.commandArray = [];

//yt notyfications
yt_notify()

//slash
if (test_bot == true) {
    slash_handler(client, test_token, test_clientId)
} else {
    slash_handler(client, token, clientId)
}



//command handler
handler(client)

client.once('ready', () => {
    const time = new Date().toLocaleTimeString().slice(0, 5)
    var d = new Date;
    data = d.toLocaleDateString();
    console.log(`${client.user.tag} jest online`);
    client.user.setActivity("$help", { type: 'WATCHING' });
    logs(`${data} ${time} ${client.user.tag} jest online`, logs_dir, 1)

    //powitania
    generateImage(client)

});




client.on('messageCreate', async message => {

    //logi z serwerów
    logs(message.content, null, 2, message.guild.id, message.author.tag, message.channel.name)


    //auto reakcje
    emoji_reactions(message)


    //sprawdzanie prefixu serwerowego
    const guildId = message.guild.id
    const db = new QuickDB({ filePath: process.cwd() + `/db/srv_settings/commands/${guildId}.sqlite` });
    if (await db.get(`check.check`) == true) {
        if (await db.get(`prefix.check`) != null) {
            const prefix = await db.get(`prefix.check`)
            msg_handler(client, prefix, message)
        }
    } else {
        msg_handler(client, prefix, message)
    }

});

//interakcje
    interaction_handler(client)

if (test_bot == true) {
    client.login(test_token)
} else {
    client.login(token)
}



//error handler
client.on('debug', (err) => { logs(`${err}`, save_messages_logs_dir, 1) })
client.on('warn', () => { console.log("error handler--warn") })
client.on('error', () => { console.log("error handler--error") })
//consola info
consola.success('Built!')





//do zrobienia
/*
help dla komend anime
wszystkie anime z zapowiedzi i premier lato 2022
help dla zapowiedzi anime i
w foleże help opisy

zrobić na nowo w $help en angielską cześc bo coś się zjebało

zrobć każdy help w pliku komendy żeby ograniczyć pliki

dokończyć help w plikach
(komendy/a_normal - zrobione)

zrobić helpa dla anime i dodać amnestie itp
usunąć z komend kategori anime _ w nazwach komend

zrobić komende pokazująco zmiany w aktualizachjach bota

naprawić opisu helpa
zmienić w help opisy z
$help awatar
na $awatar help


ruletka nie chce działać na serweże !! do naprawy
*/








//kopioa seen-
//client.login('OTgwMjAzNzM0OTI5OTI4MjUy.GZ5xIp.fKALWn8VmwNuxM9ddr9EQc6Nt3_u03JXpEmoLM')

//sprawdzanie nazwy kanału
/*
if(message.channel.name == "nazwa-kanału"){
    //kod
} else if (message.channel.name == "nazwa-2-kanału"){
    //kod2
}
*/





//komendy:(polskie nazwy)

//$animelist
//$animelist help
//$animelist help en

//$anikieta
//$ankieta help
//$anikieta help en

//$awatar
//$awatar help
//$awatar help en

//$ban
//$ban help
//$ban help en

//$botinfo
//$botinfo help
//$botinfo help en

//$clear
//$clear help
//$clear help en
//$wyczyść
//$wyczyść help
//$wyczyść help en

//$embed
//$embed help
//$embed help en

//$kick
//$kick help
//$kick help en

//$ping
//$ping help
//$ping help en

//$random
//$random help
//$random help en

//$ruletka
//$ruletka help
//$ruletka help en
//$roulette
//$roulette help
//$roulette help en

//$say
//$say help
//$say help en
//$pwoiedz
//$pwoiedz help
//$pwoiedz help en

//$srvinfo
//$srvinfo help
//$srvinfo help en

//$animegif
//$animegif help
//$animegif help en

//$kontynuacje
//$kontynuacje help
//$kontynuacje help en
//$continuations
//$continuations help
//$continuations help en

//$zapowiedzi
//$zapowiedzi help
//$zapowiedzi help en
//$announcements
//$announcements help
//$announcements help en

//aktualizacje
//aktualizacje help
//aktualizacje help en
//updaty
//updaty help
//updaty help en

//senko_odc
//lucky_star_odc
//amnestia_odc

//amnesia --opis anime
//heroine_info -opis anime
//heroine  --losowa grafika

//anime help

//$ruletkaextream !!Nieskończone / niedziałające

//$blitzstats !!Niedokończone / niedziałające

//24.06.2022
/*
update cały folder help idzie do śmieci a wszystkie komendy help sa w plikach komend (optymalizacja plików)
*/

//25.06.2022
/*
poprawiona komenda $help(poprawiona komenda help)
plik anime.json przeniesiony do każdego folderu anime (optymalizacja plików)
*/

//28.06.2022
/*
dodane nowe anime do animelist
*/

//29.06.2022
/*
naprawiny błąd w komendzie ruletka
*/