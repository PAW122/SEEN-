const config = require("../../config/config")
const db_version = config.db_version

const { QuickDB } = require("quick.db");
module.exports = (message,x,guildID,userId) => {

    //dodane dla działania slashów
    if(x == 1){
        var guildId = guildID
        var userId = userId
    }else{
        var guildId = message.guild.id
        var userId = message.author.id
    }
    const db = new QuickDB({ filePath: process.cwd() + `/db/srv_settings/commands/${guildId}.sqlite` });
    (async () => {
        

//deafultowe ustawienia
        await db.set(`check`, { check: true })
        await db.set(`prefix`, { check: "$" })
        await db.set(`welcome`, { channelId: "null" })
        await db.set(`version`, { check: `${db_version}` })
        await db.set(`tickets`, { settings: ["null", "null"] })

        await db.set(`anime_gif`, { worker: true , reason: "this command is disabled on this server."})
        await db.set(`eight_ball`, { worker: true , reason: "this command is disabled on this server."})//
        await db.set(`anime_seem_help`, { worker: true , reason: "this command is disabled on this server."})//
        await db.set(`anime_help`, { worker: true , reason: "this command is disabled on this server."})//
        await db.set(`updaty`, { worker: true , reason: "this command is disabled on this server."})//
        await db.set(`anime_list`, { worker: true , reason: "this command is disabled on this server."})//
        await db.set(`ankieta`, { worker: true , reason: "this command is disabled on this server."})
        await db.set(`awatar`, { worker: true , reason: "this command is disabled on this server."})
        await db.set(`ban`, { worker: true , reason: "this command is disabled on this server."})
        await db.set(`bot_info`, { worker: true , reason: "this command is disabled on this server."})//
        await db.set(`clear`, { worker: true , reason: "this command is disabled on this server."})
        await db.set(`embed`, { worker: true , reason: "this command is disabled on this server."})
        await db.set(`kick`, { worker: true , reason: "this command is disabled on this server."})
        await db.set(`ping`, { worker: true , reason: "this command is disabled on this server."})
        await db.set(`random`, { worker: true , reason: "this command is disabled on this server."})
        await db.set(`ruletka`, { worker: true , reason: "this command is disabled on this server."})
        await db.set(`say`, { worker: true , reason: "this command is disabled on this server."})
        await db.set(`srv_info`, { worker: true , reason: "this command is disabled on this server."})
        await db.set(`blitz_stats`, { worker: true , reason: "this command is disabled on this server."})
        await db.set(`blitz_clan`, { worker: true , reason: "this command is disabled on this server."})
        await db.set(`autoroles`, { worker: true , reason: "this command is disabled on this server."})
        await db.set(`user_info`, { worker: true , reason: "this command is disabled on this server."})
        await db.set(`lvl_command`, { worker: true , reason: "this command is disabled on this server."})//narazie off
        await db.set(`economy_command`, { worker: true , reason: "this command is disabled on this server."})
        await db.set(`anime_zapowiedzi`, { worker: true , reason: "this command is disabled on this server."})
        await db.set(`anime_seen`, { worker: true , reason: "this command is disabled on this server."})
        await db.set(`unban`, { worker: true , reason: "this command is disabled on this server."})
        await db.set(`ticket`, { worker: true , reason: "this command is disabled on this server."})
        
        await new Promise(r => setTimeout(r, 2000));


    })();
}

