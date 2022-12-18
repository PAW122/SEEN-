const Discord = require("discord.js")
module.exports = {
    name: "stats",

    execute: async (message, args, client) => {

        if (args[0] == "help") {
            const embed_pl = new Discord.MessageEmbed()
                .setTitle("Server Live Stats")
                .setDescription(`create voice channel showing server stats\n to refresh stats use $stats refresh\n`)
                .setFields(
                    { name: "if u wana automatic create all stats channels use", value: "$stats auto" },
                    { name: "show only online users", value: "$stats users" },
                    { name: "show only online users without counting bots", value: "$stats onlyusers" },
                    { name: "show amount of offline users", value: "$stats offline" },
                    { name: "show all server members", value: "$stats members" },//zrobione
                    { name: "show all server members without counting bots", value: "$stats onlymembers" },//zrobione
                    { name: "show all server bots", value: "$stats onlybots" },//zrobione
                    { name: "show amount of server roles", value: "$stats roles" },//zrobione
                    { name: "show amount of server channels", value: "$stats channels" },//zrobione
                    { name: "show amount of server voice channels", value: "$stats vc-channels" },//zrobione
                    { name: "show amount of server text channels", value: "$stats txt-channels" },//zrobione
                    { name: "show amount of banned users", value: "$stats bans" },
                    { name: "show server owner nickname and tag", value: "$stats owner" },
                    { name: "show nickname of last join member", value: "$stats last-join" },
                    { name: "show date", value: "$stats offline" },
                    //dodać ilość wiadomości z ostatniego tygodnia
                    //dodać ilość h na vc z ostatniego tygodnia


                    //zrobnić te + więcej stat na wykrasach w embedach
                    //np ilość wiadomości na poszczegulnych kanałach
                    //ilość h na poszczegulnych vc
                    //który vc i który txt ma największą akatuwność
                    //który user ma największą aktywność na vc, txt

                    //to do jakieś odpowiedzi na wiadomości usera
                    //to od: naprawić: ejżeli odświerzamy i nie ma danego kanału bot tworzy kanał a nie powinien
                    //(pomiejszyć zakres ifa od refresha)
                )
            return message.channel.send({ embeds: [embed_pl] });
        }

        main(message, args, client)


        async function main(message, args, client) {
            if (args[0] == "auto") {
                auto_all(message, false)
            }
            if (args[0] == "members") {
                members(message, false)
            }
            if (args[0] == "refresh") {
                auto_all(message, true)
                message.reply("Done")
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
            if (args[0] == "channels") {
                channels(message, false)
            }
            if (args[0] == "vc-channels") {
                vc_channels(message, false)
            }
            if (args[0] == "txt-channels") {
                txt_channels(message, false)
            }
        }

        async function vc_channels(message, only_ref) {
            let i = 0;
            message.guild.channels.cache.forEach(channel => {
                if (channel.type == "GUILD_VOICE") {
                    i += 1
                }
            })
            const cv_channels = i

            const channel_name = `vc-channels`
            let members_channel = message.guild.channels.cache
            //console.log(members_channel)
            var is_channel = false
            if (only_ref != true) {
                members_channel.forEach(channel => {
                    if (channel.name.startsWith(channel_name)) {
                        is_channel = true
                    }
                });
                if (is_channel == false && only_ref != true) {
                    message.guild.channels.create(channel_name + "-" + cv_channels, {
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
                    channel.setName(channel_name + "-" + cv_channels)
                    console.log('channal name change')
                    return true;
                }
            });
        }

        async function txt_channels(message, only_ref) {
            let i = 0;
            message.guild.channels.cache.forEach(channel => {
                if (channel.type == "GUILD_TEXT") {
                    i += 1
                }
            })
            const txt_channels = i

            const channel_name = `txt-channels`
            let members_channel = message.guild.channels.cache
            //console.log(members_channel)
            var is_channel = false
            if (only_ref != true) {
                members_channel.forEach(channel => {
                    if (channel.name.startsWith(channel_name)) {
                        is_channel = true
                    }
                });
                if (is_channel == false && only_ref != true) {
                    message.guild.channels.create(channel_name + "-" + txt_channels, {
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
                    channel.setName(channel_name + "-" + txt_channels)
                    console.log('channal name change')
                    return true;
                }
            });
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
                    if (is_channel == false && only_ref != true) {
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
                    if (is_channel == false && only_ref != true) {
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
                if (is_channel == false && only_ref != true) {
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
                if (is_channel == false && only_ref != true) {
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

        async function channels(message, only_ref) {
            let i = 0;
            message.guild.channels.cache.forEach(channel => {
                i += 1
            })
            const channels = i
            const channel_name = `channels`
            let members_channel = message.guild.channels.cache
            //console.log(members_channel)
            var is_channel = false
            if (only_ref != true) {
                members_channel.forEach(channel => {
                    if (channel.name.startsWith(channel_name)) {
                        is_channel = true
                    }
                });
                if (is_channel == false && only_ref != true) {
                    message.guild.channels.create(channel_name + "-" + channels, {
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
                    channel.setName(channel_name + "-" + channels)
                    console.log('channal name change')
                    return true;
                }
            });

        }

        async function auto_all(message, only_ref) {
            members(message, only_ref)
            only_members(message, only_ref)
            only_bots(message, only_ref)
            roles(message, only_ref)
            channels(message, only_ref)
            vc_channels(message, only_ref)
            txt_channels(message, only_ref)
        }

    }
}