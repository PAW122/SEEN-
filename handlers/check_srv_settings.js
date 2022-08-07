const { QuickDB } = require("quick.db");

module.exports = (command_name, get_guildId) => {
async function settings() {
        //load server settings
        const guildId = get_guildId
        const db = new QuickDB({ filePath: process.cwd() + `/db/srv_settings/commands/${guildId}.sqlite` });
        if (await db.get(`check.check`) == true) {
            const settings = await db.get(`${command_name}.worker`)
            const settings_reason = await db.get(`${command_name}.reason`)
            if (settings != true) { return message.channel.send(settings_reason) }
        }
}
settings()
}

//dla komend -- srv_settings(command_name, 1, guildId)
/*

//srv_settings import
const srv_settings = require("../../../handlers/check_srv_settings")

        const command_name = "eight_ball"
        srv_settings(command_name,guildId)

*/

