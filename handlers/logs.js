const fs = require('fs');
const os = require("os");
const Discord = require('discord.js');
const config = require(__dirname + "/../config/config.js")
const save_logs = config.save_logs
const servers_logs = config.servers_logs

module.exports = (data, path, type, srv_id, author_tag, channel_name,client) => {
    
    if(type == 1){
        var d = new Date();
        const dane = d.toLocaleDateString() + "   " + data + "\n"


        if(save_logs == "True"){
            fs.appendFile(path,dane, function (err) {
            if (err) throw err;
            });

        }
    }
//to mi tak spami 
// i wywyłuje to w main.js w messageCreate \/
    if(type == 2){
        var d = new Date();
        const time = new Date().toLocaleTimeString().slice(0,5)
        const srvID = client.guilds.cache.get(srv_id);
        const srv_name = srvID.name
        const dane = d.toLocaleDateString()+ "   "+time+ "   "+srv_name+"   "+srvID+"   "+channel_name+ "   " + author_tag + "   "+ data + "\n"
        const path_name = srv_id + ".txt"
        const path = `./config/logs/${path_name}`

        if(servers_logs == "True"){
            fs.appendFile(path,dane, function (err) {
                if (err) throw err;
                });
        }
    }
}