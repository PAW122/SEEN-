//komenda na zdobywanie leweli
const config = require(process.cwd() + `/config/worker.js`)
const work = config.lvl_command
const worker = config.lvl_command_work
const reason = config.lvl_command_disable

const fs = require("fs")
const client = require(__dirname+ "./index.js")
const Levels = require("discord-xp")

module.exports = {
    name: "lvl",
    description: "",
    //work: worker,
    work: worker,

    execute: async (message, args) => {
        if (work != true) { return message.channel.send(reason) }

        
    }
}