module.exports = (board, taken_place, message) => {
    check_is_pole_was_taken(board, taken_place, message)
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