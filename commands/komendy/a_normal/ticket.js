const config = require(process.cwd() + `/config/worker.js`)
        const work = config.tickets
        const worker = config.tickets_worker
        const reason = config.tickets_disable

const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
const {QuickDB} = require("quick.db")


module.exports = {
    name: "ticket",
    work: worker,

    execute: async (message, args, client) => {

        if (work != true) { return message.channel.send(reason) }
        //system srv_set usunięty bo i tak admonistracja to ustawia

        if(args[0] == "help"){
            return message.reply(`add ticket system to your discord server
            add server settings:
             $settings ticket <channel id for users> <channel id for administrators>
            create ticket:
            $ticket <treść ticketa>`)
        }
       
        if(await db.get(`check.check`) != true){
            return message.reply("twój serwer nie posiada przfilu sutawień")
        }

        if(await db.get(`tickets.settings[0]`) == "null"){
            return message.reply("nie ustawiłeś id kanału dla ticketów")
        }
        if(await db.get(`tickets.settings[1]`) == "null"){
            return message.reply("nie ustawiłeś id kanału dla ticketów")
        }

        if(message.channel.id != await db.get(`tickets.settings[0]`)){
            return message.reply("ten kanał nie służy do tworzenia ticketów.")
        }

        const send_on_id = await db.get(`tickets.settings[1]`)
        //1-prefix 6-ticket 
        const description = message.content.slice(1 + 6)

        const embed = new Discord.MessageEmbed()
        .setColor(`BLUE`)
        .setTitle(`Ticket created by ${message.author}`)
        .setDescription(`${description}`)


        //send_on_id.send({embeds: [embed]});
        try{
            message.delete();
        client.channels.cache.get(send_on_id).send({embeds: [embed]});
        }catch(err){
            message.reply("wystąpił błąd podczas wysyłania wiadomości")
        }
    }
        
    }
