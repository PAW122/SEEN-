//do ustawień deafultowych i napisywania wszystkiego w db
//dodać, żeby było wczytywane w client.on ready w main.js

//jeżeli urzytkownik wysłał wiadomość o treśi, której nie ma w db zapisz ją do to-check
const pl_output = require("./responds/pl-responds.json")
const { QuickDB } = require("quick.db");
module.exports = (client) => {
    
    client.on('messageCreate', async message => {

        const args = message.content.trim().split(/ +/);
        //sprawdż czy gildia posiada włączoną komende ai w db
        const guildId = message.guild.id
        const db = new QuickDB({ filePath: process.cwd() + `/db/ai/ai_guilds.sqlite` });
        if(await db.get(`${guildId}.check`) != true) return ;

        if(await db.get(`${guildId}.channelid`) != message.channel.id) return;
        if(message.author.bot) return;

        const input = message.content
        const arg = args[0]

        try{
            const id = Object.keys(pl_output).length
            const odp =  pl_output[input]
            const len = odp.length - 1
            const rng = Math.floor(Math.random() * len) + 1;
            if(rng > len){
                const rng = len
            }

           return message.channel.send(pl_output[rng][len])
        } catch(err){
            try{
                const id = Object.keys(pl_output).length
                const odp =  pl_output[arg]
                const len = odp.length
                const rng = Math.floor(Math.random() * len);
                if(rng > len || rng < 0){
                    const rng = len
                }
    
               return message.channel.send(pl_output[arg][rng]) 
            }catch(err){
                return
            }
        }
    });
}