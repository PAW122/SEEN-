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
            value: `creates a server settings profile`, inline: false
        },


        {
            name: `settings`, value: `allows the administrator to disable and enable any command for the server
        \n użycie: $settings <on/off> <command_name>
        example off: $settings off eight_ball
        example on: $settings on eight_ball`, inline: false
        },
        {
            name: `$srv_set list`,
            value: `to get a complete list of commands and find out which commands are disabled`, inline: false
        },
        {
            name: `$settings prefix`,
            value: `allows you to change the prefix for the server

         usage: $settings prefix <your prefix>
         example: $settings prefix $`, inline: false
        },

        {
            name: `$settings welcome_messages`,
            value: `gives the possibility to set a "welcome message" on the server
         usage: $settings welcome_messages <channelId>
         example: $settings welcome_messages 764240709779193876`, inline: false
        },

        {
            name: `$settings ticket`,
            value: `gives the possibility to set up channels for tickets
         usage: $settings ticket <channel id for users> <channel id for administrators>
         example: $settings ticket 764240709779193876 745768777022701648`, inline: false
        },
        {
            name: `$settings lvls_channel`,
            value: `gives the possibility to set up channels for levels notifications
         usage: $settings lvls_channel <channel_ID>
         example:  $settings lvls_channel 745768777022701648`, inline: false
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
                { name: `lvls notifications`, value: `${ await db.get(`lvls_channel.channelId`)}`, inline: false },
              

                { name: `command name`, value: `on/off`, inline: false },
                { name: `anime_gif`, value: `${await db.get(`anime_gif.worker`,)}`, inline: false },
                { name: `eight_ball`, value: `${await db.get(`eight_ball.worker`,)}`, inline: false },
                { name: `anime_seem_help`, value: `${await db.get(`anime_seem_help.worker`,)}`, inline: false },
                { name: `anime_help`, value: `${await db.get(`anime_help.worker`,)}`, inline: false },
                { name: `updaty`, value: `${await db.get(`updaty.worker`,)}`, inline: false },
                { name: `ankieta`, value: `${await db.get(`ankieta.worker`,)}`, inline: false },
                { name: `awatar`, value: `${await db.get(`awatar.worker`,)}`, inline: false },
                { name: `ban`, value: `${await db.get(`ban.worker`,)}`, inline: false },
                { name: `bot_info`, value: `${await db.get(`bot_info.worker`,)}`, inline: false },
                { name: `clear`, value: `${await db.get(`clear.worker`,)}`, inline: false },
                { name: `embed`, value: `${await db.get(`embed.worker`,)}`, inline: false },
                { name: `kick`, value: `${await db.get(`kick.worker`,)}`, inline: false },
                { name: `random`, value: `${await db.get(`random.worker`,)}`, inline: false },
                { name: `ping`, value: `${await db.get(`ping.worker`,)}`, inline: false },
                { name: `ruletka`, value: `${await db.get(`ruletka.worker`,)}`, inline: false },
                { name: `say`, value: `${await db.get(`say.worker`,)}`, inline: false },
                { name: `srv_info`, value: `${await db.get(`srv_info.worker`,)}`, inline: false },
                { name: `blitz_stats`, value: `${await db.get(`blitz_stats.worker`,)}`, inline: false },
            )//max 25 rzeczy w fields

        const embed_lista2 = new Discord.MessageEmbed()
            .setColor(`BLUE`)
            .setTitle(`List of all commands page 2/2`)
            .addFields(
                { name: `autoroles`, value: `${await db.get(`autoroles.worker`,)}`, inline: false },
                { name: `user_info`, value: `${await db.get(`user_info.worker`,)}`, inline: false },
                { name: `lvl_command`, value: `${await db.get(`lvl_command.worker`,)}`, inline: false },
                { name: `economy_command`, value: `${await db.get(`economy_command.worker`,)}`, inline: false },
                { name: `anime_zapowiedzi`, value: `${await db.get(`anime_zapowiedzi.worker`,)}`, inline: false },
                { name: `anime_seen`, value: `${await db.get(`anime_seen.worker`,)}`, inline: false },
                { name: `unban`, value: `${await db.get(`unban.worker`,)}`, inline: false },
                { name: `ticket`, value: `${await db.get(`ticket.worker`,)}`, inline: false },
                { name: `rpg`, value: `${await db.get(`rpg.worker`,)}`, inline: false },
                { name: `game`, value: `${await db.get(`game.worker`,)}`, inline: false },
                { name: `yt_notyfications`, value: `${await db.get(`yt_notyfications.worker`,)}`, inline: false },
                { name: `mute`, value: `${await db.get(`mute.worker`,)}`, inline: false },
                { name: `blitz_clan`, value: `${await db.get(`blitz_clan.worker`,)}`, inline: false },
                { name: `anime_list`, value: `${await db.get(`anime_list.worker`,)}`, inline: false },


            )

        if (work != true) { return message.channel.send(reason) }

        if (args[0] == "list") {
            message.channel.send({ embeds: [embed_lista] });
            return message.channel.send({ embeds: [embed_lista2] });
        }



        message.channel.send({ embeds: [embed_pl] });
    }
}

