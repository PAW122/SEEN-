const { QuickDB } = require("quick.db");
const Discord = require("discord.js")
//const xp = require("../db/lvl/lvl.json")
const fs = require("fs")
const config = require("../config/config")
const min_xp_per_message = config.min_xp_per_message
const max_xp_per_message = config.max_xp_per_message - min_xp_per_message
const xp_per_lvl = config.xp_per_lvl
const xp_per_lvl_scaling = config.xp_per_lvl_scaling

//dodać lvling worker

module.exports = (client) => {

    client.on('messageCreate', async message => {

            if(message.guild == null) return;
            const guildId = message.guild.id


        const db = new QuickDB({ filePath: process.cwd() + `/db/lvl/${guildId}.sqlite` });

        if (message.author.bot) return

        //load server settings
        const db2 = new QuickDB({ filePath: process.cwd() + `/db/srv_settings/commands/${guildId}.sqlite` });
        if (await db2.get(`check.check`) == true) {
            const settings = await db2.get(`lvl_command.worker`)
            const settings_reason = await db2.get(`lvl_command.reason`)
            if (settings != true) { return }//nie wysyłaj powodu wyłączenia przy wbiciu lvl
        }

        //jeżeli nie jest podany kanał id dla lvl: return
        const lvl_status = await db2.get(`lvls_channel.check`)
        if (lvl_status != true) return;

        let xpAdd = Math.floor(Math.random() * min_xp_per_message) + max_xp_per_message

        const authorId = message.author.id

        //urztkownik nie posiada xp
        if (await db.get(`${authorId}.check`) != true) {
            await db.set(`${authorId}.check`, true)
            await db.set(`${authorId}.xp`, 0)
            await db.set(`${authorId}.level`, 1)
            await db.set(`${authorId}.msg`, 1)
            await db.set(`${authorId}.check`, true)
        }

        const data = await db.get(authorId)
        //console.log(data)

        let curxp = data.xp
        let xp = curxp + xpAdd;
        let curlvl = data.level
        let nxtLvl = ((curlvl + 1) * xp_per_lvl_scaling) * xp_per_lvl;
        let msg = data.msg + 1


        try {
            if (nxtLvl <= curxp) {
                let nxtLvl = ((curlvl + 2) * xp_per_lvl_scaling) * xp_per_lvl;
                const db2 = new QuickDB({ filePath: process.cwd() + `/db/srv_settings/commands/${guildId}.sqlite` });

                const channel_id = await db2.get(`lvls_channel.channelId`)
                curlvl = curlvl + 1;

                const embed = new Discord.MessageEmbed()

                    .setColor(`BLUE`)//EN
                    .setTitle(`Lvl up`)
                    .setDescription(`<@${authorId}> your lvl is **${curlvl + 1}**
                to get next lvl u have ${curxp.toFixed(0)}/${nxtLvl.toFixed(0)} xp.
                you sent in total ${msg} messages`)

                //jeżeli serwer ma ustawione lvls channel id w ustawieniach:
                if (channel_id == false) {
                    save_data()
                    return message.channel.send({ embeds: [embed] })
                } else {
                    //check chanel id
                    try {
                        let channel = await client.channels.fetch(channel_id)
                    } catch (err) {
                        if (err == "DiscordAPIError: Unknown Channel") {
                            const lvl_status = await db2.set(`lvls_channel.check`, false)
                            return message.reply("Probably administration set wrong channel id.\n Use **$settings lvls_channel <channel_ID> \nlvling channel: deafult**")
                            //lvling channel = false

                        } else {
                            return console.log(err)
                        }
                    }

                    try {
                        save_data()
                        return client.channels.cache.get(channel_id).send({ embeds: [embed] });
                    } catch (err) {
                        if (err == "Cannot read properties of undefined (reading 'send')") {
                            save_data()
                            return message.channel.send("Probably administration set wrong channel id.\n Use **$settings lvls_channel <channel_ID>**")
                        }
                        console.log(err)
                        save_data()
                        return message.channel.send("Probably administration set wrong channel id.\n Use **$settings lvls_channel <channel_ID>**")
                    }
                }

            }


            async function save_data() {
                await db.set(`${authorId}.xp`, xp)
                await db.set(`${authorId}.level`, curlvl)
                await db.set(`${authorId}.msg`, msg)
            }
            save_data()

        } catch (err) {
            console.log(err)
        }
    });


}