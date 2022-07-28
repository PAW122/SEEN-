
const Discord = require('discord.js');

/*
https://api.myanimelist.net/v2/anime/{anime_id}
Authorization URL: https://myanimelist.net/v1/oauth2/authorize
*/


module.exports = {
    name: "test1",

    execute: async(message, args) => { 

        const author = message.author.tag
        if(author != "PAW#5844"){return message.reply("You cant use this command")}

        if(args[0] == "help"){return message.reply("example: <anime name>")}

        if(!args[0]){return message.reply("Nie podałeś nazwy anime")}

        const nazwa_anime = args[0]

        fetch('https://api.myanimelist.net/v2/anime/{anime_id}')
        .then(res => console.log(res))
        

    }
}