const config = require(process.cwd() + `/config/worker.js`)
    const work = config.random
    const worker = config.random_work
    const reason = config.random_disable

const Discord = require('discord.js');
const { QuickDB } = require("quick.db");
//$random
//$random help 
//$random help en
const { SlashCommandBuilder } = require('@discordjs/builders');
const help_embed = new Discord.MessageEmbed()

    .setColor(`RANDOM`)
    .setTitle(`random`)
    .setFields(
        {name: "$random", value: "send random number"},
        {name: "usage", value: "$random 100 \n send random number from 1 to 100"}
    )

module.exports = {
    name: "random",
    help: help_embed,
    work: worker,
    isSlash: true,

    data: new SlashCommandBuilder()
    .setName('random')
    .setDescription('Sends a random number from 1 to any set by the user')
    .addNumberOption((option) =>
    option
        .setName("maximum_number")
        .setDescription("Maximum number a bot can draw ")
        .setRequired(true)
),
    
executeInteraction: async (inter) => {
    if (work != true) {
        const embed_worker = new Discord.MessageEmbed()
            .setTitle('**botinfo**')
            .setColor('RANDOM')
            .setDescription(`${reason}`)
        inter.reply({ embeds: [embed_worker] });
        return (console.log("command id disabled"))
    } else {
        const maximum_number = inter.options.getNumber('maximum_number')
        const rng = Math.floor(Math.random() * maximum_number);

        const embed2 = new Discord.MessageEmbed()
        .setTitle("random")
        .setColor("RANDOM")
        .setDescription(`Minimum number 0\n
        Maximum number:${maximum_number}\n
        Drawn number:${rng}`)
        inter.reply({ embeds: [embed2] })

    }
},
    
    execute: async(message, args) => {
//load server settings
const guildId = message.guild.id
const db = new QuickDB({ filePath: process.cwd() + `/db/srv_settings/commands/${guildId}.sqlite` });
if(await db.get(`check.check`) == true){
    const settings = await db.get(`random.worker`)
    const settings_reason = await db.get(`random.reason`)
    if(settings != true){return message.channel.send(settings_reason)}
}

        
    if(work != true){return message.channel.send(reason)}
         

        if(args[0] == "help"){
            if(args[1] == "en"){
                const embed_en = new Discord.MessageEmbed()

            .setColor(`RED`)//EN
            .setTitle(`Clear`)
            .setDescription(`sends a random number from 1 to any set by the user\n
            usage: "$random <maximal number>"\n
            example: "$random 10" - the bot will draw a number from 0 to 10`)
    
            .setFooter(message.author.tag, message.author.avatarURL({dynamic: true}));
    
    
            message.channel.send({embeds: [embed_en]});
            }else{
                 const embed_pl = new Discord.MessageEmbed()

                .setColor(`BLUE`)//PL
                .setTitle(`Random`)
                .setDescription(`Sends a random number from 1 to any set by the user\n
                usage: "$random <max number>"\n
                example: "$random 10" -- bot send random number for 0 to 10`)
        
                .setFooter(message.author.tag, message.author.avatarURL({dynamic: true}));
        
        
                message.channel.send({embeds: [embed_pl]});}
        }else{
    
        if(isNaN(args[0]) || parseInt(args[0]) <= 0) {
            return message.channel.send("wrong number.\n ```$random <max number>")
        }

        const rng = Math.floor(Math.random() * args[0]);//od 1 do podanej wartości
    
        message.reply(`Drawn number: **${rng}**`)
    }
    }
}