const Discord = require('discord.js');
const { QuickDB } = require("quick.db");
const setting_handler = require("./setings_handler")
const { SlashCommandBuilder } = require('@discordjs/builders');
const config = require("../../config/config")
const prefix = config.prefix
const owner_id = config.owner_id
const auto_settings = require("./auto_settings")
const owner_alert = require("../../handlers/owner_alert")

module.exports = {
  name: "settings",

  execute: async (message, args, client) => {
    const guildId = message.guild.id
    const db = new QuickDB({ filePath: process.cwd() + `/db/srv_settings/commands/${guildId}.sqlite` });

    if (!message.member.permissions.has("ADMINISTRATOR")) {
      if (message.author.id != owner_id) {
        return message.channel.send("You don't have admin authorization")
      }
    }

    // change nickname for a single guild
    async function updateNickname(guild, prefix) {
      client.guilds.cache.get(guild).members.cache.find(member =>
        member.id === client.user.id).setNickname("SEEN-" + `[${prefix}help]`);
    }

    if (args[0] == "owner_alert") {
      //0 == srv_set
      //1 == mod_logs
      //null == embed content from mod logs
      //null2 = guildId
      owner_alert(0, null, null, message, args, client)
      return
    }

    if (args[0] == "auto") {
      auto_settings(message, args, client)
      return
    }

    if (args[0] == "deafult") {
      setting_handler(message, client)
      await new Promise(r => setTimeout(r, 2000));
      return message.reply("deafult settings have been restored")
    }

    if (!args[0]) {
      return message.reply(`You didn't enter an argument
            commands - gives you the ability to disable individual commands
            usage eg: $settings <on/off> <command_name> .
            if you want to automatically configure the server use: **$settings auto_settings**`)
    }

    if (await db.get(`check.check`) == true) {
      //dodać message logs
      //console.log("test2")
      if (!args[1]) {
        return message.reply("you didn't enter an argument")
      }

      if (args[0] == "prefix") {
        const new_prefix = args[1]
        if (new_prefix.length() < 10) {
          return message.reply("Bot prefix cant have more then 10 characters")
        }
        await db.set(`prefix.check`, new_prefix)
        const guild_id = message.guild.id
        try {
          updateNickname(guild_id, new_prefix)
        } catch (err) {
          console.log(err)
        }
        return message.reply(`set prefix to: **${new_prefix}**`)
      }

      if (args[0] == "welcome_messages") {
        if (!args[1]) {
          return message.reply("you didn't enter an argument\n $srv_set to get help commands \n $srv_set list -- to get commands status")
        }
        if (isNaN(args[1])) return message.reply("bad channel id")//isNan error
        try {
          let channel = await client.channels.fetch(args[1])
        } catch (err) {
          if (err == "DiscordAPIError: Unknown Channel") {
            return message.reply("Wrong channel id")
          } else {
            return console.log(err)
          }
        }
        await db.set(`welcome.channelId`, args[1])
        return message.reply(`set welcome_messages channel id to: **${args[1]}**`)

      }

      if (args[0] == "welcome_msg_content") {
        if (args[1] == "off") {
          await db.set(`welocme_content_check`, false)
          return message.reply("set")
        }
        if (args[1] == "on") {
          await db.set(`welocme_content_check`, true)
          return message.reply("set")
        }
        const prefix = await db.get(`prefix.check`)
        const command_len = "settings"
        const content = message.content
        const arg = args[0]
        const to_slice = parseInt(arg.length) + parseInt(prefix.length) + command_len.length + 2
        const welocme_content = content.slice(to_slice)

        await db.set(`welocme_content`, welocme_content)
        await db.set(`welocme_content_check`, true)//co to robi w welmsg content???? 
        return message.reply(`set welcome_msg_content to: **${welocme_content}**`)

      }

      if (args[0] == "ticket") {
        if (isNaN(args[1])) {
          return message.reply("wrong channel id")
        }
        try {
          let channel = await client.channels.fetch(args[1])
        } catch (err) {
          if (err == "DiscordAPIError: Unknown Channel") {
            return message.reply("Wrong channel id")
          } else {
            return console.log(err)
          }
        }
        if (isNaN(args[2])) {
          return message.reply("wrong channel id")
        }
        try {
          let channel = await client.channels.fetch(args[2])
        } catch (err) {
          if (err == "DiscordAPIError: Unknown Channel") {
            return message.reply("Wrong channel id")
          } else {
            return console.log(err)
          }
        }
        //await db.set(`tickets`, { settings: ["null", "null"] })
        await db.set(`tickets.settings`, [args[1], args[2]])
        //<channel id for users> 
        return message.reply(`set ticket:\n users Channel: ${args[1]}\n administration channel: ${args[2]}`)
      }

      if (args[0] == "lvls_channel") {
        if (!args[1]) {
          return message.reply("you need type channel id\n example: $settings lvls_channel 16248716422")
        }
        if (isNaN(args[1])) {
          return message.reply("Wrong channel ID")
        }
        try {
          let channel = await client.channels.fetch(args[1])
        } catch (err) {
          if (err == "DiscordAPIError: Unknown Channel") {
            return message.reply("Wrong channel id")
          } else {
            return console.log(err)
          }
        }
        await db.set(`lvls_channel.channelId`, args[1])
        await db.set(`lvls_channel.check`, true)
        return message.reply(`set lvl channel: <#${args[1]}>`)
      }
      /*
            if(args[0] == "mod_logs"){
              if(!args[1]) {
                return message.reply("you need type channel id\n example: $settings mod_logs 16248716422")
              }
              if(isNaN(args[1])){
               return message.reply("Wrong channel ID")
              }
              await db.set(`mod_logs.channelId`, args[1])
              return message.reply("set")
            }
            */

      if (await db.get(`check.check`) == true) {

        if (args[0] == "off") {
          //zrobić liste nazw komend
          //const { QuickDB } = require("quick.db");
          const command_name = args[1]
          if (command_name == "anime_gif") {
            await db.set(`anime_gif.worker`, false)
            await db.set(`anime_gif.reason`, "this command is disabled on this server.")
            return message.reply("set")
          }
          if (command_name == "eight_ball") {//
            await db.set(`eight_ball.worker`, false)
            await db.set(`eight_ball.reason`, "this command is disabled on this server.")
            return message.reply("set")
          }
          if (command_name == "anime_seem_help") {
            await db.set(`anime_seem_help.worker`, false)
            await db.set(`anime_seem_help.reason`, "this command is disabled on this server.")
            return message.reply("set")
          }
          if (command_name == "anime_help") {
            await db.set(`anime_help.worker`, false)
            await db.set(`anime_help.reason`, "this command is disabled on this server.")
            return message.reply("set")
          }
          if (command_name == "updaty") {
            await db.set(`updaty.worker`, false)
            await db.set(`updaty.reason`, "this command is disabled on this server.")
            return message.reply("set")
          }
          if (command_name == "anime_list") {
            await db.set(`anime_list.worker`, false)
            await db.set(`anime_list.reason`, "this command is disabled on this server.")
            return message.reply("set")
          }
          if (command_name == "ankieta") {
            await db.set(`ankieta.worker`, false)
            await db.set(`ankieta.reason`, "this command is disabled on this server.")
            return message.reply("set")
          }
          if (command_name == "awatar") {
            await db.set(`awatar.worker`, false)
            await db.set(`awatar.reason`, "this command is disabled on this server.")
            return message.reply("set")
          }
          if (command_name == "ban") {
            await db.set(`ban.worker`, false)
            await db.set(`ban.reason`, "this command is disabled on this server.")
            return message.reply("set")
          }//const { QuickDB } = require("quick.db");
          if (command_name == "bot_info") {
            await db.set(`bot_info.worker`, false)
            await db.set(`bot_info.reason`, "this command is disabled on this server.")
            return message.reply("set")
          }
          if (command_name == "clear") {
            await db.set(`clear.worker`, false)
            await db.set(`clear.reason`, "this command is disabled on this server.")
            return message.reply("set")
          }
          if (command_name == "embed") {
            await db.set(`embed.worker`, false)
            await db.set(`embed.reason`, "this command is disabled on this server.")
            return message.reply("set")
          }
          if (command_name == "kick") {
            await db.set(`kick.worker`, false)
            await db.set(`kick.reason`, "this command is disabled on this server.")
            return message.reply("set")
          }
          if (command_name == "random") {
            await db.set(`random.worker`, false)
            await db.set(`random.reason`, "this command is disabled on this server.")
            return message.reply("set")
          }
          if (command_name == "ping") {
            await db.set(`ping.worker`, false)
            await db.set(`ping.reason`, "this command is disabled on this server.")
            return message.reply("set")
          }//const { QuickDB } = require("quick.db");
          if (command_name == "ruletka") {
            await db.set(`ruletka.worker`, false)
            await db.set(`ruletka.reason`, "this command is disabled on this server.")
            return message.reply("set")
          }
          if (command_name == "say") {
            await db.set(`say.worker`, false)
            await db.set(`say.reason`, "this command is disabled on this server.")
            return message.reply("set")
          }
          if (command_name == "srv_info") {//dodać execute do srv_info
            await db.set(`srv_info.worker`, false)
            await db.set(`srv_info.reason`, "this command is disabled on this server.")
            return message.reply("set")
          }
          if (command_name == "blitz_stats") {
            await db.set(`blitz_stats.worker`, false)
            await db.set(`blitz_stats.reason`, "this command is disabled on this server.")
            return message.reply("set")
          }
          if (command_name == "blitz_clan") {
            await db.set(`blitz_clan.worker`, false)
            await db.set(`blitz_clan.reason`, "this command is disabled on this server.")
            return message.reply("set")
          }
          if (command_name == "autoroles") {//komenda nie jest skonfigurowana
            await db.set(`autoroles.worker`, false)//więc nie włączam
            await db.set(`autoroles.reason`, "this command is disabled on this server.")//
            return message.reply("set")
          }
          if (command_name == "user_info") {//dodać execute
            await db.set(`user_info.worker`, false)
            await db.set(`user_info.reason`, "this command is disabled on this server.")
            return message.reply("set")
          }
          if (command_name == "lvl_command") {//tymczasowo usówam komende
            await db.set(`lvl_command.worker`, false)
            await db.set(`lvl_command.reason`, "this command is disabled on this server.")
            return message.reply("set")
          }
          if (command_name == "economy_command") {//narazie nie dodaje funkcji
            await db.set(`economy_command.worker`, false)//wyłączenia
            await db.set(`economy_command.reason`, "this command is disabled on this server.")
            return message.reply("set")
          }
          if (command_name == "anime_zapowiedzi") {//narazie nie dodaje funkcji
            await db.set(`anime_zapowiedzi.worker`, false)//wyłączenia
            await db.set(`anime_zapowiedzi.reason`, "this command is disabled on this server.")
            return message.reply("set")
          }
          if (command_name == "anime_seen") {//narazie nie dodaje funkcji
            await db.set(`anime_seen.worker`, false)//wyłączenia
            await db.set(`anime_seen.reason`, "this command is disabled on this server.")
            return message.reply("set")
          }
          if (command_name == "unban") {//narazie nie dodaje funkcji
            await db.set(`unban.worker`, false)//wyłączenia
            await db.set(`unban.reason`, "this command is disabled on this server.")
            return message.reply("set")
          }
          if (command_name == "ticket") {
            await db.set(`ticket.worker`, false)
            await db.set(`ticket.reason`, "this command is disabled on this server.")
            return message.reply("set")
          }
          if (command_name == "rpg") {
            await db.set(`rpg.worker`, false)
            await db.set(`rpg.reason`, "this command is disabled on this server.")
            return message.reply("set")
          }
          if (command_name == "game") {
            await db.set(`game.worker`, false)
            await db.set(`game.reason`, "this command is disabled on this server.")
            return message.reply("set")
          }
          if (command_name == "yt_notyfications") {
            await db.set(`yt_notyfications.worker`, false)
            await db.set(`yt_notyfications.reason`, "this command is disabled on this server.")
            return message.reply("set")
          }
          if (command_name == "mute") {
            await db.set(`mute.worker`, false)
            await db.set(`mute.reason`, "this command is disabled on this server.")
            return message.reply("set")
          }
        }

        if (args[0] == "on") {
          //zrobić liste nazw komend
          //const { QuickDB } = require("quick.db");
          const command_name = args[1]
          if (command_name == "anime_gif") {
            await db.set(`anime_gif.worker`, true)
            await db.set(`anime_gif.reason`, "this command is disabled on this server.")
            return message.reply("set")
          }
          if (command_name == "eight_ball") {//
            await db.set(`eight_ball.worker`, true)
            await db.set(`eight_ball.reason`, "this command is disabled on this server.")
            return message.reply("set")
          }
          if (command_name == "anime_seem_help") {
            await db.set(`anime_seem_help.worker`, true)
            await db.set(`anime_seem_help.reason`, "this command is disabled on this server.")
            return message.reply("set")
          }
          if (command_name == "anime_help") {
            await db.set(`anime_help.worker`, true)
            await db.set(`anime_help.reason`, "this command is disabled on this server.")
            return message.reply("set")
          }
          if (command_name == "updaty") {
            await db.set(`updaty.worker`, true)
            await db.set(`updaty.reason`, "this command is disabled on this server.")
            return message.reply("set")
          }
          if (command_name == "anime_list") {
            await db.set(`anime_list.worker`, true)
            await db.set(`anime_list.reason`, "this command is disabled on this server.")
            return message.reply("set")
          }
          if (command_name == "ankieta") {
            await db.set(`ankieta.worker`, true)
            await db.set(`ankieta.reason`, "this command is disabled on this server.")
            return message.reply("set")
          }
          if (command_name == "awatar") {
            await db.set(`awatar.worker`, true)
            await db.set(`awatar.reason`, "this command is disabled on this server.")
            return message.reply("set")
          }
          if (command_name == "ban") {
            await db.set(`ban.worker`, true)
            await db.set(`ban.reason`, "this command is disabled on this server.")
            return message.reply("set")
          }//const { QuickDB } = require("quick.db");
          if (command_name == "bot_info") {
            await db.set(`bot_info.worker`, true)
            await db.set(`bot_info.reason`, "this command is disabled on this server.")
            return message.reply("set")
          }
          if (command_name == "clear") {
            await db.set(`clear.worker`, true)
            await db.set(`clear.reason`, "this command is disabled on this server.")
            return message.reply("set")
          }
          if (command_name == "embed") {
            await db.set(`embed.worker`, true)
            await db.set(`embed.reason`, "this command is disabled on this server.")
            return message.reply("set")
          }
          if (command_name == "kick") {
            await db.set(`kick.worker`, true)
            await db.set(`kick.reason`, "this command is disabled on this server.")
            return message.reply("set")
          }
          if (command_name == "random") {
            await db.set(`random.worker`, true)
            await db.set(`random.reason`, "this command is disabled on this server.")
            return message.reply("set")
          }
          if (command_name == "ping") {
            await db.set(`ping.worker`, true)
            await db.set(`ping.reason`, "this command is disabled on this server.")
            return message.reply("set")
          }//const { QuickDB } = require("quick.db");

          if (command_name == "ruletka") {
            await db.set(`ruletka.worker`, true)
            await db.set(`ruletka.reason`, "this command is disabled on this server.")
            return message.reply("set")
          }
          if (command_name == "say") {
            await db.set(`say.worker`, true)
            await db.set(`say.reason`, "this command is disabled on this server.")
            return message.reply("set")
          }
          if (command_name == "srv_info") {//dodać execute do srv_info
            await db.set(`srv_info.worker`, true)
            await db.set(`srv_info.reason`, "this command is disabled on this server.")
            return message.reply("set")
          }
          if (command_name == "blitz_stats") {
            await db.set(`blitz_stats.worker`, true)
            await db.set(`blitz_stats.reason`, "this command is disabled on this server.")
            return message.reply("set")
          }
          if (command_name == "blitz_clan") {
            await db.set(`blitz_clan.worker`, true)
            await db.set(`blitz_clan.reason`, "this command is disabled on this server.")
            return message.reply("set")
          }
          if (command_name == "autoroles") {//komenda nie jest skonfigurowana
            await db.set(`autoroles.worker`, true)//więc nie włączam
            await db.set(`autoroles.reason`, "this command is disabled on this server.")//
            return message.reply("set")
          }
          if (command_name == "user_info") {//dodać execute
            await db.set(`user_info.worker`, true)
            await db.set(`user_info.reason`, "this command is disabled on this server.")
            return message.reply("set")
          }
          if (command_name == "lvl_command") {//tymczasowo usówam komende
            await db.set(`lvl_command.worker`, true)
            await db.set(`lvl_command.reason`, "this command is disabled on this server.")
            return message.reply("set")
          }
          if (command_name == "economy_command") {//narazie nie dodaje funkcji
            await db.set(`economy_command.worker`, true)//wyłączenia
            await db.set(`economy_command.reason`, "this command is disabled on this server.")
            return message.reply("set")
          }
          if (command_name == "anime_zapowiedzi") {//narazie nie dodaje funkcji
            await db.set(`anime_zapowiedzi.worker`, true)//wyłączenia
            await db.set(`anime_zapowiedzi.reason`, "this command is disabled on this server.")
            return message.reply("set")
          }
          if (command_name == "anime_seen") {//narazie nie dodaje funkcji
            await db.set(`anime_seen.worker`, true)//wyłączenia
            await db.set(`anime_seen.reason`, "this command is disabled on this server.")
            return message.reply("set")
          }
          if (command_name == "economy_command") {//narazie nie dodaje funkcji
            await db.set(`economy_command.worker`, true)//wyłączenia
            await db.set(`economy_command.reason`, "this command is disabled on this server.")
            return message.reply("set")
          }
          if (command_name == "unban") {//narazie nie dodaje funkcji
            await db.set(`unban.worker`, true)//wyłączenia
            await db.set(`unban.reason`, "this command is disabled on this server.")
            return message.reply("set")
          }
          if (command_name == "ticket") {
            await db.set(`ticket.worker`, true)
            await db.set(`ticket.reason`, "this command is disabled on this server.")
            return message.reply("set")
          }
          if (command_name == "rpg") {
            await db.set(`rpg.worker`, true)
            await db.set(`rpg.reason`, "this command is disabled on this server.")
            return message.reply("set")
          }
          if (command_name == "game") {
            await db.set(`game.worker`, true)
            await db.set(`game.reason`, "this command is disabled on this server.")
            return message.reply("set")
          }
          if (command_name == "yt_notyfications") {
            await db.set(`yt_notyfications.worker`, true)
            await db.set(`yt_notyfications.reason`, "this command is disabled on this server.")
            return message.reply("set")
          }
          if (command_name == "mute") {
            await db.set(`mute.worker`, true)
            await db.set(`mute.reason`, "this command is disabled on this server.")
            return message.reply("set")
          }
        }

      } else {//ustawienia deafult
        setting_handler(message)
        await new Promise(r => setTimeout(r, 2000));
        return message.reply("Server settings profile has been created, use the command again to save changes")
      }



    } else {
      return message.reply("use **$settings deafult** to create server settings profil")
    }
  }
}