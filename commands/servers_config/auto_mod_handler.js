const { QuickDB } = require("quick.db");
const Discord = require("discord.js")

module.exports = (client,message) => {

    const guildId = message.guild.id
    const db = new QuickDB({ filePath: process.cwd() + `/db/auto_mod/${guildId}.sqlite` });

    if(await db.get(`${guildId}.check`) != true) return;

    const channelId = await db.get(`${guildId}.channel`)
    const status = await db.get(`${guildId}.status`)

    if(status == false) return;
}