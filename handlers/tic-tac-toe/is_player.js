const { QuickDB } = require("quick.db");
module.exports = (message) => {
    check_is_player(message)
}
async function check_is_player(message) {
    const db = new QuickDB({ filePath: process.cwd() + `/db/tic-tac-toe/${message.author.id}.sqlite` });
    const check = await db.get(`check`)
    if (check == true) {
        return true
    }else{
        return false
    }
}
