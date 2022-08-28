const { QuickDB } = require("quick.db");
const Discord = require("discord.js")
const fs = require("fs")

const config = require("../../../config/config")
const xp_per_lvl = config.xp_per_lvl

const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    name: "lvl",
    name_en: "level",
    isSlash: true,

    data: new SlashCommandBuilder()
        .setName('lvl')
        .setDescription('sending your level staristic'),

    executeInteraction: async (inter) => {


        const authorId = inter.user.id
        //load server settings
        const guildId = inter.guild.id
        const db2 = new QuickDB({ filePath: process.cwd() + `/db/srv_settings/commands/${guildId}.sqlite` });
        if (await db2.get(`check.check`) == true) {
            const settings = await db2.get(`lvl_command.worker`)
            const settings_reason = await db2.get(`lvl_command.reason`)
            if (settings != true) { return inter.reply(settings_reason) }
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
        const nxtLvl = curlvl * xp_per_lvl;
        const msg = data.msg + 1

        const embed = new Discord.MessageEmbed()

            .setColor(`BLUE`)
            .setTitle(`Profil data`)
            .setDescription(`<@${authorId}> your lvl is **${curlvl + 1}**
                to get next lvl u have ${curxp}/${(curlvl + 1) * xp_per_lvl} xp.
                you sent in total ${msg} messages`)

        inter.reply({ embeds: [embed] })

    },

    execute: async (message, args, client) => {
        const guildId = message.guild.id
        const authorId = message.author.id

        //worker
        const db2 = new QuickDB({ filePath: process.cwd() + `/db/srv_settings/commands/${guildId}.sqlite` });
        if (await db2.get(`check.check`) == true) {
            const settings = await db2.get(`lvl_command.worker`)
            const settings_reason = await db2.get(`lvl_command.reason`)
            if (settings != true) { return message.channel.send(settings_reason) }
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
        const nxtLvl = curlvl * xp_per_lvl;
        const msg = data.msg + 1


        const embed = new Discord.MessageEmbed()

            .setColor(`BLUE`)
            .setTitle(`Profil data`)
            .setDescription(`<@${authorId}> your lvl is **${curlvl + 1}**
                to get next lvl u have ${curxp}/${(curlvl + 1) * xp_per_lvl} xp.
                you sent in total ${msg} messages`)
        message.channel.send({ embeds: [embed] })//.then(msg => {msg.delete(5000)})

    }
}