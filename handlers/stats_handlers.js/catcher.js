const user_messages_stats = require("./user_msg_stats")
module.exports = (client) => {
    return console.log("carcher.js jest wyłączony \n komenda do dokończenia !!")
    client.on("messageCreate", async message => {
        user_messages_stats(message)
    })
}