const Discord = require("discord.js")
const ms = require("ms")
//npm i ms
const { Permissions: { FLAGS } } = require('discord.js');
const { QuickDB } = require("quick.db");
const { SlashCommandBuilder } = require('@discordjs/builders');

const help_embed = new Discord.MessageEmbed()

    .setColor(`RANDOM`)
    .setTitle(`mute`)
    .setFields(
        {name: "$mute", value: "mute user"},
        {name: "usage:", value: "$mute @user time"},
        {name: "example", value: "$mute @seen 10s"}
    )

module.exports = {
    name: "mute",
    isSlash: true,
    help: help_embed,

    data: new SlashCommandBuilder()
        .setName('mute')
        .setDescription('Mute user')

        .addUserOption((option) => option
            .setName('user')
            .setDescription('User to mute')
            .setRequired(true))

            .addNumberOption((option) => option
            .setName('time')
            .setDescription('Mute time in minutes')
            .setRequired(true)),

    executeInteraction: async (inter,client) => {
        const guildId = inter.guild.id
        const db2 = new QuickDB({ filePath: process.cwd() + `/db/srv_settings/commands/${guildId}.sqlite` });
        if (await db2.get(`check.check`) == true) {
            const settings = await db2.get(`mute.worker`)
            const settings_reason = await db2.get(`mute.reason`)
            if (settings == false) { return message.reply(settings_reason) }
        }

        if (!inter.member.permissions.has(FLAGS.ADMINISTRATOR )) {
            return(inter.reply('Nie masz wystarczających permisji aby użyć tej komendy!'))
        } 
        //dodać logi kto i kogo mutował

        //pierwsza zapingowana osoba
        const member = inter.options.getUser('user');
        let toMute = inter.guild.members.cache.find(mem => mem.id === member.id)
        const muteTime = inter.options.getNumber('time') + "m"
        let muteRole = inter.guild.roles.cache.find(r => r.name === 'Muted');

        if (!toMute) return inter.reply("you have not provided information about whom you want to mute");

        if (!muteRole) {
            try {
                muteRole = await inter.guild.roles.create({
                    name: "Muted",
                    color: "#000000",
                    permissions: []
                });


                inter.guild.channels.cache.forEach(async channel => {
                    channel.permissionOverwrites.edit(muteRole, {
                        SEND_MESSAGES: false
                    })
                });



            } catch (err) {
                console.log(err)
            }

        }

        if (!muteTime) return inter.reply(`You dont type on how many time u link mute ${toMute}`)

        //dodajemy urzytkownikowi role
        await (toMute.roles.add(muteRole.id))

        inter.reply(`Sucesfully muted ${toMute.user.tag} no next ${muteTime}`)

        

        setTimeout(function () {
            toMute.roles.remove(muteRole.id);
            inter.channel.send(`${toMute} has been unmuted`)
        }, ms(muteTime))
    },

    execute: async (message, args, client) => {

        //load server settings
        const guildId = message.guild.id
        const db2 = new QuickDB({ filePath: process.cwd() + `/db/srv_settings/commands/${guildId}.sqlite` });
        if (await db2.get(`check.check`) == true) {
            const settings = await db2.get(`mute.worker`)
            const settings_reason = await db2.get(`mute.reason`)
            if (settings == false) { return message.reply(settings_reason) }
        }

        if (args[0] == "help") {
            return message.reply("example: $mute @user 10s\n usage: $mute <user> <time>\n $mute @user temp")
        }

        if (!message.member.permissions.has(FLAGS.ADMINISTRATOR )) {
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

        if(args[1] == "temp"){
            await (toMute.roles.add(muteRole.id))
            return  message.reply(`Sucesfully muted ${toMute.user.tag}`)
        }

        let muteTime = args[1];
        if (!muteTime) return message.reply(`You dont type on how many time u link mute ${toMute}`)

        //dodajemy urzytkownikowi role
        try{
            await (toMute.roles.add(muteRole.id))
        } catch (err) {
            console.log(err)
            if(err == "DiscordAPIError: Missing Permissions") {
                return message.reply("Missing Permissions - I cant add role to this user")
            }else{
                return message.reply("I cant add role to this user")
            }
        }
        message.reply(`Sucesfully muted ${toMute.user.tag}`)

        

        setTimeout(function () {
            toMute.roles.remove(muteRole.id);
            message.channel.send(`${toMute} has been unmuted`)
        }, ms(muteTime))
        
    }

}