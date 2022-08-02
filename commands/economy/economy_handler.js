//npm i quick.db better-sqlite3
const { QuickDB } = require("quick.db");

module.exports =(client,message) => {
   const db = new QuickDB({ filePath: process.cwd() +"/db/economy/economy.sqlite" }); 
//tworzy nowy profil jeżeli urzytkownik go nie ma i dodaje 1000 coinsów
   (async () => {

    var current = new Date();
    const rok = current.getFullYear();
    const month = current.getMonth();
    const day = current.getDay();

        const userId = message.author.id
        if(await db.get(userId) == null){
            await db.set(userId, { coins: 1000 }, {daily_year: rok }, {daily_month: month}, {daily_day: day}, {daily_usage: 0});
        }

    })();
}