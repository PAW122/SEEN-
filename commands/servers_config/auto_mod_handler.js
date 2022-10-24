const { QuickDB } = require("quick.db");
const Discord = require("discord.js");
const { Permissions: { FLAGS } } = require('discord.js');

module.exports = (client, message) => {
    async function main() {
        if (message.author.bot) return;

        const guildId = message.guild.id

        const args = message.content.trim().split(/ +/);
        const db = new QuickDB({ filePath: process.cwd() + `/db/automod/${guildId}.sqlite` });
        const db_words = new QuickDB({ filePath: process.cwd() + `/db/automod/wrds/worlds.sqlite` });


        if (await db.get(`${guildId}.check`) != true) return;
        const status = await db.get(`${guildId}.status`)

        if (status != true) return;

        //nie usówaj słów wysłanych przez administracje
        if (message.member.permissions.has(FLAGS.ADMINISTRATOR)) {
            return
        }

        //lista banowanych słów
        var banned_words = await db_words.get(`${guildId}.worldlist`)
        args.forEach(element => {
            banned_words.forEach(word => {
                if (word == element) {
                    message.delete()
                    try {
                        async function sendReport() {
                            const channelcheck = await db.get(`${guildId}.channelcheck`)
                            if (channelcheck == true) {
                                const channelId = await db.get(`${guildId}.channel`)
                                return client.channels.cache.get(channelId).send(`Automod delete message: __'${message.content}'__\n Message is send by ${message.author}`);
                            }
                        }
                        sendReport()
                    } catch (err) {
                        return console.log(err)
                    }
                }
            })
        });
    }
    main()
}