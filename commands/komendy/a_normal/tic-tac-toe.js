const Discord = require("discord.js");
const { QuickDB } = require("quick.db");

//w handlerach nie działa

//dodać funkcje tic-tac-toe pvp @username
//zaczyna to nową partie,
//zapisz w db dla obu userów dane o grze i czyj jest ruch
//(mext_ruch: playerId)

const help_embed = new Discord.MessageEmbed()

    .setColor(`RANDOM`)
    .setTitle(`tic-tac-toe`)
    .setFields(
        { name: "$tic-tac-toe", value: "play tic-tac-toe minigame with bot" },
        { name: "start game", value: "$tic-tac-toe start" },
        { name: "take", value: "$tic-tac-toe take 1-9" },
        { name: "leave from game", value: "$tic-tac-toe leave" }
    )

module.exports = {// tic-tac-toe
    name: "tic-tac-toe",
    help: help_embed,

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
        do_move_by_player(message, args)
    }
}

async function do_move_by_player(message, args) { // po tym musi być kolejka dla bota
    //potem zapisuje się w db last_Move: bot
    //i z db znowó wczytuje się plansza
    if (check_is_player(message) == false) {
        return message.reply("Nie jesteś obecnie w żadnej grze")
    } else {
        if (check_pole() == false) return message.reply("Podałeś niepoprawną nazwe pola")
        //to do: sprawdzanie czy pole jest zajęte
        const taken_place = parseInt(args[1])
        if (taken_place < 1 || taken_place > 9) return message.reply("Take number from 1 to 9")
        const db = new QuickDB({ filePath: process.cwd() + `/db/tic-tac-toe/${message.author.id}.sqlite` });
        if (await db.get(`check`) != true) return message.reply("Nie jesteś w trakcie gry")
        let board = await db.get(`board`)
        if (check_is_pole_was_taken(board, taken_place, message) == false) {
            message.reply("To pole jest zajęte")
            return
        }

        let baord_to_save = board.board
        //zapisywanie pola jako: pole zajęte przez gracza
        let taken_place_arr = taken_place - 1
        if (taken_place <= 3) {
            board.board[0][taken_place_arr] = 1
        }

        let taken_place_arr2 = taken_place_arr - 3
        if (taken_place > 3 && taken_place < 7) {
            board.board[1][taken_place_arr2] = 1
        }

        let taken_place_arr3 = taken_place_arr2 - 3
        if (taken_place > 6) {
            board.board[2][taken_place_arr3] = 1
        }

        const board_to_send = draw_board(board, 1)

        const embed = new Discord.MessageEmbed()
            .setTitle("tic-tac-toe")
            .setDescription("board:\n" + board_to_send)
        message.channel.send({ embeds: [embed] })

        await db.set(`board`, { board: baord_to_save })

        ai_move(baord_to_save, message)
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

async function ai_move(board, message) {
    const db = new QuickDB({ filePath: process.cwd() + `/db/tic-tac-toe/${message.author.id}.sqlite` });

    var isMoveL = isMovesLeft(board)
    var is_win_P = is_win(1, board)
    var is_win_AI = is_win(2, board)

    if (isMoveL == false && is_win_P != true && is_win_AI != true) {
        return message.reply("Draw")
    }

    //ai

    class Move {
        constructor() {
            let row, col;
        }
    }

    function isMovesLeft(board) {
        for (let i = 0; i < 3; i++)
            for (let j = 0; j < 3; j++)
                if (board[i][j] == 0)
                    return true;

        return false;
    }

    function evaluate(b) {

        // Checking for Rows for X or O victory.
        for (let row = 0; row < 3; row++) {
            if (b[row][0] == b[row][1] &&
                b[row][1] == b[row][2]) {
                if (b[row][0] == player)
                    return +10;

                else if (b[row][0] == opponent)
                    return -10;
            }
        }

        // Checking for Columns for X or O victory.
        for (let col = 0; col < 3; col++) {
            if (b[0][col] == b[1][col] &&
                b[1][col] == b[2][col]) {
                if (b[0][col] == player)
                    return +10;

                else if (b[0][col] == opponent)
                    return -10;
            }
        }

        // Checking for Diagonals for X or O victory.
        if (b[0][0] == b[1][1] && b[1][1] == b[2][2]) {
            if (b[0][0] == player)
                return +10;

            else if (b[0][0] == opponent)
                return -10;
        }

        if (b[0][2] == b[1][1] &&
            b[1][1] == b[2][0]) {
            if (b[0][2] == player)
                return +10;

            else if (b[0][2] == opponent)
                return -10;
        }

        // Else if none of them have
        // won then return 0
        return 0;
    }

    let player = 2, opponent = 1;
    function minimax(board, depth, isMax) {
        let score = evaluate(board);

        // If Maximizer has won the game
        // return his/her evaluated score
        if (score == 10)
            return score;

        // If Minimizer has won the game
        // return his/her evaluated score
        if (score == -10)
            return score;

        // If there are no more moves and
        // no winner then it is a tie
        if (isMovesLeft(board) == false)
            return 0;

        // If this maximizer's move
        if (isMax) {
            let best = -1000;

            // Traverse all cells
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {

                    // Check if cell is empty
                    if (board[i][j] == 0) {

                        // Make the move
                        board[i][j] = player;

                        // Call minimax recursively
                        // and choose the maximum value
                        best = Math.max(best, minimax(board,
                            depth + 1, !isMax));

                        // Undo the move
                        board[i][j] = 0;
                    }
                }
            }
            return best;
        }

        // If this minimizer's move
        else {
            let best = 1000;

            // Traverse all cells
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {

                    // Check if cell is empty
                    if (board[i][j] == 0) {

                        // Make the move
                        board[i][j] = opponent;

                        // Call minimax recursively and
                        // choose the minimum value
                        best = Math.min(best, minimax(board,
                            depth + 1, !isMax));

                        // Undo the move
                        board[i][j] = 0;
                    }
                }
            }
            return best;
        }
    }

    function findBestMove(board) {
        let bestVal = -1000;
        let bestMove = new Move();
        bestMove.row = -1;
        bestMove.col = -1;

        // Traverse all cells, evaluate
        // minimax function for all empty
        // cells. And return the cell
        // with optimal value.
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {

                // Check if cell is empty
                if (board[i][j] == 0) {

                    // Make the move
                    board[i][j] = player;

                    // compute evaluation function
                    // for this move.
                    let moveVal = minimax(board, 0, false);

                    // Undo the move
                    board[i][j] = 0;

                    // If the value of the current move
                    // is more than the best value, then
                    // update best
                    if (moveVal > bestVal) {
                        bestMove.row = i;
                        bestMove.col = j;
                        bestVal = moveVal;
                    }
                }
            }
        }

        return bestMove;
    }
    let bestMove = findBestMove(board);
    board[bestMove.row][bestMove.col] = 2
    //ai

    await db.set(`board`, { board: board })

    const board2 = await db.get(`board`)
    const send_board = draw_board(board2, 1)

    const embed = new Discord.MessageEmbed()
        .setTitle("tic-tac-toe AI move")
        .setDescription("board:\n" + send_board)
    message.channel.send({ embeds: [embed] })

    var isMoveL = isMovesLeft(board)
    var is_win_P = is_win(1, board)
    var is_win_AI = is_win(2, board)

    if (isMoveL == false && is_win_P != true && is_win_AI != true) {
        return message.reply("Draw")
    }

    if (is_win_P == true) {
        return message.reply("Player Win")
    }

    if (is_win_AI == true) {
        return message.reply("Bot Win")
    }

    return
}

