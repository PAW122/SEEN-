const config = require("../../config/config")
const emoji = config.economy_emoji
const economy_db_version = config.economy_db_version
const Discord = require("discord.js")
module.exports = {
    name: "helpeco",

    execute: async (message, args) => {
        //load server settings
        const guildId = message.guild.id
        const db2 = new QuickDB({ filePath: process.cwd() + `/db/srv_settings/commands/${guildId}.sqlite` });
        if(await db2.get(`check.check`) == true){
            const settings = await db2.get(`economy_command.worker`)
            const settings_reason = await db2.get(`economy_command.reason`)
            if(settings != true){return message.channel.send(settings_reason)}
        }
        
        const embed_pl = new Discord.MessageEmbed()
    .setColor(`BLUE`)
    .setTitle(`Help`)
    .addFields(//inline-w embedzie zamiast po dobą będą obok siebie
        { name: `Economy version: ${economy_db_version}`, value: `if your version of the economy system is older use $ecodeafult -- it will restore the system to deafult settings, all users statistics will be restarted, but you will gain access to new functions`, inline: true },
        { name: `$daily`, value: `Receive a daily reward from 50 to 100 ${emoji}`, inline: true },
        { name: `$birthday`, value: `receive the birthday present `, inline: true },
        { name: `$profil`, value: `displays information about how much ${emoji} you have eg.`, inline: true },
        { name: `$weekly`, value: `Receive weekly reward ${emoji}`, inline: true },
        { name: `$roll`, value: `you have a 30% chance to double the amount of ${emoji}. You can use this option a maximum of 15 times a day\n usage: $roll 10`, inline: true },
        { name: `$shop`, value: `wyświetla liste przedmiotów, które można kupićc`, inline: true },
        { name: `$add`, value: `allows administration to add and subtract ${emoji} of other users
        usage: $add <amount${emoji}> <userId>
        example: $add 100 797070806885990431`, inline: true },
        { name: `$birthday`, value: `set your birthday to recieve your birthday reward`, inline: true },
    )
    message.channel.send({embeds: [embed_pl] })
    }
}