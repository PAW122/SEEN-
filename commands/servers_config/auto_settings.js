const Discord = require("discord.js");
const { QuickDB } = require("quick.db");

module.exports = (message, args, client) => {
    //uprawnienia admina wymagane w command_settings.js
    //$settings auto_settings
    async function main() {

        if(args[1] == "help") {
            const embed_pl = new Discord.MessageEmbed()
            .setColor(`BLUE`)
            .setTitle("Auto Settings")
            .setFields(
                {name: "What this command do?", vaule: "the **$settings auto_settings** function automatically sets the welcome channel, channel with information for moderation, channel with lvl notifications"}
            )
            .setFooter(message.author.tag)
        }

        //sprawdż czy na serweże znajdują się kanały z nazwami:
        //logs -- mod_logs
        //welcome -- powitania
        //lvl -- powiadomienia o lvl

        const guildId = message.guild.id
        const db_logs = new QuickDB({ filePath: process.cwd() + `/db/srv_logs/${guildId}.sqlite` });
        const db = new QuickDB({ filePath: process.cwd() + `/db/srv_settings/commands/${guildId}.sqlite` });

        let logs_channel = message.guild.channels.cache.find(res => res.name === "logs")
        var logsRole = message.guild.roles.cache.find(res => res.name == "logs")

        try {
            if (!logsRole) {
                muteRole = await message.guild.roles.create({
                    name: "logs",
                    color: "#000000",
                    permissions: []
                });
            }
            if (!logs_channel) {
                await message.guild.channels.create("logs", "text")
                let logs_channel = message.guild.channels.cache.find(res => res.name === "logs")
                //tylko ranga logs może widzieć kanał
                await message.guild.roles.cache.forEach(async role => {
                    if (role.name == "logs") {
                        logs_channel.permissionOverwrites.edit(role, {
                            VIEW_CHANNEL: true
                        })
                    } else {
                        logs_channel.permissionOverwrites.edit(role, {
                            VIEW_CHANNEL: false
                        })
                    }
                })
            } else {
                //kanał istnieje
                let logs_channel = message.guild.channels.cache.find(res => res.name === "logs")
                //tylko ranga logs może widzieć kanał
                await message.guild.roles.cache.forEach(async role => {
                    if (role.name == "logs") {
                        logs_channel.permissionOverwrites.edit(role, {
                            VIEW_CHANNEL: true
                        })
                    } else {
                        logs_channel.permissionOverwrites.edit(role, {
                            VIEW_CHANNEL: false
                        })
                    }
                })

            }
            //kanał i rola stworzona
            //dodaj id kanału do mod_logs serwera
            try{
                let logs_channel = message.guild.channels.cache.find(res => res.name === "logs")
            var channel_id = logs_channel.id//error not found id
            }catch(err){
                return console.log("nie znalewniono id")
            }
            if (await db_logs.get(`check`) == true) {
                await db_logs.set(`channelId`, channel_id)
            } else {
                //stwórz profil
                await db_logs.set(`check`, true)
                await db_logs.set(`channelId`, channel_id)
                mod_logs_all_on(db_logs)
            }
            //poinformój usera że musi posiadać role logs aby widzieć kanał z logami
            message.channel.send(`Logs channel created ${logs_channel}. You need get logs role ${logsRole} to see logs channel`)
        } catch (err) {
            console.log(err)
            return message.reply("I cant do that. Pleas use $report and report bug to developer")
        }
        // mod_logs wszysstko działa.
        //zrobić to samo jeszcze do lvl i welcome
        //(kanał do welcome można wziąść kod z owner srv info)
        //jeżeli serwer nie posiada kanału do welcome to bot tworzy kanał

        //guild welcome channel
        try {
            let wl_channel = message.guild.systemChannelId
            if (!wl_channel || wl_channel == undefined) {
                //stwórz kanał "welcome"
                await message.guild.channels.create("Welcome", "text");
                let welcome_channel = message.guild.channels.cache.find(res => res.name === "Welcome")
                if (!welcome_channel) return message.reply("I cant create welcome chanel")
                await message.guild.roles.cache.forEach(async role => {
                    welcome_channel.permissionOverwrites.edit(role, {
                        SEND_MESSAGES: false
                    })
                })
                message.channel.send("Welcome channel created")
                await db.set(`welcome.channelId`, welcome_channel.id)
            } else {
                let wl_channel = message.guild.systemChannelId
                //zapisz do db
                await db.set(`welcome.channelId`, wl_channel)
            }
            message.channel.send(`Wlecome messages been sended on <#${wl_channel}>`)
        } catch (err) {
            console.log(err)
            return message.reply("error I cant set welcome channel")
        }


        //do lvl -------------------------------------------------
        var lvl_channel = message.guild.channels.cache.find(res => res.name === "lvl-notify")

        try {
            if (!lvl_channel) {
                await message.guild.channels.create("lvl-notify", "text")
                let logs_channel = message.guild.channels.cache.find(res => res.name === "lvl-notify")
                //tylko ranga logs może widzieć kanał
                await message.guild.roles.cache.forEach(async role => {
                    logs_channel.permissionOverwrites.edit(role, {
                        SEND_MESSAGES: false
                    })
                })
                var lvl_channel = message.guild.channels.cache.find(res => res.name === "lvl-notify")
                await db.set(`lvls_channel.channelId`, lvl_channel.id)
                await db.set(`lvls_channel.check`, true)
                return message.channel.send(`Lvl notify been send on ${lvl_channel}`)
            } else {
                //kanał istnieje
                let logs_channel = message.guild.channels.cache.find(res => res.name === "lvl-notify")
                //tylko ranga logs może widzieć kanał
                await message.guild.roles.cache.forEach(async role => {
                    logs_channel.permissionOverwrites.edit(role, {
                        SEND_MESSAGES: false
                    })
                })
                await db.set(`lvls_channel.channelId`, lvl_channel.id)
                await db.set(`lvls_channel.check`, true)
                return message.channel.send(`Lvl notify been send on ${lvl_channel}`)
            }
        } catch (err) {
            console.log(err)
            return message.reply("lvl channel error")
        }
    }
    main()

    async function mod_logs_all_on(db) {
        await db.set(`messagedelete`, true)
        await db.set(`guildChannelTopicUpdate`, true)
        await db.set(`unhandledGuildChannelUpdate`, true)
        await db.set(`guildMemberBoost`, true)
        await db.set(`guildMemberUnboost`, true)
        await db.set(`guildMemberRoleAdd`, true)
        await db.set(`guildMemberRoleRemove`, true)
        await db.set(`guildMemberNicknameUpdate`, true)
        await db.set(`guildMemberEntered`, true)
        await db.set(`guildBoostLevelUp`, true)
        await db.set(`guildBoostLevelDown`, true)
        await db.set(`guildBannerAdd`, true)
        await db.set(`guildAfkChannelAdd`, true)
        await db.set(`guildVanityURLAdd`, true)
        await db.set(`guildVanityURLRemove`, true)
        await db.set(`guildVanityURLUpdate`, true)
        await db.set(`messagePinned`, true)
        await db.set(`messageContentEdited`, true)
        await db.set(`guildMemberOffline`, true)
        await db.set(`guildMemberOnline`, true)
        await db.set(`voiceChannelJoin`, true)
        await db.set(`voiceChannelLeave`, true)
        await db.set(`voiceChannelSwitch`, true)
        await db.set(`voiceChannelMute`, true)
        await db.set(`voiceChannelUnmute`, true)
        await db.set(`voiceChannelDeaf`, true)
        await db.set(`voiceChannelUndeaf`, true)
        await db.set(`voiceStreamingStart`, true)
    }



}