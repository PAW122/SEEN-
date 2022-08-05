const Discord = require('discord.js');//wymaga discord.js
const fs = require('fs');//wymaga fs
require('dotenv').config();
const config = require(__dirname + "/../config/config.js")
const load_commands_logs = config.load_commands_logs

const ascii = require("ascii-table")
//zapo - zapowiedzi anime
const table = new ascii().setHeading("Command","komendy","anime","zapo","PL","EN","worker","slashCommand")

//import modułu rysującego tabele
const tabela = require("./ascii.js")

module.exports = (client) => {


    client.command = new Discord.Collection();
    client.command_anime = new Discord.Collection();//komendy zanime zapowiedzi
    
    
    const komendyFolders = fs.readdirSync(__dirname +`/../commands/komendy`)//dla komend
    const animeFolders = fs.readdirSync(__dirname +`/../commands/anime`)//dla anime
    const animezapowiedziFolders = fs.readdirSync(__dirname +`/../commands/anime zapowiedz`)//dla zapowiedzi
    const economy_commands = fs.readdirSync(__dirname +`/../commands/economy`)//dla ekonomi
    const acc_menager_commands = fs.readdirSync(__dirname +`/../commands/acc_menager`)//dla ekonomi
    const settings_commands = fs.readdirSync(__dirname +`/../commands/servers_config`)//dla ekonomi
    //command handler 
    
    for (const folder of komendyFolders) {//command handler dla komend
        const commandsFile = fs.readdirSync(__dirname +`/../commands/komendy/${folder}`).filter(file => file.endsWith(".js"));
    
        for(const file of commandsFile) {
            const command = require(__dirname +`/../commands/komendy/${folder}/${file}`);
            client.command.set(command.name, command);//język polski
            client.command.set(command.name_en, command);//język angielski
            
            //ascii
            var nr_tabeli = "1"
            const name = command.name
            const name_en = command.name_en
            tabela(command,file,table,name,name_en,nr_tabeli)
        }
    }
    for (const folder of animeFolders) {//command handler dla anime
        const commandsFile = fs.readdirSync(__dirname +`/../commands/anime/${folder}`).filter(file => file.endsWith(".js"));
    
        for(const file of commandsFile) {
            const command = require(__dirname +`/../commands/anime/${folder}/${file}`);
            client.command.set(command.name, command);//język polski
            client.command.set(command.name_en, command);//język angielski

             
            //ascii
            var nr_tabeli = "2"
            const name = command.name
            const name_en = command.name_en
            tabela(command,file,table,name,name_en,nr_tabeli)
        }
    }
    for (const folder of animezapowiedziFolders) {//command handler dla anime zapowiedzi
        const commandsFile = fs.readdirSync(__dirname +`/../commands/anime zapowiedz/${folder}`).filter(file => file.endsWith(".js"));
    
        for(const file of commandsFile) {
            const command = require(__dirname +`/../commands/anime zapowiedz/${folder}/${file}`);
            client.command.set(command.name, command);//język polski
            client.command.set(command.name_en, command);//język polski

             
            //ascii
            var nr_tabeli = "1"//było 3
            const name = command.name
            const name_en = command.name_en
            tabela(command,file,table,name,name_en,nr_tabeli)
        }
    }

    for (const folder of economy_commands) {//command handler dla ekonomi
        const commandsFile = fs.readdirSync(__dirname +`/../commands/economy`).filter(file => file.endsWith(".js"));
    
        for(const file of commandsFile) {
            const command = require(__dirname +`/../commands/economy/${file}`);
            client.command.set(command.name, command);//język polski
            client.command.set(command.name_en, command);//język abg
            

             
            //ascii
            var nr_tabeli = "1"//podpinam do kategori lvl_commands
            const name = command.name
            const name_en = command.name_en
            tabela(command,file,table,name,name_en,nr_tabeli)
        }
    }
    //settings_commands
    for (const folder of settings_commands) {//command handler dla ekonomi
        const commandsFile = fs.readdirSync(__dirname +`/../commands/servers_config`).filter(file => file.endsWith(".js"));
    
        for(const file of commandsFile) {
            const command = require(__dirname +`/../commands/servers_config/${file}`);
            client.command.set(command.name, command);//język polski
            client.command.set(command.name_en, command);//język abg
            

             
            //ascii
            var nr_tabeli = "1"//podpinam do kategori lvl_commands
            const name = command.name
            const name_en = command.name_en
            tabela(command,file,table,name,name_en,nr_tabeli)
        }
    }
    //acc_menager_commands
    for (const folder of acc_menager_commands) {//command handler dla ekonomi
        const commandsFile = fs.readdirSync(__dirname +`/../commands/acc_menager`).filter(file => file.endsWith(".js"));
    
        for(const file of commandsFile) {
            const command = require(__dirname +`/../commands/acc_menager/${file}`);
            client.command.set(command.name, command);//język polski
            client.command.set(command.name_en, command);//język abg
            console.log(command.name)
            

             
            //ascii
            var nr_tabeli = "1"//podpinam do kategori lvl_commands
            const name = command.name
            const name_en = command.name_en
            tabela(command,file,table,name,name_en,nr_tabeli)
        }
    }
    
    //wypisuje w konsoli tabelke co zostało załadowane
    if(load_commands_logs == "True"){
    console.log(table.toString())}
}