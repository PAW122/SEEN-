const check_is_pole_was_taken = require("./check_pole");
const ai_move = require("./ai_move");
const check_is_player = require("./is_player");
const draw_board = require("./draw_board");
const { QuickDB } = require("quick.db");
const Discord = require("discord.js")
module.exports = (message, args) => {
    do_move_by_player(message, args)
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
        const board_to_send = draw_board(board)
        console.log(board.board)
        console.log("board-to-send  " + board_to_send)

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