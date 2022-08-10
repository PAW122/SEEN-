//nazwa $ecodeafult
const { QuickDB } = require("quick.db");

module.exports = {
    name: "$ecodeafult",
    execute: async (message, args) => {
        const guildId = message.guild.id
        const db = new QuickDB({ filePath: process.cwd() + `/db/economy/local_economy/${guildId}.sqlite` });

        if (!message.member.permissions.has("ADMINISTRATOR")) {
            return message.channel.send("nie masz uprawnień Administratora")
          }

          await db.deleteAll()
          return message.reply("Ekonomia została zaktualizowana")
    }
}

