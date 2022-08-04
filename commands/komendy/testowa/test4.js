const Discord = require('discord.js');


    module.exports = {
        name: 'test4',


        execute: async(message, args, client) => {
            if(author != "PAW#5844"){return message.reply("You cant use this command")}

           

                const {settings} = client
                const guild_id = message.guild.id
                const test_text = "working"
            //zapisywanie danych do confiu

            if(!settings.get(guild_id)) {
                settings.set(guild_id, {test_data: []})
            }

            client.settings.get(guild_id).test_data.push(test_text)//dodaje roleid do configu
            client.saveConfig(guild_id)

    }
}
    