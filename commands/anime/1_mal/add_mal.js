//npm i quick.db better-sqlite3

/*
const { QuickDB } = require("quick.db");
const create_profil = require("./mal_handler")
module.exports = {
    name: "mal",
    isSlash: true,

    data: new SlashCommandBuilder()
        .setName('mal')
        .setDescription('animelist'),

    executeInteraction: async (inter) => {

        return inter.reply("command is not end")
        const userId = inter.user.id
        const db = new QuickDB({ filePath: process.cwd() + `/db/animelist/mal.sqlite` });


        if (args[0] == "help") {
            return message.reply(`$mal add -- add new anime to list`)
        }

        if (await db.get(`${userId}.check`) != true) {
            create_profil(userId)
        }

        //$mal add


    },


}

*/


