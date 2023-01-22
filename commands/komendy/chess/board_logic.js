const { QuickDB } = require("quick.db");
const data = require("./data.json")
const pones_black = data.pones_black
const pones_white = data.pones_white
const board_pole = data.board
module.exports = {
    execute: async (token) => {
        var game_db = new QuickDB({ filePath: process.cwd() + `/db/chess/boards.sqlite` });
        //          czarne

        var deafult_board =//normal deafult_board
            [[pones_black.rook, pones_black.hors, pones_black.goniec, pones_black.królowa, pones_black.król, pones_black.goniec, pones_black.hors, pones_black.rook],
            [pones_black.pion, pones_black.pion, pones_black.pion, pones_black.pion, pones_black.pion, pones_black.pion, pones_black.pion, pones_black.pion],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [pones_white.pion, pones_white.pion, pones_white.pion, pones_white.pion, pones_white.pion, pones_white.pion, pones_white.pion, pones_white.pion],
            [pones_white.rook, pones_white.hors, pones_white.goniec, pones_white.królowa, pones_white.król, pones_white.goniec, pones_white.hors, pones_white.rook],]

        var test_board =//test test_board
            [[0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],]

        let rows = 0;
        let column = 0;

        //board[2][1]
        // pole 3 2

        deafult_board.forEach(row => {
            row.forEach(pole => {
                if (column >= 8) {
                    column = 0
                }
                if (deafult_board[rows][column] != 0) {
                    return
                }
                if ((rows + 1) % 2 == 0) {
                    if ((column + 1) % 2 == 0) {
                        deafult_board[rows][column] = board_pole.white
                    } else {
                        deafult_board[rows][column] = board_pole.black
                    }
                } else {
                    if ((column + 1) % 2 == 0) {
                        deafult_board[rows][column] = board_pole.black
                    } else {
                        deafult_board[rows][column] = board_pole.white
                    }
                }
                column++
            })
            rows++
        })

        const board = await game_db.get(`${token}.board`)
        const player1 = await game_db.get(`${token}.player1`)
        const player2 = await game_db.get(`${token}.player2`)
        const nxt_move = await game_db.get(`${token}.next_move`)
        const moves = await game_db.get(`${token}.moves`)
        const set_board = await game_db.get(`${token}.set_board`, false)

        if (set_board == false) {
            //ustawienie pionków
            await game_db.set(`${token}.set_board`, true)
            await game_db.set(`${token}.board`, deafult_board)
        }

        console.log("Deafult board")
        console.log(deafult_board)

        return true
    }
}


/*
board: [[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0]]
deafult board: [[r,n,b,q,k,b,n,r],[p,p,p,p,p,p,p,p],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[p,p,p,p,p,p,p,p],[r,n,b,q,k,b,n,r]]
board pones:
0 = brak pionka
r = wierza
n = goniec
b = skoczek
q = kurlowa
k = król
p = pion
//


♙	♙	♙	♙	♙	♙	♙	♙
♖	♘	♗	♕	♔	♗	♘	♖


pones colors : [[1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[2,2,2,2,2,2,2,2],[2,2,2,2,2,2,2,2]]
colors: 
1 = white
2 = black

// -> '   +------------------------+
//      8 | r  n  b  q  k  b  n  r |
//      7 | p  p  p  p  .  p  p  p |
//      6 | .  .  .  .  .  .  .  . |
//      5 | .  .  .  .  p  .  .  . |
//      4 | .  .  .  .  P  P  .  . |
//      3 | .  .  .  .  .  .  .  . |
//      2 | P  P  P  P  .  .  P  P |
//      1 | R  N  B  Q  K  B  N  R |
//        +------------------------+
//          a  b  c  d  e  f  g  h'
*/