const { QuickDB } = require("quick.db");
const config = require("./config")
const games = new Set(); // lista graczy którzy rozpoczeli gre
const subplayers = new Set(); //gracze wyzwani do walki
const token_gen = require("./token_gen")
const board_logic = require("./board_logic")
module.exports = {
    execute: async (message, args, client, action) => {

        var db = new QuickDB({ filePath: process.cwd() + `/db/chess/chess.sqlite` });

        if (action == true) {
            start_game()
        } else if (action == false) {
            end_game()
        } else {
            console.log("chess err action is undefind")
            message.channel.send("ERRER")
            return
        }

        async function start_game() {

            const dedafult_board = [[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0]]

            const player_id = message.author.id
            const player2 = message.mentions.users.first()
            if (!player2) return message.reply("this player dont exist")
            const player2_id = player2.id

            const token = token_gen.execute()
            if (!token) return console.log("err nie wygenerowano tokenu play.js 27")

            console.log(token)

            const game = await db.get(`${player_id}.check`)
            if (game == true) {
                return message.reply("gracz rozpoczoł już partie")
            }

            const game2 = await db.get(`${player2_id}.check`)
            if(game2 == true) {
                return message.reply(`<@${player2_id}> jest już w trakcie gry`)
            }

            //zapisz dla gracza 1
            await db.set(`${player_id}.check`, true)
            await db.set(`${player_id}.token`, token)

            //zapisz dla gracza 2
            await db.set(`${player2_id}.check`, true)
            await db.set(`${player2_id}.token`, token)

            //stwórz deafultową plansze
            var game_db = new QuickDB({ filePath: process.cwd() + `/db/chess/boards.sqlite` });
            await game_db.set(`${token}.board`, dedafult_board)
            await game_db.set(`${token}.player1`, player_id)
            await game_db.set(`${token}.player2`, player2_id)
            await game_db.set(`${token}.moves`, 0)

            //random 0 || 1 || 2 || 3
            const rng = getRandomInt(3);

            if(rng == 0 || rng == 1) {
                await game_db.set(`${token}.next_move`, player_id)
            } else if(rng == 2 || rng == 3) {
                await game_db.set(`${token}.next_move`, player2_id)
            }

            board_logic(token)

        }

        async function end_game() {
            //usuń partie z tego tokena, ustaw obu graczy na false
        }



    }
}
/*
play pvp with user
$chess play @user


db{

    id_gracza: [
        id partii
    ]

    id partii: [
        plansza,
        gracza o jakim id ruch powinien być
    ]
}

w przyszłości dodac możliwość śledzenia partii po tokenie
coś w stylu:
$chess live <token partii>
i bot wysyła na kanale aktualizacje jak przmieszczają się pionki dopuki partia sie nie skończy
*/