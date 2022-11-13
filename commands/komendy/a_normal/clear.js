const config = require(process.cwd() + `/config/worker.js`)
const work = config.clear
const worker = config.clear_work
const reason = config.clear_disable

const Discord = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions: { FLAGS } } = require('discord.js');
const { QuickDB } = require("quick.db");

//do cooldowna \/
const talkedRecently = new Set();
const cooldown = 60000

//$clear
//$clear help
//$clear help en
//$wyczyść
//$wyczyść help
//$wyczyść help en
module.exports = {
    name: "wyczyść",
    name_en: "clear",
    description: "usuwa wiadomości",
    usage: "$clear <ilość wiadomości>",
    work: worker,
    isSlash: true,

    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('del amount of messages')
        .addNumberOption((option) =>
            option
                .setName("messages")
                .setDescription("how many messages u wana delete?")
                .setRequired(true)
        ),
    executeInteraction: async (inter) => {
        if (work != true) {
            const embed_worker = new Discord.MessageEmbed()
                .setTitle('**clear**')
                .setColor('RANDOM')
                .setDescription(`${reason}`)
            inter.reply({ embeds: [embed_worker] });
            return (console.log("command id disabled"))
        } else {
            //load server settings
            const guildId = inter.guild.id
            const db = new QuickDB({ filePath: process.cwd() + `/db/srv_settings/commands/${guildId}.sqlite` });
            if (await db.get(`check.check`) == true) {
                const settings = await db.get(`clear.worker`)
                const settings_reason = await db.get(`clear.reason`)
                if (settings == false) { return message.channel.send(settings_reason) }
            }

            //do cooldowna
            if (talkedRecently.has(inter.user.id)) {
               return inter.reply("Wait 1 minute before getting typing this again. - <@" + inter.user.id + ">");
            } else {

                // the user can type the command ... your command code goes here :)
                // Adds the user to the set so that they can't talk for a minute
                talkedRecently.add(inter.user.id);
                setTimeout(() => {
                    // Removes the user from the set after a minute
                    talkedRecently.delete(inter.user.id);
                }, cooldown);
            }

            const to_delete = inter.options.getNumber('messages')

            if (!inter.member.permissions.has(FLAGS.MANAGE_MESSAGES)) {
                return (inter.reply({ content: 'Nie masz wystarczających permisji aby użyć tej komendy!', ephemeral: true }));
            }

            if (!inter.member.permissions.has(FLAGS.MANAGE_MESSAGES)) {
                return (inter.reply({ content: 'Nie posiadam uprawnień do usuwania wiadomości!', ephemeral: true }));
            }
            try {
                inter.channel.bulkDelete(to_delete, true)
            } catch (err) {
                return (inter.reply({ content: 'Nie mogę usunąć wiadomości', ephemeral: true }));
            }

            const embed2 = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setTitle('clear')
                .setDescription(`usunąłeś ${to_delete} wiadomości`)
                .setTimestamp()
            inter.reply({ embeds: [embed2] })



        }
    },

    execute: async (message, args, client) => {
        //load server settings
        const guildId = message.guild.id
        const db = new QuickDB({ filePath: process.cwd() + `/db/srv_settings/commands/${guildId}.sqlite` });
        if (await db.get(`check.check`) == true) {
            const settings = await db.get(`clear.worker`)
            const settings_reason = await db.get(`clear.reason`)
            if (settings != true) { return message.channel.send(settings_reason) }
        }


        if (work != true) { return message.channel.send(reason) }


        if (args[0] == "help") {
            if (args[1] == "en") {
                const embed_en = new Discord.MessageEmbed()

                    .setColor(`RED`)//EN
                    .setTitle(`Clear`)
                    .setDescription(`bot removes the given number of messages \n
            Status: "$clear <number_messages_to_remove>"
            example: "$clear 15`)

                    .setFooter(message.author.tag, message.author.avatarURL({ dynamic: true }));


                message.channel.send({ embeds: [embed_en] });
            } else {
                const embed_pl = new Discord.MessageEmbed()

                    .setColor(`BLUE`)//PL
                    .setTitle(`Wyczyść`)
                    .setDescription(`bot usuwa podaną ilość wiadomości\n
            użycie: "$wyczyść <liczba_wiadomości_do_usunięcia>"
            przykład: "$wyczyść 15"`)

                    .setFooter(message.author.tag, message.author.avatarURL({ dynamic: true }));


                message.channel.send({ embeds: [embed_pl] });
            }
        } else {

            //do cooldowna
            if (talkedRecently.has(message.author.id)) {
                return message.channel.send("Wait 1 minute before getting typing this again. - <@" + message.author + ">");
            } else {

                // the user can type the command ... your command code goes here :)
                // Adds the user to the set so that they can't talk for a minute
                talkedRecently.add(message.author.id);
                setTimeout(() => {
                    // Removes the user from the set after a minute
                    talkedRecently.delete(message.author.id);
                }, cooldown);
            }

            if (message.deletable) {
                message.delete();
            }

            //permisje
            if (!message.member.permissions.has("MANAGE_MESSAGES")) {
                return message.channel.send("nie masz uprawnień do usuwania wiadomości")
            }

            //sprawdż argumenty
            if (isNaN(args[0]) || parseInt(args[0]) <= 0) {
                return message.channel.send("podałeś błędną liczbę wiadomości")
            }

            //bot sprawdza czy ma permisje do usówania na dc
            if (!message.guild.me.permissions.has("MANAGE_MESSAHES")) {
                return message.channel.send("Nie posiadam uprawnień do usuwania wiadomości")
            }

            let deleteAmount;

            if (parseInt(args[0]) > 100) {
                deleteAmount = 100;
            } else {
                deleteAmount = parseInt(args[0]);
            }

            message.channel.bulkDelete(deleteAmount, true)
                .then(message.channel.send(`Usunąłem ${deleteAmount} wiadomości`))
                .catch(err => message.channel.send(`coś poszło nie tak: ${err}`))
        }
    }
}