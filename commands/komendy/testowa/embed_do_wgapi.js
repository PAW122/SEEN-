const Discord = require('discord.js');
module.exports={
    name: "test7",

    execute: async(message, args, client) => {
        if(author != "PAW#5844"){return message.reply("You cant use this command")}

        const nazwa_konta = "Nick_konta"
        const Winrate = "60%"
        const DPB = "do dodania"//średnie obrażenia na bitwe
        const battles = "2137"
        const wn8 = "3000"

        const embed = new Discord.MessageEmbed()
        .setColor(`BLUE`)
        .setTitle(`${nazwa_konta}`)
        .setFields(
            {name: `Karie Statsr`, value:`---------------------------------------`, inline: false},
            {name: `Battles`, value:`${battles}`, inline: false},
            {name: `Winrate`, value:`${Winrate}`, inline: true},
            {name: `DmgPerBattle`, value:`${DPB}`, inline: false},
            {name: `Wn8`, value:`${wn8}`, inline: true},

            {name: `Ranking Battles`, value:`---------------------------------------`, inline: false},
        )

        message.channel.send({embeds: [embed]});
    }
}