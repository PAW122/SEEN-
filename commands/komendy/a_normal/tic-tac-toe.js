const Discord = require("discord.js");
const { QuickDB } = require("quick.db");

//w handlerach nie działa

module.exports = {// tic-tac-toe
    name: "tic-tac-toe",

    execute: async (message, args, client) => {
        if (args[0] == "help") {
            return message.reply(`$tic-tac-toe start\n $tic-tac-toe leave\n $tic-tac-toe take <1-9>`)
        }
        main(message, args, client)
    }
}

async function main(message, args, client) {

    //deafultowa plansza gry
    var gameBoard = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];

    const db = new QuickDB({ filePath: process.cwd() + `/db/tic-tac-toe/${message.author.id}.sqlite` });
    if (args[0] == "start") {
        start(message, args, gameBoard)
    }
    if (args[0] == "leave") {
        leave(message, args)
    }
    if (args[0] == "take") {
        do_move_by_player(message, args,currentPlayer)
    }
    const NO_MOVE = 0;
    var PLAYER_1 = 1;//user
    var PLAYER_2 = 2;//AI
    const cpu_mistake_chance = 5;



    var moves = 0;
}

async function do_move_by_player(message, args,currentPlayer) { // po tym musi być kolejka dla bota
    //potem zapisuje się w db last_Move: bot
    //i z db znowó wczytuje się plansza
    if (check_is_player(message) == false) {
        return message.reply("Nie jesteś obecnie w żadnej grze")
    } else {
        currentPlayer = player1
        if (check_pole() == false) return message.reply("Podałeś niepoprawną nazwe pola")
        //to do: sprawdzanie czy pole jest zajęte
        const taken_place = parseInt(args[1])
        if (taken_place < 1 || taken_place > 9) return message.reply("Take number from 1 to 9")
        const db = new QuickDB({ filePath: process.cwd() + `/db/tic-tac-toe/${message.author.id}.sqlite` });
        if (await db.get(`check`) != true) return message.reply("Nie jesteś w trakcie gry")
        let board = await db.get(`board`)
        if (check_is_pole_was_taken(board, taken_place, message) == false) {
            return console.log("Koniec działania. user musi ponownie użyć komendy")
        }
        //pole nie jest zajęte
        //to do: przejmowanie pola przez gracza

        let baord_to_save = board.board
        //zapisywanie pola jako: pole zajęte przez gracza
        let taken_place_arr = taken_place - 1
        if (taken_place <= 3) {
            board.board[0][taken_place_arr] = 1
            baord_to_save[0][taken_place_arr]
        }

        let taken_place_arr2 = taken_place_arr - 3
        if (taken_place > 3 && taken_place < 7) {
            board.board[1][taken_place_arr2] = 1
            baord_to_save[1][taken_place_arr2]
        }

        let taken_place_arr3 = taken_place_arr2 - 3
        if (taken_place > 6) {
            board.board[2][taken_place_arr3] = 1
            baord_to_save[3][taken_place_arr3]
        }

        //player1 = 1
        const board_to_send = draw_board(board, 1)

        const embed = new Discord.MessageEmbed()
            .setTitle("tic-tac-toe")
            .setDescription("board:\n" + board_to_send)
        message.channel.send({ embeds: [embed] })

        await db.set(`board`, { board: baord_to_save })

        ai_move(baord_to_save, message,currentPlayer)
    }

    //$command take <pole>
    function check_pole() {
        const pole = args[1]
        if (isNaN(pole)) {
            message.reply("Nr pola musi być liczbą od 1 do 9")
            return false
        }
        const pole_nr = parseInt(pole)
        if (pole_nr < 1 || pole_nr > 9) {
            message.reply("Nr pola musi być liczbą od 1 do 9")
            return false
        }
        return true
    }
}

async function ai_move(baord_to_save, message) {
    const db = new QuickDB({ filePath: process.cwd() + `/db/tic-tac-toe/${message.author.id}.sqlite` });

    var ai_move = 0;
    if (ai_move == 0) {
        if (baord_to_save[1][1] == 0) {
            baord_to_save[1][1] = 2//2 == AI
            ai_move++
        }
    }
    if (ai_move == 0) {
        if (baord_to_save[0][2] == 0) {
            baord_to_save[0][2] = 2//2 == AI
            ai_move++
        }
    }
    if (ai_move == 0) {
        if (baord_to_save[2][0] == 0) {
            baord_to_save[2][0] = 2//2 == AI
            ai_move++
        }
    }//to do: zrobic zaawansowany system ai w handlerze
    
    await db.set(`board`, { board: baord_to_save })

    const board = await db.get(`board`)
    const send_board = draw_board(board, 1)

    const embed = new Discord.MessageEmbed()
        .setTitle("tic-tac-toe AI move")
        .setDescription("board:\n" + send_board)
    message.channel.send({ embeds: [embed] })

    return
}

