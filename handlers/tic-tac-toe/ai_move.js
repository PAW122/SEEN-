const { QuickDB } = require("quick.db");
const draw_board = require("./draw_board");
const Discord = require("discord.js")
module.exports = (baord_to_save, message) => {
    ai_move(baord_to_save, message)
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