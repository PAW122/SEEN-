const config = require(process.cwd() + `/config/worker.js`)
const work = config.help
const worker = config.help_work
const reason = config.help_disable
const { QuickDB } = require("quick.db");
const Discord = require('discord.js');
const prefix = "$"
const embed_pl = new Discord.MessageEmbed()
    .setColor(`BLUE`)
    .setTitle(`Help`)
    .setDescription(`U can use '/helpen' for a description in English\nlista wszystkich komend:`)
    .addFields(//inline-w embedzie zamiast po dobą będą obok siebie
        { name: `settings`, value: `daje możliwość wyłączenia i włączenia dowolnej komendy dla serwera przez administratora
        \n użycie: $settings <on/off> <command_name>
        wyłączenie przykład: $settings off eight_ball
        włączenie przykład: $settings on eight_ball`, inline: true },
        { name: `$srv_set list`, value: `aby usyskać pełną liste komend i usyskać informacje która z komend jest wyłączona`, inline: true },
        
        
    )


module.exports = {
    name: `srv_set`,
    description: `help command`,
    usage: `$help`,
    work: worker,
    isSlash: true,


    execute: async (message, args) => {

        const guildId = message.guild.id
    const db = new QuickDB({ filePath: process.cwd() + `/db/srv_settings/commands/${guildId}.sqlite` });

    const embed_lista = new Discord.MessageEmbed()
    .setColor(`BLUE`)
    .setTitle(`List of all commands`)
    .setDescription("True: on  ||   Flase: off")
    .addFields(
        { name: `command name`, value: `status:`, inline: false },
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
        { name: `clock`, value: `${await db.get(`clock.worker`,)}`, inline: true },
        { name: `embed`, value: `${await db.get(`embed.worker`,)}`, inline: true },
        { name: `kick`, value: `${await db.get(`kick.worker`,)}`, inline: true },
        { name: `random`, value: `${await db.get(`random.worker`,)}`, inline: true },
        { name: `ping`, value: `${await db.get(`ping.worker`,)}`, inline: true },
        { name: `ruletka_extream`, value: `${await db.get(`ruletka_extream.worker`,)}`, inline: true },
        { name: `ruletka`, value: `${await db.get(`ruletka.worker`,)}`, inline: true },
        { name: `say`, value: `${await db.get(`say.worker`,)}`, inline: true },
        { name: `srv_info`, value: `${await db.get(`srv_info.worker`,)}`, inline: true },
        { name: `blitz_stats`, value: `${await db.get(`blitz_stats.worker`,)}`, inline: true },
        { name: `blitz_clan`, value: `${await db.get(`blitz_clan.worker`,)}`, inline: true },
        { name: `autoroles`, value: `${await db.get(`autoroles.worker`,)}`, inline: true },
        { name: `user_info`, value: `${await db.get(`user_info.worker`,)}`, inline: true },
        { name: `lvl_command`, value: `${await db.get(`lvl_command.worker`,)}`, inline: true },
        { name: `economy_command`, value: `${await db.get(`economy_command.worker`,)}`, inline: true },
        { name: `more commands in future`, value: `${await db.get(`anime_gif.worker`,)}`, inline: true },

        
        
    )

        if (work != true) { return message.channel.send(reason) }

        if(args[0] == "list"){
            return message.channel.send({ embeds: [embed_lista] });
        }
        
            

            message.channel.send({ embeds: [embed_pl] });
        }
    }

