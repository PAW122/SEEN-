//komenda na zdobywanie leweli
const config = require(process.cwd()+ "\\config\\worker.js")
const work = config.lvl_command
const worker = config.lvl_command_work
const reason = config.lvl_command_disable

const fs = require("fs")
const client = require(process.cwd()+  "\\main.js")
const Levels = require("discord-xp")

module.exports = (client,message) =>{

    if(!message.guild || message.author.bot) return
    if (work != true) return
     
    const randomAmountOdXp = Math.floor(Math.random() * 29) +1
    const hasLeveledUp = Levels.appendXp(message.author.id, message.guild.id, randomAmountOdXp);
    if(hasLeveledUp){
        const user = Levels.fetch(message.author.id, message.guild.id);
        message.channel.send({content: `${message.author}, congratulations! You have leveled up to **${user.level}**.`});
    }
}