const config = require(process.cwd() + `/config/worker.js`)
const work = config.anime_list
const worker = config.anime_list_work
const reason = config.anime_list_disable

const Discord = require('discord.js');
const { MessageAttachment } = require('discord.js');
const fs = require('fs');

module.exports = {
    name: "myanimelist",
    work: worker,


    execute: async(message, args) => { 



        const add_anime = "$myanimelist add"
        const anime_list = "$myanimelist"
        
        if(args[0] == "help"){message.reply(`
        dodawanie anime do listy: ${add_anime} <nazwa anime>
        przykład: ${add_anime} No game No life
        sprawdzanie listy: ${anime_list}
        Lista jest wysyłana w formie pliku .txt
        `)}

        if(work != true){return message.channel.send(reason)}
         
        const user_name = message.author.tag
        const user = message.author.id + ".txt"
        const tresc = message.content + "\n"

        //wyświetla liste
        if(!args[0]){
            
            const attachment = new MessageAttachment(`${process.cwd()}/db/animelist/${user}`)
            try{
                message.channel.send({files: [attachment]});
            }catch (error){
                console.log(error)
                message.reply("nie znaleziono listy")
            }  
        }

        if(args[0] == "add"){
            const path = `${process.cwd()}/db/animelist/${user}`
            const dane = `${tresc.slice(17)}`


            fs.appendFile(path,dane, function (err) {
            if (err) throw err;
            });
        }

    },
}
