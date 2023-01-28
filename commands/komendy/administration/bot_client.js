const config = require("../../../config/config")
const prefix = config.prefix
const owner_id = config.owner_id
const Discord = require("discord.js")

module.exports = {
    name: "bot_client",

    execute: async (message, args, client) => {
        if (message.author.id != owner_id) {
            return console.log(message.author.id + "  try use $bot_client command")
        }

        if (args[0] == "help") {
            const embed = new Discord.MessageEmbed()
                .setTitle("Bot Client Help Page")
                .setColor("RANDOM")
                .setFields(
                    { name: "guild list:", value: "$bot_client guild_list\n guildid, guild name" },
                    { name: "guild channels", value: "$bot_client guild_channels <guild_id> \n logs all guild channels" },
                    { name: "get all guild members", value: "$bot_client guild_members <guild_id> \n logs all guild members" },
                    { name: "read channel", value: "$bot_client read_channel <guild_id> <channel_id> <amount_of_messages>" },
                    { name: "users roles", value: "$bot_client user_roles <guild_id> <member_id>" },
                    { name: "guild roles", value: "$bot_client guild_roles <guild_id>" }
                )
            return message.reply({ embeds: [embed] })
        }

        if (args[0] == "guild_list") {
            guild_list(message, client)
            return
        }
        if (args[0] == "guild_channels") {
            guild_channels(message, client, args)
            return
        }
        if (args[0] == "guild_members") {
            guild_members(message, client, args)
            return
        }
        if (args[0] == "read_channel") {
            read_channel(message, client, args)
            return
        }
        if (args[0] == "user_roles") {
            user_roles(message, client, args)
            return
        }

    }
}

async function user_roles(message, client, args) {
    let list = ""
    const guild_id = args[1]
    const user_id = args[2]
    if (!args[1] || !args[2]) return message.reply("Nie podałeś jednego z argumentów")

    const guild = client.guilds.cache.get(guild_id)
    const target_member = guild.members.cache.get(user_id)
    const roles = target_member.roles.cache
    roles.forEach(role => {

        list += `${role.name} | ${role.id} | ${getPermissionNames(role.permissions.bitfield)} \n\n\n `

        if (list.length > 1600) {
            message.reply(list)
            list = ""
        }
    })

    list += "``| role.name | role.id | role.permissions.bitfield |``"
    return message.reply(list)
}

function getPermissionNames(bitfield) {
    var permissionNames = [];
    if (bitfield & 0x8n) permissionNames.push("ADMINISTRATOR");
    if (bitfield & 0x40000n) permissionNames.push("MANAGE_GUILD");
    if (bitfield & 0x400n) permissionNames.push("MANAGE_ROLES");
    if (bitfield & 0x80n) permissionNames.push("MANAGE_CHANNELS");
    if (bitfield & 0x100n) permissionNames.push("KICK_MEMBERS");
    if (bitfield & 0x200n) permissionNames.push("BAN_MEMBERS");
    if (bitfield & 0x400000n) permissionNames.push("CREATE_INSTANT_INVITE");
    if (bitfield & 0x1n) permissionNames.push("VIEW_CHANNEL");
    if (bitfield & 0x2n) permissionNames.push("SEND_MESSAGES");
    if (bitfield & 0x4n) permissionNames.push("SEND_TTS_MESSAGES");
    if (bitfield & 0x10n) permissionNames.push("MANAGE_MESSAGES");
    if (bitfield & 0x20n) permissionNames.push("EMBED_LINKS");
    if (bitfield & 0x40n) permissionNames.push("ATTACH_FILES");
    if (bitfield & 0x800n) permissionNames.push("READ_MESSAGE_HISTORY");
    if (bitfield & 0x1000n) permissionNames.push("MENTION_EVERYONE");
    if (bitfield & 0x2000n) permissionNames.push("USE_EXTERNAL_EMOJIS");
    if (bitfield & 0x8000n) permissionNames.push("ADD_REACTIONS");
    if (bitfield & 0x20000n) permissionNames.push("CONNECT");
    if (bitfield & 0x100000n) permissionNames.push("SPEAK");
    if (bitfield & 0x200000n) permissionNames.push("MUTE_MEMBERS");
    if (bitfield & 0x800000n) permissionNames.push("DEAFEN_MEMBERS");
    if (bitfield & 0x1000000n) permissionNames.push("MOVE_MEMBERS");
    if (bitfield & 0x4000000n) permissionNames.push("USE_VAD");

    return permissionNames;
}

async function read_channel(message, client, args) {
    let list = ""
    if (!args[1]) return message.reply("nie podałeś argumentu")
    const guild = client.guilds.cache.get(args[1])
    if (!guild) return message.reply("Nie ma takiej gildi")
    const channel_id = args[2]
    if (!args[2]) return message.reply("Nie podałeś argumentu nr 2")
    const messages_limmit = args[3]
    if (!messages_limmit) return message.reply("nie podałeś argumentu nr 3")

    const all_channels = guild.channels.cache
    const channel = all_channels.get(channel_id)
    const lastMessageId = channel.lastMessageId

    let messages = Array.from(await channel.messages.fetch({
        limit: messages_limmit,
        before: lastMessageId
    }))

    messages.forEach(msg => {

        const content = msg[1].content
        const author = msg[1].author
        const author_username = author.username + "#" + author.discriminator
        const author_id = author.id

        list += `${msg[0]} | **${content}** | ${author_username} | ${author_id} \n\n`

        if (list.length > 1600) {
            message.reply(list)
            list = ""
        }
    })

    list += "``| message.idd |message.content | message.author.name | message.author.id ``"
    return message.reply(list)

}

async function guild_members(message, client, args) {
    let list = ""
    if (!args[1]) return message.reply("nie podałeś argumentu")
    const guild = client.guilds.cache.get(args[1])
    if (!guild) return message.reply("Nie ma takiej gildi")
    const all_members = guild.members.cache

    all_members.forEach(member => {
        if (member.user.bot == true) {
            list += `${member.user.id} | ${member.user.username}#${member.user.discriminator} | ${member.user.bot}\n`
        } else {
            list += `**${member.user.id} | ${member.user.username}#${member.user.discriminator} | ${member.user.bot}**\n`
        }

        if (list.length > 1800) {
            message.reply(list)
            list = ""
        }
    })

    list += "``| member user id | member user username | member tag | member bot``"
    return message.reply(list)
}

async function guild_channels(message, client, args) {
    let list = ""
    if (!args[1]) return message.reply("nie podałeś argumentu")
    const guild = client.guilds.cache.get(args[1])
    if (!guild) return message.reply("Nie ma takiej gildi")
    const all_channels = guild.channels.cache
    all_channels.forEach(channel => {
        list += `${channel.id} | ${channel.name} | ${channel.type} \n`

        if (list.length > 1800) {
            message.reply(list)
            list = ""
        }
    })

    list += "``| channel id | channel name | channel type``"
    return message.reply(list)
}

async function guild_list(message, client) {
    let list = ""
    client.guilds.cache.forEach(guild => {
        list += `| **${guild.name}** | ${guild.id} | ${guild.ownerId} \n`

        if (list.length > 1800) {
            message.reply(list)
            list = ""
        }

    })
    list += "``| guild name | guild id | guild owner id``"
    return message.reply(list)
}