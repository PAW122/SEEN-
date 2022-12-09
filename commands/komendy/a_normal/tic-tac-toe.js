const Discord = require("discord.js");

const talkedRecently = new Set();

module.exports = {
    name: "tic-tac-toe",

    execute:async(message,args,client) => {
        main(message)
    }
}

async function main(message,args,client) {
        //deafultowa plansza gry
        var gameBoard = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
        const board = draw_board(gameBoard,PLAYER_1,PLAYER_2)

    if(args[0] == "start") {
        start(message,args,gameBoard)
    }
    if(args[0] == "leave") {
        leave(message,args)
    }
    if(args[0] == "take") {
        do_move_by_player(message,args)
    }
    const NO_MOVE = 0;
    var PLAYER_1 = 1;//user
    var PLAYER_2 = 2;//AI
    const cpu_mistake_chance = 5;

    var moves = 0;

    const embed = new Discord.MessageEmbed()
    .setTitle("Tic-Tac-Toe")
    .setDescription("board:\n"+ board)
    message.channel.send({embeds: [embed]})
}

function do_move_by_player(message,args) {
    if(check_is_player(message) == false){
        return message.reply("Nie jesteś obecnie w żadnej grze")
    }else{
     if(check_pole() == false) returnmessage.reply("Podałeś niepoprawna nazwe pola")
        //to do: sprawdzanie czy pole jest zajęte
        //z db
    }
    //$command take <pole>
    function check_pole(){
     let i = 0;
    while(i >= 9){
        if(args[1] == `pole${i}`){
           return console.log("user take" + i + pole)   
        }
       return false
        i++;
    }   
    }
}

function check_is_player(message) {
    if(talkedRecently.has(message.author.id)) {
        return true
    }else{
        return false
    }
}

function leave(message,args) {
    //sprawdż czy user jest na liście grających
    if(talkedRecently.has(message.author.id)) {
        talkedRecently.delete(message.author.id);
        return message.reply("Pomyślnie opuściłeś grę")
    }else{
        return message.reply("Musisz najpierw dołączyć do gry aby z niej wyjść")
    }
    
}

function start(message,args,gameBoard) {
    if (talkedRecently.has(message.author.id)) {
        return message.channel.send("Już dołączyłeś do gry. Użyj **$tic-tac-toe leave** aby mieć możliwość rozpoczęcia nowej gry");
    } else {
        talkedRecently.add(message.author.id);
    }
    //jeżeli user zacznie grę => w specjalnym jsonie didaj gracza
    //zapisz deafultową pustą plansze i zapisz czyj jest następny rych
    /* wygląd jsona
        "userid": {
            plansza: [],
            ruch: user/ai
        }
    */
}

function draw_board(gameBoard,PLAYER_1,PLAYER_2) {
    const layer1 = gameBoard[0]
    if(layer1[0] == 0){
        var pole1 = "⬜"
    }else if(layer1[0] == PLAYER_1) {
        var pole1 = "🟩"
    }else {var pole1 = "🟥"}

    if(layer1[1] == 0){
        var pole2 = "⬜"
    }else if(layer1[1] == PLAYER_1) {
        var pole2 = "🟩"
    }else {var pole2 = "🟥"}

    if(layer1[2] == 0){
        var pole3 = "⬜"
    }else if(layer1[2] == PLAYER_1) {
        var pole3 = "🟩"
    }else {var pole3 = "🟥"}

    //layer2
    const layer2 = gameBoard[1]
    if(layer2[0] == 0){
        var pole4 = "⬜"
    }else if(layer2[0] == PLAYER_1) {
        var pole4 = "🟩"
    }else {var pole4 = "🟥"}

    if(layer2[1] == 0){
        var pole5 = "⬜"
    }else if(layer2[1] == PLAYER_1) {
        var pole5 = "🟩"
    }else {var pole5 = "🟥"}

    if(layer2[2] == 0){
        var pole6 = "⬜"
    }else if(layer2[2] == PLAYER_1) {
        var pole6 = "🟩"
    }else {var pole6 = "🟥"}

    //layer3
    const layer3 = gameBoard[2]
    if(layer3[0] == 0){
        var pole7 = "⬜"
    }else if(layer3[0] == PLAYER_1) {
        var pole7 = "🟩"
    }else {var pole7 = "🟥"}

    if(layer3[1] == 0){
        var pole8 = "⬜"
    }else if(layer3[1] == PLAYER_1) {
        var pole8 = "🟩"
    }else {var pole8 = "🟥"}

    if(layer3[2] == 0){
        var pole9 = "⬜"
    }else if(layer3[2] == PLAYER_1) {
        var pole9 = "🟩"
    }else {var pole9 = "🟥"}

    return `${pole1} ${pole2} ${pole3}\n${pole4} ${pole5} ${pole6} \n${pole7} ${pole8} ${pole9}`
}
