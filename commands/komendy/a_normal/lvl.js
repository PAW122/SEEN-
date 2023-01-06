const { QuickDB } = require("quick.db");
const Discord = require("discord.js")
const fs = require("fs")

const config = require("../../../config/config")
const xp_per_lvl = config.xp_per_lvl
const xp_per_lvl_scaling = config.xp_per_lvl_scaling

const { SlashCommandBuilder } = require('@discordjs/builders');

const help_embed = new Discord.MessageEmbed()

    .setColor(`RANDOM`)
    .setTitle(`lvl / level`)
    .setFields(
        {name: "$lvl", value: "sending your level statistic"},
    )

module.exports = {
    name: "lvl",
    name_en: "level",
    isSlash: true,
    help: help_embed,

    data: new SlashCommandBuilder()
        .setName('lvl')
        .setDescription('sending your level statistic'),

    executeInteraction: async (inter) => {
        const authorId = inter.user.id
        //load server settings
        const guildId = inter.guild.id
        const db2 = new QuickDB({ filePath: process.cwd() + `/db/srv_settings/commands/${guildId}.sqlite` });
        if (await db2.get(`check.check`) == true) {
            const settings = await db2.get(`lvl_command.worker`)
            const settings_reason = await db2.get(`lvl_command.reason`)
            if (settings == false) { return inter.reply(settings_reason) }
        }

        const db = new QuickDB({ filePath: process.cwd() + `/db/lvl/${guildId}.sqlite` });

        if (await db.get(`${authorId}.check`) != true) {
            await db.set(`${authorId}.check`, true)
            await db.set(`${authorId}.xp`, 0)
            await db.set(`${authorId}.level`, 1)
            await db.set(`${authorId}.msg`, 1)
            await db.set(`${authorId}.check`, true)

            return message.reply("Profil created")
        }

        const data = await db.get(authorId)
        //console.log(data)

        const curxp = data.xp
        const curlvl = data.level
        let nxtLvl = ((curlvl + 1) * xp_per_lvl_scaling) * xp_per_lvl;
        const msg = data.msg + 1


        const embed = new Discord.MessageEmbed()

            .setColor(`BLUE`)
            .setTitle(`Profil data`)
            .setDescription(`<@${authorId}> your lvl is **${curlvl + 1}**
                to get next lvl u have ${curxp}/${nxtLvl} xp.
                you sent in total ${msg} messages`)//${curxp}/${curlvl * xp_per_lvl} xp.

        inter.reply({ embeds: [embed] })

    },

    execute: async (message, args, client) => {
        const guildId = message.guild.id
        const authorId = message.author.id

        if(args[0] == "help") {
            const embed_pl = new Discord.MessageEmbed()
            .setColor(`BLUE`)//PL
            .setTitle("lvling system error explain")
            .addFields(
                { name: `show your lvl:`, value: `.`, inline: false },
                { name: `wchy my lvl dont working:`, value: `if you send messages and your lvl dont incrise use **$srv_set list** and check is __lvls notifications on?__ is true. If not use **$$settings lvls_channel <channelId>.\n wchy __lvls notifications on?__ changing automatic on false?: when you set wrong channel id bot automaticly turn off lvl notifications and stop counting next message as administration dont set good channel id`, inline: false },

            )
            .setFooter(message.author.tag, message.author.avatarURL({ dynamic: true }));
        return message.channel.send({ embeds: [embed_pl] });
        }

        //worker
        const db2 = new QuickDB({ filePath: process.cwd() + `/db/srv_settings/commands/${guildId}.sqlite` });
        if (await db2.get(`check.check`) == true) {
            const settings = await db2.get(`lvl_command.worker`)
            const settings_reason = await db2.get(`lvl_command.reason`)
            if (settings == false) { return message.channel.send(settings_reason) }
        }

        const db = new QuickDB({ filePath: process.cwd() + `/db/lvl/${guildId}.sqlite` });

        if (await db.get(`${authorId}.check`) != true) {
            await db.set(`${authorId}.check`, true)
            await db.set(`${authorId}.xp`, 0)
            await db.set(`${authorId}.level`, 1)
            await db.set(`${authorId}.msg`, 1)
            await db.set(`${authorId}.check`, true)

            return message.reply("Profil created")
        }

        const data = await db.get(authorId)
        //console.log(data)

        const curxp = data.xp
        const curlvl = data.level
        let nxtLvl = ((curlvl + 1) * xp_per_lvl_scaling) * xp_per_lvl;
        const msg = data.msg + 1



        const embed = new Discord.MessageEmbed()

        .setColor(`BLUE`)
        .setTitle(`Profil data`)
        .setDescription(`<@${authorId}> your lvl is **${curlvl + 1}**
            to get next lvl u have ${curxp.toFixed(0)}/${nxtLvl.toFixed(0)} xp.
            you sent in total ${msg} messages`)
        message.channel.send({ embeds: [embed] })//.then(msg => {msg.delete(5000)})

    }
}