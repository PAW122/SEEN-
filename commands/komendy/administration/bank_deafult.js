//resetuje hajs w banku globalnym do 0

const config = require("../../../config/config")
const prefix = config.prefix
const owner_id = config.owner_id
const { QuickDB } = require("quick.db");

module.exports = {
    name: "bank_deafult",

    execute: async (message, args, client) => {

        if (message.author.id != owner_id) {
            return message.reply("Only bot owner can use this command")
        }

        if (args[0] == "help") {
            return message.reply("**HELP**:Restart global bank to 0 coins. Only bot owner can use this command")
        }
        async function main() {
            const guildId = message.guild.id
            const globaldb = new QuickDB({ filePath: process.cwd() + `/db/economy/local_economy/${guildId}global.sqlite` });

            var def_bank_amount = 0

            await globaldb.set(`check`, true)
            await globaldb.set(`roll_lost`, def_bank_amount)

            return message.reply(`Global bank coins set to 0 sucesfully`)
        }
        try {
            main()
        } catch (err) {
            console.log(err)
            return message.reply("Bank deafult system -- **ERROR**")
        }
    }
}