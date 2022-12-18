const Discord = require("discord.js")
module.exports = {
    name: "stats",

    execute: async (message, args, client) => {

        if (args[0] == "help") {
            const embed_pl = new Discord.MessageEmbed()
                .setTitle("Server Live Stats")
                .setDescription("create voice channel showing server stats\n to refresh stats use $stats refresh")
                .setFields(
                    { name: "if u wana automatic create all stats channels use", value: "$stats auto" },
                    { name: "show only online users", value: "$stats users" },
                    { name: "show only online users without counting bots", value: "$stats onlyusers" },
                    { name: "show amount of offline users", value: "$stats offline" },
                    { name: "show all server members", value: "$stats members" },//zrobione
                    { name: "show all server members without counting bots", value: "$stats onlymembers" },//zrobione
                    { name: "show all server bots", value: "$stats onlybots" },//zrobione
                    { name: "show amount of server roles", value: "$stats roles" },//zrobione
                    { name: "show amount of server channels", value: "$stats channels" },
                    { name: "show amount of server voice channels", value: "$stats vc-channels" },
                    { name: "show amount of server text channels", value: "$stats txt-channels" },
                    { name: "show amount of banned users", value: "$stats bans" },
                    { name: "show server owner nickname and tag", value: "$stats owner" },
                    { name: "show nickname of last join member", value: "$stats last-join" },
                    { name: "show date", value: "$stats offline" },



                )
            return message.channel.send({ embeds: [embed_pl] });
        }

        main(message, args, client)


        async function main(message, args, client) {
            if (args[0] == "auto") {
                auto_all(message)
            }
            if (args[0] == "members") {
                members(message, false)
            }
            if (args[0] == "refresh") {
                members(message, true)
                only_members(message, true)
                only_bots(message, true)
            }
            if (args[0] == "onlymembers") {
                only_members(message, false)
            }
            if (args[0] == "onlybots") {
                only_bots(message, false)
            }
            if (args[0] == "roles") {
                roles(message, false)
            }
        }

        async function only_bots(message, only_ref) {
            //zrobić to na for each user if user == bot i += 1 

            let i = 1;
            message.guild.members.fetch().then(members => {
                members.forEach(member => {
                    if (member.user.bot == true) {
                        i += 1
                    }
                });
                const guild_bots = i

                const channel_name = `bots`
                let members_channel = message.guild.channels.cache
                //console.log(members_channel)
                var is_channel = false
                if (only_ref != true) {
                    members_channel.forEach(channel => {
                        if (channel.name.startsWith(channel_name)) {
                            is_channel = true
                        }
                    });
                    if (is_channel == false) {
                        message.guild.channels.create(channel_name + "-" + guild_bots, {
                            type: "voice",
                            permissionOverwrites: [
                                {
                                    id: message.guild.roles.everyone,
                                    allow: ['VIEW_CHANNEL'],
                                    deny: ['SEND_MESSAGES', 'READ_MESSAGE_HISTORY']
                                }
                            ],
                        })
                    }
                }
                members_channel.forEach(channel => {
                    if (channel.name.startsWith(channel_name)) {
                        channel.setName(channel_name + "-" + guild_bots)
                        console.log('channal name change')
                        return true;
                    }
                });
            });

        }

        async function only_members(message, only_ref) {
            var i = 0;
            message.guild.members.fetch().then(members => {
                members.forEach(member => {
                    if (member.user.bot == false) {
                        i += 1
                    }
                });
                const users = i
                const channel_name = `only-members`
                let members_channel = message.guild.channels.cache
                //console.log(members_channel)
                var is_channel = false
                if (only_ref != true) {
                    members_channel.forEach(channel => {
                        if (channel.name.startsWith(channel_name)) {
                            is_channel = true
                        }
                    });
                    if (is_channel == false) {
                        message.guild.channels.create(channel_name + "-" + users, {
                            type: "voice",
                            permissionOverwrites: [
                                {
                                    id: message.guild.roles.everyone,
                                    allow: ['VIEW_CHANNEL'],
                                    deny: ['SEND_MESSAGES', 'READ_MESSAGE_HISTORY']
                                }
                            ],
                        })
                    }
                }
                members_channel.forEach(channel => {
                    if (channel.name.startsWith(channel_name)) {
                        channel.setName(channel_name + "-" + users)
                        console.log('channal name change')
                        return true;
                    }
                });
            });
        }

        async function members(message, only_ref) {
            const members = message.guild.memberCount
            const channel_name = `members`
            let members_channel = message.guild.channels.cache
            //console.log(members_channel)
            var is_channel = false
            if (only_ref != true) {
                members_channel.forEach(channel => {
                    if (channel.name.startsWith(channel_name)) {
                        is_channel = true
                    }
                });
                if (is_channel == false) {
                    message.guild.channels.create(channel_name + "-" + members, {
                        type: "voice",
                        permissionOverwrites: [
                            {
                                id: message.guild.roles.everyone,
                                allow: ['VIEW_CHANNEL'],
                                deny: ['SEND_MESSAGES', 'READ_MESSAGE_HISTORY']
                            }
                        ],
                    })
                }
            }
            members_channel.forEach(channel => {
                if (channel.name.startsWith(channel_name)) {
                    channel.setName(channel_name + "-" + members)
                    console.log('channal name change')
                    return true;
                }
            });
        }

        async function roles(message, only_ref) {
            let i = 0;
            message.guild.roles.cache.forEach(role => {
                i += 1
            })
            const roles = i
            const channel_name = `roles`
            let members_channel = message.guild.channels.cache
            //console.log(members_channel)
            var is_channel = false
            if (only_ref != true) {
                members_channel.forEach(channel => {
                    if (channel.name.startsWith(channel_name)) {
                        is_channel = true
                    }
                });
                if (is_channel == false) {
                    message.guild.channels.create(channel_name + "-" + roles, {
                        type: "voice",
                        permissionOverwrites: [
                            {
                                id: message.guild.roles.everyone,
                                allow: ['VIEW_CHANNEL'],
                                deny: ['SEND_MESSAGES', 'READ_MESSAGE_HISTORY']
                            }
                        ],
                    })
                }
            }
            members_channel.forEach(channel => {
                if (channel.name.startsWith(channel_name)) {
                    channel.setName(channel_name + "-" + roles)
                    console.log('channal name change')
                    return true;
                }
            });

        }

        async function auto_all(message) {
            members(message, false)
            only_members(message, false)
            only_bots(message, false)
        }

    }
}