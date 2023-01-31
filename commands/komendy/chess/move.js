const { QuickDB } = require("quick.db");
var db = new QuickDB({ filePath: process.cwd() + `/db/chess/chess.sqlite` });
var game_db = new QuickDB({ filePath: process.cwd() + `/db/chess/boards.sqlite` });

const data = require("./data.json")
const pones_black = data.pones_black
const pones_white = data.pones_white
const board_pole = data.board

const draw_board = require("./draw_board")

module.exports = {
    execute: async (message, args, client) => {


        //sprawdż czy gracz zaczoł partie
        const res = await game_data(message.author.id)
        if (res.status == false) {
            console.log(res)
            return message.reply("Chess errer\n pleas use $report \n Error code: move_1")
        }
        console.log("move.js res =>>")
        console.log(res)
        const board = res.board
        const who_move = res.next_move
        if(who_move != message.author.id) {
            return message.reply(`Teraz jest kolejka gracza <@${who_move}>`)
        }

        //zrobić funkcję, która sprawdza czy róch, który chce wykońac user jest możliwy
        // (legal move)
        // i sprawdzic czy to nie spowoduje dania szacha (illegal move)
        // jezeli ruch jest możliwy przemieścić pionekk
        //potem zmienić next_move na następnego usera
        // ustawić poprzednie pole pionka na 0
        // zrobić returz true
        // sprawdzić czy ten ruch daje szacha albo mata przeciwnikowi
        // draw board

        const start = args[1]
        const end = args[2]

        draw_board.execute(message, who_move, client)

        if(isMoveLegal(board, start, end) != true) {
            return message.reply("Ten ruch jest nielegalny")
        }
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

function isMoveLegal(board, start, end) {
    let startRow = 8 - start[1];
    let startCol = 'abcdefgh'.indexOf(start[0]);
    let endRow = 8 - end[1];
    let endCol = 'abcdefgh'.indexOf(end[0]);
    
    console.log(`isMoveLegal imputs: ${startRow} ${startCol} ${endRow} ${endCol}`)


    //wyświetl w konsoli jak wyglądał by wykonany nielegalny ruch
    let test_board = board
    let moved_pone = test_board[startRow][startCol]
    test_board[startRow][startCol] = "0"
    test_board[endRow][endCol] = moved_pone

    draw_board.execute(test_board, null, null, true)


    console.log(`${board[startRow][startCol]} => ${board[endRow][endCol]} jest nielegalne`)

    let piece = board[startRow][startCol];
    let target = board[endRow][endCol];
  
    // sprawdzanie czy figura jest na polu startowym
    if (!piece) return false;
    
    // sprawdzanie czy pole docelowe jest puste lub zawiera przeciwnika
    if (target && target.charCodeAt(0) >= piece.charCodeAt(0)) return false;
  
    // inne sprawdzenia, w zależności od rodzaju figury
    switch (piece) {
      case '♙':
        if (startCol !== endCol && target) return false;
        if (startRow - endRow !== 1 && startRow === 6) return false;
        if (startRow - endRow !== 1 && startRow !== 6) return false;
        break;
      case '♖':
        if (startRow !== endRow && startCol !== endCol) return false;
        break;
      case '♘':
        if (Math.abs(startRow - endRow) !== 2 || Math.abs(startCol - endCol) !== 1) return false;
        break;
      case '♗':
        if (Math.abs(startRow - endRow) !== Math.abs(startCol - endCol)) return false;
        break;
      case '♔':
        if (Math.abs(startRow - endRow) > 1 || Math.abs(startCol - endCol) > 1) return false;
        break;
      case '♕':
        if (Math.abs(startRow - endRow) !== Math.abs(startCol - endCol) && startRow !== endRow && startCol !== endCol) return false;
        break;
      default:
        return false;
    }
  
    return true;
  }

  //sprawdza tylko czy pionek nie wyszedł poza planszę
  function isMoveLegal_board(board, x1, y1, x2, y2) {
    if (x1 < 0 || x1 >= board.length || y1 < 0 || y1 >= board[0].length || x2 < 0 || x2 >= board.length || y2 < 0 || y2 >= board[0].length) {
      return false;
    }
    if (board[x1][y1] === 0 || board[x2][y2] !== 0) {
      return false;
    }
    if (x1 === x2 && y1 === y2) {
      return false;
    }
    if (Math.abs(x2 - x1) > 1 || Math.abs(y2 - y1) > 1) {
      return false;
    }
    return true;
  }