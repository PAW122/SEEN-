const config = require(process.cwd() + `/config/worker.js`)
const work = config.help
const worker = config.help_work
const reason = config.help_disable

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
        { name: `$srv_set list`, value: `aby usyskać pełną liste komend`, inline: true },
        
        
    )

    const embed_lista = new Discord.MessageEmbed()
    .setColor(`BLUE`)
    .setTitle(`List of all commands`)
    .addFields(//inline-w embedzie zamiast po dobą będą obok siebie
        { name: `anime_gif`, value: ``, inline: true },
        { name: `eight_ball`, value: ``, inline: true },
        { name: `anime_seem_help`, value: ``, inline: true },
        { name: `anime_help`, value: ``, inline: true },
        { name: `updaty`, value: ``, inline: true },
        { name: `ankieta`, value: ``, inline: true },
        { name: `awatar`, value: ``, inline: true },
        { name: `ban`, value: ``, inline: true },
        { name: `bot_info`, value: ``, inline: true },
        { name: `clear`, value: ``, inline: true },
        { name: `clock`, value: ``, inline: true },
        { name: `embed`, value: ``, inline: true },
        { name: `kick`, value: ``, inline: true },
        { name: `random`, value: ``, inline: true },
        { name: `ping`, value: ``, inline: true },
        { name: `ruletka_extream`, value: ``, inline: true },
        { name: `ruletka`, value: ``, inline: true },
        { name: `say`, value: ``, inline: true },
        { name: `srv_info`, value: ``, inline: true },
        { name: `blitz_stats`, value: ``, inline: true },
        { name: `blitz_clan`, value: ``, inline: true },
        { name: `autoroles`, value: ``, inline: true },
        { name: `user_info`, value: ``, inline: true },
        { name: `lvl_command`, value: ``, inline: true },
        { name: `economy_command`, value: ``, inline: true },
        { name: `more commands in future`, value: ``, inline: true },

        
        
    )

module.exports = {
    name: `srv_set`,
    description: `help command`,
    usage: `$help`,
    work: worker,
    isSlash: true,


    execute: async (message, args) => {

        if (work != true) { return message.channel.send(reason) }

        if(args[0] == "list"){
            return message.channel.send({ embeds: [embed_lista] });
        }
        
            

            message.channel.send({ embeds: [embed_pl] });
        }
    }

