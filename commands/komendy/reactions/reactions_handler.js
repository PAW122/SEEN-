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
        const guildId = inter.guild.id
        const db = new QuickDB({ filePath: process.cwd() + `/db/reactions/${userId}.sqlite` });
        
        if (action_type == "angry") {
            if (await db.get(`check`) == true) {
                //user posiada już profil reactions
                const reactions_count = await db.get("angry")
                const add_react = reactions_count += 1
                await db.set("angry", add_react)
            } else {
                //user nie posiada profilu reactions
                await db.set("check", true)
                await db.set("angry", 1)
            }
        }


    } try {
        main()
    } catch (err) {
        console.log(err)
    }
}