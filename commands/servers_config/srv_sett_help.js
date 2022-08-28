const config = require(process.cwd() + `/config/worker.js`)
const config2 = require("../../config/config")
const work = config.help
const worker = config.help_work
const reason = config.help_disable
const db_version = config2.db_version
const { QuickDB } = require("quick.db");
const Discord = require('discord.js');
const prefix = config.prefix
const embed_pl = new Discord.MessageEmbed()
    .setColor(`BLUE`)
    .setTitle(`Help`)
    .setDescription(`U can use '/helpen' for a description in English\nlista wszystkich komend:`)
    .addFields(//inline-w embedzie zamiast po dobą będą obok siebie
        {
            name: `$settings deafult`,
            value: `creates a server settings profile`, inline: true
        },


        {
            name: `settings`, value: `allows the administrator to disable and enable any command for the server
        \n użycie: $settings <on/off> <command_name>
        example off: $settings off eight_ball
        example on: $settings on eight_ball`, inline: true
        },
        {
            name: `$srv_set list`,
            value: `to get a complete list of commands and find out which commands are disabled`, inline: true
        },
        {
            name: `$settings prefix`,
            value: `allows you to change the prefix for the server

         usage: $settings prefix <your prefix>
         example: $settings prefix $`, inline: true
        },

        {
            name: `$settings welcome_messages`,
            value: `gives the possibility to set a "welcome message" on the server
         usage: $settings welcome_messages <channelId>
         example: $settings welcome_messages 764240709779193876`, inline: true
        },

        {
            name: `$settings ticket`,
            value: `gives the possibility to set up channels for tickets
         usage: $settings ticket <channel id for users> <channel id for administrators>
         example: $settings ticket 764240709779193876 745768777022701648`, inline: true
        },
        {
            name: `$settings lvls_channel`,
            value: `gives the possibility to set up channels for levels notifications
         usage: $settings lvls_channel <channel_ID>
         example:  $settings lvls_channel 745768777022701648`, inline: true
        },


    )


module.exports = {
    name: `srv_set`,
    description: `help command`,
    usage: `$help`,
    work: worker,


    execute: async (message, args) => {

        const guildId = message.guild.id
        const db = new QuickDB({ filePath: process.cwd() + `/db/srv_settings/commands/${guildId}.sqlite` });

        const embed_lista = new Discord.MessageEmbed()
            .setColor(`BLUE`)
            .setTitle(`List of all commands page 1/2`)
            .setDescription(`True: on  ||   Flase: off
    if your db_version in not: ${db_version} use $settings deafult
    WARNING!! when db is updated u loss all of your settings`)
            .addFields(
                { name: `db version:`, value: `${await db.get(`version.check`,)}`, inline: false },
                { name: `prefix`, value: `${await db.get(`prefix.check`,)}`, inline: false },
                { name: `welcome channel id`, value: `${await db.get(`welcome.channelId`,)}`, inline: false },
                { name: `tickets`, value: `users channel id:${await db.get(`tickets.settings[0]`,)} \n administration channel id:${await db.get(`tickets.settings[1]`,)}`, inline: false },
                { name: `command name`, value: `on/off`, inline: false },
                { name: `anime_gif`, value: `${await db.get(`anime_gif.worker`,)}`, inline: false },
                { name: `eight_ball`, value: `${await db.get(`eight_ball.worker`,)}`, inline: true },
                { name: `anime_seem_help`, value: `${await db.get(`anime_seem_help.worker`,)}`, inline: true },
                { name: `anime_help`, value: `${await db.get(`anime_help.worker`,)}`, inline: true },
                { name: `updaty`, value: `${await db.get(`updaty.worker`,)}`, inline: true },
                { name: `ankieta`, value: `${await db.get(`ankieta.worker`,)}`, inline: true },
                { name: `awatar`, value: `${await db.get(`awatar.worker`,)}`, inline: true },
                { name: `ban`, value: `${await db.get(`ban.worker`,)}`, inline: true },
                { name: `bot_info`, value: `${await db.get(`bot_info.worker`,)}`, inline: true },
                { name: `clear`, value: `${await db.get(`clear.worker`,)}`, inline: true },
                { name: `embed`, value: `${await db.get(`embed.worker`,)}`, inline: true },
                { name: `kick`, value: `${await db.get(`kick.worker`,)}`, inline: true },
                { name: `random`, value: `${await db.get(`random.worker`,)}`, inline: true },
                { name: `ping`, value: `${await db.get(`ping.worker`,)}`, inline: true },
                { name: `ruletka`, value: `${await db.get(`ruletka.worker`,)}`, inline: true },
                { name: `say`, value: `${await db.get(`say.worker`,)}`, inline: true },
                { name: `srv_info`, value: `${await db.get(`srv_info.worker`,)}`, inline: true },
                { name: `blitz_stats`, value: `${await db.get(`blitz_stats.worker`,)}`, inline: true },
                { name: `blitz_clan`, value: `${await db.get(`blitz_clan.worker`,)}`, inline: true },
                { name: `autoroles`, value: `${await db.get(`autoroles.worker`,)}`, inline: true },
            )//max 25 rzeczy w fields

        const embed_lista2 = new Discord.MessageEmbed()
            .setColor(`BLUE`)
            .setTitle(`List of all commands page 2/2`)
            .addFields(
                { name: `user_info`, value: `${await db.get(`user_info.worker`,)}`, inline: true },
                { name: `lvl_command`, value: `${await db.get(`lvl_command.worker`,)}`, inline: true },
                { name: `economy_command`, value: `${await db.get(`economy_command.worker`,)}`, inline: true },
                { name: `anime_zapowiedzi`, value: `${await db.get(`anime_zapowiedzi.worker`,)}`, inline: true },
                { name: `anime_seen`, value: `${await db.get(`anime_seen.worker`,)}`, inline: true },
                { name: `unban`, value: `${await db.get(`unban.worker`,)}`, inline: true },
                { name: `ticket`, value: `${await db.get(`ticket.worker`,)}`, inline: true },
                { name: `rpg`, value: `${await db.get(`rpg.worker`,)}`, inline: true },
                { name: `game`, value: `${await db.get(`game.worker`,)}`, inline: true },
                { name: `yt_notyfications`, value: `${await db.get(`yt_notyfications.worker`,)}`, inline: true },


            )

        if (work != true) { return message.channel.send(reason) }

        if (args[0] == "list") {
            message.channel.send({ embeds: [embed_lista] });
            return message.channel.send({ embeds: [embed_lista2] });
        }



        message.channel.send({ embeds: [embed_pl] });
    }
}

