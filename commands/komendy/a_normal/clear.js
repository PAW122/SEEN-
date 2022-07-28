const config = require(process.cwd() + `/config/worker.js`)
    const work = config.clear
    const worker = config.clear_work
    const reason = config.clear_disable

const Discord = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions: { FLAGS } } = require('discord.js');
//$clear
//$clear help
//$clear help en
//$wyczyść
//$wyczyść help
//$wyczyść help en
module.exports = {
    name: "wyczyść",
    name_en:"clear",
    description: "usówa wiadomości",
    usage: "$clear <ilość wiadomości>",
    work: worker,
    isSlash: true,

    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('wysyła liste anime obejrzanych przez autora bota')
        .addNumberOption((option) =>
            option
                .setName("messages")
                .setDescription("jak dużo wiadomości chcesz usunąć?")
                .setRequired(true)
        ),
    executeInteraction: async (inter) => {
        if (work != true) {
            const embed_worker = new Discord.MessageEmbed()
                .setTitle('**clear**')
                .setColor('RANDOM')
                .setDescription(`${reason}`)
            inter.reply({ embeds: [embed_worker] });
            return (console.log("command id disabled"))
        } else {
            const to_delete = inter.options.getNumber('messages')

            if (!inter.member.permissions.has(FLAGS.MANAGE_MESSAGES)) {
                return(inter.reply({ content: 'Nie masz wystarczająco permisji aby użyć tej komendy!', ephemeral: true }));
            } 

            if(!inter.member.permissions.has(FLAGS.MANAGE_MESSAGES)) {
                return(inter.reply({ content: 'Nie posiadam uprawnień do usówania wiadomości!', ephemeral: true }));
            }
            try{
                inter.channel.bulkDelete(to_delete, true)
            }catch(err){
                return(inter.reply({ content: 'Nie mogę usunąć wiadomości', ephemeral: true }));
            }

            const embed2 = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setTitle('clear')
                .setDescription(`usunołeś ${to_delete} wiadomości`)
                .setTimestamp()
            inter.reply({ embeds: [embed2] })



        }
    },

    execute: async(message, args,client) => {

        
    if(work != true){return message.channel.send(reason)}
         

        if(args[0] == "help"){
            if(args[1] == "en"){
                const embed_en = new Discord.MessageEmbed()

            .setColor(`RED`)//EN
            .setTitle(`Clear`)
            .setDescription(`bot removes the given number of messages \n
            Status: "$clear <number_messages_to_remove>"
            example: "$clear 15`)
    
            .setFooter(message.author.tag, message.author.avatarURL({dynamic: true}));
    
    
            message.channel.send({embeds: [embed_en]});
            }else{
                const embed_pl = new Discord.MessageEmbed()

            .setColor(`BLUE`)//PL
            .setTitle(`Wyczyść`)
            .setDescription(`bot usówa ilość podaną ilość wiadomości\n
            użycie: "$wyczyść <liczba_wiadomości_do_usunięcia>"
            przykład: "$wyczyść 15"`)
    
            .setFooter(message.author.tag, message.author.avatarURL({dynamic: true}));
    
    
            message.channel.send({embeds: [embed_pl]});
            }
        }else{
        
        if (message.deletable) {
            message.delete();
        }

        //permisje
        if(!message.member.permissions.has("MANAGE_MESSAGES")) {
            return message.channel.send("nie masz uprawnień do usówania wiadomości")
        }

        //sprawdż argumenty
        if(isNaN(args[0]) || parseInt(args[0]) <= 0) {
            return message.channel.send("podałeś błędną liczbe wiadomości")
        }

        //bot sprawdza czy ma permisje do usówania na dc
        if(!message.guild.me.permissions.has("MANAGE_MESSAHES")) {
            return message.channel.send("Nie posiadam uprawnień do usówania wiadomości")
        }

        let deleteAmount;

        if(parseInt(args[0]) > 100){
            deleteAmount = 100;
        } else {
            deleteAmount = parseInt(args[0]);
        }

        message.channel.bulkDelete(deleteAmount, true)
        .then(message.channel.send(`Usunąłem ${deleteAmount} wiadomości`))
        .catch(err => message.channel.send(`coś poszło nie tak: ${err}`))
    }
    }
}