const Discord = require('discord.js');//wymaga discord.js
const fs = require('fs');//wymaga fs
require('dotenv').config();
const consola = require('consola')

const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const clientId = '797070806885990431';

//wczytywanie configu
const config = require("./config/config.js")
const token = config.token//wyciąga zmienną token z configu
const prefix = config.prefix
const commands_logs = config.commands_logs
const welcomeChannelId = config.welcomeChannelId
const logs_dir = config.logs_dir
const error_logs_dir = config.error_logs_dir
const save_messages_logs = config.save_messages_logs
const save_messages_logs_dir = config.save_messages_logs_dir

//wczytywanie command handlera
const handler = require("./handlers/handler.js")

//wczytywanie command emoji-reactions
const emoji_reactions = require("./handlers/emoji-reactions.js")

//wczytywanie powitania
const generateImage = require("./handlers/welcome")

//wczytywanie ustawień serwerów
const setting_handler = require("./handlers/setting-handler")

//wczytywanie logów
const logs = require("./handlers/logs")

//wczytywanie interakcji dla buttonów
const interaction = require("./handlers/interaction_handler")

//wczytywanie slash commands
const functions = fs.readdirSync('./handlers/functions').filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync('./handlers/events').filter(file => file.endsWith('.js'));
const slashCommands = fs.readdirSync(process.cwd() +`/commands/komendy`);
const slashCommands2 = fs.readdirSync(process.cwd() +`/commands/anime/`);
const slashCommands3 = fs.readdirSync(process.cwd() +`/commands/anime zapowiedz/`);
const slashCommands4 = fs.readdirSync(process.cwd() +`/commands/animelist/`)


const client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,//reakcje emoji
        Discord.Intents.FLAGS.GUILD_MEMBERS//dołączanie ludzi
    ]
});
client.commands = new Discord.Collection()
client.commandArray = [];
//slash
client.login(config.token).then(async ()=>{
    for(file of functions){
        require(`./handlers/functions/${file}`)(client,eventFiles)
      }
      //await client.handlerevents(eventFiles, "./handlers/events");
      await client.handleCommands(slashCommands, "komendy");
      await client.handleCommands(slashCommands2, "anime");
      await client.handleCommands(slashCommands3, "anime zapowiedz");
      await client.handleCommands(slashCommands4, "animelist");
      const rest = new REST({ version: '9' }).setToken(token);
        (async () => {
            try {
                console.log('Started refreshing application (/) commands.');
                for (let i = 0; i < client.guilds.cache.size; i++) {
                  const guild = client.guilds.cache.at(i);
                   // console.log(client.commandArray)
                    await new Promise(resolve => {
                      rest.put(Routes.applicationGuildCommands(clientId, guild.id),
                        { body: client.commandArray }).catch(e => {
                          //console.log(`Nie można dodać komend do serwera ${guild}`)
                        }).then(() => {
                          resolve()
                        })
                    });
                } 
                console.log('Successfully reloaded application (/) commands.');
            } catch (error) { console.error(error); }
        })();
})
     

    module.exports = {client};
//command handler
handler(client)

//servers settings
setting_handler(client)

client.once('ready', () =>{
    const time = new Date().toLocaleTimeString().slice(0,5)
    var d = new Date;
    data = d.toLocaleDateString();
    console.log(`${client.user.tag} jest online`);
    client.user.setActivity("$help", {type:'WATCHING'});
    logs(`${data} ${time} ${client.user.tag} jest online`, logs_dir,1)
/*
    try{
    
    //yaml
    client.settings.forEach((config, guildId) => {
        const {guilds} = client
        console.log(guilds)
        if(guilds.has(guildId)) {
            const guild = guilds.get(guildId)
            if(guild.available){
                
            }
        }
    })
}catch(err){
    console.log(err)
}
*/
});




client.on('messageCreate', async message =>
{
    //logi z serwerów
    logs(message.content, null, 2, message.guild.id ,message.author.tag, message.channel.name)

    //auto reakcje
    emoji_reactions(message)

    if(message.content.startsWith(prefix) && !message.author.bot){//sprawdza prefix, && znaczy and

            const args = message.content.slice(prefix.length).trim().split(/ +/);//oddziela słowa w komendzie spacją i usówa prefix 
            const commandName = args.shift().toLowerCase();//zwraca tylko 1 argument i zmienia na same małe liter
            if(!client.command.has(commandName)) return;//sprawdza czy taka komenda istnieje
            
            const command = client.command.get(commandName);//pobieramy komende
            const time = new Date().toLocaleTimeString().slice(0,5)
        
            try {//wywołujemy komende
                command.execute(message,args,client);
                if(commands_logs == "True"){
                    const data = `${time} ${message.author.tag} use ${commandName}, execute: "✅"`
                    console.log(data)
                    logs(data, logs_dir, 1)
                }
            } catch(error) {
                if(commands_logs == "True"){
                    const data = `${time} ${message.author.tag} use ${commandName}, execute: "❌"`
                    console.log(data)
                    logs(data, error_logs_dir)
                }
                    console.error(error);
                    logs(error, error_logs_dir ,1)
                    message.reply("Wystąpił błąd");
            }
    }else{
        if(save_messages_logs == "True"){
            logs(`${message.author.tag} ${message.content}`, save_messages_logs_dir, 1)
        }
    }
});


client.on("guildMemberAdd", async (member) => {
    try{
        const img = await generateImage(member)
        member.guild.channels.cache.get(welcomeChannelId).send({
            content: `<@${member.id}> Welcome to the server!`,
            files: [img]
        })
    }catch(err){
        console.log(err)
    }
})

//interakcje
//interactions()

const rola_1_id = "1001069879148953673"
const rola_2_id = "1001069963437686824"

client.on('interactionCreate', async interaction => {
    if(!interaction.isButton){return}
    if(interaction.customId == 'role1') {
        const roleId = '1001069879148953673';
        const role = interaction.guild.roles.cache.get(roleId);

        if(interaction.member.roles.cache.has(roleId)) {
            await interaction.member.roles.remove(role);
            await interaction.reply({ content: `Usunięto rolę <@&${roleId}>`, ephemeral: true });
        } else {
            await interaction.member.roles.add(roleId);
            await interaction.reply({ content: `Dodano rolę <@&${roleId}>`, ephemeral: true });
        }

        // await interaction.deferUpdate();
    }

    if(interaction.customId == 'role2') {
        const roleId = '1001069963437686824';
        const role = interaction.guild.roles.cache.get(roleId);

        if(interaction.member.roles.cache.has(roleId)) {
            await interaction.member.roles.remove(role);
            await interaction.reply({ content: `Usunięto rolę <@&${roleId}>`, ephemeral: true });
        } else {
            await interaction.member.roles.add(roleId);
            await interaction.reply({ content: `Dodano rolę <@&${roleId}>`, ephemeral: true });
        }

        // await interaction.deferUpdate();
    }

})

client.login(token)


//error handler
client.on('debug', (err) =>{logs(`${err}`, save_messages_logs_dir, 1)})
client.on('warn', () =>{console.log("error handler--warn")})
client.on('error', () =>{console.log("error handler--error")})
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