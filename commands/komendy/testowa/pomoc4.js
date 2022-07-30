const Discord = require("discord.js")

module.exports = {
    name: "nie_dla_pas",
    excute: async(message) => {
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