const Discord = require("discord.js")
const embed_pl = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle("Server Live Stats")
    .setDescription(`to manually refresh stats use **$stats-channel refresh**\n`)
    .setFields(
        { name: "Refresh system", value: "all statistics channels will be automatically refreshed after sending any message in the text channel. The maximum frequency of updating statistics is 10 minutes \n\n" },
        { name: "if u wana automatic create all stats channels use", value: "$stats-channel auto" },
        { name: "show only online users", value: "$stats-channel users" },
        { name: "show only online users without counting bots", value: "$stats-channel onlyusers" },
        { name: "show amount of offline users", value: "$stats-channel offline" },
        { name: "show all server members", value: "$stats-channel members" },//zrobione
        { name: "show all server members without counting bots", value: "$stats-channel onlymembers" },//zrobione
        { name: "show all server bots", value: "$stats-channel onlybots" },//zrobione
        { name: "show amount of server roles", value: "$stats-channel roles" },//zrobione
        { name: "show amount of server channels", value: "$stats-channel channels" },//zrobione
        { name: "show amount of server voice channels", value: "$stats-channel vc-channels" },//zrobione
        { name: "show amount of server text channels", value: "$stats-channel txt-channels" },//zrobione
        { name: "show amount of banned users", value: "$stats-channel bans" },//zrobione
        { name: "show nickname of last join member", value: "$stats-channel last-join" },//to do
        { name: "show date", value: "$stats-channel date" }
    )