function check_is_pole_was_taken(board, taken_place, message) {
    // [0,0,0][0,0,0][0,0,0] np:3
    // console.log(board.board)
    var taken_place_fix = taken_place + 1
    var taken_place_fix_array = taken_place_fix - 1

    if (taken_place_fix < 4) {
        //  console.log("layer1-" + taken_place_fix + " \n" + "taken_place_fix_array-" + taken_place_fix_array)
        if (board.board[0][taken_place_fix_array] == 0) {
            return true
        }

    } else if (taken_place_fix >= 4 && taken_place_fix < 7) {
        taken_place_fix_array - 3
        // console.log("layer2-" + taken_place_fix + " \n" + "taken_place_fix_array-" + taken_place_fix_array)
        // taken_place_fix - 3
        if (board.board[1][taken_place_fix_array] == 0) {
            return true
        }

    } else if (taken_place_fix > 6) {
        taken_place_fix_array - 3
        // console.log("layer3-" + taken_place_fix + " \n" + "taken_place_fix_array-" + taken_place_fix_array)
        //taken_place_fix - 6
        if (board.board[2][taken_place_fix_array] == 0) {
            return true
        }
    } else {
        message.reply("To pole jest zajęte")
        // console.log("out off layer" + taken_place_fix + " \n" + "taken_place_fix_array-" + taken_place_fix_array)
        return false
    }
}

async function check_is_player(message) {
    const db = new QuickDB({ filePath: process.cwd() + `/db/tic-tac-toe/${message.author.id}.sqlite` });
    const check = await db.get(`check`)
    if (check == true) {
        return true
    }

    if (talkedRecently.has(message.author.id)) {
        return true
    } else {
        return false
    }
}

async function leave(message, args) {
    //sprawdż czy user jest na liście grających
    const player = message.author
    const db = new QuickDB({ filePath: process.cwd() + `/db/tic-tac-toe/${player.id}.sqlite` });
    if (await db.get(`check`) == true) {
        await db.deleteAll()
        return message.reply("Pomyślnie opuściłeś grę")
    } else {
        return message.reply("Musisz najpierw dołączyć do gry aby z niej wyjść")
    }

}

function start(message, args, gameBoard) {
    const player = message.author
    const next_move = message.author
    safe_data(gameBoard, player, next_move)
    message.reply("Gra się rozpoczeła użyj $tic-tac-toe take <1-9> aby prejąć pole")
    // console.log("plansza")
    // console.log(gameBoard)
    draw_board(gameBoard, player)
    return 0;
}

async function safe_data(board, player, next_move) {
    const db = new QuickDB({ filePath: process.cwd() + `/db/tic-tac-toe/${player.id}.sqlite` });
    await db.set(`board`, { board: board })
    await db.set(`check`, true)
    await db.set(`lastMove`, { player: next_move })//id of person who should make next move
    //if next move should do AI lastMove = "AI"
}

function draw_board(dbboard, PLAYER_1) {
    // console.log(dbboard)
    // console.log(dbboard.board)
    const gameBoard = dbboard.board
    if (!gameBoard) return
    const layer1 = gameBoard[0]
    if (layer1[0] == 0) {
        var pole1 = "⬛"
    } else if (layer1[0] == PLAYER_1) {
        var pole1 = "🟩"
    } else { var pole1 = "🟥" }

    if (layer1[1] == 0) {
        var pole2 = "⬛"
    } else if (layer1[1] == PLAYER_1) {
        var pole2 = "🟩"
    } else { var pole2 = "🟥" }

    if (layer1[2] == 0) {
        var pole3 = "⬛"
    } else if (layer1[2] == PLAYER_1) {
        var pole3 = "🟩"
    } else { var pole3 = "🟥" }

    //layer2
    const layer2 = gameBoard[1]
    if (layer2[0] == 0) {
        var pole4 = "⬛"
    } else if (layer2[0] == PLAYER_1) {
        var pole4 = "🟩"
    } else { var pole4 = "🟥" }

    if (layer2[1] == 0) {
        var pole5 = "⬛"
    } else if (layer2[1] == PLAYER_1) {
        var pole5 = "🟩"
    } else { var pole5 = "🟥" }

    if (layer2[2] == 0) {
        var pole6 = "⬛"
    } else if (layer2[2] == PLAYER_1) {
        var pole6 = "🟩"
    } else { var pole6 = "🟥" }

    //layer3
    const layer3 = gameBoard[2]
    if (layer3[0] == 0) {
        var pole7 = "⬛"
    } else if (layer3[0] == PLAYER_1) {
        var pole7 = "🟩"
    } else { var pole7 = "🟥" }

    if (layer3[1] == 0) {
        var pole8 = "⬛"
    } else if (layer3[1] == PLAYER_1) {
        var pole8 = "🟩"
    } else { var pole8 = "🟥" }

    if (layer3[2] == 0) {
        var pole9 = "⬛"
    } else if (layer3[2] == PLAYER_1) {
        var pole9 = "🟩"
    } else { var pole9 = "🟥" }

    return `${pole1} ${pole2} ${pole3}\n${pole4} ${pole5} ${pole6} \n${pole7} ${pole8} ${pole9}`
}
