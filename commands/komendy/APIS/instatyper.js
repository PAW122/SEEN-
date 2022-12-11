const axios = require("axios");
const fs = require("fs")
const Discord = require("discord.js")

module.exports = {
    name: "write",

    execute:async(message,args,client) => {

        if(args[0] == "help") {
            return message.reply("Write essay bot.\n usage: $write <thema>\n example: $write cold war\n pleas type thema in english\n to translate you can use: https://www.deepl.com/pl/translator")
        }

        const fraze = args.join('+').toLowerCase()

        const link = `https://instantessaytyper.com/typer/essay.php?topic=${fraze}`

       const res =  await axios.get(link).catch(err => {
        console.log(err)
        return message.reply("Somethink go wrong. Try again")
       })

       const best_res = res.data.slice(706, -1); 
       const best_res2 = best_res.substring(0,best_res.length - 319)

       if(best_res2.length < 10) {
        return message.reply("I cant write anythink on this thema\n try use **$write help** or use **$report** to report bug")
       }

        let atc = new Discord.MessageAttachment(Buffer.from(best_res2), 'instatypper.txt');

        message.channel.send({ files: [atc] });
    }
}

