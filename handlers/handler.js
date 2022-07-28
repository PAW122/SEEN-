const Discord = require('discord.js');//wymaga discord.js
const fs = require('fs');//wymaga fs
require('dotenv').config();
const config = require(__dirname + "/../config/config.js")
const load_commands_logs = config.load_commands_logs

const ascii = require("ascii-table")
//zapo - zapowiedzi anime
const table = new ascii().setHeading("Command","komendy","anime","zapo","PL","EN","worker")

//import modułu rysującego tabele
const tabela = require("./ascii.js")

module.exports = (client) => {


    client.command = new Discord.Collection();
    client.command_anime = new Discord.Collection();//komendy zanime zapowiedzi
    
    
    const komendyFolders = fs.readdirSync(__dirname +`/../commands/komendy`)//dla komend
    const animeFolders = fs.readdirSync(__dirname +`/../commands/anime`)//dla anime
    const animezapowiedziFolders = fs.readdirSync(__dirname +`/../commands/anime zapowiedz`)//dla zapowiedzi
    const animelist = fs.readdirSync(__dirname +`/../commands/animelist`)//dla animelist
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
            var nr_tabeli = "3"
            const name = command.name
            const name_en = command.name_en
            tabela(command,file,table,name,name_en,nr_tabeli)
        }
    }
    for (const folder of animelist) {//command handler dla anime list
        const commandsFile = fs.readdirSync(__dirname +`/../commands/animelist`).filter(file => file.endsWith(".js"));
    
        for(const file of commandsFile) {
            const command = require(__dirname +`/../commands/animelist/${file}`);
            client.command.set(command.name, command);//język polski
            client.command.set(command.name_en, command);//język polski

             
            //ascii
            var nr_tabeli = "1"//podpinam do kategori komendy
            const name = command.name
            const name_en = command.name_en
            tabela(command,file,table,name,name_en,nr_tabeli)
        }
    }
    //wypisuje w konsoli tabelke co zostało załadowane
    if(load_commands_logs == "True"){
    console.log(table.toString())}
}