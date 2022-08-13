//npm i express
const express = require("express")
const app = express();
const { QuickDB } = require("quick.db");

    app.get('/', (req, res) => {
        res.send("Hello world");
    });

    //tu wysyła dane z db
    //http://localhost:2137/api/paw
    app.get("/api/paw", (req, res) => {
        res.send([1, 2, 3]);
    });

    //economy
    app.get("/api/seen/economy/:guildId/:userid", (req, res) => {

        async function data() {
            const guildId = req.params.guildId
            const userId = req.params.userid

            const db = new QuickDB({ filePath: `../db/economy/local_economy/${guildId}.sqlite` });
            
            console.log(userId)
            console.log(guildId)
            console.log(await db.get(`${userId}.coins`))

            const coins = await db.get(`${userId}.coins`);
            const items = await db.get(`${userId}.eq`)


            res.send([req.params.userid, req.params.guildId, coins, items])
        }
        data()
    });
    /*
    Documentacion:
    get economy user profil:
    /api/seen/user_profil/:guildId/:userid
    --> ["userId","GuildId",[Coins],[Items]]
    */

    // PORT
    const port = process.env.PORT || 2137
    app.listen(port, () => console.log(`SEEN api Listening on port ${port}`))
