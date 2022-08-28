/*
tworzy serwerowy i globalny prefil bota
do którego są dodawane szystkie pieniądze przegrane przez graczy

imput:
(message,lost_coins)

(message,lost_coins)

dodaje chajs do obu profilów i global i local
ale jak input == global == true wyślij info o profilu globalnym

server economy deafult musi resetować local
i dotego odejmować od global ilość coinsów które były na danym serweże,
(jeżeli admin doda komuś chajs to roole tej sooby nie liczą się)
(trzeba to dodać do db)
*/
const { QuickDB } = require("quick.db");

module.exports = (message, lost_coins) => {
    async function work() {

        const guildId = message.guild.id
        const userId = message.author.id

        const localdb = new QuickDB({ filePath: process.cwd() + `/db/economy/local_economy/${guildId}local.sqlite` });
        const globaldb = new QuickDB({ filePath: process.cwd() + `/db/economy/local_economy/${guildId}global.sqlite` });
        const userdb = new QuickDB({ filePath: process.cwd() + `/db/economy/local_economy/${guildId}.sqlite` });

        //ilość monet przegranych przez urzytkownika
        //trzeba wywyływać w rool lost
        if (!lost_coins) {
            var lostCoins = 0
        } else {
            var lostCoins = parseInt(lost_coins)
        }

        //jeżeli db nie istnieje stwórz 

        //jeżeli urzytkownik nie miał dodawanych moe
        if (await userdb.get(`${userId}.added_coins`) != true) {

            //localdb = ilość przegranych monet na serweże
            if (await localdb.get(`check`) != true) {
                //stwórz db
                await localdb.set(`check`, true)
                await localdb.set(`coins`, lostCoins)
            } else {
                const coins = await localdb.get(`coins`)
                const coins_to_add = parseInt(coins) + lostCoins
                await localdb.set(`coins`, coins_to_add)
            }


            //user db
            //żeby urzyć rool urzytkownik musi posiadać konto więc można odrazu przypisać
            await userdb.set(`${userId}.roll_lost`, lostCoins)
        } else {
            return
        }


        console.log(await userdb.get(`${userId}.added_coins`))
        if (await userdb.get(`${userId}.added_coins`) == true) return
        console.log("work")
        //global
        if (await globaldb.get(`check`) == true) {
            console.log("true")
            //stwrz db
            await globaldb.set(`check`, true)
            await globaldb.set(`roll_lost`, lostCoins)
        } else {
            console.log("false")
            const coins = await globaldb.get(`roll_lost`)
            if(coins == null) {
                const coins = 0
            }
            const coins_to_add = parseInt(coins) + lostCoins
            console.log(coins_to_add)
            await globaldb.set(`roll_lost`, coins_to_add)
        }
    }
    work(message, lost_coins)
}