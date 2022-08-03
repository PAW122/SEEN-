const { QuickDB } = require("quick.db");
const check_db = require("./economy_handler")
const config = require("../../config/config")
const emoji = config.economy_emoji
module.exports = {
    name: "profil",

    execute: async (message, args) => {
        
        const guildId = message.guild.id
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