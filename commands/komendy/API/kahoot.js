
//npm i kahoot.js-latest
var pin = "247475"
var name = "SEEN"

const axios = require("axios")

module.exports = {
    name: "kahoot",

    execute: async (message, args, client) => {
        async function main() {

            const link = `https://kahoot.it/reserve/session/${pin}`
        const res = await axios.get(link).catch(err => {
            console.log(err)
        })

        if(res.data.status != 200) return message.reply(`${pin} in not a valid game pin`)

        console.log(res)

        }
        main()

    }

}