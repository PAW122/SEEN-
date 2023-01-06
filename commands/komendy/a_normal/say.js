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
const help_embed = new Discord.MessageEmbed()

    .setColor(`RANDOM`)
    .setTitle(`bank`)
    .setFields(
        {name: "$say", value: "send messages as bot"},
        {name: "usage", value: "$say text what you want send as bot"}
    )

module.exports = {
    name:"say",
    help: help_embed,
    work: worker,
    isSlash: true,

    data: new SlashCommandBuilder()
    .setName('say')
    .setDescription('copies and sends your message')
    .addStringOption((option) =>
        option
            .setName("say")
            .setDescription("type your message")
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
        //load server settings
        const guildId = inter.guild.id
        const db = new QuickDB({ filePath: process.cwd() + `/db/srv_settings/commands/${guildId}.sqlite` });
        if(await db.get(`check.check`) == true){
            const settings = await db.get(`say.worker`)
            const settings_reason = await db.get(`say.reason`)
            if(settings != true){return message.channel.send(settings_reason)}
        }

        const treść = inter.options.getString('say')

        inter.reply(`${treść}`)

    }
},

    execute: async(message, args) => {
        //load server settings
        const guildId = message.guild.id
        const db = new QuickDB({ filePath: process.cwd() + `/db/srv_settings/commands/${guildId}.sqlite` });
        if(await db.get(`check.check`) == true){
            const settings = await db.get(`say.worker`)
            const settings_reason = await db.get(`say.reason`)
            if(settings != true){return message.channel.send(settings_reason)}
        }

        
    if(work != true){return message.channel.send(reason)}
         

        if(args[0] == "help"){
            if(args[1] == "en"){
                const embed_en = new Discord.MessageEmbed()

                .setColor(`RED`)//EN
                .setTitle(`Say`)
                .setDescription(`the bot copies and then deletes the user's message, then sends it itself \n
                usage: "$say <message_content" \n
                example: "$say hello world"`)
        
                .setFooter(message.author.tag, message.author.avatarURL({dynamic: true}));
        
        
                message.channel.send({embeds: [embed_en]}); 
            }else{
                const embed_pl = new Discord.MessageEmbed()

                .setColor(`BLUE`)//PL
                .setTitle(`say`)
                .setDescription(`bot kopiuje a następnie usuwa wiadomość użytkownika, następnie sam ją wysyła\n
                użycie: "$say <treść_wiadomości"\n
                przykład: "$say hello world"`)
        
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

        if(message.content == "I`am stupid") return message.channel.send("yes I know")

        const msg = message.content.slice(4)//usówa 4 pierwsze znaki czyli $say z wiadomości

        if(!message.guild.me.permissions.has("ADMINISTRATOR")) {message.reply("Nie masz uprawnień. Wymagane uprawnienia: Administrator")}

        message.channel.send(msg)
    }
    }
}