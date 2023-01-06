const config = require(process.cwd() + `/config/worker.js`)
const work = config.tickets
const worker = config.tickets_worker
const reason = config.tickets_disable

const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
const { QuickDB } = require("quick.db")

const help_embed = new Discord.MessageEmbed()

    .setColor(`RANDOM`)
    .setTitle(`ticket`)
    .setFields(
        {name: "$ticket", value: "send tickte to server administration"},
        {name: "usage", value: "$ticket ticket content"}
    )

module.exports = {
    name: "ticket",
    work: worker,
    isSlash: true,
    help: help_embed,

    data: new SlashCommandBuilder()
    .setName('ticket')
    .setDescription('create ticket')
    .addStringOption((option) =>
        option
            .setName("content")
            .setDescription("type message content")
            .setRequired(true)
    ),
executeInteraction: async (inter) => {
    if (work != true) {
        const embed_worker = new Discord.MessageEmbed()
            .setTitle('**ticket**')
            .setColor('RANDOM')
            .setDescription(`${reason}`)
        inter.reply({ embeds: [embed_worker] });
        return (console.log("command id disabled"))
    } else {
        //load server settings
        const guildId = inter.guild.id
        const db = new QuickDB({ filePath: process.cwd() + `/db/srv_settings/commands/${guildId}.sqlite` });
        if(await db.get(`check.check`) == true){
            const settings = await db.get(`ticket.worker`)
            const settings_reason = await db.get(`ticket.reason`)
            if(settings != true){return message.channel.send(settings_reason)}
        }

        if (await db.get(`check.check`) != true) {
            return inter.reply("your server does not have a settings profile")
        }
        if (await db.get(`tickets.settings[0]`) == "null") {
            return inter.reply("tyour server does not have a channel for tickets")
        }
        if (await db.get(`tickets.settings[1]`) == "null") {
            return inter.reply("your server does not have a channel; for tickets")
        }

        if (inter.channel.id != await db.get(`tickets.settings[0]`)) {
            return inter.reply(`This channel is not for creating tickets.\n use channel <#${await db.get(`tickets.settings[0]`)}>`)
        }
        

        const treść = inter.options.getString('content')

        const send_on_id = await db.get(`tickets.settings[1]`)

        const embed = new Discord.MessageEmbed()
            .setColor(`BLUE`)
            .setTitle(`Ticket created by ${inter.user.id}`)
            .setDescription(`${treść}`)

            inter.guild.channels.cache.get(send_on_id).send({ embeds: [embed] });
            return inter.reply("Ticket has been sent")


    }
},

    execute: async (message, args, client) => {

        if (work != true) { return message.channel.send(reason) }

        const guildId = message.guild.id
        const db = new QuickDB({ filePath: process.cwd() + `/db/srv_settings/commands/${guildId}.sqlite` });
        if(await db.get(`check.check`) == true){
            const settings = await db.get(`ticket.worker`)
            const settings_reason = await db.get(`ticket.reason`)
            if(settings != true){return message.channel.send(settings_reason)}
        }

        if (args[0] == "help") {
            return message.reply(`add ticket system to your discord server
            add server settings:
             $settings ticket <channel id for users> <channel id for administrators>
            create ticket:
            $ticket <ticket content>`)
        }

        if (await db.get(`check.check`) != true) {
            return message.reply("your server does not have a settings profile")
        }

        if (await db.get(`tickets.settings[0]`) == "null") {
            return message.reply("You didn't set an id of a channel for tickets")
        }
        if (await db.get(`tickets.settings[1]`) == "null") {
            return message.reply("You did't set an id of a channel for tickets")
        }

        if (message.channel.id != await db.get(`tickets.settings[0]`)) {
            return message.reply(`This channel is not for creating tickets.\n use channel <#${await db.get(`tickets.settings[0]`)}>`)
        }

        const send_on_id = await db.get(`tickets.settings[1]`)
        //1-prefix 6-ticket 
        const description = message.content.slice(1 + 6)

        const embed = new Discord.MessageEmbed()
            .setColor(`BLUE`)
            .setTitle(`Ticket created by ${message.author}`)
            .setDescription(`${description}`)


        //send_on_id.send({embeds: [embed]});
        try {
            message.delete();
            client.channels.cache.get(send_on_id).send({ embeds: [embed] });
        } catch (err) {
            message.reply("An error occurred while sending a message")
        }
    }

}
