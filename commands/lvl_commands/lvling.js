//komenda na zdobywanie leweli
const config = require(process.cwd()+ "\\config\\worker.js")
const work = config.lvl_command
const worker = config.lvl_command_work
const reason = config.lvl_command_disable

const fs = require("fs")
const Levels = require("discord-xp")
//wywyoływane w messageCreate
module.exports = (client,message) =>{

    if(!message.guild || message.author.bot) return
    if (work != true) return
     
    const randomAmountOfXp = Math.floor(Math.random() * 29) +1
    const hasLeveledUp = Levels.appendXp(message.author.id, message.guild.id, randomAmountOfXp);
    if(hasLeveledUp){
        const user = Levels.fetch(message.author.id, message.guild.id);
        message.channel.send({content: `${message.author}, congratulations! You have leveled up to **${user.level}**.`});
    }
}