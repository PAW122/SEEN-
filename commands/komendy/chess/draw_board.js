const { QuickDB } = require("quick.db");
const Discord = require("discord.js");
const ascii = require("ascii-table")
module.exports = {
    execute: async (message, player_id, client) => {

        var db = new QuickDB({ filePath: process.cwd() + `/db/chess/chess.sqlite` });
        var game_db = new QuickDB({ filePath: process.cwd() + `/db/chess/boards.sqlite` });

        const check = await db.get(`${player_id}.check`)

        if (check != true) {
            message.reply("draw board error")
            return false
        }

        const token = await db.get(`${player_id}.token`)
        const board = await game_db.get(`${token}.board`)
        var pice_colors = await game_db.get(`${token}.pones_colors`)

        draw_ascii_board()

        function draw_ascii_board() {
            var table = new ascii('Chess Board')
            table
                .setHeading("/", "a", "b", "c", "d", "e", "f", "g", "h")
                .addRow(1, board[0][0], board[0][1], board[0][2], board[0][3], board[0][4], board[0][5], board[0][6], board[0][7])
                .addRow(2, board[1][0], board[1][1], board[1][2], board[1][3], board[1][4], board[1][5], board[1][6], board[1][7])
                .addRow(3, board[2][0], board[2][0], board[2][2], board[2][3], board[2][4], board[2][5], board[2][6], board[2][7])
                .addRow(4, board[3][0], board[3][1], board[3][2], board[3][3], board[3][4], board[3][5], board[3][6], board[3][7])
                .addRow(5, board[4][0], board[4][1], board[4][2], board[4][3], board[4][4], board[4][5], board[4][6], board[4][7])
                .addRow(6, board[5][0], board[5][1], board[5][2], board[5][3], board[5][4], board[5][5], board[5][6], board[5][7])
                .addRow(7, board[6][0], board[6][1], board[6][2], board[6][3], board[6][4], board[6][5], board[6][6], board[6][7])
                .addRow(8, board[7][0], board[7][1], board[7][2], board[7][3], board[7][4], board[7][5], board[7][6], board[7][7])

            console.log(table.toString())

            var draw_board = []

            
            console.log(pice_colors)

            var i = 0
            var x = 0

            console.log("oklory:" + pice_colors[i][x])

            //zrobić jak w tictactow w oddzielnym pliku funkcje do sprawdzania pul
            //i returna
            //rysowanie pionków

            console.log("pice color i x : " + pice_colors[i][x])

            function p() {
                console.log(pice_colors[i][x] + " in forlop")
                if (pice_colors[i][x] == 1) {
                    console.log("pice: nr1")
                    if ((i % 2) == 0) {
                        draw_board.push("🟥")
                    } else {
                        draw_board.push("🟥")
                    }
                }
                if (pice_colors[i][x] == 2) {
                    if ((i % 2) == 0) {
                        draw_board.push("🟥")
                    } else {
                        draw_board.push("🟥")
                    }
                }
            }

            board.forEach(element => {
                element.forEach(element => {
                    if (element == "p") {
                        p()
                    }
                    x += 1
                })
                i += 1
            });





            return console.log(draw_board)



            const embed = new Discord.MessageEmbed()
                .setDescription(`${draw_board}`)

            message.channel.send({ embeds: [embed] })
        }

    }
}