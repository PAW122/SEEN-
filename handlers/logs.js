const fs = require('fs');
const os = require("os");
const Discord = require('discord.js');
const config = require(__dirname + "/../config/config.js")
const save_logs = config.save_logs
const servers_logs = config.servers_logs

module.exports = (data, path, type, srv_id, author_tag, channel_name) => {
    
    if(type == 1){
        var d = new Date();
        const dane = d.toLocaleDateString() + "   " + data + "\n"


        if(save_logs == "True"){
            fs.appendFile(path,dane, function (err) {
            if (err) throw err;
            });

        }
    }

    if(type == 2){
        var d = new Date();
        const time = new Date().toLocaleTimeString().slice(0,5)
        const dane = d.toLocaleDateString()+ "   "+time+ "   " +channel_name+ "   " + author_tag + "   "+ data + "\n"
        const path_name = srv_id + ".txt"
        const path = `./config/logs/${path_name}`

        if(servers_logs == "True"){
            fs.appendFile(path,dane, function (err) {
                if (err) throw err;
                });
        }
    }
}