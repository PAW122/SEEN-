const config = require(process.cwd() + `/config/worker.js`)
        const work = config.srv_info
        const worker = config.srv_info_work
        const reason = config.srv_info_disable

const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
const {QuickDB} = require("quick.db")
//$srvinfo
//$srvinfo help
//$srvinfo help en

module.exports = {//jak dodam execute usunąć z helpa info, że only slash
    //name: "srvinfo",
    //name_en:"srvinfo",
    description: "Sends information about the server",
    usage: "$srvinfo",
    work: worker,
    isSlash: true,
    
        data: new SlashCommandBuilder()
            .setName('srvinfo')
            .setDescription('Sends information about the server'),
    
            executeInteraction: async (inter) =>{

                //load server settings
        const guildId = inter.guild.id
        const db = new QuickDB({ filePath: process.cwd() + `/db/srv_settings/commands/${guildId}.sqlite` });
        if(await db.get(`check.check`) == true){
            const settings = await db.get(`srv_info.worker`)
            const settings_reason = await db.get(`srv_info.reason`)
            if(settings != true){return message.channel.send(settings_reason)}
        }

            const { guild } = inter;
            const { createdTimestamp, ownerId, members, memberCount, channels, emojis, stickers } = guild;
            const embed = new Discord.MessageEmbed()
                .setColor('PURPLE')
                .setAuthor({ name: `${guild.name}`, iconURL: guild.iconURL({ dynamic: true }) })
                .setThumbnail(guild.iconURL({ dynamic: true }))
                .addFields(
                    {
                        name: '**General**',
                        value: [
                            `Name: ${guild.name}`,
                            `Created: <t:${parseInt(createdTimestamp / 1000)}:R>`,
                            `Owner: <@${ownerId}>`,
                        ].join('\n')
                    },
                    {
                        name: '**Users**',
                        value: [
                            `- Users: ${members.cache.filter((m) => !m.user.bot).size}`,
                            `- Bots: ${members.cache.filter((m) => m.user.bot).size}`,
                            `General: ${memberCount}`,
                        ].join('\n')
                    },
                    {
                        name: '**Channels**',
                        value: [
                            `- Text channels: ${channels.cache.filter((c) => c.type === 'GUILD_TEXT').size}`,
                            `- Voice channels: ${channels.cache.filter((c) => c.type === 'GUILD_VOICE').size}`,
                            `- Threads: ${channels.cache.filter((c) => c.type === 'GUILD_NEWS_THREAD' && 'GUILD_PRIVATE_THREAD' && 'GUILD_PUBLIC_THREAD').size}`,
                            `- Categories: ${channels.cache.filter((c) => c.type === 'GUILD_CATEGORY').size}`,
                            `- Podium: ${channels.cache.filter((c) => c.type === 'GUILD_STAGE_VOICE').size}`,
                            `- News: ${channels.cache.filter((c) => c.type === 'GUILD_NEWS').size}`,
                            `General: ${channels.cache.size}`,
                        ].join('\n')
                    },
                    {
                        name: 'Emojis and stickers',
                        value: [
                            `- Animated: ${emojis.cache.filter((e) => e.animated).size}`,
                            `- Normal: ${emojis.cache.filter((e) => !e.animated).size}`,
                            `- Stickers: ${stickers.cache.size}`,
                            `General: ${stickers.cache.size + emojis.cache.size}`,
                        ].join('\n')
                    },
                    {
                        name: '**NITRO stats**',
                        value: [
                            `- Role: ${guild.roles.cache.size}`,
                            // `- Poziom: ${guild.premiumTier.replace('TIER_', '')}`,
                            `- Boosts: ${guild.premiumSubscriptionCount}`,
                            `- Boosters: ${members.cache.filter((m) => m.premiumSince).size}`,
                        ].join('\n')
                    }
                )
                .setFooter({ text: `Last checked:` })
                .setTimestamp()
    
            inter.reply({ embeds: [embed] })
        }
    }
