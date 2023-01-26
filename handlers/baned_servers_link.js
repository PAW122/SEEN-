const servers_list = require("../config/banes_srv.json")
const servers_id_list = servers_list.id

const config = require("../config/config")
const run = config.del_banes_server_links

module.exports = (client) => {
    if(run != true) return;
    client.on("messageCreate", async message => {
        servers_id_list.forEach(server_id => {
            const args = message.content.trim().split(/ +/);
            args.forEach(arg => {
                if(arg == server_id) {
                    message.delete()
                }
            })
        })
    })
}