const { QuickDB } = require("quick.db");
var db = new QuickDB({ filePath: process.cwd() + `/db/chess/chess.sqlite` });
var game_db = new QuickDB({ filePath: process.cwd() + `/db/chess/boards.sqlite` });


module.exports = {
    execute: async (message, args, client) => {


        //sprawdż czy gracz zaczoł partie
        const res = await game_data(message.author.id)
        if (res.status == false) {
            console.log(res)
            return message.reply("Chess errer\n pleas use $report \n Error code: move_1")
        }
        console.log(res)

        //zrobić funkcję, która sprawdza czy róch, który chce wykońac user jest możliwy
        // (legal move)
        // i sprawdzic czy to nie spowoduje dania szacha (illegal move)
        // jezeli ruch jest możliwy przemieścić pionekk
        //potem zmienić next_move na następnego usera
        // ustawić poprzednie pole pionka na 0
        // zrobić returz true
        // sprawdzić czy ten ruch daje szacha albo mata przeciwnikowi
        // draw board
    }
}

async function game_data(player1) {
    if (!player1) {
        console.error("player1 is undefind: " + player1)
        return false
    }

    const game = await db.get(`${player1}.check`)
    if (game != true) {
        return message.reply("gracz nie rozpoczoł jeszcze partii")
    }

    const token = await db.get(`${player1}.token`)
    const board = await game_db.get(`${token}.board`)
    const next_move = await game_db.get(`${token}.next_move`)

    if(!token || !board || !next_move) {
        return {
            status: false,
            token: token,
            board: board,
            next_move: next_move
        }
    } 

    return {
        status: true,
        token: token,
        board: board,
        next_move: next_move
    }
}