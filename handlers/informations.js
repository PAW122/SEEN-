const owner_alert = require("./owner_alert")
const { MessageEmbed } = require('discord.js');
module.exports = (client) => {

    client.on("guildBanAdd", async (guild, user) => {
        if(!user) return;
        if(!guild.name) return console.log("informations.js error => nie znaleziono guild.name")
        try{
            return user.send(`You've been banned from the guild: ${guild.name}`).catch(console.error)
        }catch(err) {
            console.log(err)
        }
    })

    client.on('guildMemberRemove', async member => {
        const fetchedLogs = await member.guild.fetchAuditLogs({
            limit: 1,
            type: 'MEMBER_KICK',
        });
        // Since we only have 1 audit log entry in this collection, we can simply grab the first one
        const kickLog = fetchedLogs.entries.first();
    
        // Let's perform a sanity check here and make sure we got *something*
        if (!kickLog){
            embed_alert(member)
            return console.log(`${member.user.tag} left the guild, most likely of their own will.`);
        }
        // We now grab the user object of the person who kicked our member
        // Let us also grab the target of this action to double check things
        const { executor, target } = kickLog;
    
        if (kickLog.createdAt < member.joinedAt) { 
            embed_alert(member)
            return console.log(`${member.user.tag} left the guild, most likely of their own will.`);
        }
    
        // And now we can update our output with a bit more information
        // We will also run a check to make sure the log we got was for the same kicked member
        if (target.id === member.id) {

            const embed = new MessageEmbed()
                .setTitle('User left guild')
                .setColor('#2F3136')
                .setDescription(`**${member.user.tag}** left the guild; kicked by ${executor.tag}?`);

            console.log(`${member.user.tag} left the guild; kicked by ${executor.tag}?`);

            try{
            member.user.send(`You've been kicked from the ${member.guild} guild`).catch(console.error)
            }catch(err) {
                console.log(err)
            }

            try{
                owner_alert(1,embed,member.guild.id,null,null,client)
            } catch(err){
                console.log(err)
            }
        } else {
            const embed = new MessageEmbed()
                .setTitle('User left guild')
                .setColor('#2F3136')
                .setDescription(`**${member.user.tag}** left the guild, audit log fetch was inconclusive.`);

                try{
                    owner_alert(1,embed,member.guild,null,null,client)
                } catch(err){
                    console.log(err)
                }
            console.log(`${member.user.tag} left the guild, audit log fetch was inconclusive.`);
        }
    });

    async function embed_alert(member) {
        const embed = new MessageEmbed()
        .setTitle('User left guild')
        .setColor('#2F3136')
        .setDescription(`**${member.user.tag}**left the guild, most likely of their own will.`);
        try{
            owner_alert(1,embed,member.guild,null,null,client)
        } catch(err){
            console.log(err)
        }
    }
}