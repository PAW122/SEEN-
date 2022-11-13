const axios = require('axios');
const Discord = require("discord.js");

module.exports = (message,args,client) => {
    async function main(){
        message.react("✅")
        const link = `https://valorant-api.com/v1/events`
        const res = axios.get(link).then(res => {
            try{
            const embed_pl = new Discord.MessageEmbed()
                .setColor(`BLUE`)//PL
                .setTitle(`Eavents`)
                .setFields(
                    {name: `${res.data.data[0].displayName}`,value: `start: ${res.data.data[0].startTime}\n end: ${res.data.data[0].endTime}`},
                    {name: `${res.data.data[1].displayName}`,value: `start: ${res.data.data[1].startTime}\n end: ${res.data.data[1].endTime}`},
                    {name: `${res.data.data[2].displayName}`,value: `start: ${res.data.data[2].startTime}\n end: ${res.data.data[2].endTime}`},
                    {name: `${res.data.data[3].displayName}`,value: `start: ${res.data.data[3].startTime}\n end: ${res.data.data[3].endTime}`},
                    {name: `${res.data.data[4].displayName}`,value: `start: ${res.data.data[4].startTime}\n end: ${res.data.data[4].endTime}`},

                
                    )

                .setFooter(message.author.tag, message.author.avatarURL({ dynamic: true }));
            return message.channel.send({ embeds: [embed_pl] });
                }catch(err){
                    console.log(err)
                    message.reply("error. Pleas use $report and send as information what happened")
                }

        }).catch(err => {
            console.log(err);
        })
    }
    main()
}
//liczba eaventów może się zmieniać i kiedyś może wywalić błąd gdy będzie za mała ilość eaventów do wyświetlenia