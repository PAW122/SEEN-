module.exports = (client,guildID) => {

    const guild = client.guilds.cache.get(guildID)
    const channels = guild.channels.cache

    return channels

}