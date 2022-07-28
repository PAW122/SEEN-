
const fs = require('fs');
module.exports = (client) => {



    client.handleCommands = async (slashCommands, path) => {
        
         for (folder of slashCommands) {
            if(folder.endsWith(".js")){
                const command = require(`../../commands/${path}/${folder}`);
                if(command.isSlash){
                    client.commands.set(command.data.name, command);
                    client.commandArray.push(command.data.toJSON());
                }
                continue;
            }
            const commandFiles = fs.readdirSync(process.cwd() + `\\commands\\${path}\\${folder}`).filter(file => file.endsWith('.js'));
            for (const file of commandFiles) {
                const command = require(`../../commands/${path}/${folder}/${file}`);
                if(command.isSlash){
                    client.commands.set(command.data.name, command);
                    client.commandArray.push(command.data.toJSON());
                }
                
            }
            
        }
    };
}
