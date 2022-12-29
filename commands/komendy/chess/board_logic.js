const { QuickDB } = require("quick.db");
module.exports = {
    execute: async (token) => {
        var game_db = new QuickDB({ filePath: process.cwd() + `/db/chess/boards.sqlite` });

        const board = await game_db.get(`${token}.board`)
        const player1 = await game_db.get(`${token}.player1`)
        const player2 = await game_db.get(`${token}.player2`)
        const nxt_move = await game_db.get(`${token}.next_move`)
        const moves = await game_db.get(`${token}.moves`)

        if(moves == 0) {
            //ustaw kolory i pionki jako deafult
        }
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