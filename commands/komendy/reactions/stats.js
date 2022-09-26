//reactions stats:

const { QuickDB } = require("quick.db");
const Discord = require('discord.js');

module.exports = {
    name: "reactions",

    execute: async (message, args, client) => {
        if (args[0] == "help") {
            message.reply("Use **$reactions stats** to get statistics\n use ** $reactions stats @user** to get user stats\n")
        }

        if(!args[0]) {
            return message.reply("Try use: **$reactions help**")
        }

        if (args[0] == "stats") {
            async function main() {
                if (!args[1]) {

                    //wczytaj statystyki
                    const userId = message.author.id
                    const db = new QuickDB({ filePath: process.cwd() + `/db/reactions/${userId}.sqlite` });

                    const check = await db.get("check")
                    if(check != true) {
                        return message.reply("You dont use any reactions")
                    }else {
                        var angry_c = await db.get("angry")
                        var eat_c = await db.get("eat")
                        var happy_c = await db.get("happy")
                        var kill_c = await db.get("kill")
                        var love_c = await db.get("love")
                        var run_c = await db.get("run")
                        var scarry_c = await db.get("scarry")
                        var sleep_c = await db.get("sleep")

                        if(!angry_c) var angry_c = 0
                        if(!eat_c) var eat_c = 0
                        if(!happy_c) var happy_c = 0
                        if(!kill_c) var kill_c = 0
                        if(!love_c) var love_c = 0
                        if(!run_c) var run_c = 0
                        if(!scarry_c) var scarry_c = 0
                        if(!sleep_c) var sleep_c = 0
                    }
                    


                    //wyślij ststystyki autora wiadomości
                    const embed_pl = new Discord.MessageEmbed()
                        .setColor(`BLUE`)
                        .setTitle(`Reactions`)
                        .setDescription(`How many times you use reactions:`)
                        .addFields(
                            { name: "angry", value: `${angry_c}`, inline: true },
                            { name: "eat", value: `${eat_c}`, inline: true },
                            { name: "happy", value: `${happy_c}`, inline: true },
                            { name: "kill", value: `${kill_c}`, inline: true },
                            { name: "love", value: `${love_c}`, inline: true },
                            { name: "run", value: `${run_c}`, inline: true },
                            { name: "scarry", value: `${scarry_c}`, inline: true },
                            { name: "sleep", value: `${sleep_c}`, inline: true }
                        )
                    message.channel.send({ embeds: [embed_pl] });
                } else {
                    if (!message.mentions.users.first()) return message.reply("This person dont exist");
                    const targer = message.mentions.users.first();

                }
            }
            main()
        }
    }
}