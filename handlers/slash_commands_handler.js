const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

module.exports = (client, token, clientId) => {

  //wczytywanie slash commands
  const functions = fs.readdirSync(process.cwd() + '/handlers/functions').filter(file => file.endsWith('.js'));
  const eventFiles = fs.readdirSync(process.cwd() + '/handlers/events').filter(file => file.endsWith('.js'));

  const slashCommands1_0 = fs.readdirSync(process.cwd() + `/commands/komendy/a_normal`).filter(file => file.endsWith('.js'));
  const slashCommands1_1 = fs.readdirSync(process.cwd() + `/commands/komendy/administration`).filter(file => file.endsWith('.js'))
  const slashCommands1_2 = fs.readdirSync(process.cwd() + `/commands/komendy/AI`).filter(file => file.endsWith('.js'));
  const slashCommands1_3 = fs.readdirSync(process.cwd() + `/commands/komendy/APIS`).filter(file => file.endsWith('.js'));
  const slashCommands1_4 = fs.readdirSync(process.cwd() + `/commands/komendy/button_roles`).filter(file => file.endsWith('.js'));
  const slashCommands1_5 = fs.readdirSync(process.cwd() + `/commands/komendy/game_flags`).filter(file => file.endsWith('.js'));
  const slashCommands1_6 = fs.readdirSync(process.cwd() + `/commands/komendy/mechatonika`).filter(file => file.endsWith('.js'));
  const slashCommands1_7 = fs.readdirSync(process.cwd() + `/commands/komendy/music`).filter(file => file.endsWith('.js'));
  const slashCommands1_8 = fs.readdirSync(process.cwd() + `/commands/komendy/przemyślenia`).filter(file => file.endsWith('.js'));
  const slashCommands1_9 = fs.readdirSync(process.cwd() + `/commands/komendy/reactions`).filter(file => file.endsWith('.js'));
  const slashCommands1_10 = fs.readdirSync(process.cwd() + `/commands/komendy/testowa`).filter(file => file.endsWith('.js'));
  const slashCommands2 = fs.readdirSync(process.cwd() + `/commands/anime/`);
  const slashCommands3 = fs.readdirSync(process.cwd() + `/commands/anime zapowiedz/`);
  const slashCommands4 = fs.readdirSync(process.cwd() + `/commands/rpg/`).filter(file => file.endsWith('.js'));
  const slashCommands5 = fs.readdirSync(process.cwd() + `/commands/acc_menager_2/`).filter(file => file.endsWith('.js'));

  //console.log(slashCommands6)

  client.login(token).then(async () => {
    for (file of functions) {
      require(process.cwd() + `/handlers/functions/${file}`)(client, eventFiles)
    }


    await client.handleCommands(slashCommands1_0, `komendy/a_normal`);
    await client.handleCommands(slashCommands1_1, `komendy/administration`);
    await client.handleCommands(slashCommands1_2, `komendy/AI`);
    await client.handleCommands(slashCommands1_3, `komendy/APIS`);
    await client.handleCommands(slashCommands1_4, `komendy/button_roles`);
    await client.handleCommands(slashCommands1_5, `komendy/game_flags`);
    await client.handleCommands(slashCommands1_6, `komendy/mechatonika`);
    await client.handleCommands(slashCommands1_7, `komendy/music`);
    await client.handleCommands(slashCommands1_8, `komendy/przemyślenia`);
    await client.handleCommands(slashCommands1_9, `komendy/reactions`);
    await client.handleCommands(slashCommands1_10, `komendy/testowa`);


    await client.handleCommands(slashCommands2, "anime");
    await client.handleCommands(slashCommands3, "anime zapowiedz");
    await client.handleCommands(slashCommands4, "rpg");
    await client.handleCommands(slashCommands5, "acc_menager_2");

    //  console.log("start")
    //   console.log(slashCommands1_0)
    //   console.log(slashCommands1_1)
    //   console.log(slashCommands1_2)
    //   console.log(slashCommands1_3)
    //   console.log(slashCommands1_4)
    //   console.log(slashCommands1_5)
    //   console.log(slashCommands1_6)//
    //   console.log(slashCommands1_7)//
    //   console.log(slashCommands1_8)//
    //   console.log(slashCommands1_9)
    //   console.log(slashCommands1_10)
    //  console.log(slashCommands2)
    //  console.log(slashCommands3)
    //  console.log(slashCommands4)
    //  console.log(slashCommands5)
    //  console.log("koniec")

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
                if (e != "DiscordAPIError[50001]: Missing Access") console.log("slash command error" + e)
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