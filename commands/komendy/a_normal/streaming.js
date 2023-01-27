const axios = require("axios")
const Discord = require("discord.js")
const fs = require("fs")
const { joinVoiceChannel } = require('@discordjs/voice');

module.exports = {
    name: "stream",

    execute: async (message, args, client) => {

        if(message.author.id != "438336824516149249") {
            return message.reply("Nie jesteś uprawniony do korzystania z tej komendy")
        }

        if (args[0] == "help") {
            return message.reply("$stream cda <link>")
        }

        const platrorm = args[0]
        const link = args[1]

        if (platrorm != "cda") {
            return message.reply("Use help to get info how command working")
        }
        if (!link) {
            return message.reply("Add link to message")
        }

        const channel = message.member.voice.channel

        const video = await downloadVideo(link)
        //console.log(video)
        streamVideo(client, channel, video)

        async function downloadVideo(link) {
            const response = await axios.get(link);
            const video = await response.data;
            return video;
        }

        const { VoiceBroadcast } = require('discord.js');

        async function streamVideo(client, channel, video) {
            const readableStream = video
            const connection = await joinVoiceChannel({
                channelId: channel.id,
                guildId: channel.guild.id,
                adapterCreator: channel.guild.voiceAdapterCreator
            });
            function createVoiceBroadcast() {
                return new VoiceBroadcast();
            }
            const broadcast = createVoiceBroadcast();
            broadcast.play(readableStream);
            return broadcast;
        }
    }
}