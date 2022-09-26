/*
systemwywyłania grafik:
$love
$kill
$scarry
$happy
$run
$angry
$sleep
$eat

$kiss
$slap

przytulanie
cry

wywyłanie grafik

bot zapisuje kogo osoba oznaczyła po urzyciu komendy np: $kill @paw
i potem można sprawdzić profil i np dane: 
user: paw \n love:0 kill:3 itd
*/

/*
ten plik będzie wywoływany przez wszystkie pozostałe z folderu i bedzie służył 
jako chancler do zapisywania danych
*/
const Discord = require("discord.js");
const { QuickDB } = require("quick.db");

module.exports = (action_type, message) => {
    async function main() {
        //action type -> co zostało wywołane: (angry/kill/run) itp
        const userId = message.author.id
        const guildId = message.guild.id
        const db = new QuickDB({ filePath: process.cwd() + `/db/reactions/${userId}.sqlite` });
        
        if (action_type == "angry") {
            if (await db.get(`check`) == true) {
                var reactions_count = await db.get("angry")
                if(!reactions_count) var reactions_count = 0;
                const add_react = reactions_count += 1
                await db.set("angry", add_react)
            } else {
                await db.set("check", true)
                await db.set("angry", 1) 
            }
        }

        if (action_type == "eat") {
            if (await db.get(`check`) == true) {
                var reactions_count = await db.get("eat")
                if(!reactions_count) var reactions_count = 0;
                const add_react = reactions_count += 1
                await db.set("eat", add_react)
            } else {
                await db.set("check", true)
                await db.set("eat", 1) 
            }
        }

        if (action_type == "happy") {
            if (await db.get(`check`) == true) {
                var reactions_count = await db.get("happy")
                if(!reactions_count) var reactions_count = 0;
                const add_react = reactions_count += 1
                await db.set("happy", add_react)
            } else {
                await db.set("check", true)
                await db.set("happy", 1) 
            }
        }

        if (action_type == "kill") {
            if (await db.get(`check`) == true) {
                var reactions_count = await db.get("kill")
                if(!reactions_count) var reactions_count = 0;
                const add_react = reactions_count += 1
                await db.set("kill", add_react)
            } else {
                await db.set("check", true)
                await db.set("kill", 1) 
            }
        }

        if (action_type == "love") {
            if (await db.get(`check`) == true) {
                var reactions_count = await db.get("love")
                if(!reactions_count) var reactions_count = 0;
                const add_react = reactions_count += 1
                await db.set("love", add_react)
            } else {
                await db.set("check", true)
                await db.set("love", 1) 
            }
        }

        if (action_type == "run") {
            if (await db.get(`check`) == true) {
                var reactions_count = await db.get("run")
                if(!reactions_count) var reactions_count = 0;
                const add_react = reactions_count += 1
                await db.set("run", add_react)
            } else {
                await db.set("check", true)
                await db.set("run", 1) 
            }
        }

        if (action_type == "scarry") {
            if (await db.get(`check`) == true) {
                var reactions_count = await db.get("scarry")
                if(!reactions_count) var reactions_count = 0;
                const add_react = reactions_count += 1
                await db.set("scarry", add_react)
            } else {
                await db.set("check", true)
                await db.set("scarry", 1) 
            }
        }

        if (action_type == "sleep") {
            if (await db.get(`check`) == true) {
                var reactions_count = await db.get("sleep")
                if(!reactions_count) var reactions_count = 0;
                const add_react = reactions_count += 1
                await db.set("sleep", add_react)
            } else {
                await db.set("check", true)
                await db.set("sleep", 1) 
            }
        }


    } try {
        main()
    } catch (err) {
        console.log(err)
    }
}