const Discord = require("discord.js")
const fs = require("fs")
module.exports = (client) => {
    client.help = new Discord.Collection();

    //lokalizacja folderu z komendami
    const commandsFolder = fs.readdirSync(__dirname + "/commands")

    for (const folder of commandsFolder) {
        const commandsFiles = fs.readdirSync(__dirname+`/commands/${folder}`).filter(file => file.endsWith(".js"))

        for(const file of commandsFiles) {
            const command = require(__dirname + `/commands/${folder}/${file}`);
            client.help.set(command.name, command.help);
        }
    }
}