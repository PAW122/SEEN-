const Discord = require('discord.js');
module.exports = {
    name: "test6",

    execute: async(message, args, client) => {
        if(author != "PAW#5844"){return message.reply("You cant use this command")}
        const {settings} = client
        const guild_id = message.guild.id
        const data = message.content.slice(args[0].toString().split('.').length)

        if(!args[0] == `nie podałeś argumenty:
        $test6 add <zadanie>
        $test6 remove <nr_zadania>`)
try{
        if(args[0] == "add"){
            client.settings.set(guild_id, data)
            return message.channel.send("pomyślnie dodano do listy")
        }

        if(args[0] == "remove"){
            client.settings.remove(guild_id, data)
            return message.channel.send("pomyślnie usunięto istę")
        }
}catch(err){
    message.channel.send(`wystąpił error: ${err}`)
}
    }
}

//jezeli użytkownik: test6 add
//dodaje to co dalej napisze do listy

//jeżeli użytkownik: test6 remove <nr zadania z listy>
