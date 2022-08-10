//npm i quick.db better-sqlite3
const { QuickDB } = require("quick.db");
module.exports =(userId) => {


   const db = new QuickDB({ filePath: process.cwd() +`/db/animelist/mal.sqlite` }); 
//tworzy nowy profil jeżeli urzytkownik go nie ma 
   (async () => {

        if(await db.get(userId) == null){



            await db.set(`${userId}`,
            {check: true,title: [], content: []})

            //dodaje element bez usówania
            await db.push(`${userId}.title`, tytuł)
            await db.push(`${userId}.content`, content)
            //to będzie jako ten sam id (title[0])



            await new Promise(r => setTimeout(r, 2000));
        }

    })();
}

