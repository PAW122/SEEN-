module.exports = (client, guildId) => {

    async function main() {
        let data = [];
        var guild = [];
        let guild_info = client.guilds.cache.get(guildId)

        let in_icon = false;
        console.log(guild_info)
        if (guild_info.has_icon) {
            in_icon = true
        }

        let all_members = 0;
        guild_info.members.cache.forEach(member => {
            if (member.user.bot) {
                all_members++
            }
        })

        let channels = 0;
        guild_info.channels.cache.forEach(channel => {
            channels++
        })

        let bans = 0;
        guild_info.bans.cache.forEach(ban => {
            bans++
        })

        let roles = 0;
        guild_info.roles.cache.forEach(role => {
            roles++
        })

        let banner = false;
        if (guild_info.banner) banner = true;

        guild.push(guild_info.id)
        guild.push(guild_info.name)
        guild.push(in_icon)
        guild.push(all_members) // do rozwinięcia na stronie
        guild.push(channels) // do rozwinięcia na stronie
        guild.push(bans) // do rozwinięcia na stronie
        guild.push(roles) // do rozwinięcia na stronie
        guild.push(guild_info.banner)
        guild.push(guild_info.description)
        guild.push(guild_info.verificationLevel)
        guild.push(guild_info.memberCount)
        guild.push(guild_info.premiumProgressBarEnabled)
        guild.push(guild_info.afkTimeout)
        guild.push(guild_info.afkChannelId)
        guild.push(guild_info.systemChannelId)
        guild.push(guild_info.premiumTier)
        guild.push(guild_info.joinedTimestamp)
        guild.push(guild_info.ownerId)

        return guild;
    }

    return main();
}