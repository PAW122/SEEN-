const Discord = require('discord.js');

module.exports = {
    name: 'admin_ban',

    execute(message, args){
        
        if(message.author.id != "438336824516149249"){
            return 0
        }

        if(args[0] == "help"){
            return message.reply(`usage: $admin_ban <user_id>`)
        }

        if(!args[0]) return message.reply("nie podałeś 1 argumentu")


        const target = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
        console.log(target)
      
        target.ban()

    }
}