const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

module.exports = (client,token,clientId) => {

    //wczytywanie slash commands
const functions = fs.readdirSync(process.cwd() +'/handlers/functions').filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync(process.cwd() +'/handlers/events').filter(file => file.endsWith('.js'));
const slashCommands = fs.readdirSync(process.cwd() +`/commands/komendy`);
const slashCommands2 = fs.readdirSync(process.cwd() +`/commands/anime/`);
const slashCommands3 = fs.readdirSync(process.cwd() +`/commands/anime zapowiedz/`);



    client.login(token).then(async ()=>{
        for(file of functions){
            require(process.cwd() +`/handlers/functions/${file}`)(client,eventFiles)
          }
          //await client.handlerevents(eventFiles, "./handlers/events");
          await client.handleCommands(slashCommands, "komendy");
          await client.handleCommands(slashCommands2, "anime");
          await client.handleCommands(slashCommands3, "anime zapowiedz");
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
}