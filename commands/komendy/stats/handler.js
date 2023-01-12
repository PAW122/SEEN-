// const auto = require("./auto.js")
// forom auto import members
// module.exports = {
//   //dodać if only_ref === true => wyamga tylko id gildii
//   auto(null, true, guildID)
//   //taksamo z resztą unkcji
// }

module.exports = (client) => {
    const auto = require("./auto")

    const server_list = new Set();
    const cooldown_list = new Set();

    const cooldown = 600000 //10 min
    let is_run = true

    client.on("messageCreate", async message => {
        if(!message.guild) return;
        if (!server_list.has(message.guild.id)) {
            server_list.add(message.guild.id)
        }
        main(message, is_run)
    })

    async function cooldown_func(guildid) {
        setTimeout(() => {
            cooldown_list.delete(guildid)
        }, cooldown);
    }

    function main(message, is_run) {
        if (cooldown_list.has(message.guild.id)) {
            cooldown_func(message.guild.id)
            return is_run = false
        }
        if (is_run == true) {
            cooldown_list.add(message.guild.id)
            setTimeout(() => {
                server_list.forEach(server => {
                    auto.execute(null, null, client, true, server)
                })
            }, cooldown);
        } else {
            console.log("return is run")
        }

    }
}