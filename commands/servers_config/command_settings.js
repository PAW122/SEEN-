const Discord = require('discord.js');
const { QuickDB } = require("quick.db");
const setting_handler = require("./setings_handler")
module.exports = {
    name: "settings",

    execute: async (message, args, client) => {
        const guildId = message.guild.id
        const db = new QuickDB({ filePath: process.cwd() + `/db/srv_settings/commands/${guildId}.sqlite` });

        if(args[0] == "deafult"){
            setting_handler(message)
            await new Promise(r => setTimeout(r, 2000));
            return message.reply("przywrucono deafultowe ustawienia")
        }

        if(!args[0]){
            message.reply(`nie podałeś argumentu
            commands - daje możiwość wyłączenia poszczegulnych komend
            użycie: $settings <on/off> <command_name> `)
        }

        if(!args[1]){
            message.reply("podaj nazwe komendy")
        }

        if(!args[2]){
            message.reply("podaj powód wyłączenia komendy")
        }

        if(await db.get(`check.check`) == true){
//dodać message logs
            if(args[0] == "off"){
            
                if (!message.member.permissions.has("ADMINISTRATOR")) {
                    return message.channel.send("nie masz uprawnień Administratora")
                }//zrobić liste nazw komend
                //const { QuickDB } = require("quick.db");
                const command_name = args[1]
                if(command_name == "anime_gif"){
                    await db.set(`anime_gif.worker`, false)
                    await db.set(`anime_gif.reason`, args[2])
                    message.reply("ustawiono")
                }
                if(command_name == "eight_ball"){//
                    await db.set(`eight_ball.worker`, false)
                    await db.set(`eight_ball.reason`, args[2])
                    message.reply("ustawiono")
                }
                if(command_name == "anime_seem_help"){
                    await db.set(`anime_seem_help.worker`, false)
                    await db.set(`anime_seem_help.reason`, args[2])
                    message.reply("ustawiono")
                }
                if(command_name == "anime_help"){
                    await db.set(`anime_help.worker`, false)
                    await db.set(`anime_help.reason`, args[2])
                    message.reply("ustawiono")
                }
                if(command_name == "updaty"){
                    await db.set(`updaty.worker`, false)
                    await db.set(`updaty.reason`, args[2])
                    message.reply("ustawiono")
                }
                if(command_name == "anime_list"){
                    await db.set(`anime_list.worker`, false)
                    await db.set(`anime_list.reason`, args[2])
                    message.reply("ustawiono")
                }
                if(command_name == "ankieta"){
                    await db.set(`ankieta.worker`, false)
                    await db.set(`ankieta.reason`, args[2])
                    message.reply("ustawiono")
                }
                if(command_name == "awatar"){
                    await db.set(`awatar.worker`, false)
                    await db.set(`awatar.reason`, args[2])
                    message.reply("ustawiono")
                }
                if(command_name == "ban"){
                    await db.set(`ban.worker`, false)
                    await db.set(`ban.reason`, args[2])
                    message.reply("ustawiono")
                }//const { QuickDB } = require("quick.db");
                if(command_name == "bot_info"){
                    await db.set(`bot_info.worker`, false)
                    await db.set(`bot_info.reason`, args[2])
                    message.reply("ustawiono")
                }
                if(command_name == "clear"){
                    await db.set(`clear.worker`, false)
                    await db.set(`clear.reason`, args[2])
                    message.reply("ustawiono")
                }
                if(command_name == "clock"){
                    await db.set(`clock.worker`, false)
                    await db.set(`clock.reason`, args[2])
                    message.reply("ustawiono")
                }
                if(command_name == "embed"){
                    await db.set(`embed.worker`, false)
                    await db.set(`embed.reason`, args[2])
                    message.reply("ustawiono")
                }
                if(command_name == "kick"){
                    await db.set(`kick.worker`, false)
                    await db.set(`kick.reason`, args[2])
                    message.reply("ustawiono")
                }
                if(command_name == "random"){
                    await db.set(`random.worker`, false)
                    await db.set(`random.reason`, args[2])
                    message.reply("ustawiono")
                }
                if(command_name == "ping"){
                    await db.set(`ping.worker`, false)
                    await db.set(`ping.reason`, args[2])
                    message.reply("ustawiono")
                }//const { QuickDB } = require("quick.db");
                if(command_name == "ruletka_extream"){
                    await db.set(`ruletka_extream.worker`, false)
                    await db.set(`ruletka_extream.reason`, args[2])
                    message.reply("ustawiono")
                }
                if(command_name == "ruletka"){
                    await db.set(`ruletka.worker`, false)
                    await db.set(`ruletka.reason`, args[2])
                    message.reply("ustawiono")
                }
                if(command_name == "say"){
                    await db.set(`say.worker`, false)
                    await db.set(`say.reason`, args[2])
                    message.reply("ustawiono")
                }
                if(command_name == "srv_info"){//dodać execute do srv_info
                    await db.set(`srv_info.worker`, false)
                    await db.set(`srv_info.reason`, args[2])
                    message.reply("ustawiono")
                }
                if(command_name == "blitz_stats"){
                    await db.set(`blitz_stats.worker`, false)
                    await db.set(`blitz_stats.reason`, args[2])
                    message.reply("ustawiono")
                }
                if(command_name == "blitz_clan"){
                    await db.set(`blitz_clan.worker`, false)
                    await db.set(`blitz_clan.reason`, args[2])
                    message.reply("ustawiono")
                }
                if(command_name == "autoroles"){//komenda nie jest skonfigurowana
                    await db.set(`autoroles.worker`, false)//więc nie włączam
                    await db.set(`autoroles.reason`, args[2])//
                    message.reply("ustawiono")
                }
                if(command_name == "user_info"){//dodać execute
                    await db.set(`user_info.worker`, false)
                    await db.set(`user_info.reason`, args[2])
                    message.reply("ustawiono")
                }
                if(command_name == "lvl_command"){//tymczasowo usówam komende
                    await db.set(`lvl_command.worker`, false)
                    await db.set(`lvl_command.reason`, args[2])
                    message.reply("ustawiono")
                }
                if(command_name == "economy_command"){//narazie nie dodaje funkcji
                    await db.set(`economy_command.worker`, false)//wyłączenia
                    await db.set(`economy_command.reason`, args[2])
                    message.reply("ustawiono")
                }
                
            }

            if(await db.get(`check.check`) == true){

                if(args[0] == "on"){
                
                    if (!message.member.permissions.has("ADMINISTRATOR")) {
                        return message.channel.send("nie masz uprawnień Administratora")
                    }
                    
                    const command_name = args[2]
                    if(command_name == "anime_gif"){
                        await db.set(`anime_gif.worker`, true)
                        message.reply("ustawiono")
                    }
                    if(command_name == "eight_ball"){
                        await db.set(`eight_ball.worker`, true)
                        message.reply("ustawiono")
                    }
                    
                }
            }

        }else{//ustawienia deafult
            setting_handler(message)
            await new Promise(r => setTimeout(r, 2000));
            return message.reply("Stworzono profil ustawień serwera")
        }

        

    }
}