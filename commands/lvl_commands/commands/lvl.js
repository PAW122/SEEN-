const config = require(process.cwd() + `/config/worker.js`)
const work = config.lvl_command
const worker = config.lvl_command_work
const reason = config.lvl_command_disable

const Levels = require("discord-xp")
const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
    name: "lvl",
    description: "chech your level",
    work: worker,
    isSlash: true,

    data: new SlashCommandBuilder()
    .setName('lvl')
    .setDescription('Sprawdż swój level')
    .addUserOption((option) =>
    option
        .setName("user")
        .setDescription("oznacz osobe której level chcesz sprawdzić")
        .setRequired(true)),

executeInteraction: async (inter) => {
    if(work != true){
        const embed_worker = new Discord.MessageEmbed()
        .setTitle('**lvl**')
        .setColor('RANDOM')
        .setDescription(`${reason}`)
     inter.reply({ embeds: [embed_worker] });
     return(console.log("command id disabled"))
    }else{
    
        let target = inter.options.getUser('user')
        let user = await Levels.fetch(target.id, inter.guild.id)

        if(!user){
            return inter.reply("Urzytkownik nie posiada żadnego xp");
        }else{
            return inter.reply(`> **${target.tag}** ma ${user.level}.`);
        }
        
    }
},


    execute: async (message, args) => {
        if (work != true) { return message.channel.send(reason) }

        message.reply("działa")
        
    }
}