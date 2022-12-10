module.exports = (dbboard) => {
   const board = draw_board(dbboard)
   return board
}
function draw_board(dbboard) {
    //console.log(dbboard)
    //console.log(dbboard.board)
    const player1 = 1
    const gameBoard = dbboard.board
    console.log(gameBoard)
    if (!gameBoard) return
    const layer1 = gameBoard[0]
    if (layer1[0] == 0) {
        var pole1 = "⬛"
    } else if (layer1[0] == player1) {
        var pole1 = "🟩"
    } else { var pole1 = "🟥" }

    if (layer1[1] == 0) {
        var pole2 = "⬛"
    } else if (layer1[1] == player1) {
        var pole2 = "🟩"
    } else { var pole2 = "🟥" }

    if (layer1[2] == 0) {
        var pole3 = "⬛"
    } else if (layer1[2] == player1) {
        var pole3 = "🟩"
    } else { var pole3 = "🟥" }

    //layer2
    const layer2 = gameBoard[1]
    if (layer2[0] == 0) {
        var pole4 = "⬛"
    } else if (layer2[0] == player1) {
        var pole4 = "🟩"
    } else { var pole4 = "🟥" }

    if (layer2[1] == 0) {
        var pole5 = "⬛"
    } else if (layer2[1] == player1) {
        var pole5 = "🟩"
    } else { var pole5 = "🟥" }

    if (layer2[2] == 0) {
        var pole6 = "⬛"
    } else if (layer2[2] == player1) {
        var pole6 = "🟩"
    } else { var pole6 = "🟥" }

    //layer3
    const layer3 = gameBoard[2]
    if (layer3[0] == 0) {
        var pole7 = "⬛"
    } else if (layer3[0] == player1) {
        var pole7 = "🟩"
    } else { var pole7 = "🟥" }

    if (layer3[1] == 0) {
        var pole8 = "⬛"
    } else if (layer3[1] == player1) {
        var pole8 = "🟩"
    } else { var pole8 = "🟥" }

    if (layer3[2] == 0) {
        var pole9 = "⬛"
    } else if (layer3[2] == player1) {
        var pole9 = "🟩"
    } else { var pole9 = "🟥" }
    console.log("draw board result:")
    console.log(`${pole1} ${pole2} ${pole3}\n${pole4} ${pole5} ${pole6} \n${pole7} ${pole8} ${pole9}`)
    return `${pole1} ${pole2} ${pole3}\n${pole4} ${pole5} ${pole6} \n${pole7} ${pole8} ${pole9}`
}