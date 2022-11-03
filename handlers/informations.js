module.exports = (client) => {

    client.on("guildBanAdd", async (guild, user) => {
        console.log(guild)
        console.log(user)
        console.log("user aned from guild")
        return user.send(`You've been banned from the guild: ${guild.name}`)
    })

    client.on('guildMemberRemove', async member => {
        const fetchedLogs = await member.guild.fetchAuditLogs({
            limit: 1,
            type: 'MEMBER_KICK',
        });
        // Since we only have 1 audit log entry in this collection, we can simply grab the first one
        const kickLog = fetchedLogs.entries.first();
    
        // Let's perform a sanity check here and make sure we got *something*
        if (!kickLog) return console.log(`${member.user.tag} left the guild, most likely of their own will.`);
    
        // We now grab the user object of the person who kicked our member
        // Let us also grab the target of this action to double check things
        const { executor, target } = kickLog;
    
        if (kickLog.createdAt < member.joinedAt) { 
            return console.log(`${member.user.tag} left the guild, most likely of their own will.`);
        }
    
        // And now we can update our output with a bit more information
        // We will also run a check to make sure the log we got was for the same kicked member
        if (target.id === member.id) {
            console.log(`${member.user.tag} left the guild; kicked by ${executor.tag}?`);
            member.user.send(`You've been kicked from the guild`)
        } else {
            console.log(`${member.user.tag} left the guild, audit log fetch was inconclusive.`);
        }
    });
}