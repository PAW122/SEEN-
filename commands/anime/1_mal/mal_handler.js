//npm i quick.db better-sqlite3
const { QuickDB } = require("quick.db");
module.exports =(userId) => {


   const db = new QuickDB({ filePath: process.cwd() +`/db/animelist/mal.sqlite` }); 
//tworzy nowy profil jeżeli urzytkownik go nie ma 
   (async () => {

        if(await db.get(userId) == null){



            await db.set(`${userId}`,
            {check: true,title: [], content: []})

            await new Promise(r => setTimeout(r, 2000));
        }else{
            //sprawdż jak dużo args znajduje się w title i dodaj ten jako następny

        }

    })();
}

