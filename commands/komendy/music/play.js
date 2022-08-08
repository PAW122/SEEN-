const client = require("../../../main")
    const { SlashCommandBuilder } = require("@discordjs/builders")
    const { MessageEmbed } = require("discord.js")
    const { QueryType } = require("discord-player")
    
    module.exports = {
        isSlash: true,
        data: new SlashCommandBuilder()
            .setName("play")
            .setDescription("loads songs from youtube")
            .addSubcommand((subcommand) =>
                subcommand
                    .setName("song")
                    .setDescription("Loads a single song from a url")
                    .addStringOption((option) => option.setName("url").setDescription("the song's url").setRequired(true))
            )
            .addSubcommand((subcommand) =>
                subcommand
                    .setName("playlist")
                    .setDescription("Loads a playlist of songs from a url")
                    .addStringOption((option) => option.setName("url").setDescription("the playlist's url").setRequired(true))
            )
            .addSubcommand((subcommand) =>
                subcommand
                    .setName("search")
                    .setDescription("Searches for sogn based on provided keywords")
                    .addStringOption((option) =>
                        option.setName("searchterms").setDescription("the search keywords").setRequired(true)
                    )
            ),
            executeInteraction: async (inter) => {
            if (!inter.member.voice.channel) return intereditReply("You need to be in a VC to use this command")
    
            const queue = await client.player.createQueue(interguild)//!
            if (!queue.connection) await queue.connect(intermember.voice.channel)
    
            let embed = new MessageEmbed()
    
            if (interoptions.getSubcommand() === "song") {
                let url = interoptions.getString("url")
                const result = await client.player.search(url, {
                    requestedBy: interuser,
                    searchEngine: QueryType.YOUTUBE_VIDEO
                })
                if (result.tracks.length === 0)
                    return intereditReply("No results")
                
                const song = result.tracks[0]
                await queue.addTrack(song)
                embed
                    .setDescription(`**[${song.title}](${song.url})** has been added to the Queue`)
                    .setThumbnail(song.thumbnail)
                    .setFooter({ text: `Duration: ${song.duration}`})
    
            } else if (interoptions.getSubcommand() === "playlist") {
                let url = interoptions.getString("url")
                const result = await client.player.search(url, {
                    requestedBy: interuser,
                    searchEngine: QueryType.YOUTUBE_PLAYLIST
                })
    
                if (result.tracks.length === 0)
                    return intereditReply("No results")
                
                const playlist = result.playlist
                await queue.addTracks(result.tracks)
                embed
                    .setDescription(`**${result.tracks.length} songs from [${playlist.title}](${playlist.url})** have been added to the Queue`)
                    .setThumbnail(playlist.thumbnail)
            } else if (interoptions.getSubcommand() === "search") {
                let url = interoptions.getString("searchterms")
                const result = await client.player.search(url, {
                    requestedBy: interuser,
                    searchEngine: QueryType.AUTO
                })
    
                if (result.tracks.length === 0)
                    return intereditReply("No results")
                
                const song = result.tracks[0]
                await queue.addTrack(song)
                embed
                    .setDescription(`**[${song.title}](${song.url})** has been added to the Queue`)
                    .setThumbnail(song.thumbnail)
                    .setFooter({ text: `Duration: ${song.duration}`})
            }
            if (!queue.playing) await queue.play()
            await intereditReply({
                embeds: [embed]
            })
        },
    }