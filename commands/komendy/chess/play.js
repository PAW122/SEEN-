const { QuickDB } = require("quick.db");
const config = require("./config")
const token_gen = require("./token_gen")
const board_logic = require("./board_logic")
const draw_board = require("./draw_board")
const move = require("./move")
module.exports = {
    execute: async (message, args, client, action) => {

        var db = new QuickDB({ filePath: process.cwd() + `/db/chess/chess.sqlite` });
        var game_db = new QuickDB({ filePath: process.cwd() + `/db/chess/boards.sqlite` });

        if (action == 1) {
            start_game()
        } else if (action == 2) {
            end_game()
        } else if (action == 3) {
            move.execute(message,args,client)
        } else {
            console.log("chess err action is undefind")
            message.channel.send("ERRER")
            return
        }

        async function start_game() {
            console.log("chess start")

            const dedafult_board = [
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0]]

            const player_id = message.author.id
            const player2 = message.mentions.users.first()
            if (!player2) return message.reply("this player dont exist")
            const player2_id = player2.id

            const token = await token_gen.execute()
            if (!token) {
                console.log("err nie wygenerowano tokenu play.js 27")
                return
            }

            const game = await db.get(`${player_id}.check`)
            if (game == true) {
                return message.reply("gracz rozpoczoł już partie")
            }

            const game2 = await db.get(`${player2_id}.check`)
            if (game2 == true) {
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
            await game_db.set(`${token}.set_board`, false)

            //random 0 || 1 || 2 || 3
            const rng = getRandomInt(4)

            if (rng == 0 || rng == 1) {
                await game_db.set(`${token}.next_move`, player_id)
            } else if (rng == 2 || rng == 3) {
                await game_db.set(`${token}.next_move`, player2_id)
            }else {
                console.log("play.js error rng err: " + rng)
            }

            if (await board_logic.execute(token) != true) {
                message.reply("board logic error")
                return console.error("board logic error\n play.js 72")
            }

            draw_board.execute(message, player_id, client)

        }

        async function end_game() {
            //usuń partie z tego tokena, ustaw obu graczy na false
            const player1 = message.author.id
            if (await db.get(`${player1}.check`) != true) {
                return message.reply("Nie jesteś aktualnie w żadnej grze")
            } else {
                const token = await db.get(`${player1}.token`)
                let player2 = await game_db.get(`${token}.player2`)
                if (player2 == player1) {
                    player2 = await game_db.get(`${token}.player1`)
                }

                await db.set(`${player1}.check`, false)
                await db.set(`${player2}.check`, false)

                console.log(player1)
                console.log(player2)


                message.channel.send(`pomyślnie usunięto partie.\n token: ${token} \n player1: <@${player1}>\n player2: <@${player2}>`)

                //todo:
                //zakończone partie muszą być usówane po określonej ilości czasu np po 7dniach
                //co 1h są sprawdzane wszystkie partie do usunięcia z określoną datą
                // np: const data = db.get(rezegranepartie.23.05.2023)
                // i data = lista wszystkich tokenów partii rozegranych tego dnia.

                //zapisywane też powinny być wszystkie ruchy aby przez te 7 dni zanim partia zostanie usunięta była dostępna funkcja
                //oglądania przebiegu partii
                //każdy ruch po kolei zostanie zapisywany w db
                //await db.set('tokenpartii', {ilość_ruchów: 20, move_1 : array z tablicą, move_2: array z tebiluicą})
                //każdy następny ruch musi być dodawany do tablicy za pomocą czegoś ala .push
                //żeby nie usuówać poprzednio dodanych rzeczy
            }
        }

        function getRandomInt(max) {
            return Math.floor(Math.random() * max);
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

w przyszłości zamiast usówać db z partii można przypisywać daną partie do konta gracza
i zrobić chistorię gier
*/