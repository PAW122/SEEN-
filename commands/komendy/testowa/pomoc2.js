
const Discord = require('discord.js');


module.exports = {
    name: "pomoc2",

    execute: async(message, args) => { 

        const author = message.author.tag
        if(author != "PAW#5844"){return message.reply("You cant use this command")}

        
        const ilość_argumentów = args.length
        console.log(ilość_argumentów)


        for(let i = 0; i < ilość_argumentów; i++) {
           if(args[i] == "test"){
            return message.channel.send("działa")
           }
        }
        

    }
}