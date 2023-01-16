module.exports = (client, prefix, message) => {
    if (message.content.startsWith(prefix) && !message.author.bot) {
        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();
        if (!client.host_command.has(commandName)) return;
        const host_command = client.host_command.get(commandName)
        try {
            host_command.execute(message, args, client)
        } catch (err) {
            console.log(err)
            message.reply("Wystąpił błąd")
        }
    }
}