function check_is_pole_was_taken(board, taken_place, message) {
    // [0,0,0][0,0,0][0,0,0] np:3
    // console.log(board.board)
    // console.log(taken_place)
    const board_ = board.board

    var x = 0
    var y = 1
    var end_data = false
    board_.forEach(element => {
        var i = 0
        element.forEach(pole => {
            if (board_[x][i] == 0 && taken_place == y) {
                end_data = true
            }
            i++
            y++
        })
        x++
    })
    return end_data
}

async function check_is_player(message) {
    const db = new QuickDB({ filePath: process.cwd() + `/db/tic-tac-toe/${message.author.id}.sqlite` });
    const check = await db.get(`check`)
    if (check == true) {
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

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function who_start() {
    //true - player
    //false - ai
    const rng = getRandomInt(2)
    if (rng == 0) {
        console.log("Startuje: " + rng)
        return false
    } else {
        return true
    }
}

function start(message, args, gameBoard) {
    const player = message.author
    const next_move = message.author

    if (who_start() == true) {
        message.reply("Gracz rozpoczyna. użyj $tic-tac-toe take <1-9> aby prejąć pole")
    } else {
        message.reply("Bot rozpoczyna. użyj $tic-tac-toe take <1-9> aby prejąć pole")
        ai_move(gameBoard, message)
    }

    safe_data(gameBoard, player, next_move)
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
        var pole1 = "⬜"
    } else if (layer1[0] == PLAYER_1) {
        var pole1 = "🟩"
    } else { var pole1 = "🟥" }

    if (layer1[1] == 0) {
        var pole2 = "⬜"
    } else if (layer1[1] == PLAYER_1) {
        var pole2 = "🟩"
    } else { var pole2 = "🟥" }

    if (layer1[2] == 0) {
        var pole3 = "⬜"
    } else if (layer1[2] == PLAYER_1) {
        var pole3 = "🟩"
    } else { var pole3 = "🟥" }

    //layer2
    const layer2 = gameBoard[1]
    if (layer2[0] == 0) {
        var pole4 = "⬜"
    } else if (layer2[0] == PLAYER_1) {
        var pole4 = "🟩"
    } else { var pole4 = "🟥" }

    if (layer2[1] == 0) {
        var pole5 = "⬜"
    } else if (layer2[1] == PLAYER_1) {
        var pole5 = "🟩"
    } else { var pole5 = "🟥" }

    if (layer2[2] == 0) {
        var pole6 = "⬜"
    } else if (layer2[2] == PLAYER_1) {
        var pole6 = "🟩"
    } else { var pole6 = "🟥" }

    //layer3
    const layer3 = gameBoard[2]
    if (layer3[0] == 0) {
        var pole7 = "⬜"
    } else if (layer3[0] == PLAYER_1) {
        var pole7 = "🟩"
    } else { var pole7 = "🟥" }

    if (layer3[1] == 0) {
        var pole8 = "⬜"
    } else if (layer3[1] == PLAYER_1) {
        var pole8 = "🟩"
    } else { var pole8 = "🟥" }

    if (layer3[2] == 0) {
        var pole9 = "⬜"
    } else if (layer3[2] == PLAYER_1) {
        var pole9 = "🟩"
    } else { var pole9 = "🟥" }

    return `${pole1} ${pole2} ${pole3}\n${pole4} ${pole5} ${pole6} \n${pole7} ${pole8} ${pole9}`
}

function is_win(player, baord_to_save) {
    //player 1 = user
    //player 2 = AI

    //dla każdej wygranej poziomej
    if (baord_to_save[0][0] == player
        && baord_to_save[0][1] == player
        && baord_to_save[0][2] == player) {
        return true
    }
    if (baord_to_save[1][0] == player
        && baord_to_save[1][1] == player
        && baord_to_save[1][2] == player) {
        return true
    }
    if (baord_to_save[2][0] == player
        && baord_to_save[2][1] == player
        && baord_to_save[2][2] == player) {
        return true
    }

    //dla każdej wygranej pionowej
    if (baord_to_save[0][0] == player
        && baord_to_save[1][0] == player
        && baord_to_save[2][0] == player) {
        return true
    }
    if (baord_to_save[0][1] == player
        && baord_to_save[1][1] == player
        && baord_to_save[2][1] == player) {
        return true
    }
    if (baord_to_save[0][2] == player
        && baord_to_save[1][2] == player
        && baord_to_save[2][2] == player) {
        return true
    }

    //dla wygranych po skosie
    if (baord_to_save[0][0] == player
        && baord_to_save[1][1] == player
        && baord_to_save[2][2] == player) {
        return true
    }
    if (baord_to_save[0][2] == player
        && baord_to_save[1][1] == player
        && baord_to_save[2][0] == player) {
        return true
    }
    return false
}