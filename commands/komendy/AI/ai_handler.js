//do ustawień deafultowych i napisywania wszystkiego w db
//dodać, żeby było wczytywane w client.on ready w main.js

//jeżeli urzytkownik wysłał wiadomość o treśi, której nie ma w db zapisz ją do to-check
const pl_output = require("./responds/pl-responds.json")
const { QuickDB } = require("quick.db");

const talkedRecently = new Set();
const cooldown = 60000

module.exports = (client) => {
    
    client.on('messageCreate', async message => {
        //wywala errera
        return

        if (talkedRecently.has(inter.user.id)) {
            return inter.reply("Wait 1 minute before getting typing this again. - <@" + inter.user.id + ">");
         } else {

             // the user can type the command ... your command code goes here :)
             // Adds the user to the set so that they can't talk for a minute
             talkedRecently.add(inter.user.id);
             setTimeout(() => {
                 // Removes the user from the set after a minute
                 talkedRecently.delete(inter.user.id);
             }, cooldown);
         }

        if(message.guild == null) return;
        const args = message.content.trim().split(/ +/);
        //sprawdż czy gildia posiada włączoną komende ai w db
        const guildId = message.guild.id
        const db = new QuickDB({ filePath: process.cwd() + `/db/ai/ai_guilds.sqlite` });
        if(await db.get(`${guildId}.check`) != true) return ;

        if(await db.get(`${guildId}.channelid`) != message.channel.id) return;
        if(message.author.bot) return;

        const input = message.content
        const arg = args[0]

        try{//try message.content
            const id = Object.keys(pl_output).length
            const odp =  pl_output[input]
            const len = odp.length - 1
            const rng = Math.floor(Math.random() * len) + 1;
            if(rng > len){
                const rng = len
            }

           return message.channel.send(pl_output[rng][len])
        } catch(err){
            try{//try first arg
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

/*
1.przywitanie
2.spróbuj znaleźć rodzaj odpowiedzi (przywitanie/zapytanie/inne)
3.


za każdym wysłaniem wiadomości na kanale bot zapisuje typ ostatniej wiadomości
np last: zapytanie: {jak się masz?}
*/