module.exports = {
    name: "stats-channel",
    help: embed_pl,


    execute: async (message, args, client, ref, server) => {

        if (ref == true) {
            //auto refresh stats for all servers
            auto_all(message, true, client, server)
            return
        }

        //odświerzanie:
        //dodać liste (w ramie jak w cooldownach)
        //messageCreate => sprawdza czy id serwera jest na liscie, jeżeli nie to dodaje i odświerza informacje
        //co 10 min odświerza statystyki dla każdego kanału
        /*
        trzeba to zrobić w handlerze który wyłapuje gildie po ich id bez wymagania wiadomości
        */
        //to do: $$stats-channel date tworzy nowy kanał! dać if startsWith date-year czy coś

        if (args[0] == "help") {
            const embed_pl = new Discord.MessageEmbed()
                .setTitle("Server Live Stats")
                .setDescription(`to manually refresh stats use **$stats-channel refresh**\n`)
                .setFields(
                    { name: "Refresh system", value: "all statistics channels will be automatically refreshed after sending any message in the text channel. The maximum frequency of updating statistics is 10 minutes \n\n" },
                    { name: "if u wana automatic create all stats channels use", value: "$stats-channel auto" },
                    { name: "show only online users", value: "$stats-channel users" },
                    { name: "show only online users without counting bots", value: "$stats-channel onlyusers" },
                    { name: "show amount of offline users", value: "$stats-channel offline" },
                    { name: "show all server members", value: "$stats-channel members" },//zrobione
                    { name: "show all server members without counting bots", value: "$stats-channel onlymembers" },//zrobione
                    { name: "show all server bots", value: "$stats-channel onlybots" },//zrobione
                    { name: "show amount of server roles", value: "$stats-channel roles" },//zrobione
                    { name: "show amount of server channels", value: "$stats-channel channels" },//zrobione
                    { name: "show amount of server voice channels", value: "$stats-channel vc-channels" },//zrobione
                    { name: "show amount of server text channels", value: "$stats-channel txt-channels" },//zrobione
                    { name: "show amount of banned users", value: "$stats-channel bans" },//zrobione
                    { name: "show nickname of last join member", value: "$stats-channel last-join" },
                    { name: "show date", value: "$stats-channel date" },//zrobione
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
                auto_all(message, false, client)
            }
            if (args[0] == "members") {
                members(message, false)
                message.react("✅")
            }
            if (args[0] == "refresh") {
                auto_all(message, true, client)
                message.reply("Done")
            }
            if (args[0] == "onlymembers") {
                only_members(message, false)
                message.react("✅")
            }
            if (args[0] == "onlybots") {
                only_bots(message, false)
                message.react("✅")
            }
            if (args[0] == "roles") {
                roles(message, false)
                message.react("✅")
            }
            if (args[0] == "channels") {
                channels(message, false)
                message.react("✅")
            }
            if (args[0] == "vc-channels") {
                vc_channels(message, false)
                message.react("✅")
            }
            if (args[0] == "txt-channels") {
                txt_channels(message, false)
                message.react("✅")
            }
            if (args[0] == "bans") {
                bans(message, false)
                message.react("✅")
            }
            if (args[0] == "date") {
                date(message, false)
                message.react("✅")
            }
            if (args[0] == "last-join") {
                return message.reply("this feature will be available soon")
            }
        }

        async function date(message, only_ref, ref_guild) {
            if (only_ref == true) {
                var guild = ref_guild
            } else {
                var guild = message.guild
            }
            var current = new Date();
            const now_rok = current.getFullYear();
            const now_month = current.getMonth() + 1;
            const now_day = current.getDate();

            const date = now_rok + " " + now_month + " " + "" + now_day

            const channel_name = `date`//zmiana wielkośic litery
            let members_channel = guild.channels.cache
            //console.log(members_channel)
            var is_channel = false
            if (only_ref != true) {
                members_channel.forEach(channel => {
                    if (channel.name.startsWith(channel_name)) {
                        is_channel = true
                    }
                });
                if (is_channel == false && only_ref != true) {
                    message.guild.channels.create(channel_name + "-" + date, {
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
                    channel.setName(channel_name + "-" + date)
                    //console.log('channal name change')
                    return true;
                }
            });
        }

        async function bans(message, only_ref, ref_guild) {
            if (only_ref == true) {
                var guild = ref_guild
            } else {
                var guild = message.guild
            }
            guild.bans.fetch()
                .then(banned => {
                    const bans = banned.size
                    const channel_name = `bans`
                    let members_channel = guild.channels.cache
                    //console.log(members_channel)
                    var is_channel = false
                    if (only_ref != true) {
                        members_channel.forEach(channel => {
                            if (channel.name.startsWith(channel_name)) {
                                is_channel = true
                            }
                        });
                        if (is_channel == false && only_ref != true) {
                            message.guild.channels.create(channel_name + "-" + bans, {
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
                            channel.setName(channel_name + "-" + bans)
                            //console.log('channal name change')
                            return true;
                        }
                    });

                })
        }

        async function vc_channels(message, only_ref, ref_guild) {
            if (only_ref == true) {
                var guild = ref_guild
            } else {
                var guild = message.guild
            }
            let i = 0;
            guild.channels.cache.forEach(channel => {
                if (channel.type == "GUILD_VOICE") {
                    i += 1
                }
            })
            const cv_channels = i

            const channel_name = `vc-channels`
            let members_channel = guild.channels.cache
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
                    //console.log('channal name change')
                    return true;
                }
            });
        }

        async function txt_channels(message, only_ref, ref_guild) {
            if (only_ref == true) {
                var guild = ref_guild
            } else {
                var guild = message.guild
            }
            let i = 0;
            guild.channels.cache.forEach(channel => {
                if (channel.type == "GUILD_TEXT") {
                    i += 1
                }
            })
            const txt_channels = i

            const channel_name = `txt-channels`
            let members_channel = guild.channels.cache
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
                    //console.log('channal name change')
                    return true;
                }
            });
        }

        async function only_bots(message, only_ref, ref_guild) {
            if (only_ref == true) {
                var guild = ref_guild
            } else {
                var guild = message.guild
            }
            let i = 1;
            guild.members.fetch().then(members => {
                members.forEach(member => {
                    if (member.user.bot == true) {
                        i += 1
                    }
                });
                const guild_bots = i

                const channel_name = `bots`
                let members_channel = guild.channels.cache
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
                        //console.log('channal name change')
                        return true;
                    }
                });
            });

        }

        async function only_members(message, only_ref, ref_guild) {
            if (only_ref == true) {
                var guild = ref_guild
            } else {
                var guild = message.guild
            }
            var i = 0;
            guild.members.fetch().then(members => {
                members.forEach(member => {
                    if (member.user.bot == false) {
                        i += 1
                    }
                });
                const users = i
                const channel_name = `users`
                let members_channel = guild.channels.cache
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
                        //console.log('channal name change')
                        return true;
                    }
                });
            });
        }

        async function members(message, only_ref, ref_guild) {
            if (only_ref == true) {
                var guild = ref_guild
            } else {
                var guild = message.guild
            }
            const members = guild.memberCount
            const channel_name = `members`
            let members_channel = guild.channels.cache
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
                    //console.log('channal name change')
                    return true;
                }
            });
        }

        async function roles(message, only_ref, ref_guild) {
            if (only_ref == true) {
                var guild = ref_guild
            } else {
                var guild = message.guild
            }
            let i = 0;
            guild.roles.cache.forEach(role => {
                i += 1
            })
            const roles = i
            const channel_name = `roles`
            let members_channel = guild.channels.cache
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
                    //console.log('channal name change')
                    return true;
                }
            });

        }

        async function channels(message, only_ref, ref_guild) {
            if (only_ref == true) {
                var guild = ref_guild
            } else {
                var guild = message.guild
            }
            let i = 0;
            guild.channels.cache.forEach(channel => {
                i += 1
            })
            const channels = i
            const channel_name = `channels`
            let members_channel = guild.channels.cache
            //console.log(members_channel)
            var is_channel = false
            if (only_ref != true) {
                members_channel.forEach(channel => {
                    if (channel.name.startsWith(channel_name)) {
                        is_channel = true
                    }
                });
                if (is_channel == false && only_ref != true) {
                    guild.channels.create(channel_name + "-" + channels, {
                        type: "voice",
                        permissionOverwrites: [
                            {
                                id: guild.roles.everyone,
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
                    //console.log('channal name change')
                    return true;
                }
            });

        }

        async function auto_all(message, only_ref, client, server) {
            //server = string with guild id from list with all server id to refresh
            if (only_ref == true && server) {
                var ref_guild = await client.guilds.cache.get(server);
                if (!ref_guild || ref_guild == null || ref_guild == undefined) {
                    return console.log("stats channel ERROR ref_guild == undefind\n line 519\n auto.js")
                }
                ref(message, only_ref, ref_guild)
            } else if (message) {
                const server_id = message.guild
                ref(message, only_ref, server_id)
            }

            function ref(message, only_ref, ref_guild) {
                channels(message, only_ref, ref_guild)
                members(message, only_ref, ref_guild)
                only_members(message, only_ref, ref_guild)
                only_bots(message, only_ref, ref_guild)
                roles(message, only_ref, ref_guild)
                vc_channels(message, only_ref, ref_guild)
                txt_channels(message, only_ref, ref_guild)
                bans(message, only_ref, ref_guild)
                date(message, only_ref, ref_guild)
            }
        }
    }
}