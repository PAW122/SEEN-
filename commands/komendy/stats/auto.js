const Discord = require("discord.js")
module.exports = {
    name: "stats",

    execute: async (message, args, client) => {

        if (args[0] == "help") {
            const embed_pl = new Discord.MessageEmbed()
                .setTitle("Server Live Stats")
                .setDescription("create voice channel showing server stats")
                .setFields(
                    { name: "if u wana automatic create all stats channels use", value: "$stats auto" },
                    { name: "show only online users", value: "$stats users" },
                    { name: "show only online users without counting bots", value: "$stats onlyusers" },
                    { name: "show amount of offline users", value: "$stats offline" },
                    { name: "show all server members", value: "$stats members" },//robione
                    { name: "show all server members without counting bots", value: "$stats onlymembers" },
                    { name: "show amount of server ranks", value: "$stats ranks" },
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
                members(message)
            }
        }

        async function members(message) {
            const members = message.guild.memberCount
            const channel_name = ">>members"
            let members_channel = message.guild.channels.cache.find(res => res.name === channel_name)

            if (!members_channel) {
                message.guild.channels.create(channel_name, {
                    type: "voice",
                    permissionOverwrites: [
                        {
                            id: message.guild.roles.everyone,
                            allow: ['VIEW_CHANNEL'],
                            deny: ['SEND_MESSAGES', 'READ_MESSAGE_HISTORY']
                        }
                    ],
                })
                console.log("vc members")

            } else {
                if (members_channel.type != 'voice') return message.reply("Channel >>members already existing on server as txt channel. Plead reanem or delete this channel")
            }
        }

        async function auto_all(message) {

        }

    }
}