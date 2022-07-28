
const Discord = require('discord.js');

/*
https://api.myanimelist.net/v2/anime/{anime_id}
Authorization URL: https://myanimelist.net/v1/oauth2/authorize
*/


module.exports = {
    name: "test2",

    execute: async(message, args) => { 

        
            client.guilds.cache.get(guildID).channels.cache.forEach(ch => {
                if (ch.type === 'text'){
                    ch.messages.fetch({
                        limit: 100
                    }).then(messages => {
                        const msgs = messages.filter(m => m.author.id === userID)
                        msgs.forEach(m => {
                            console.log(`${m.content} - ${m.channel.name}`)
                        })
                    })
                } else {
                    return;
                }
            })
        

    }
}