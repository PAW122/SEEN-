const { MessageAttachment } = require('discord.js');
const Discord = require('discord.js');

const reactions_handler = require("./reactions_handler");
var action_type = "scarry"
module.exports = {
    name: "scarry",

    execute: async (message, args, client) => {

        if (args[0] == "help") {
            return message.reply("bot sending random gif.\n u can tag someone example:\n $scarry <@797070806885990431>\n u can too use $reactions help")
        }

        const gifs = 6
        var rng = Math.floor(Math.random() * gifs - 1) + 1;
        if(rng == 0) {var rng = rng += 1}

        const attachment = new MessageAttachment(`commands/komendy/reactions/graphics/scarry/scarry_${rng}.gif`)

        if (args[0] && args[0] != "help") {
            //id pierwszej oznaczonej osoby
            var tag_user = message.mentions.users.first().id

            try {
                message.channel.send(`${message.author} got scared by <@${tag_user}>`);
                message.channel.send({ files: [attachment] });
                reactions_handler(action_type,message)
            } catch (error) {
                console.log(error)
                message.reply("error")
            }
            return
        }

        try {
            message.channel.send(`${message.author} is been scarred`)
            message.channel.send({ files: [attachment] });
            reactions_handler(action_type,message)
        } catch (error) {
            console.log(error)
            message.reply("error")
        }
        return
    }
}