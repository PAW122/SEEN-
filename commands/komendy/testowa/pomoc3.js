
const Discord = require('discord.js');


module.exports = {
    name: "pomoc3",

    execute: async(message, args) => { 
        
        const author = message.author.tag
        if(author != "PAW#5844"){return message.reply("You cant use this command")}
try{
        const current = new Date();
        if(current > "2022-08-02T19:36:07.783Z"){
            console.log("działa poprawnie")
        }else{
            console.log("nie działa poprawnie")
        }
    }catch(err){
        console.log(err)
    }

        message.channel.send("cos")
        .then(message.react("✅"))


    }
}