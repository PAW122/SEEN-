//npm i quick.db better-sqlite3
const { QuickDB } = require("quick.db");
module.exports = (message) => {
    const guildId = message.guild.id
    const db = new QuickDB({ filePath: process.cwd() + `/db/economy/local_economy/${guildId}.sqlite` });
    //tworzy nowy profil jeżeli urzytkownik go nie ma i dodaje 1000 coinsów
    (async () => {
        const userId = message.author.id
        if (await db.get(userId) == null) {

            var current = new Date();
            //-1 dla dnia żeby urzytkownik mógł odrazy użyć komendy
            const rok = current.getFullYear();
            const month = current.getMonth() + 1;
            const day = current.getDay() - 1

            const użycia = 0
            await db.set(`${userId}`,
                {
                    coins: [1000],
                    daily_coins: [rok, month, day],
                    roll_usage: [użycia],
                    roll_date: [rok, month, day],
                    eq: [],
                    get_weekly: [0],
                    weekly: [true],

                    birthday: [month, day, rok],
                    bitrhday_used: false,
                    birtgday_check: false,
                    birthday_changes: 2
                })
            //eq[0] --zarezerwowane dla przedmiotu: vip


            //daje 2s żeby db się stworzyła
            await new Promise(r => setTimeout(r, 2000));
        }

    })();
}

