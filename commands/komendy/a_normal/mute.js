const Discord = require("discord.js")
const ms = require("ms")
//npm i ms
const { Permissions: { FLAGS } } = require('discord.js');

module.exports = {
    name: "mute",

    execute: async (message, args, client) => {

        if (args[0] == "help") {
            return message.reply("example: $mute @user 10s\n usage: $mute <user> <time>")
        }

        if (!inter.member.permissions.has(FLAGS.ADMINISTRATOR )) {
            return(message.reply('Nie masz wystarczających permisji aby użyć tej komendy!'))
        } 
        //dodać logi kto i kogo mutował

        //pierwsza zapingowana osoba
        const toMute = message.mentions.members.first();
        let muteRole = message.guild.roles.cache.find(r => r.name === 'Muted');

        if (!toMute) return message.reply("you have not provided information about whom you want to mute");

        if (!muteRole) {
            try {
                muteRole = await message.guild.roles.create({
                    name: "Muted",
                    color: "#000000",
                    permissions: []
                });


                message.guild.channels.cache.forEach(async channel => {
                    channel.permissionOverwrites.edit(muteRole, {
                        SEND_MESSAGES: false
                    })
                });



            } catch (err) {
                console.log(err)
            }
        }

        let muteTime = args[1];
        if (!muteTime) return message.reply(`You dont type on how many time u link mute ${toMute}`)

        //dodajemy urzytkownikowi role
        await (toMute.roles.add(muteRole.id))

        message.reply(`Sucesfully muted ${toMute.user.tag}`)

        setTimeout(function () {
            toMute.roles.remove(muteRole.id);
            message.channel.send(`${toMute} has been unmuted`)
        }, ms(muteTime))
    }

}