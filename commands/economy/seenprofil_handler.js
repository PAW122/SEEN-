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



        //losed roll -- serwerowe
        if (await localdb.get(`check`) != true) {
            await localdb.set(`check`, true)
            await localdb.set(`coins`, lostCoins)
        } else {
            //(coinsy serwerowe)
            const coins = await localdb.get(`coins`)
            const coins_to_add = coins + lostCoins
            await localdb.set(`coins`, coins_to_add)
        }


        //losed roll -- urzytkownika
        const user_coins = await userdb.get(`${userId}.roll_lost`)
        if (!user_coins) {
            await userdb.set(`${userId}.roll_lost`, lostCoins)
        } else {
            const set_user_coins = user_coins + lostCoins
            await userdb.set(`${userId}.roll_lost`, set_user_coins)
        }


        //losed roll -- globalne
        if (await userdb.get(`${userId}.added_coins`) != true) {
            //global
            if (await globaldb.get(`check`) != true) {
                console.log("true")
                //stwrz db
                await globaldb.set(`check`, true)
                await globaldb.set(`roll_lost`, lostCoins)
            } else {
                const coins = await globaldb.get(`roll_lost`)
                if (!coins) {
                    await globaldb.set(`roll_lost`, lostCoins)
                } else {
                    const coins_to_add = coins + lostCoins
                    await globaldb.set(`roll_lost`, coins_to_add)
                }
            }
        }
    }
    work(message, lost_coins)
}