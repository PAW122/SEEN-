//npm i mp3-cutter
const MP3Cutter = require('mp3-cutter');
let request = require(`request`);
let fs = require(`fs`);
const Discord = require("discord.js")

const path = process.cwd() + "\\db\\audio_editor"

const help_embed = new Discord.MessageEmbed()

    .setColor(`RANDOM`)
    .setTitle(`mp3editor`)
    .setFields(
        { name: "usage:", value: "**$mp3editor <form> <to>** which point you want to cut the audio piece is seconds" },
        { name: "example", value: "**$mp3editor 1 5**\n a piece from the first to the fifth second will be cut from your file" },
        { name: "informations", value: "bot sends cut fragments!" }
    )

module.exports = {
    name: "mp3editor",
    help: help_embed,

    execute: async (message, args, client) => {

        if (args[0] == "help") {
            const embed = new Discord.MessageEmbed()
                .setTitle("mp3editor")
                .setFields(
                    { name: "usage:", value: "**$mp3editor <form> <to>** which point you want to cut the audio piece is seconds" },
                    { name: "example", value: "**$mp3editor 1 5**\n a piece from the first to the fifth second will be cut from your file" },
                    { name: "informations", value: "bot sends cut fragments!" }
                )

            return message.reply({ embeds: [embed] })
        }

        if (!args[0] || !args[1]) {
            return message.reply("you didn't specify from which to which second you want to cut the audio piece")
        }
        if (isNaN(args[0] || isNaN(args[1]))) {
            return message.reply("use **$mp3editor help** to get informations how this command work")
        }


        if (message.attachments.first()) {//checks if an attachment is sent
            const att_name = message.attachments.first().name
            console.log(att_name)
            if (att_name.endsWith(".mp3")) {//Download only png (customize this)
                download(message.attachments.first().url);//Function I will show later
            } else {
                return message.reply("This command accept only mp3 files")
            }
        }

        function download(url) {
            request.get(url)
                .on('error', console.error)
                .pipe(fs.createWriteStream(`${path}/${message.author.id}.mp3`));
        }

        await sleep(1000);

        MP3Cutter.cut({
            src: `${path}/${message.author.id}.mp3`,
            target: `${path}/edit${message.author.id}.mp3`,
            start: args[0],
            end: args[1]
        })

        await sleep(1000);

        await message.channel.send({
            content: "Your edited file",
            files: [`${path}/edit${message.author.id}.mp3`]
        })

        fs.unlinkSync(`${path}/${message.author.id}.mp3`);
        fs.unlinkSync(`${path}/edit${message.author.id}.mp3`);

    }
}

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}