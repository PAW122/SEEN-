const Discord = require("discord.js")
const fs = require("fs")
module.exports = (client) => {
    client.host_command = new Discord.Collection();

    //lokalizacja folderu z komendami
    const commandsFolder = fs.readdirSync(__dirname + "/commands")

    for (const folder of commandsFolder) {
        const commandsFiles = fs.readdirSync(__dirname + `/commands/${folder}`).filter(file => file.endsWith(".js"))
        
        for(const file of commandsFiles) {
            const host_command = require(__dirname +`/commands/${folder}/${file}`);
            client.host_command.set(host_command.name, host_command);
        }
    }
}