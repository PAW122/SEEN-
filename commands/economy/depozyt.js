//32.ekonomia -- depozyt który po jakmś czasie oddaje coinsy z np 20% dodatku
/*

3 rodzaje depozytów:

minimum 100 monet (żeby dało się 1 dniowy depozyt ogarnąć)
max 1 depozyt na raz
możliwość anulowania depozytu ale wtedy traci się 10% monet

0 - 1 dni = + 1%
1 - 7 dni = + 10%
2 - 14dni = + 25%
3 - 30dni = + 60%

*/

const { QuickDB } = require("quick.db");
const check_db = require("./economy_handler")
const config = require("../../config/config")
const emoji = config.economy_emoji
const birthday_coins = config.birthday_coins
module.exports = {
    //name: "deposit",

    execute: async (message, args) => {
        const userId = message.author.id


        var current = new Date();
            const rok = current.getFullYear();
            const month = current.getMonth() + 1;
            const day = current.getDate();


        const db = new QuickDB({ filePath: process.cwd() + `/db/economy/local_economy/${guildId}.sqlite` });
        // $deposit <rodzaj_depozytu> <ilość_monet>
        // $deposit 0 100 -- depozyt na 1 dzień o wartości 100 monet
        // albo
        // $deposit shot 100 -- krótki depozyt(1dzień) o wartości 100 monet

        // $deposite take (coś do dobierania depozytów)

        // dodać sprawdzanie czy ekonomia jest włączona na serweże

        if(args[0] == "help"){
            return message.reply(`usage: $deposit create <type od deposit> <how many coins postawisz>
            type od deposit:
            **1** time:1day, redwad +1%
            **2** time:7days, redwad +10%
            **3** time:14days, redwad +25%
            **4** time:30days, redwad + 60%
            
            how to pick up a deposit?
            use: $deposit choose`)
        }

        if(args[0] == "create"){

        const rodzaj_depozytu = args[1]
        const postawione_monety = args[2]

        //sprawdż czy depozyt jest poprawnie oznaczony
        if(isNaN(rodzaj_depozytu)){
            return message.reply("Wrong deposit type")
        }
        if(rodzaj_depozytu > 4 || rodzaj_depozytu < 1){
            return message.reply("Wrong deposit type")
        }
        
        if(!args[1] || !args[2]){
            return  message.reply("use $deposit help to get information how use this command")
        }

        //sprawdzanie czy istnieje profil serwera
        if(await db.get(`${userId}.check`) != true) {
            return message.channel.send("It is possible that the economy has been disabled by the server administration. If you believe an error has occurred, use $ report <message content> to report the bug")
        }

        const user_coins =  await db.get(`${userId}.coins[0]`)
       
        //sprawdaznie czy urzytkownik ma wystarczająco monet (tile ile podał)
        if(user_coins > postawione_monety){
            return message.reply("You dont have thats many coins")
        }
        
        //sprawdzanie czy podana liczba monet jest większa niż 100
        if(postawione_monety < 100){
            return message.reply("Minimum 100 coins !!")
        }
        //sprawdzanie czy nie ma już założonego innego depozytu
        if(await db.get(`${userId}.depozyt_check`) == true) {
            return message.reply("You have deposit. Wait to end and create next one")
        }
        
        //zaposz w db:
        //date
        await db.set(`${userId}.depozyt_created[0]`,rok)
        await db.set(`${userId}.depozyt_created[1]`,month)
        await db.set(`${userId}.depozyt_created[2]`,day)
        //ilość monet
        const set_user_coins = user_coins - postawione_monety
        await db.set(`${userId}.coins[0]`,set_user_coins)
        //typ depozytu
        await db.set(`${userId}.depozyt_type[0]`,rodzaj_depozytu)

        //zapisz ilość postawionych meoet
        await db.set(`${userId}.depozyt_type[0]`,rodzaj_depozytu)

        await db.set(`${userId}.depozyt_coins`,postawione_monety)

        message.reply("Deposit was sukcesfully created")
    }


    //odieranie depozytu
    if(args[0] == "choose"){
        
        //sprawdż czy osoba posiada jakikolwiek depozyt
        if(await db.get(`${userId}.depozyt_check`) != true){
            return message.reply("You dont have any deposit")
        }

        //jeżeli ma depozyt sprawdż kiedy może go odebrać
        const get_rok = await db.get(`${userId}.depozyt_created[0]`)
        const get_month = await db.get(`${userId}.depozyt_created[1]`)
        const get_day = await db.get(`${userId}.depozyt_created[2]`)

        async function get_deposit() {
            const deposit_type = await db.get(`${userId}.depozyt_type[0]`)
            const deposit_coins = await db.get(`${userId}.depozyt_coins`)

            //depozyt type -- 1
            if(deposit_type == 1){
                /*
                z każdym użyciem daily będzie naliczało się 1 dzień w db depozytu
                jeżeli urzytkownik nie uzyje daily nie naliczy się nastepny dzień

                */
            }

        }

        //dla depozytu 1 dniowego
        if(await db.get(`${userId}.depozyt_type[0]`) == 1){

        if(get_rok < rok){
            //odbierz depozys
        }else if(get_month < month){
            //odbierz
        }else if(get_day <= day){
            //odbierz
        }else{
            return message.reply(`U need wait to ${get_rok}.${get_month}.${get_day} to get your deposit`)
        }
    }

        //odbieranie
        //jeżeli ktoś ma depozyt sprawdż czy może już go odebrać 
        //sprawdż mnozniki vipa zeby skalowały nagrode x1.5 (niech będzuie do ustawieniu w configu)
        //zapisuje w db: deposit_check: false
        //ustawia data na  0.0.0 albo usówa
        //dodaje monety
        //wysyła embeda

        //dodać żeby komenda daily wywołoywała za pomoca zmiennej sprawdzenie
        //czy depozyt jest do odebrania i wysyłało powiadomienie
        //ze mozna odebrać depozyt

        // x = 1
        //cos w stylu depozyt(x)

        //if(x = 1){
    //funkcja sprawdzająca możliwość odbierania depozytu
        //}
    }

    }

}