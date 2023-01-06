const config = require(process.cwd() + `/config/worker.js`)
const work = config.ruletka
const worker = config.ruletka_work
const reason = config.ruletka_disable
const wait = require('node:timers/promises').setTimeout;
const Discord = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { QuickDB } = require("quick.db");
//$ruletka
//$ruletka help
//$ruletka help en
//$roulette
//$roulette help
//$roulette help en

const help_embed = new Discord.MessageEmbed()

    .setColor(`RANDOM`)
    .setTitle(`ruletka / roulette`)
    .setFields(
        {name: "$roulette", value: "play some roulette || from 1 to 5 players"},
        {name: "usage", value: "$roulette @user1 @user2"}
    )

module.exports = {
    name: "ruletka",
    name_en: "roulette",
    help: help_embed,
    work: worker,
    isSlash: true,

    data: new SlashCommandBuilder()
        .setName('ruletka')
        .setDescription('play some roulette || from 1 to 5 players')
        .addNumberOption((option) =>
            option
                .setName("liczba_graczy")
                .setDescription("set the number of players")
                .setRequired(true))

        .addUserOption((option) =>
            option
                .setName("user1")
                .setDescription("player no.1 (required)")
                .setRequired(true))

        .addUserOption((option) =>
            option
                .setName("user2")
                .setDescription("player no.2 (required)")
                .setRequired(true))

        .addUserOption((option) =>
            option
                .setName("user3")
                .setDescription("player no.3 (optional)")
                .setRequired(false))
        .addUserOption((option) =>
            option
                .setName("user4")
                .setDescription("player no.4 (optional)")
                .setRequired(false))
        .addUserOption((option) =>
            option
                .setName("user5")
                .setDescription("player no.5 (optional)")
                .setRequired(false)),

    executeInteraction: async (inter) => {
        try {
            if (work != true) {
                const embed_worker = new Discord.MessageEmbed()
                    .setTitle('**ruletka**')
                    .setColor('RANDOM')
                    .setDescription(`${reason}`)
                inter.reply({ embeds: [embed_worker] });
                return (console.log("command id disabled"))
            } else {
                //load server settings
                const guildId = inter.guild.id
                const db = new QuickDB({ filePath: process.cwd() + `/db/srv_settings/commands/${guildId}.sqlite` });
                if (await db.get(`check.check`) == true) {
                    const settings = await db.get(`ruletka.worker`)
                    const settings_reason = await db.get(`ruletka.reason`)
                    if (settings != true) { return message.channel.send(settings_reason) }
                }

                players_list = []
                const players = inter.options.getNumber('liczba_graczy')
                const player1 = inter.options.getUser('user1')
                const player2 = inter.options.getUser('user2')
                const player3 = inter.options.getUser('user3')
                const player4 = inter.options.getUser('user4')
                const player5 = inter.options.getUser('user5')

                players_list.push(player1.id)
                players_list.push(player2.id)
                if (players == 3) {
                    players_list.push(player3.id)
                }
                if (players == 4) {
                    players_list.push(player3.id)
                    players_list.push(player4.id)
                }
                if (players == 5) {
                    players_list.push(player3.id)
                    players_list.push(player4.id)
                    players_list.push(player5.id)
                }


                const lobby = new Discord.MessageEmbed()
                    .setTitle('**Ruletka**')
                    .setColor('RANDOM')
                    .setFields(
                        { name: `Roulette:`, value: `List of players`, inline: false },
                        { name: `player1:`, value: `${player1}`, inline: true },
                        { name: `player2:`, value: `${player2}`, inline: true },
                        { name: `player3:`, value: `${player3}`, inline: true },
                        { name: `player4:`, value: `${player4}`, inline: true },
                        { name: `player5:`, value: `${player5}`, inline: true }
                    )
                await inter.reply({ embeds: [lobby] });


                await wait(2000);
                const rng = Math.floor(Math.random() * players);
                const wyeliminowany_gracz = players_list[rng]
                await inter.followUp(`Was eliminated: <@${wyeliminowany_gracz}>`);



            }
        } catch (err) {
            console.log(err)
        }
    },

    execute: async (message, args) => {
        //load server settings
        const guildId = message.guild.id
        const db = new QuickDB({ filePath: process.cwd() + `/db/srv_settings/commands/${guildId}.sqlite` });
        if (await db.get(`check.check`) == true) {
            const settings = await db.get(`ruletka.worker`)
            const settings_reason = await db.get(`ruletka.reason`)
            if (settings != true) { return message.channel.send(settings_reason) }
        }

        if (work != true) { return message.channel.send(reason) }


        if (args[0] == "help") {
            if (args[1] == "en") {
                const embed_en = new Discord.MessageEmbed()

                    .setColor(`RED`)//EN
                    .setTitle(`roulette`)
                    .setDescription(`roulette is available to 1-5 players. After using the command, the bot informs which player is eliminated \n
                use: "$roulette @user1 @user2"`)

                    .setFooter(message.author.tag, message.author.avatarURL({ dynamic: true }));


                message.channel.send({ embeds: [embed_en] });
            } else {
                const embed_pl = new Discord.MessageEmbed()

                    .setColor(`BLUE`)//PL
                    .setTitle(`ruletka`)
                    .setDescription(`ruletka jest dostępna dla 1-5 graczy. Po użyciu komendy bot informuje który z graczy zostaje wyeliminowany\n
            użycie: "$ruletka @user1 @user2"`)

                    .setFooter(message.author.tag, message.author.avatarURL({ dynamic: true }));


                message.channel.send({ embeds: [embed_pl] });
            }
        } else {




            let i = 0
            let pl = null
            if (message.content.startsWith("ruletka")) { pl = 8 }
            if (message.content.startsWith("roulette")) { pl = 9 }
            const ilosc_osob = message.content.slice(pl)//usówa $ruletak albo $roulette

            //sprawdz ile jest graczy

            const liczba_graczy = args.length


            const rng = Math.floor(Math.random() * liczba_graczy);//max liczba to ilosc graczy


            const embed = new Discord.MessageEmbed()
                .setColor("RED")
                .setTitle("Roulette")
                .setDescription("List of players:")
                .addFields(//inline-w embedzie zamiast po dobą będą obok siebie
                    { name: `Player1`, value: `${args[0]}`, inline: true },
                    { name: "Player2", value: `${args[1]}`, inline: true },
                    { name: "Player3", value: `${args[2]}`, inline: true },
                    { name: "Player4", value: `${args[3]}`, inline: true },
                    { name: "Player5", value: `${args[4]}`, inline: true },
                )
                .setFooter(message.author.tag, message.author.avatarURL({ dynamic: true }));
            message.channel.send({ embeds: [embed] });


            //nie można wyeliminować bota
            const id_bota = "<@&809403148875464706>";
            if (args[0] == id_bota || args[1] == id_bota || args[2] == id_bota || args[3] == id_bota || args[4] == id_bota) {
                //jeżli tak == bot jest na liście
                if (args[rng] == id_bota) {
                    const embed3 = new Discord.MessageEmbed()
                        .setColor("BLUE")
                        .setTitle("Ruletka")
                        .setDescription("Nie można mnie wyeliminować")

                        .setFooter(message.author.tag, message.author.avatarURL({ dynamic: true }));

                    const embed3_en = new Discord.MessageEmbed()
                        .setColor("BLUE")
                        .setTitle("Roulette")
                        .setDescription("You can't eliminate me")

                        .setFooter(message.author.tag, message.author.avatarURL({ dynamic: true }));

                    //wersja ang i pl
                    /*
                    if(pl == "8"){message.channel.send({embeds: [embed3]});}
                    if(pl == "9"){message.channel.send({embeds: [embed3_en]});}
                    */
                    message.channel.send({ embeds: [embed3] });
                    return
                } else {
                    const embed2 = new Discord.MessageEmbed()
                        .setColor("RED")
                        .setTitle("Roulette")
                        //.setDescription("Lista graczy:")
                        .addFields(//inline-w embedzie zamiast po dobą będą obok siebie
                            { name: `Was eliminated:`, value: `${args[rng]}`, inline: false },)
                        .setFooter(message.author.tag, message.author.avatarURL({ dynamic: true }));


                    if (liczba_graczy == 0) {
                        message.reply(`Missfire - nobody dies`)
                        args.splice(args[rng])//usówa nick z listy
                        i += 1
                        return 0
                    }
                    if (liczba_graczy >= 2) {
                        args.splice(args[rng])//usówa nick z listy
                        message.channel.send({ embeds: [embed2] });
                        i += 1
                        return 0
                    }
                }
            } else {
                if (i > 0) { return 0 } else {
                    const embed2 = new Discord.MessageEmbed()
                        .setColor("RED")
                        .setTitle("Roulette")
                        //.setDescription("Lista graczy:")
                        .addFields(//inline-w embedzie zamiast po dobą będą obok siebie
                            { name: `Was eliminated:`, value: `${args[rng]}`, inline: false },)
                        .setFooter(message.author.tag, message.author.avatarURL({ dynamic: true }));


                    if (liczba_graczy == 0) {
                        message.reply(`Missfire - nobody dies`)
                        args.splice(args[rng])//usówa nick z listy
                        return 0
                    }
                    if (liczba_graczy >= 2) {
                        args.splice(args[rng])//usówa nick z listy
                        message.channel.send({ embeds: [embed2] });
                        return 0
                    }
                }
            }
        }
    }
}