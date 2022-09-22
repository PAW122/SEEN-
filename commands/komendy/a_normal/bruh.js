const { MessageAttachment } = require('discord.js');
module.exports = {
    name: "bruh",
    
    execute: async(message,args,client) => {
        const attachment = new MessageAttachment(`db/images/bruh.webp`)
       return message.channel.send({files: [attachment]});
    }
}