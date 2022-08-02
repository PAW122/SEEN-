const { QuickDB } = require("quick.db");
const db = new QuickDB({ filePath: process.cwd() +"/db/economy/economy.sqlite" }); 
module.exports = {
    name: "profil",

    execute: async (message, args) => {
        const userId = message.author.id
        const coins = await db.get(`${userId}.coins`);

        message.reply(`masz ${coins} monet`)
    }

}