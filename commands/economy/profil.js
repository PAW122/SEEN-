const { QuickDB } = require("quick.db");
const check_db = require("./economy_handler")
const config = require("../../config/config")
const emoji = config.economy_emoji
const srv_settings = require("../../handlers/check_srv_settings")
module.exports = {
    name: "profil",

    execute: async (message, args) => {
        //load server settings
        const guildId = message.guild.id
        const command_name = "economy_command"
        srv_settings(command_name,guildId)
        
        
        const db = new QuickDB({ filePath: process.cwd() +`/db/economy/local_economy/${guildId}.sqlite` }); 
        const userId = message.author.id

        if(await db.get(userId) == null){
            check_db(message)
            await new Promise(r => setTimeout(r, 2000))
            return message.reply("Twój profil właśnie został stworzony")
        }
        const coins = await db.get(`${userId}.coins`);

       

        message.reply(`masz ${coins} ${emoji}
        przedmioty: ${await db.get(`${userId}.eq[0]`)}`)
    }

}