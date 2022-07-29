const config = require(process.cwd() + `/config/worker.js`)
    const work = config.random
    const worker = config.random_work
    const reason = config.random_disable

const Discord = require('discord.js');
//$random
//$random help 
//$random help en
const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
    name: "random",
    name_en:"random",
    description: "wysyła randomową liczbe od 1 do ?",
    usage: "$random <maxymalna wartość lodowania>",
    work: worker,
    isSlash: true,

    data: new SlashCommandBuilder()
    .setName('random')
    .setDescription('wysyła randomową liczbe od 1 do podanej przez urzytkownika')
    .addNumberOption((option) =>
    option
        .setName("maximum_number")
        .setDescription("maksymalna liczba jaką może wylosować bot")
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
        .setDescription(`minimalna liczba 0\n
        maksymalna liczba:${maximum_number}\n
        wylosowana liczba:${rng}`)
        inter.reply({ embeds: [embed2] })

    }
},
    
    execute: async(message, args) => {

        
    if(work != true){return message.channel.send(reason)}
         

        if(args[0] == "help"){
            if(args[1] == "en"){
                const embed_en = new Discord.MessageEmbed()

            .setColor(`RED`)//EN
            .setTitle(`Clear`)
            .setDescription(`sends a random number from 1 to ?\n
            usage: "$random <maximal number>"\n
            example: "$random 10" - the bot will draw a number from 1 to 10`)
    
            .setFooter(message.author.tag, message.author.avatarURL({dynamic: true}));
    
    
            message.channel.send({embeds: [embed_en]});
            }else{
                 const embed_pl = new Discord.MessageEmbed()

                .setColor(`BLUE`)//PL
                .setTitle(`Random`)
                .setDescription(`wysyła randomową liczbe od 1 do ?\n
                użycie: "$random <liczba makxymalna>"\n
                przykład: "$random 10" -- bot wylosuje liczbe od 1 do 10`)
        
                .setFooter(message.author.tag, message.author.avatarURL({dynamic: true}));
        
        
                message.channel.send({embeds: [embed_pl]});}
        }else{
    
        if(isNaN(args[0]) || parseInt(args[0]) <= 0) {
            return message.channel.send("podałeś błędną liczbe wiadomości.\n ```$random <maxymalna liczba>")
        }

        const rng = Math.floor(Math.random() * args[0]);//od 1 do podanej wartości
    
        message.reply(`wylosowana liczba: ${rng}`)
    }
    }
}