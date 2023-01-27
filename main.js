const Discord = require('discord.js');//wymaga discord.js
const fs = require('fs');//wymaga fs
require('dotenv').config();
const consola = require('consola')

const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { QuickDB } = require("quick.db");
const logs = require('discord-logs');
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
const set_status = config.status

const test_clientId = '869587877477101590';//id SEEN
const clientId = '797070806885990431';//id SEEN

console.time();

//wczytywanie command handlera
const handler = require("./handlers/handler.js")

//wczytywanie command emoji-reactions
const emoji_reactions = require("./handlers/emoji-reactions.js")

//wczytywanie powitania
const generateImage = require("./handlers/welcome")

//wczytywanie logów
const logs_handler = require("./handlers/logs")

//slash_commands_handler
const slash_handler = require("./handlers/slash_commands_handler")

//wczytywanie msg handlera
const msg_handler = require("./handlers/msg_handler")

//wczytuje interaction handler
const interaction_handler = require("./handlers/interaction_handler")

//yt notifcation handler
const yt_notify = require("./commands/komendy/API/yt-notifications")

//lvling system
const lvling = require("./handlers/lvling_handler")

//mod logs handler
const mod_logs_handler = require("./handlers/mod_logs_handler")

//automod
const automod_handler = require("./commands/servers_config/auto_mod_handler")

//ai handler
const ai = require("./commands/komendy/AI/ai_handler")

//kick , ban logs
const informations_handler = require("./handlers/informations")

//server channel stats
const stats_channels_autorefresh = require("./commands/komendy/stats/handler")

const help_handler = require("./handlers/help_handler")
const runtime_handler = require("./handlers/runtime_handler")
const banes_servers_link = require("./handlers/baned_servers_link")

/* dc js v13.9.2
const client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,//reakcje emoji
        Discord.Intents.FLAGS.GUILD_MEMBERS,//dołączanie ludzi
        Discord.Intents.FLAGS.GUILD_VOICE_STATES
    ]
});
*/
const client = new Discord.Client({
    intents: 32767
});

client.commands = new Discord.Collection()
client.help = new Discord.Collection();
client.commandArray = [];
client.helpArray = [];

//yt notyfications
yt_notify()

//slash
if (test_bot == true) {
    slash_handler(client, test_token, test_clientId)
} else {
    slash_handler(client, token, clientId)
}

//logs system
logs(client, {
    debug: true
});

//command handler
handler(client)

help_handler(client)

client.once('ready', () => {
    const time = new Date().toLocaleTimeString().slice(0, 5)
    var d = new Date;
    data = d.toLocaleDateString();
    console.log(`${client.user.tag} jest online`);
    client.user.setStatus('ready');//działa po długim czasie 
    logs_handler(`${data} ${time} ${client.user.tag} jest online`, logs_dir, 1)

    //powitania
    generateImage(client)

    //lvling system
    lvling(client)

    //mod logs
    mod_logs_handler(client)

    ai(client)

    //ram limiter
    client.setMaxListeners(50);
    informations_handler(client);

    stats_channels_autorefresh(client)
    runtime_handler.execute("ready", true)
    banes_servers_link(client)
});




client.on('messageCreate', async message => {

    //bot nie przyjmuje wiadomości na pv
    if(message.guild == null) return;

    //automod handler
    automod_handler(client, message)

      //logi z serwerów
    logs_handler(message, message.content, null, 2, message.guild.id, message.author.tag, message.channel.name, client)


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

process.on('unhandledRejection', error => {
	console.error('Unhandled promise rejection:', error);
});
process.on('warning', console.warn);


//interakcje
interaction_handler(client)


if (test_bot == true) {
    client.login(test_token)
} else {
    client.login(token)
}



//error handler
client.on('debug', (err) => { logs_handler(`${err}`, save_messages_logs_dir, 1) })
client.on('warn', () => { console.log("error handler--warn") })
client.on('error', console.error)
//consola info
consola.success('Built!')
console.timeEnd();