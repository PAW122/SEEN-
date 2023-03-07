module.exports = async (client, guildId, channelId, messageId) => {
    try {
        const guild = client.guilds.cache.get(guildId)
        const all_channels = guild.channels.cache
        const channell = all_channels.get(channelId)
        const message_target = channell.messages.fetch(messageId)
        client.channels.fetch(channelId).then(channel => {
            channel.messages.delete(messageId);
        });
        return true
    }catch(err) {
        console.error(err)
        return false
    }
}