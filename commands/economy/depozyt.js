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
    //name: "deposit", (zakomentowane żeby bota nie wywalało)

    execute: async (message, args) => {

        // $deposit <rodzaj_depozytu> <ilość_monet>
        // $deposit 0 100 -- depozyt na 1 dzień o wartości 100 monet
        // albo
        // $deposit shot 100 -- krótki depozyt(1dzień) o wartości 100 monet

        // $deposite take (coś do dobierania depozytów)

        // dodać sprawdzanie czy ekonomia jest włączona na serweże
        

        //sprawdzanie czy istnieje profil serwera
        //sprawdzanie czy istnieje profil urzytkownika
        //sprawdaznie czy urzytkownik ma wystarczająco monet (tile ile podał)
        //sprawdzanie czy podana liczba monet jest większa niż 100
        //sprawdzanie czy nie ma już założonego innego depozytu
        
        //zaposz w db:
        //date
        //ilość monet
        //typ depozytu
        

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