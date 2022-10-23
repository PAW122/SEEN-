const Discord = require("discord.js")
const { QuickDB } = require("quick.db");

/*
dodać tutal cooldown żeby bazy danych ktoś nie zajechał
*/

/*
rczeczy do wywalenia bo nie da się wyłapać z jakiego serwera jest dana akcja:
rolePositionUpdate -- dodałem guild
rolePermissionsUpdate -- dodałem guild
userAvatarUpdate -- dodałem guild
userUsernameUpdate  -- dodałem guild

do usunięcia: rolePositionUpdate,rolePermissionsUpdate
,userUsernameUpdate,userDiscriminatorUpdate

dodać: voiceStreamingStop

co działa:
zarbieranie i dawanie roli
wbijanie i wychodzenie z vc
edytowanie wiadomości

nie działa
usówanie wiadomości
guildMemberOffline , online nie działa
*/
module.exports = {
    name: "srv_logs",

    execute: async (message, args, client) => {
        

        const guildId = message.guild.id
        const db = new QuickDB({ filePath: process.cwd() + `/db/srv_logs/${guildId}.sqlite` });

        if (args[0] == "help") {
            const embed_pl = new Discord.MessageEmbed()
                .setColor(`BLUE`)
                .setTitle(`Help`)
                .setDescription(``)
                .addFields(
                    { name: `$srv_logs start <channelID>`, value: `you need use this command to turn on everythink`, inline: true },
                    { name: `turn on all logs`, value: `$srv_logs allon`, inline: true },
                    { name: `turn off all logs`, value: `$srv_logs alloff`, inline: true },
                    { name: `**deafult settings**\nturn on all type of logs`, value: `$srv_logs deafult`, inline: true },
                    { name: `$srv_logs list`, value: `awnding list with status with all logs types`, inline: true },
                    { name: `$srv_logs <on/off> <typeName>`, value: `turn on/off one of logs type. Example: **$srv_logs off voiceChannelJoin**`, inline: true },
                    { name: `**Warring!!**`, value: ` __**Warning for mod_logs message delete!!**
                    In case the message is deleted by the bot
                    will remain in the logs as the person who deleted the message
                    bot will not be tagged. The user will be marked,
                    who last deleted the message before the bot__`, inline: false}

                )
            return message.channel.send({ embeds: [embed_pl] });
        }


        if (!message.member.permissions.has("ADMINISTRATOR")) {
            return message.channel.send("You don't have admin authorization")
        }

        if (args[0] == "start") {

            //channelId
            if (!args[1] || isNaN(args[1])) {
                return message.reply("you type bad channel Id")
            }
            var channelId = args[1]
            try{
            let channel = await client.channels.fetch(channelId)
            }catch(err){
                if(err == "DiscordAPIError: Unknown Channel"){
                    return message.reply("Wrong channel id")
                }else{
                    return console.log(err)
                }
            }

            saveData_start()

            return message.reply("set")
        }

        if (args[0] == "list") {
            const embed_list = new Discord.MessageEmbed()
                .setColor(`BLUE`)
                .setTitle(`page 1/2`)
                .setDescription(`All logs types list\n to turn off/on any of types Use: $srv_logs <on/off> <typeName>`)
                .addFields(
                    { name: `messagedelete`, value: `${await db.get(`messagedelete`)}`, inline: true },
                    { name: `guildChannelTopicUpdate`, value: `${await db.get(`guildChannelTopicUpdate`)}`, inline: true },
                    { name: `unhandledGuildChannelUpdate`, value: `${await db.get(`unhandledGuildChannelUpdate`)}`, inline: true },
                    { name: `guildMemberBoost`, value: `${await db.get(`guildMemberBoost`)}`, inline: true },
                    { name: `guildMemberUnboost`, value: `${await db.get(`guildMemberUnboost`)}`, inline: true },
                    { name: `guildMemberRoleAdd`, value: `${await db.get(`guildMemberRoleAdd`)}`, inline: true },
                    { name: `guildMemberRoleRemove`, value: `${await db.get(`guildMemberRoleRemove`)}`, inline: true },
                    { name: `guildMemberNicknameUpdate`, value: `${await db.get(`guildMemberNicknameUpdate`)}`, inline: true },
                    { name: `guildMemberEntered`, value: `${await db.get(`guildMemberEntered`)}`, inline: true },
                    { name: `guildBoostLevelUp`, value: `${await db.get(`guildBoostLevelUp`)}`, inline: true },
                    { name: `guildBoostLevelDown`, value: `${await db.get(`guildBoostLevelDown`)}`, inline: true },
                    { name: `guildBannerAdd`, value: `${await db.get(`guildBannerAdd`)}`, inline: true },
                    { name: `guildAfkChannelAdd`, value: `${await db.get(`guildAfkChannelAdd`)}`, inline: true },
                    { name: `guildVanityURLAdd`, value: `${await db.get(`guildVanityURLAdd`)}`, inline: true },
                    { name: `guildVanityURLRemove`, value: `${await db.get(`guildVanityURLRemove`)}`, inline: true },
                    { name: `guildVanityURLUpdate`, value: `${await db.get(`guildVanityURLUpdate`)}`, inline: true },
                    { name: `messagePinned`, value: `${await db.get(`messagePinned`)}`, inline: true },
                    { name: `messageContentEdited`, value: `${await db.get(`messageContentEdited`)}`, inline: true },
                    { name: `guildMemberOffline`, value: `${await db.get(`guildMemberOffline`)}`, inline: true },
                    { name: `guildMemberOnline`, value: `${await db.get(`guildMemberOnline`)}`, inline: true },
                )
            const embed_list2 = new Discord.MessageEmbed()
                .setColor(`BLUE`)
                .setTitle(`page 2/2`)
                .setDescription(`All logs types list\n to turn off/on any of types Use: $srv_logs <on/off> <typeName>`)
                .addFields(
                    { name: `voiceChannelJoin`, value: `${await db.get(`voiceChannelJoin`)}`, inline: true },
                    { name: `voiceChannelLeave`, value: `${await db.get(`voiceChannelLeave`)}`, inline: true },
                    { name: `voiceChannelSwitch`, value: `${await db.get(`voiceChannelSwitch`)}`, inline: true },
                    { name: `voiceChannelMute`, value: `${await db.get(`voiceChannelMute`)}`, inline: true },
                    { name: `voiceChannelUnmute`, value: `${await db.get(`voiceChannelUnmute`)}`, inline: true },
                    { name: `voiceChannelDeaf`, value: `${await db.get(`voiceChannelDeaf`)}`, inline: true },
                    { name: `voiceChannelUndeaf`, value: `${await db.get(`voiceChannelUndeaf`)}`, inline: true },
                    { name: `voiceStreamingStart`, value: `${await db.get(`voiceStreamingStart`)}`, inline: true }
                )
            message.channel.send({ embeds: [embed_list] });
            return message.channel.send({ embeds: [embed_list2] });
        }

        if (args[0] == "deafult") {
            all_on()
            return message.reply("set")
        }

        if (args[0] == "alloff") {
            all_off()
            return message.reply("set")
        }
        if (args[0] == "allon") {
            all_on()
            return message.reply("set")
        }

        if (args[0] = "on") {
            if (!args[1]) return message.reply("Bad logs type name")
            var command_name = args[1]

            //sprawdż czy takie coś co pdał user w args[1] istnieje
            if (name_check(command_name) == false) {
                return message.reply("Bad logs type name")
            } else {
                //dobra nazwa
                await db.set(command_name, true)
                return message.reply("set")
            }
        }

        if (args[0] = "off") {
            if (!args[1]) return message.reply("Bad logs type name")
            var command_name = args[1]
            console.log(name_check(command_name))
            //sprawdż czy takie coś co pdał user w args[1] istnieje
            if (name_check(command_name) == false) {
                return message.reply("Bad logs type name")
            } else {
                //dobra nazwa
                await db.set(command_name, false)
                return message.reply("set")
            }
        }



        async function saveData_start() {

            //sprawdż czy profil db istnieje
            if (await db.get(`check`) == true) {
                //zaktualizuj channelId
                await db.set(`channelId`, channelId)
                return message.reply("You arledy have settings profil. Only channel Id be updated")
            } else {
                //stwórz profil
                await db.set(`check`, true)
                await db.set(`channelId`, channelId)
                all_on()
            }
        }

        async function all_on() {
            //wszysttkie syfy
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

        async function all_off() {
            //wszysttkie syfy
            await db.set(`messagedelete`, true)
            await db.set(`guildChannelTopicUpdate`, false)
            await db.set(`unhandledGuildChannelUpdate`, false)
            await db.set(`guildMemberBoost`, false)
            await db.set(`guildMemberUnboost`, false)
            await db.set(`guildMemberRoleAdd`, false)
            await db.set(`guildMemberRoleRemove`, false)
            await db.set(`guildMemberNicknameUpdate`, false)
            await db.set(`guildMemberEntered`, false)
            await db.set(`guildBoostLevelUp`, false)
            await db.set(`guildBoostLevelDown`, false)
            await db.set(`guildBannerAdd`, false)
            await db.set(`guildAfkChannelAdd`, false)
            await db.set(`guildVanityURLAdd`, false)
            await db.set(`guildVanityURLRemove`, false)
            await db.set(`guildVanityURLUpdate`, false)
            await db.set(`messagePinned`, false)
            await db.set(`messageContentEdited`, false)
            await db.set(`guildMemberOffline`, false)
            await db.set(`guildMemberOnline`, false)
            await db.set(`voiceChannelJoin`, false)
            await db.set(`voiceChannelLeave`, false)
            await db.set(`voiceChannelSwitch`, false)
            await db.set(`voiceChannelMute`, false)
            await db.set(`voiceChannelUnmute`, false)
            await db.set(`voiceChannelDeaf`, false)
            await db.set(`voiceChannelUndeaf`, false)
            await db.set(`voiceStreamingStart`, false)
        }

        function name_check() {
            if (command_name != "guildChannelTopicUpdate"
                && command_name != "messagedelete"
                && command_name != "unhandledGuildChannelUpdate"
                && command_name != "guildMemberBoost"
                && command_name != "guildMemberUnboost"
                && command_name != "guildMemberRoleAdd"
                && command_name != "guildMemberRoleRemove"
                && command_name != "guildMemberNicknameUpdate"
                && command_name != "guildMemberEntered"
                && command_name != "guildBoostLevelUp"
                && command_name != "guildBoostLevelDown"
                && command_name != "guildBannerAdd"
                && command_name != "guildAfkChannelAdd"
                && command_name != "guildVanityURLAdd"
                && command_name != "guildVanityURLRemove"
                && command_name != "guildVanityURLUpdate"
                && command_name != "messagePinned"
                && command_name != "messageContentEdited"
                && command_name != "guildMemberOffline"
                && command_name != "guildMemberOnline"
                && command_name != "voiceChannelJoin"
                && command_name != "voiceChannelLeave"
                && command_name != "voiceChannelSwitch"
                && command_name != "voiceChannelMute"
                && command_name != "voiceChannelUnmute"
                && command_name != "voiceChannelDeaf"
                && command_name != "voiceChannelUndeaf"
                && command_name != "voiceStreamingStart") {
                return false
            } else {
                return true
            }
        }
    }




}