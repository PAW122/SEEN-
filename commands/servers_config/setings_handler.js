const config = require("../../config/config")
const db_version = config.db_version

const { QuickDB } = require("quick.db");
module.exports = (message) => {
    const guildId = message.guild.id
    const db = new QuickDB({ filePath: process.cwd() + `/db/srv_settings/commands/${guildId}.sqlite` });
    (async () => {
        const userId = message.author.id

//deafultowe ustawienia
        await db.set(`check`, { check: true })
        await db.set(`prefix`, { check: "$" })
        await db.set(`welcome`, { channelId: "null" })
        await db.set(`version`, { check: `${db_version}` })
        await db.set(`anime_gif`, { worker: true , reason: "no reason"})
        await db.set(`eight_ball`, { worker: true , reason: "no reason"})//
        await db.set(`anime_seem_help`, { worker: true , reason: "no reason"})//
        await db.set(`anime_help`, { worker: true , reason: "no reason"})//
        await db.set(`updaty`, { worker: true , reason: "no reason"})//
        await db.set(`anime_list`, { worker: true , reason: "no reason"})//
        await db.set(`ankieta`, { worker: true , reason: "no reason"})
        await db.set(`awatar`, { worker: true , reason: "no reason"})
        await db.set(`ban`, { worker: true , reason: "no reason"})
        await db.set(`bot_info`, { worker: true , reason: "no reason"})//
        await db.set(`clear`, { worker: true , reason: "no reason"})
        await db.set(`embed`, { worker: true , reason: "no reason"})
        await db.set(`kick`, { worker: true , reason: "no reason"})
        await db.set(`ping`, { worker: true , reason: "no reason"})
        await db.set(`random`, { worker: true , reason: "no reason"})
        await db.set(`ruletka`, { worker: true , reason: "no reason"})
        await db.set(`say`, { worker: true , reason: "no reason"})
        await db.set(`srv_info`, { worker: true , reason: "no reason"})
        await db.set(`blitz_stats`, { worker: true , reason: "no reason"})
        await db.set(`blitz_clan`, { worker: true , reason: "no reason"})
        await db.set(`autoroles`, { worker: true , reason: "no reason"})
        await db.set(`user_info`, { worker: true , reason: "no reason"})
        await db.set(`lvl_command`, { worker: true , reason: "no reason"})//narazie off
        await db.set(`economy_command`, { worker: true , reason: "no reason"})

        await new Promise(r => setTimeout(r, 2000));


    })();
}

