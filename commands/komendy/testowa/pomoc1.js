
const Discord = require('discord.js');

/*
https://api.myanimelist.net/v2/anime/{anime_id}
Authorization URL: https://myanimelist.net/v1/oauth2/authorize
*/


module.exports = {
    name: "pomoc1",

    execute: async(message, args) => { 

        const author = message.author.tag
        if(author != "PAW#5844"){return message.reply("You cant use this command")}

        if(args[0] == "help"){
            message.reply(`
            użycie: $pomoc1 <treść wiadomości> <ilość wiadomości>
            przykład: $pomoc1 siema 10`)
        }

        const treść = args[0]
        const ilośc_wiadomości = args[1]
        i = 0
        while (i != ilośc_wiadomości){
            message.channel.send(treść)
            i += 1
        }
        

    }
}