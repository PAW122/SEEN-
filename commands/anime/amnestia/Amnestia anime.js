const Discord = require('discord.js');
const { QuickDB } = require("quick.db");
module.exports = {
    name: "amnesia",
    name_en: "Lucky", 
    description: "wysyła grafike senko",
    usage: "$senko",

    execute: async(message, args) =>  {
         //load server settings
         const guildId = message.guild.id
         const db = new QuickDB({ filePath: process.cwd() + `/db/srv_settings/commands/${guildId}.sqlite` });
         if(await db.get(`check.check`) == true){
             const settings = await db.get(`eight_ball.worker`)
             const settings_reason = await db.get(`eight_ball.reason`)
             if(settings != true){return message.channel.send(settings_reason)}
         }

const embed = new Discord.MessageEmbed()

.setColor("BLUE")
.setImage("https://shinden.pl/res/images/225x350/171527.jpg")
.setTitle("Anime:")
.setDescription("Amnesia\n\nPierwszego sierpnia, o poranku, nasza bohaterka budzi się i odkrywa, że nic nie pamięta. Nagle pojawia się przed nią tajemniczy chłopiec, który przedstawia się jako “duszek” o imieniu Orion. Dziewczyna postanawia z jego pomocą jakoś odzyskać swoje wspomnienia… aż w pewnej chwili dzwoni telefon. Nie rozpoznaje ona imienia na wyświetlaczu, ale nieznajomy podobno jest jej “chłopakiem”. Bohaterka postanawia się z nim spotkać, choć pomimo największych wysiłków, nie jest w stanie przypomnieć sobie jego twarzy.")
.addFields(//inline-w embedzie zamiast po dobą będą obok siebie
    {name: "Gatunki:",value: "Tajemnica,Nadprzyrodzone,Męski harem, Romans", inline: true},
    {name: "Grupy docelowe:",value: "Josei,Shoujo",inline: false},
    {name: "Rodzaje postaci",value: "Bishounen,Pokojówki,Yandere/Yangire,Magiczne",inline: false},
    {name: "Miejsce i czas",value: "Współczesność,Japonia,Miasto",inline: false},
    {name: "Pierwowzór",value: "Visual novel",inline: false},
    )

.setTimestamp()
.setFooter(message.author.tag, message.author.avatarURL({dynamic: true}));

message.channel.send({embeds: [embed]});

        
    }
}