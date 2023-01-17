const config = require("../../../config/config")
const owner = config.owner_id
const fs = require("fs")
const os = require("os")

const to_host = require("../../../hosting_server/modules/main")

module.exports = {
    name: "host",

    execute: async (message, args, client) => {
        if (message.author.id != owner) {

            if(check_ram() != true) {
                return message.reply("due to heavy server load, you cannot place the bot, please try again later")
            }

            return message.reply("this command is not publicly available yet")
        }

        if (args[0] == "shutdown") {
            if (args[1] != "testbot") {
                var token2 = args[0]
            } else {
                var token2 = "ODY5NTg3ODc3NDc3MTAxNTkw.GIyN9g.NpipCONWmTPmMR8Qfz09xXgfX6HH1o67_L9HZ0"
            }

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

        if (args[0] != "testbot") {
            var token = args[0]
        } else {
            var token = "ODY5NTg3ODc3NDc3MTAxNTkw.GIyN9g.NpipCONWmTPmMR8Qfz09xXgfX6HH1o67_L9HZ0"
        }

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

function check_ram() {
    const total_mem = os.totalmem()
    const free_mem = os.freemem()

    var total_mem_in_kb = total_mem / 1024;
    var total_mem_in_mb = total_mem_in_kb / 1024;
    var total_mem_in_gb = total_mem_in_mb / 1024;

    var total_free_mem_in_kb = free_mem / 1024;
    var total_free_mem_in_mb = total_free_mem_in_kb / 1024;
    var total_free_mem_in_gb = total_free_mem_in_mb / 1024;

    const used = process.memoryUsage().heapUsed / 1024 / 1024;

    //bot może zajmować max 50% ramu serwera
    if(used > total_free_mem_in_mb / 2) return false


    //1/3 ramu serwera musi być pusta, dla 16 gb == +/- 10gb
    if(total_mem_in_mb * 0.66 < total_free_mem_in_mb) {
        return false
    }else{
        return true
    }
}