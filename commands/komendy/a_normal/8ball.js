const config = require(process.cwd() + `/config/worker.js`)
const work = config.eight_ball
const worker = config.eight_ball_work
const reason = config.eight_ball_disable
const Discord = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { QuickDB } = require("quick.db");

var fortunes = [
    "**Yes**",
    "**No**",
    "**Maybe**",
    "**I don't know**",
    "**Probably**",
    "**I guess**",
    "**I'm not sure**",
    "**Surely**"
];
//8ball
//8ball help
//8ball help en
module.exports = {
    name: "8ball",
    description: "",
    //work: worker,
    work: worker,
    isSlash: true,


    data: new SlashCommandBuilder()
        .setName('8ball')
        .setDescription('Sends a random word: Yes/No/Maybe/I dont know/Probably/I guess/Im not sure/ Surely'),
    executeInteraction: async (inter) => {
        if(work != true){
            const embed_worker = new Discord.MessageEmbed()
            .setTitle('**8ball**')
            .setColor('RANDOM')
            .setDescription(`${reason}`)
         inter.reply({ embeds: [embed_worker] });
         return(console.log("command id disabled"))
        }else{
            //load server settings
        const guildId = inter.guild.id
        const db = new QuickDB({ filePath: process.cwd() + `/db/srv_settings/commands/${guildId}.sqlite` });
        if(await db.get(`check.check`) == true){
            const settings = await db.get(`eight_ball.worker`)
            const settings_reason = await db.get(`eight_ball.reason`)
            if(settings != true){return message.channel.send(settings_reason)}
        }
            
        const embed = new Discord.MessageEmbed()
            .setTitle('**8ball**')
            .setColor('RANDOM')
            .setDescription(`${fortunes[Math.floor(Math.random() * 8)]}`)
        inter.reply({ embeds: [embed] });
        }
    },

    execute: async(message, args) => { 
        //load server settings
        const guildId = message.guild.id
        const db = new QuickDB({ filePath: process.cwd() + `/db/srv_settings/commands/${guildId}.sqlite` });
        if(await db.get(`check.check`) == true){
            const settings = await db.get(`eight_ball.worker`)
            const settings_reason = await db.get(`eight_ball.reason`)
            if(settings != true){return message.channel.send(settings_reason)}
        }
        
        if(work != true){return message.channel.send(reason)}
         

        if(args[0] == "help"){
            if(args[1] == "en"){
                message.channel.send(`**$8ball en**\nthe bot sends a random message from the list:
                **Yes**
                **No**
                **Maybe**
                **I don't know**
                **Probably**
                **I guess**
                **I'm not sure**
                **Surely**`)
            }else{
                message.channel.send(`**8ball**\nbot wysyła randomową wiadomość z listy:
                **Tak**
                **Nie**
                **Może**
                **Nie Wiem**
                **Prawdopodobnie**
                **Chyba**
                **Nie Jestem Pewien**
                **Na Pewno**`)
            }
        }else{

        const { channel } = message
        var wynik = message.channel.send(fortunes[Math.floor(Math.random() * 8)]);
        }
    },
}
