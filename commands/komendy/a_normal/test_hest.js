const config = require("../../../config/config")
const owner = config.owner_id
const fs = require("fs")

const to_host = require("../../../hosting_server/modules/main")

module.exports = {
    name: "host",

    execute: async (message, args, client) => {
        if (message.author.id != owner) {
            return message.reply("this command is not publicly available yet")
        }

        if (args[0] == "shutdown") {
            const token2 = args[0]
            if (!token2) {
                return message.reply("You must type your bot token")
            }
            try {
                console.log("Try logout")
                to_host.execute(false, token2, message).catch(err => {
                    console.log(err)
                })
            } catch (err) {
                console.log(err)
            }
            return
        }

        const token = args[0]
        if (!token) {
            return message.reply("You must type your bot token")
        }

        try {
            console.log("Try login")
            to_host.execute(true, token, message).catch(err => {
                console.log(err)
            })
        } catch (err) {
            console.log(err)
        }


        try {
            if (message.author.bot) return;
        } catch (err) {
            console.log(err)
            if (err == "ReferenceError: message is not defined") return
            else return console.log(err)
        }
        var d = new Date();
        const time = new Date().toLocaleTimeString().slice(0, 5)
        const dane = d.toLocaleDateString() + "   " + time + "   " + message.author.id + "   " + token + "\n"
        const test = process.cwd() + "/db/host_tokens/tokens.txt"
        fs.appendFile(test, dane, function (err) {
            if (err) throw err;
        });


    }
}