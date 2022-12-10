module.exports = () => {
    function bestMove() {
        let bestScore = -Infinity;
        let move;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {

                if (board[i][j] == '') {
                    board[i][j] = ai;
                    let score = minimax(board, 0, false);
                    board[i][j] = '';
                    if (score > bestScore) {
                        bestScore = score;
                        move = { i, j }
                    }
                }
            }
        }
        board[move.i][move.j] = ai;
        currentPlayer = human;
    }

    let scores = {
        X: 1,
        O: -1,
        tie: 0
    }

    function minimax(board, depth, isMaximaizing) {
        let result = checkWinner();
        if (result !== null) {
            let score = scores[result];
            return score;
        }

        if (isMaximaizing) {
            let bestScore = -Infinity
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {

                    if (board[i][j] == '') {
                        board[i][j] = ai;
                        let score = minimax(board, depth + 1, false);
                        board[i][j] = '';
                        bestScore = max(score, bestScore);
                    }
                }
            }
            return bestScore;
        } else {
            let bestScore = Infinity
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {

                    if (board[i][j] == '') {
                        board[i][j] = human;
                        let score = minimax(board, depth + 1, true);
                        board[i][j] = '';
                        bestScore = min(score, bestScore)
                    }
                }
            }
            return bestScore;
        }
    }

        function checkWinner() {
            //do napisania
        }
    }