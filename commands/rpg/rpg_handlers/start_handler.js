//start tworzy profil gracza
const { QuickDB } = require("quick.db");
module.exports = (inter) => {
    async function main() {
        var current = new Date();
        const now_rok = current.getFullYear();
        const now_month = current.getMonth() + 1;
        const now_day = current.getDate();
        const now_hour = current.getHours();

        const userId = inter.user.id
        const guildId = inter.guild.id
        const db = new QuickDB({ filePath: process.cwd() + `/db/rpg/${guildId}.sqlite` });

        try {
            if (await db.get(`${userId}.check`) == true) {
                //true profil urzytkownika już istnieje
                return inter.reply("posiadasz jużkonto")
            }
        } catch (err) {
            console.log(err)
        }

        await db.set(`${userId}`, {
            check: true,
            profil_created: [now_rok, now_month, now_day],
            userId: userId,
            xp: 0,
            lvl: 0,
            coins: 0,
            daimonds: 0,
            armor: [1, 1, 1, 1],
            wepon: [],
            potions: [],
            healt: 100,
            healt_regeneration_time: [],
            get_daily: [now_hour, now_day]
        })

        //false -- profil urzytkownika został stworzony
       inter.reply("stworzono trwoje konto")

    }
    main()

}





