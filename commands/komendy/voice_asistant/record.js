const Discord = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');
const record = require('node-record-lpcm16');
const { Readable } = require('stream');
const { createOpusStream } = require('@discordjs/opus');
const fs = require('fs');


module.exports = {
    name: "record",

    execute: async (message, args, client) => {
        return console.error("komenda nie dokończona")
        if (args[0] == "start") {
            const connection = joinVoiceChannel({
                channelId: message.channel.id,
                guildId: message.channel.guild.id,
                adapterCreator: message.channel.guild.voiceAdapterCreator,
            });

            // const outputStream = fs.createWriteStream(`./db/recorder/${message.author.id}.wav`);

            const encoder = createOpusStream();
            const receiver = connection.receiver;
        
            const audioStream = new Readable({
              read() {}
            });
        
            receiver.pipe(encoder).pipe(audioStream);
        
            audioStream.pipe(fs.createWriteStream(`./db/recorder/${message.author.id}.wav`));
        
            console.log('Nagrywanie rozpoczęte!');
        }

        if (args[0] == "stop") {
            audioStream.destroy();
            console.log('Nagrywanie zakończone!');
        }
    }
}