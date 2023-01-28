module.exports = (client) => {
    client.on("messageCreate", async message => {

    })
}

/*
user może wysłać maxymalnie 10 wiadomości na minutę,
jeżeli 5 wiadomości z rzędu będą miały taką samą treść: usuń wiadomości
i daj urzytkownikowi muta na 5min,

jezeli user wyśle 5 wiadomości z rzędu zawierająca same emoji (ponad 5 emotek w wiadomości) : spam wykryty
*/