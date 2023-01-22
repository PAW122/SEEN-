//image-data-uri
//npm install -g qrcode
var path = process.cwd() + "\\db\\qe_codes"
const fs = require("fs")
const Discord = require("discord.js")

const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle("QR generator")
    .setFields(
        { name: "how use?", value: "$qr_gen <qr content>" },
        { name: "example", value: "$qr_gen your own qr code" }
    )

module.exports = {
    name: "qr_gen",
    help: embed,

    execute: async (message, args, client) => {
        var QRCode = require('qrcode')

        if (!args[0]) {
            return message.reply("u cant create blank qr code")
        }

        const qr_data = args.join('')

        QRCode.toDataURL(qr_data, function (err, url) {

            const ImageDataURI = require('image-data-uri');

            const dataURI = url

            ImageDataURI.outputFile(dataURI, `${path}/${message.author.id}.png`)

        })

        await sleep(1000);

        await message.channel.send({
            content: "Your qr code",
            files: [`${path}/${message.author.id}.png`]
        })
        //usówanie plików
        //fs.unlinkSync(`${path}/${message.author.id}.png`);
    }
}

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}