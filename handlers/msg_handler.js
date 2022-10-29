const Discord = require("discord.js")
//wczytywanie logów
const logs = require("../handlers/logs")

//wczytywanie configu
const config = require("../config/config.js")
const commands_logs = config.commands_logs
const logs_dir = config.logs_dir
const error_logs_dir = config.error_logs_dir
const save_messages_logs = config.save_messages_logs
const save_messages_logs_dir = config.save_messages_logs_dir

const botId = "<@797070806885990431>"

//yt notyfications
const yt_notify = require("../commands/komendy/API/yt-notifications")

module.exports = (client, prefix, message) => {

    //@seen execute
    if (message.content.startsWith(botId) && !message.author.bot) {
        const args = message.content.slice(botId.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();
        if (!client.command.has(commandName)) return;
        const command = client.command.get(commandName);
        const time = new Date().toLocaleTimeString().slice(0, 5)
        try {
            command.execute(message, args, client);
            if (commands_logs == "True") {
                const data = `${time} ${message.author.tag} use ${commandName}, execute: "✅"`
                console.log(data)
                logs(data, logs_dir, 1)
            }
        } catch (error) {
            if (commands_logs == "True") {
                const data = `${time} ${message.author.tag} use ${commandName}, execute: "❌"`
                console.log(data)
                logs(data, error_logs_dir)
            }
            console.error(error);
            logs(error, error_logs_dir, 1)
            message.reply("Wystąpił błąd");
        }
    } else {
        if (save_messages_logs == "True") {
            logs(`${message.author.tag} ${message.content}`, save_messages_logs_dir, 1)
        }
    }

    //prefix execute
    if (message.content.startsWith(prefix) && !message.author.bot) {//sprawdza prefix, && znaczy and

        const args = message.content.slice(prefix.length).trim().split(/ +/);//oddziela słowa w komendzie spacją i usówa prefix 
        const commandName = args.shift().toLowerCase();//zwraca tylko 1 argument i zmienia na same małe liter
        if (!client.command.has(commandName)) return;//sprawdza czy taka komenda istnieje

        const command = client.command.get(commandName);//pobieramy komende
        const time = new Date().toLocaleTimeString().slice(0, 5)

        try {//wywołujemy komende
            command.execute(message, args, client);
            if (commands_logs == "True") {
                const data = `${time} ${message.author.tag} use ${commandName}, execute: "✅"`
                console.log(data)
                logs(data, logs_dir, 1)
            }
        } catch (error) {
            if (commands_logs == "True") {
                const data = `${time} ${message.author.tag} use ${commandName}, execute: "❌"`
                console.log(data)
                logs(data, error_logs_dir)
            }
            console.error(error);
            logs(error, error_logs_dir, 1)
            message.reply("Wystąpił błąd");
        }
    } else {
        if (save_messages_logs == "True") {
            logs(`${message.author.tag} ${message.content}`, save_messages_logs_dir, 1)
        }
    }
}