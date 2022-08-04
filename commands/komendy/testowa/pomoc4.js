const Discord = require("discord.js")

module.exports = {
    name: "nie_dla_pas",
    excute: async(message) => {
        if(author != "PAW#5844"){return message.reply("You cant use this command")}
        //jeżeli ktoś ma role
        if(message.member.roles.find(r => r.name === "Admin")){
            message.channel.send("masz admina")
        }
        //jeżeli ktoś nie ma roli
        if(!message.member.roles.find(r => r.name === "Admin")){
            message.channel.send("nie masz admina")
        }

    }
}