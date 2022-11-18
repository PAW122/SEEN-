const { MessageEmbed } = require('discord.js');
const { QuickDB } = require("quick.db");
const { AuditLogEvent } = require('discord.js');
const owner_alert = require("../handlers/owner_alert")
/*
w każdym client.on sprawdza guild.id i jeżeli guild id
posiada mod.logs w db to będzie wysyłane na dany kanał

na samym początku sprawdzać czy guild.id jest w db jeżeli nie return
*/

//do cooldowna \/
const talkedRecently = new Set();

var cooldown_time = 60000

module.exports = (client) => {
/*
    async function cooldown(guildId, channel_send) {
        if (talkedRecently.has(guildId)) {

        }else{
            const data = ([guildId,20])
            talkedRecently.add(data)
            talkedRecently.add(data)
            console.log(talkedRecently)
            console.log(talkedRecently.lenght)
            if(talkedRecently.has(guildId)) {
                console.log("ma id")
            }
        }
          
    }
    */

    client.on("messageDelete", async (message) => {
        async function main() {


            const guildId = message.guild.id
            const db = new QuickDB({ filePath: process.cwd() + `/db/srv_logs/${guildId}.sqlite` });
            if (await db.get(`check`) != true || await db.get(`message`) == false) { return } else { var channelID = await db.get(`channelId`) }

            const LogChannel = client.channels.cache.get(channelID);
            //cooldown(guildId,LogChannel)

            if (message.attachments.size >= 1) {
                var files = "yes"
            } else {
                var files = "no"
            }

            let logs = await message.guild.fetchAuditLogs({ type: 72 });
            let entry = logs.entries.first();

            if (!entry) return//żeby nie wywalało errora

            //  console.log(logs)
            //  console.log(entry)
            //  console.log(entry.executor)

            if (!entry.executor) {
                const LogChannel = client.channels.cache.get(channelID);
                const TopicUpdate = new MessageEmbed()
                    .setTitle('Message Deleted')
                    .setColor('#2F3136')//kolor embeda (nie ma paska)
                    .setDescription(`Message content:` + "```js\n" + `${message.content}` + "```" + `be deleted on channel: ${message.channel}\n Message files?: ${files} \n Message deleted by: ??`);

                return LogChannel.send({
                    embeds: [TopicUpdate]
                });
            } else {
                const LogChannel = client.channels.cache.get(channelID);
                const TopicUpdate = new MessageEmbed()
                    .setTitle('Message Deleted')
                    .setColor('#2F3136')//kolor embeda (nie ma paska)
                    .setDescription(`Message content:` + "```js\n" + `${message.content}` + "```" + `be deleted on channel: ${message.channel}\n Message files?: ${files} \n Message deleted by: ${entry.executor}`);

                return LogChannel.send({
                    embeds: [TopicUpdate]
                });
            }
        }//wywala błąd z entry executor
        try {
            main()
        } catch (err) { return console.log(err) }
    });

    // Channel Topic Updating 
    client.on("guildChannelTopicUpdate", (channel, oldTopic, newTopic) => {
        async function main() {
            const guildId = channel.guild.id
            const db = new QuickDB({ filePath: process.cwd() + `/db/srv_logs/${guildId}.sqlite` });
            if (await db.get(`check`) != true || await db.get(`guildChannelTopicUpdate`) != true) { return } else { var channelID = await db.get(`channelId`) }

            const LogChannel = client.channels.cache.get(channelID);
            const TopicUpdate = new MessageEmbed()
                .setTitle('Topic Updated!')
                .setColor('#2F3136')
                .setDescription(`${channel} Topic changed from **${oldTopic}** to **${newTopic}**`);

            return LogChannel.send({
                embeds: [TopicUpdate]
            });
        }
        main()
    });

    // unhandled Guild Channel Update
    client.on("unhandledGuildChannelUpdate", (oldChannel, newChannel) => {

        async function main() {
            const guildId = oldChannel.guild.id
            const db = new QuickDB({ filePath: process.cwd() + `/db/srv_logs/${guildId}.sqlite` });
            if (await db.get(`check`) != true || await db.get(`unhandledGuildChannelUpdate`) != true) { return } else { var channelID = await db.get(`channelId`) }


            const LogChannel = client.channels.cache.get(channelID);
            const unhandledGuildChannelUpdate = new MessageEmbed()
                .setTitle('Channel Updated!')
                .setColor('#2F3136')
                .setDescription("Channel '" + oldChannel.id + "' was edited but discord-logs couldn't find what was updated...");

            return LogChannel.send({
                embeds: [unhandledGuildChannelUpdate]
            });
        }
        main()

    });

    // Member Started Boosting
    client.on("guildMemberBoost", (member) => {

        async function main() {
            const guildId = member.guild.id
            const db = new QuickDB({ filePath: process.cwd() + `/db/srv_logs/${guildId}.sqlite` });
            if (await db.get(`check`) != true || await db.get(`guildMemberBoost`) != true) { return } else { var channelID = await db.get(`channelId`) }


            const LogChannel = client.channels.cache.get(channelID);
            const MemberBoost = new MessageEmbed()
                .setTitle('User Started Boosting!')
                .setColor('#2F3136')
                .setDescription(`**${member.user.tag}** has started boosting  ${member.guild.name}!`);
            return LogChannel.send({
                embeds: [MemberBoost]
            });
        }
        main()

    })

    // Member Unboosted
    client.on("guildMemberUnboost", (member) => {

        async function main() {
            const guildId = member.guild.id
            const db = new QuickDB({ filePath: process.cwd() + `/db/srv_logs/${guildId}.sqlite` });
            if (await db.get(`check`) != true || await db.get(`guildMemberUnboost`) != true) { return } else { var channelID = await db.get(`channelId`) }



            const LogChannel = client.channels.cache.get(channelID);
            const MemberUnboost = new MessageEmbed()
                .setTitle('User Stoped Boosting!')
                .setColor('#2F3136')
                .setDescription(`**${member.user.tag}** has stopped boosting  ${member.guild.name}!`);

            return LogChannel.send({
                embeds: [MemberUnboost]
            });
        }
        main()

    })

    // Member Got Role
    client.on("guildMemberRoleAdd", (member, role) => {

        async function main() {
            const guildId = member.guild.id
            const db = new QuickDB({ filePath: process.cwd() + `/db/srv_logs/${guildId}.sqlite` });
            if (await db.get(`check`) != true || await db.get(`guildMemberRoleAdd`) != true) { return } else { var channelID = await db.get(`channelId`) }


            const LogChannel = client.channels.cache.get(channelID);
            const MemberRoleAdd = new MessageEmbed()
                .setTitle('User Got Role!')
                .setColor('#2F3136')
                .setDescription(`**${member.user.tag}** got the role \`${role.name}\``);

            try {
                owner_alert(1, MemberRoleAdd, guildId, null, null, client)
            } catch (err) {
                console.log(err)
            }

            return LogChannel.send({
                embeds: [MemberRoleAdd]
            });

        }
        main()

    })

    // Member Lost Role
    client.on("guildMemberRoleRemove", (member, role) => {

        async function main() {
            const guildId = member.guild.id
            const db = new QuickDB({ filePath: process.cwd() + `/db/srv_logs/${guildId}.sqlite` });
            if (await db.get(`check`) != true || await db.get(`guildMemberRoleRemove`) != true) { return } else { var channelID = await db.get(`channelId`) }


            const LogChannel = client.channels.cache.get(channelID);
            const MemberRoleRemove = new MessageEmbed()
                .setTitle('User Lost Role!')
                .setColor('#2F3136')
                .setDescription(`**${member.user.tag}** lost the role \`${role.name}\``);
            try {
                try {
                    owner_alert(1, MemberRoleRemove, guildId, null, null, client)
                } catch (err) {
                    console.log(err)
                }

                return LogChannel.send({
                    embeds: [MemberRoleRemove]
                });
            } catch (err) {
                console.log(err)
            }
        }
        main()

    })

    // Nickname Changed
    client.on("guildMemberNicknameUpdate", (member, oldNickname, newNickname) => {

        async function main() {
            const guildId = member.guild.id
            const db = new QuickDB({ filePath: process.cwd() + `/db/srv_logs/${guildId}.sqlite` });
            if (await db.get(`check`) != true || await db.get(`guildMemberNicknameUpdate`) != true) { return } else { var channelID = await db.get(`channelId`) }


            const LogChannel = client.channels.cache.get(channelID);
            const MemberNicknameUpdate = new MessageEmbed()
                .setTitle('Nickname Updated')
                .setColor('#2F3136')
                .setDescription(`${member.user.tag} changed nickname from \`${oldNickname}\` to \`${newNickname}\``);

            return LogChannel.send({
                embeds: [MemberNicknameUpdate]
            });
        }
        main()

    })

    // Member Joined
    client.on("guildMemberEntered", (member) => {

        async function main() {
            const guildId = member.guild.id
            const db = new QuickDB({ filePath: process.cwd() + `/db/srv_logs/${guildId}.sqlite` });
            if (await db.get(`check`) != true || await db.get(`guildMemberEntered`) != true) { return } else { var channelID = await db.get(`channelId`) }


            const LogChannel = client.channels.cache.get(channelID);
            const MemberJoined = new MessageEmbed()
                .setTitle('User Joined')
                .setColor('#2F3136')
                .setDescription(`${member.user.tag} Joined!`);

            try {
                owner_alert(1, MemberJoined, guildId, null, null, client)
            } catch (err) {
                console.log(err)
            }

            return LogChannel.send({
                embeds: [MemberJoined]
            });
        }
        main()

    })

    // Server Boost Level Up
    client.on("guildBoostLevelUp", (guild, oldLevel, newLevel) => {

        async function main() {
            const guildId = guild.id
            const db = new QuickDB({ filePath: process.cwd() + `/db/srv_logs/${guildId}.sqlite` });
            if (await db.get(`check`) != true || await db.get(`guildBoostLevelUp`) != true) { return } else { var channelID = await db.get(`channelId`) }


            const LogChannel = client.channels.cache.get(channelID);
            const LevelUp = new MessageEmbed()
                .setTitle('Server Boost Level Up')
                .setColor('#2F3136')
                .setDescription(`${guild.name} reached the boost level ${newLevel}`);

            return LogChannel.send({
                embeds: [LevelUp]
            });
        }
        main()

    })

    // Server Boost Level Down
    client.on("guildBoostLevelDown", (guild, oldLevel, newLevel) => {

        async function main() {
            const guildId = guild.id
            const db = new QuickDB({ filePath: process.cwd() + `/db/srv_logs/${guildId}.sqlite` });
            if (await db.get(`check`) != true || await db.get(`guildBoostLevelDown`) != true) { return } else { var channelID = await db.get(`channelId`) }


            const LogChannel = client.channels.cache.get(channelID);
            const LevelDown = new MessageEmbed()
                .setTitle('Server Boost Level Down')
                .setColor('#2F3136')
                .setDescription(`${guild.name} lost a level from ${oldLevel} to ${newLevel}`);

            return LogChannel.send({
                embeds: [LevelDown]
            });
        }
        main()

    })

    // Banner Added
    client.on("guildBannerAdd", (guild, bannerURL) => {

        async function main() {
            const guildId = guild.id
            const db = new QuickDB({ filePath: process.cwd() + `/db/srv_logs/${guildId}.sqlite` });
            if (await db.get(`check`) != true || await db.get(`guildBannerAdd`) != true) { return } else { var channelID = await db.get(`channelId`) }


            const LogChannel = client.channels.cache.get(channelID);
            const BannerAdd = new MessageEmbed()
                .setTitle('Server Got a new banner')
                .setColor('#2F3136')
                .setImage(bannerURL)

            return LogChannel.send({
                embeds: [BannerAdd]
            });
        }
        main()

    })

    // AFK Channel Added
    client.on("guildAfkChannelAdd", (guild, afkChannel) => {

        async function main() {
            const guildId = guild.id
            const db = new QuickDB({ filePath: process.cwd() + `/db/srv_logs/${guildId}.sqlite` });
            if (await db.get(`check`) != true || await db.get(`guildAfkChannelAdd`) != true) { return } else { var channelID = await db.get(`channelId`) }


            const LogChannel = client.channels.cache.get(channelID);
            const AFKAdd = new MessageEmbed()
                .setTitle('AFK Channel Added')
                .setColor('#2F3136')
                .setDescription(`${guild.name} has a new afk channel ${afkChannel}`);

            return LogChannel.send({
                embeds: [AFKAdd]
            });
        }
        main()

    })

    // Guild Vanity Add
    client.on("guildVanityURLAdd", (guild, vanityURL) => {

        async function main() {
            const guildId = guild.id
            const db = new QuickDB({ filePath: process.cwd() + `/db/srv_logs/${guildId}.sqlite` });
            if (await db.get(`check`) != true || await db.get(`guildVanityURLAdd`) != true) { return } else { var channelID = await db.get(`channelId`) }


            const LogChannel = client.channels.cache.get(channelID);
            const VanityAdd = new MessageEmbed()
                .setTitle('Vanity Link Added')
                .setColor('#2F3136')
                .setDescription(`${guild.name} has a vanity link ${vanityURL}`);

            return LogChannel.send({
                embeds: [VanityAdd]
            });
        }
        main()

    })

    // Guild Vanity Remove
    client.on("guildVanityURLRemove", (guild, vanityURL) => {

        async function main() {
            const guildId = guild.id
            const db = new QuickDB({ filePath: process.cwd() + `/db/srv_logs/${guildId}.sqlite` });
            if (await db.get(`check`) != true || await db.get(`guildVanityURLRemove`) != true) { return } else { var channelID = await db.get(`channelId`) }


            const LogChannel = client.channels.cache.get(channelID);
            const VanityRemove = new MessageEmbed()
                .setTitle('Vanity Link Removed')
                .setColor('#2F3136')
                .setDescription(`${guild.name} has removed its vanity URL ${vanityURL}`);

            return LogChannel.send({
                embeds: [VanityRemove]
            });
        }
        main()

    })

    // Guild Vanity Link Updated
    client.on("guildVanityURLUpdate", (guild, oldVanityURL, newVanityURL) => {

        async function main() {
            const guildId = guild.id
            const db = new QuickDB({ filePath: process.cwd() + `/db/srv_logs/${guildId}.sqlite` });
            if (await db.get(`check`) != true || await db.get(`guildVanityURLUpdate`) != true) { return } else { var channelID = await db.get(`channelId`) }


            const LogChannel = client.channels.cache.get(channelID);
            const VanityUpdated = new MessageEmbed()
                .setTitle('Vanity Link Updated')
                .setColor('#2F3136')
                .setDescription(`${guild.name} has changed its vanity URL from ${oldVanityURL} to ${newVanityURL}!`);

            return LogChannel.send({
                embeds: [VanityUpdated]
            });
        }
        main()

    })

    // Message Pinned
    client.on("messagePinned", (message) => {

        async function main() {
            const guildId = message.guild.id
            const db = new QuickDB({ filePath: process.cwd() + `/db/srv_logs/${guildId}.sqlite` });
            if (await db.get(`check`) != true || await db.get(`messagePinned`) != true) { return } else { var channelID = await db.get(`channelId`) }


            const LogChannel = client.channels.cache.get(channelID);
            const MessagePinned = new MessageEmbed()
                .setTitle('Message Pinned')
                .setColor('#2F3136')
                .setDescription("This message has been pinned : " + message);

            return LogChannel.send({
                embeds: [MessagePinned]
            });
        }
        main()

    })

    // Message Edited
    client.on("messageContentEdited", (message, oldContent, newContent) => {

        async function main() {
            const guildId = message.guild.id
            const db = new QuickDB({ filePath: process.cwd() + `/db/srv_logs/${guildId}.sqlite` });
            if (await db.get(`check`) != true || await db.get(`messageContentEdited`) != true) { return } else { var channelID = await db.get(`channelId`) }


            const LogChannel = client.channels.cache.get(channelID);

            const MessageEdited = new MessageEmbed()
                .setTitle('Message Edited')
                .setColor('#2F3136')
                .setDescription(`Message Edited from \n \`${oldContent}\`\n to \n \`${newContent}\``);

            return LogChannel.send({
                embeds: [MessageEdited]
            });
        }
        main()

    })

    // Member Became Offline
    client.on("guildMemberOffline", (member, oldStatus) => {

        async function main() {
            const guildId = member.guild.id
            const db = new QuickDB({ filePath: process.cwd() + `/db/srv_logs/${guildId}.sqlite` });
            if (await db.get(`check`) != true || await db.get(`guildMemberOffline`) != true) { return } else { var channelID = await db.get(`channelId`) }


            const LogChannel = client.channels.cache.get(channelID);
            const MemberOffline = new MessageEmbed()
                .setTitle('Message Offline')
                .setColor('#2F3136')
                .setDescription(member.user.tag + " became offline!");

            return LogChannel.send({
                embeds: [MemberOffline]
            });
        }
        main()

    })

    // Member Became Online
    client.on("guildMemberOnline", (member, newStatus) => {

        async function main() {
            const guildId = member.guild.id
            const db = new QuickDB({ filePath: process.cwd() + `/db/srv_logs/${guildId}.sqlite` });
            if (await db.get(`check`) != true || await db.get(`guildMemberOnline`) != true) { return } else { var channelID = await db.get(`channelId`) }


            const LogChannel = client.channels.cache.get(channelID);
            const MemberOnline = new MessageEmbed()
                .setTitle('Message Online')
                .setColor('#2F3136')
                .setDescription(member.user.tag + " was offline and is now " + newStatus + "!");

            return LogChannel.send({
                embeds: [MemberOnline]
            });
        }
        main()

    })
    /*
    // Role Position Updated
    client.on("rolePositionUpdate", (role, oldPosition, newPosition) => {
        
        async function main(){
        const guildId = guild.id
        const db = new QuickDB({ filePath: process.cwd() + `/db/srv_logs/${guildId}.sqlite` });
        if (await db.get(`check`) != true) {return}else{var channelID = await db.get(`channelId`)}
        
    
        const LogChannel = client.channels.cache.get(guildId);  
        const RolePositionUpdated = new MessageEmbed()
            .setTitle('Role Position Updated')
            .setColor('#2F3136')
            .setDescription(role.name + " role was at position " + oldPosition + " and now is at position " + newPosition);
    
        return LogChannel.send({
            embeds: [RolePositionUpdated]
        });
    }
    main()
    
    })
    */
    /*
    // Role Permission Updated
    client.on("rolePermissionsUpdate", (role, oldPermissions, newPermissions) => {
    
        async function main(){
    const guildId = guild.id
        const db = new QuickDB({ filePath: process.cwd() + `/db/srv_logs/${guildId}.sqlite` });
        if (await db.get(`check`) != true) {return}else{var channelID = await db.get(`channelId`)}
        
    
        const LogChannel = client.channels.cache.get(channelID);  
        const RolePermissionUpdated = new MessageEmbed()
            .setTitle('Role Permission Updated')
            .setColor('#2F3136')
            .setDescription(role.name + " had as permissions " + oldPermissions + " and now has as permissions " + newPermissions);
    
        return LogChannel.send({
            embeds: [RolePermissionUpdated]
        });
    }
    main()
    
    })
    */
    /*
    // Avatar Updated
    client.on("userAvatarUpdate", (user, oldAvatarURL, newAvatarURL) => {
    
        async function main(){
    const guildId = user.guild.id
        const db = new QuickDB({ filePath: process.cwd() + `/db/srv_logs/${guildId}.sqlite` });
        if (await db.get(`check`) != true|| await db.get(`userAvatarUpdate`) != true) {return}else{var channelID = await db.get(`channelId`)}
        
    
        const LogChannel = client.channels.cache.get(channelID);  
        const AvatarUpdated = new MessageEmbed()
            .setTitle('Avatar Updated')
            .setColor('#2F3136')
            .setDescription(`${user.tag} updated avatar from [Old Avatar](${oldAvatarURL}) to [New Avatar(${newAvatarURL})]`);
    
        return LogChannel.send({
            embeds: [AvatarUpdated]
        });
    }
    main()
    
    })
    */
    /*
    // Username Updated
    client.on("userUsernameUpdate", (user, oldUsername, newUsername) => {
    
        async function main(){
    const guildId = user.guild.id
        const db = new QuickDB({ filePath: process.cwd() + `/db/srv_logs/${guildId}.sqlite` });
        if (await db.get(`check`) != true) {return}else{var channelID = await db.get(`channelId`)}
        
    
        const LogChannel = client.channels.cache.get(channelID);  
        const Username = new MessageEmbed()
            .setTitle('Username Updated')
            .setColor('#2F3136')
            .setDescription(`${user.tag} updated thier username from ${oldUsername} to ${newUsername}`);
    
        return LogChannel.send({
            embeds: [Username]
        });
    }
    main()
    
    })
    */

    /*
    // Discriminator Updated
    client.on("userDiscriminatorUpdate", (user, oldDiscriminator, newDiscriminator,guild) => {
    
        async function main(){
    const guildId = guild.id
        const db = new QuickDB({ filePath: process.cwd() + `/db/srv_logs/${guildId}.sqlite` });
        if (await db.get(`check`) != true) {return}else{var channelID = await db.get(`channelId`)}
        
    
        const LogChannel = client.channels.cache.get(channelID);  
        const Discriminator = new MessageEmbed()
            .setTitle('Discriminator Updated')
            .setColor('#2F3136')
            .setDescription(`${user.tag} updated thier discriminator from ${oldDiscriminator} to ${oldDiscriminator}`);
    
        return LogChannel.send({
            embeds: [Discriminator]
        });
    }
    main()
    
    })
    */
    /*
    // Flags Updated
    client.on("userFlagsUpdate", (user, oldFlags, newFlag) => {
    
        async function main(){
    const guildId = oldFlags.guild.id
        const db = new QuickDB({ filePath: process.cwd() + `/db/srv_logs/${guildId}.sqlite` });
        if (await db.get(`check`) != true|| await db.get(`userFlagsUpdate`) != true) {return}else{var channelID = await db.get(`channelId`)}
        
    
        const LogChannel = client.channels.cache.get(channelID);  
        const FlagsUpdate = new MessageEmbed()
            .setTitle('Flags Updated')
            .setColor('#2F3136')
            .setDescription(`${user.tag} updated thier flags from ${oldFlags} to ${newFlags}`);
    
        return LogChannel.send({
            embeds: [FlagsUpdate]
        });
    }
    main()
    
    })
    */

    // Joined VC
    client.on("voiceChannelJoin", (member, channel) => {

        async function main() {
            const guildId = channel.guild.id
            const db = new QuickDB({ filePath: process.cwd() + `/db/srv_logs/${guildId}.sqlite` });
            if (await db.get(`check`) != true || await db.get(`voiceChannelJoin`) != true) { return } else { var channelID = await db.get(`channelId`) }


            const LogChannel = client.channels.cache.get(channelID);
            const VCJoined = new MessageEmbed()
                .setTitle('Voice Channel Joined')
                .setColor('#2F3136')
                .setDescription(member.user.tag + " joined " + `${channel}` + "!");

            return LogChannel.send({
                embeds: [VCJoined]
            });
        }
        main()

    })

    // Left VC
    client.on("voiceChannelLeave", (member, channel) => {

        async function main() {
            const guildId = channel.guild.id
            const db = new QuickDB({ filePath: process.cwd() + `/db/srv_logs/${guildId}.sqlite` });
            if (await db.get(`check`) != true || await db.get(`voiceChannelLeave`) != true) { return } else { var channelID = await db.get(`channelId`) }


            const LogChannel = client.channels.cache.get(channelID);
            const VCLeft = new MessageEmbed()
                .setTitle('Voice Channel Left')
                .setColor('#2F3136')
                .setDescription(member.user.tag + " left " + `${channel}` + "!");

            return LogChannel.send({
                embeds: [VCLeft]
            });
        }
        main()

    })

    // VC Switch
    client.on("voiceChannelSwitch", (member, oldChannel, newChannel) => {

        async function main() {
            const guildId = member.guild.id
            const db = new QuickDB({ filePath: process.cwd() + `/db/srv_logs/${guildId}.sqlite` });
            if (await db.get(`check`) != true || await db.get(`voiceChannelSwitch`) != true) { return } else { var channelID = await db.get(`channelId`) }


            const LogChannel = client.channels.cache.get(channelID);
            const VCSwitch = new MessageEmbed()
                .setTitle('Voice Channel Switched')
                .setColor('#2F3136')
                .setDescription(member.user.tag + " left " + oldChannel.name + " and joined " + newChannel.name + "!");

            return LogChannel.send({
                embeds: [VCSwitch]
            });
        }
        main()

    })

    // VC Mute
    client.on("voiceChannelMute", (member, muteType) => {

        async function main() {
            const guildId = member.guild.id
            const db = new QuickDB({ filePath: process.cwd() + `/db/srv_logs/${guildId}.sqlite` });
            if (await db.get(`check`) != true || await db.get(`voiceChannelMute`) != true) { return } else { var channelID = await db.get(`channelId`) }


            const LogChannel = client.channels.cache.get(channelID);
            const VCMute = new MessageEmbed()
                .setTitle('User Muted')
                .setColor('#2F3136')
                .setDescription(member.user.tag + " became muted! (type: " + muteType + ")");

            return LogChannel.send({
                embeds: [VCMute]
            });
        }
        main()

    })

    // VC Unmute
    client.on("voiceChannelUnmute", (member, oldMuteType) => {

        async function main() {
            const guildId = member.guild.id
            const db = new QuickDB({ filePath: process.cwd() + `/db/srv_logs/${guildId}.sqlite` });
            if (await db.get(`check`) != true || await db.get(`voiceChannelUnmute`) != true) { return } else { var channelID = await db.get(`channelId`) }

            const LogChannel = client.channels.cache.get(channelID);
            const VCUnmute = new MessageEmbed()
                .setTitle('User Unmuted')
                .setColor('#2F3136')
                .setDescription(member.user.tag + " became unmuted!");

            return LogChannel.send({
                embeds: [VCUnmute]
            });
        }
        main()

    })

    // VC Defean
    client.on("voiceChannelDeaf", (member, deafType) => {

        async function main() {
            const guildId = member.guild.id
            const db = new QuickDB({ filePath: process.cwd() + `/db/srv_logs/${guildId}.sqlite` });
            if (await db.get(`check`) != true || await db.get(`voiceChannelDeaf`) != true) { return } else { var channelID = await db.get(`channelId`) }


            const LogChannel = client.channels.cache.get(channelID);
            const VCDeafen = new MessageEmbed()
                .setTitle('User Deafend')
                .setColor('#2F3136')
                .setDescription(member.user.tag + " become deafed!");

            return LogChannel.send({
                embeds: [VCDeafen]
            });
        }
        main()

    })

    // VC Undefean
    client.on("voiceChannelUndeaf", (member, deafType) => {

        async function main() {
            const guildId = member.guild.id
            const db = new QuickDB({ filePath: process.cwd() + `/db/srv_logs/${guildId}.sqlite` });
            if (await db.get(`check`) != true || await db.get(`voiceChannelUndeaf`) != true) { return } else { var channelID = await db.get(`channelId`) }

            const LogChannel = client.channels.cache.get(channelID);
            const VCUndeafen = new MessageEmbed()
                .setTitle('User Undeafend')
                .setColor('#2F3136')
                .setDescription(member.user.tag + " become undeafed!");

            return LogChannel.send({
                embeds: [VCUndeafen]
            });
        }
        main()

    })

    // User Started to Stream
    client.on("voiceStreamingStart", (member, voiceChannel) => {

        async function main() {
            const guildId = member.guild.id
            const db = new QuickDB({ filePath: process.cwd() + `/db/srv_logs/${guildId}.sqlite` });
            if (await db.get(`check`) != true || await db.get(`voiceStreamingStart`) != true) { return } else { var channelID = await db.get(`channelId`) }


            const LogChannel = client.channels.cache.get(channelID);
            const UserStreaming = new MessageEmbed()
                .setTitle('User Started to Stream')
                .setColor('#2F3136')
                .setDescription(member.user.tag + " started streaming in " + voiceChannel.name);

            return LogChannel.send({
                embeds: [UserStreaming]
            });
        }
        main()

    })

    // User Stopped to Stream
    client.on("voiceStreamingStop", (member, voiceChannel) => {

        async function main() {
            const guildId = member.guild.id
            const db = new QuickDB({ filePath: process.cwd() + `/db/srv_logs/${guildId}.sqlite` });
            if (await db.get(`check`) != true || await db.get(`voiceStreamingStop`) != true) { return } else { var channelID = await db.get(`channelId`) }


            const LogChannel = client.channels.cache.get(channelID);
            const UserStoppedStreaming = new MessageEmbed()
                .setTitle('User Stopped to Stream')
                .setColor('#2F3136')
                .setDescription(member.user.tag + " stopped streaming in " + voiceChannel.name);

            return LogChannel.send({
                embeds: [UserStoppedStreaming]
            });
        }
        main()

    })
}