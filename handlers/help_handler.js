const Discord = require('discord.js');//wymaga discord.js
const fs = require('fs');//wymaga fs
module.exports = (client) => {

    client.help = new Discord.Collection();

    const komendyFolders = fs.readdirSync(__dirname + `/../commands/komendy`)//dla komend
    const animeFolders = fs.readdirSync(__dirname + `/../commands/anime`)//dla anime
    const animezapowiedziFolders = fs.readdirSync(__dirname + `/../commands/anime zapowiedz`)//dla zapowiedzi
    const economy_commands = fs.readdirSync(__dirname + `/../commands/economy`)//dla ekonomi
    const settings_commands = fs.readdirSync(__dirname + `/../commands/servers_config`)//dla ekonomi
    //command handler

    for (const folder of komendyFolders) {//command handler dla komend
        const commandsFile = fs.readdirSync(__dirname + `/../commands/komendy/${folder}`).filter(file => file.endsWith(".js"));

        for (const file of commandsFile) {
            const command = require(__dirname + `/../commands/komendy/${folder}/${file}`);

            if(command.name == undefined) return console.log("undefind name: ", file)
            if(command.help == undefined) return console.log("undefind help: ", file)

            client.help.set(command.name, command.help); 
            console.log(command.name)
        }
    }
    for (const folder of animeFolders) {//command handler dla anime
        const commandsFile = fs.readdirSync(__dirname + `/../commands/anime/${folder}`).filter(file => file.endsWith(".js"));

        for (const file of commandsFile) {
            const command = require(__dirname + `/../commands/anime/${folder}/${file}`);
            client.help.set(command.help, command.name); 
        }
    }
    for (const folder of animezapowiedziFolders) {//command handler dla anime zapowiedzi
        const commandsFile = fs.readdirSync(__dirname + `/../commands/anime zapowiedz/${folder}`).filter(file => file.endsWith(".js"));

        for (const file of commandsFile) {
            const command = require(__dirname + `/../commands/anime zapowiedz/${folder}/${file}`);
            client.help.set(command.help, command.name); 
        }
    }

    for (const folder of economy_commands) {//command handler dla ekonomi
        const commandsFile = fs.readdirSync(__dirname + `/../commands/economy`).filter(file => file.endsWith(".js"));

        for (const file of commandsFile) {
            const command = require(__dirname + `/../commands/economy/${file}`);
            client.help.set(command.help, command.name); 
        }
    }
    //settings_commands
    for (const folder of settings_commands) {//command handler dla ekonomi
        const commandsFile = fs.readdirSync(__dirname + `/../commands/servers_config`).filter(file => file.endsWith(".js"));

        for (const file of commandsFile) {
            const command = require(__dirname + `/../commands/servers_config/${file}`);
            client.help.set(command.help, command.name); 
        }
    }
}