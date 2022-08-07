const config = require(process.cwd() + `/config/worker.js`)
    const work = config.say
    const worker = config.say_work
    const reason = config.say_disable

const Discord = require('discord.js');
const { QuickDB } = require("quick.db");
//$say
//$say help
//$say help en
//$pwoiedz
//$pwoiedz help
//$pwoiedz help en
const { SlashCommandBuilder } = require('@discordjs/builders');
const srv_settings = require("../../../handlers/check_srv_settings")
module.exports = {
    name: "pwoiedz",
    name_en:"say",
    description: "kopiuje wiadomość i wysyła ją",
    usage: "$say <wiadomość>",
    work: worker,
    isSlash: true,

    data: new SlashCommandBuilder()
    .setName('say')
    .setDescription('kopiuje i wysyła twoją wiadomość')
    .addStringOption((option) =>
        option
            .setName("say")
            .setDescription("podaj treść wiadomości")
            .setRequired(true)
    ),
executeInteraction: async (inter) => {
    if (work != true) {
        const embed_worker = new Discord.MessageEmbed()
            .setTitle('**say**')
            .setColor('RANDOM')
            .setDescription(`${reason}`)
        inter.reply({ embeds: [embed_worker] });
        return (console.log("command id disabled"))
    } else {
        //load server settings say
        const guildId = inter.guild.id
        const command_name = "say"
        srv_settings(command_name,guildId)

        const treść = inter.options.getString('say')

        inter.reply(`${treść}`)

    }
},

    execute: async(message, args) => {
        //load server settings
        const guildId = message.guild.id
        const command_name = "say"
        srv_settings(command_name,guildId)

        
    if(work != true){return message.channel.send(reason)}
         

        if(args[0] == "help"){
            if(args[1] == "en"){
                const embed_en = new Discord.MessageEmbed()

                .setColor(`RED`)//EN
                .setTitle(`Say`)
                .setDescription(`the bot copies and then deletes the user's message, then sends it itself \n
                usage: "$say <message_content" \ n
                example: "$say hello world"`)
        
                .setFooter(message.author.tag, message.author.avatarURL({dynamic: true}));
        
        
                message.channel.send({embeds: [embed_en]}); 
            }else{
                const embed_pl = new Discord.MessageEmbed()

                .setColor(`BLUE`)//PL
                .setTitle(`Powiedz`)
                .setDescription(`bot kopiuje a następnie usuwa wiadomość użytkownika, następnie sam ją wysyła\n
                użycie: "$powiedz <treść_wiadomości"\n
                przykład: "$powiedz hello world"`)
        
                .setFooter(message.author.tag, message.author.avatarURL({dynamic: true}));
        
        
                message.channel.send({embeds: [embed_pl]});
            }
        }else{

            if(!args[0]){
                return message.channel.send("musisz podać argumenty:\n użycie $say text \n przykład $say cześć")
            }

        if(message.author.bot) return;

        if (message.deletable) {
            message.delete();//usówa wiadomość z $say
        }

        const msg = message.content.slice(4)//usówa 4 pierwsze znaki czyli $say z wiadomości

        if(!message.guild.me.permissions.has("ADMINISTRATOR")) {message.reply("Nie masz uprawnień. Wymagane uprawnienia: Administrator")}

        message.channel.send(msg)
    }
    }
}