
const Discord = require('discord.js');


module.exports = {
    name: "pomoc3",

    execute: async(message, args) => { 

        const author = message.author.tag
        if(author != "PAW#5844"){return message.reply("You cant use this command")}

        message.channel.send("cos")
        .then(message.react("✅"))

    }
}