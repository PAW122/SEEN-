const { QuickDB } = require("quick.db");
var db = new QuickDB({ filePath: process.cwd() + `/db/chess/chess.sqlite` });
var game_db = new QuickDB({ filePath: process.cwd() + `/db/chess/boards.sqlite` });

const data = require("./data.json")
const pones_black = data.pones_black
const pones_white = data.pones_white
const board_pole = data.board

const draw_board = require("./draw_board")

var clear_board = [
  ["⬜", "⬛", "⬜", "⬛", "⬜", "⬛", "⬜", "⬛"],
  ["⬛", "⬜", "⬛", "⬜", "⬛", "⬜", "⬛", "⬜"],
  ["⬛", "⬜", "⬛", "⬜", "⬛", "⬜", "⬛", "⬜"],
  ["⬜", "⬛", "⬜", "⬛", "⬜", "⬛", "⬜", "⬛"],
  ["⬛", "⬜", "⬛", "⬜", "⬛", "⬜", "⬛", "⬜"],
  ["⬜", "⬛", "⬜", "⬛", "⬜", "⬛", "⬜", "⬛"],
  ["⬛", "⬜", "⬛", "⬜", "⬛", "⬜", "⬛", "⬜"],
  ["⬜", "⬛", "⬜", "⬛", "⬜", "⬛", "⬜", "⬛"],
]

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
    if (who_move != message.author.id) {
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

    const start = convertMove(args[1])
    const end = convertMove(args[2])

    draw_board.execute(message, who_move, client)

    function convertMove(move) {
      const columnLetters = 'abcdefgh';
      const fromCol = columnLetters.indexOf(move[0]);
      const fromRow = parseInt(move[1]) - 1;
      const toCol = columnLetters.indexOf(move[3]);
      const toRow = parseInt(move[4]) - 1;
      return [fromRow, fromCol, toRow, toCol];
    }

    function is_pice_on_pole(board, position) {
      const fromRow = position[0];
      const fromCol = position[1];

      if (board[fromRow][fromCol] != "⬛" || board[fromRow][fromCol] != "⬜") {
        return true
      }
      return false
    }

    if (is_pice_on_pole(board, start) != true) {
      return message.reply(`Na polu tym polu nie ma żadnego pionka`)
    }

    if (isMoveLegal(board, start, end) != true) {
      return message.reply("Ten ruch jest nielegalny")
    } else {
      const fromRow = start[0];
      const fromCol = start[1];
      const toRow = end[0];
      const toCol = end[1];

      const pice = board[fromRow][fromCol]
      board[fromRow][fromCol] = clear_board[fromRow][fromCol]
      board[toRow][toCol] = pice
    }

    console.log("after move:")
    draw_board.execute(board, null, null, true)

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

  if (!token || !board || !next_move) {
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

function isMoveLegal(board, from, to) {
  const fromRow = from[0];
  const fromCol = from[1];
  const toRow = to[0];
  const toCol = to[1];
  const piece = board[fromRow][fromCol];

  switch (piece) {
    case '♖':
    case '♜':
      return isRookMoveLegal(board, from, to);
    case '♘':
    case '♞':
      return isKnightMoveLegal(board, from, to);
    case '♗':
    case '♝':
      return isBishopMoveLegal(board, from, to);
    case '♕':
    case '♛':
      return isQueenMoveLegal(board, from, to);
    case '♔':
    case '♚':
      return isKingMoveLegal(board, from, to);
    case '♙':
    case '♟':
      return isPawnMoveLegal(board, from, to);
    default:
      return false;
  }
}

function isRookMoveLegal(board, from, to) {
  const fromRow = from[0];
  const fromCol = from[1];
  const toRow = to[0];
  const toCol = to[1];

  if (fromRow !== toRow && fromCol !== toCol) {
    return false;
  }

  const deltaRow = fromRow < toRow ? 1 : -1;
  const deltaCol = fromCol < toCol ? 1 : -1;
  let currentRow = fromRow + deltaRow;
  let currentCol = fromCol + deltaCol;

  while (currentRow !== toRow || currentCol !== toCol) {
    if (board[currentRow][currentCol] !== '⬜') {
      return false;
    }

    currentRow += deltaRow;
    currentCol += deltaCol;
  }

  return true;
}

function isKnightMoveLegal(board, start, end) {
  console.log("start: " + start)
  console.log("end: " + end)

  const fromRow = start[0];
  const fromCol = start[1];
  const toRow = end[0];
  const toCol = end[1];

  if (fromRow < 0 || fromRow > 7 || fromCol < 0 || fromCol > 7) return false;
  if (toRow < 0 || toRow > 7 || toCol < 0 || toCol > 7) return false;

  const deltaRow = Math.abs(fromRow - toRow);
  const deltaCol = Math.abs(fromCol - toCol);

  return (deltaRow === 2 && deltaCol === 1) || (deltaRow === 1 && deltaCol === 2);
}

function isBishopMoveLegal(board, start, end) {
  let [startX, startY] = start;
  let [endX, endY] = end;
  let piece = board[startX][startY];
  let targetPiece = board[endX][endY];

  // Check if start and end positions are on the same diagonal
  let deltaX = endX - startX;
  let deltaY = endY - startY;
  if (Math.abs(deltaX) !== Math.abs(deltaY)) return false;

  // Check if there are any pieces blocking the path
  let xStep = (deltaX > 0) ? 1 : -1;
  let yStep = (deltaY > 0) ? 1 : -1;
  let x = startX + xStep;
  let y = startY + yStep;
  while (x !== endX) {
    if (board[x][y] !== '⬜') return false;
    x += xStep;
    y += yStep;
  }

  // Check if the target square is occupied by a friendly piece
  if (targetPiece === piece) return false;

  return true;
}

function isQueenMoveLegal(board, start, end) {
  let fromRow = start[0];
  let fromCol = start[1];
  let toRow = end[0];
  let toCol = end[1];

  if (fromRow === toRow || fromCol === toCol) {
    return isStraightLineMoveLegal(board, fromRow, fromCol, toRow, toCol);
  } else if (Math.abs(fromRow - toRow) === Math.abs(fromCol - toCol)) {
    return isDiagonalLineMoveLegal(board, fromRow, fromCol, toRow, toCol);
  } else {
    return false;
  }
}

function isDiagonalLineMoveLegal(board, from, to) {
  let fromRow = from[0], fromCol = from[1];
  let toRow = to[0], toCol = to[1];
  let rowIncrement = (fromRow < toRow) ? 1 : -1;
  let colIncrement = (fromCol < toCol) ? 1 : -1;
  let row = fromRow + rowIncrement;
  let col = fromCol + colIncrement;
  while (row !== toRow) {
    if (board[row][col] !== '') return false;
    row += rowIncrement;
    col += colIncrement;
  }
  return true;
}

function isKingMoveLegal(board, start, end) {
  const startRow = start[0];
  const startCol = start[1];
  const endRow = end[0];
  const endCol = end[1];

  if (
    Math.abs(startRow - endRow) > 1 ||
    Math.abs(startCol - endCol) > 1
  ) {
    return false;
  }

  if (
    isUnderAttack(board, end, 'white') ||
    isUnderAttack(board, end, 'black')
  ) {
    return false;
  }

  return true;
}

function isUnderAttack(board, position, color) {
  const enemyColor = (color === 'black') ? 'white' : 'black';

  // Store the possible directions of the attack
  const directions = [[1, 1], [1, -1], [-1, 1], [-1, -1], // Diagonal
  [1, 0], [0, 1], [-1, 0], [0, -1] // Straight
  ];

  // Loop through all 8 possible directions
  for (let i = 0; i < 8; i++) {
    let row = position[0] + directions[i][0];
    let col = position[1] + directions[i][1];

    // Check if the next position is within the board and not empty
    while (row >= 0 && row < 8 && col >= 0 && col < 8 && board[row][col].color !== enemyColor) {
      row += directions[i][0];
      col += directions[i][1];
    }

    // Check if the next position is within the board and has an attacking piece
    if (row >= 0 && row < 8 && col >= 0 && col < 8) {
      const piece = board[row][col];
      const symbol = getPieceSymbol(piece.color, piece.type);
      if (
        symbol === getPieceSymbol(enemyColor, 'pawn') ||
        symbol === getPieceSymbol(enemyColor, 'rook') ||
        symbol === getPieceSymbol(enemyColor, 'queen') ||
        (directions[i][0] === 1 || directions[i][0] === -1) &&  symbol === getPieceSymbol(enemyColor, 'bishop') ||
        (directions[i][0] !== 0 && directions[i][1] !== 0) && (symbol === getPieceSymbol(enemyColor, 'queen') || symbol === getPieceSymbol(enemyColor, 'king'))
      ) {
        return true;
      }
    }
  }
  return false;
}

function getPieceSymbol(piece) {
  if (!piece) return '⬜';
  if (piece.color === 'white') {
    switch (piece.type) {
      case 'pawn': return '♙';
      case 'rook': return '♖';
      case 'queen': return '♕';
      case 'bishop': return '♗';
      case 'knight': return '♘';
      case 'king': return '♔';
    }
  }
  if (piece.color === 'black') {
    switch (piece.type) {
      case 'pawn': return '♟';
      case 'rook': return '♜';
      case 'queen': return '♛';
      case 'bishop': return '♝';
      case 'knight': return '♞';
      case 'king': return '♚';
    }
  }
}

function isPawnMoveLegal(board, start, end) {
  const startRow = start[0];
  const startCol = start[1];
  const endRow = end[0];
  const endCol = end[1];
  const deltaRow = endRow - startRow;
  const deltaCol = endCol - startCol;

  // Check if the move is forward
  if (deltaRow < 0) return false;
  if (deltaCol !== 0) return false;

  // Check if the path is clear
  if (deltaRow > 2) return false;
  if (deltaRow === 2 && board[startRow + 1][startCol] !== '⬜') return false;

  // Check if the target square is occupied by an enemy piece
  const targetPiece = board[endRow][endCol];
  if (targetPiece !== '⬜' && targetPiece !== '⬛') return false;

  return true;
}