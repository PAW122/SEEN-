//npm i quick.db better-sqlite3
const { QuickDB } = require("quick.db");
const config = require("../../config/eco_config")
const eco_db_version = config.economy_db_version
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
            const day = current.getDate() - 1;

            const użycia = 0
            await db.set(`${userId}`,
                {
                    coins: [1000],
                    check: true,
                    daily_coins: [rok, month, day],
                    roll_usage: [użycia],
                    roll_date: [rok, month, day],
                    eq: [],
                    get_weekly: [0],
                    weekly: [true],

                    birthday: [month, day, rok],
                    bitrhday_used: false,
                    birtgday_check: false,
                    birthday_changes: 2,
                    eco_version: eco_db_version,

                    daily_z_rzędu:[],

                    rool_lost: 0,
                    added_coins: false
                   
                })
            //eq[0] --zarezerwowane dla przedmiotu: vip
            //eq[1] --zarezerwowane dla przedmiotu: luckypotion


            //daje 2s żeby db się stworzyła
            await new Promise(r => setTimeout(r, 2000));
        }

    })();
}

