const { QuickDB } = require("quick.db");
const Discord = require("discord.js")
module.exports = (type, logs_embed, guildId, message, args, client) => {
    //args[1] == on
    //args[1] == off

    //0 == srv_set
    //1 == mod_logs
    async function main() {

        if (type == 0) {
            //sprawdż czy osoba zmieniająca ustawienia jest właścicielem serwera
            var srv_owner = message.guild.ownerId
            if (srv_owner != message.author.id) {
                console.log(srv_owner)
                console.log(message.author.id)
                return message.reply("you are not the owner of the server")
            }
            const guildId = message.guild.id
            if(isNaN(guildId)) return console.log(`isNaN ${guildId} in owner_alert.js`)
            const db = new QuickDB({ filePath: process.cwd() + `/db/srv_settings/commands/${guildId}.sqlite` });

            const check = await db.get("owner_alert_check")

            if (args[1] == "help") {
                const embed_pl = new Discord.MessageEmbed()
                    .setColor(`BLUE`)
                    .setTitle(`server woner alert help`)
                    .setDescription("Bot send private messages to server owner with alerts containing information about what is happening on the server")
                    .addFields(
                        { name: "on", value: "command: **$settings owner_alert on**" },
                        {name: "off", value: "command: **$settings owner_alert off**"},
                        {name: "alerts types", value: "1.**membed join server**\n 2.**member leave server** \n 3.**member get role** \n 4.**member lost role**"}
                    )
                return message.reply({embeds: [embed_pl]})
            }

            if (args[1] == "on") {
                await db.set("owner_alert_check", true)
                return message.reply("set")
            }

            if (args[1] == "off") {
                await db.set("owner_alert_check", false)
                return message.reply("set")
            }
            if (check != true) return;
        }

        if (type == 1) {
            //sprawdż w db czy owner alert jest włączono
            if(isNaN(guildId)) return console.log(`isNan ${guildId}`)
            const db = new QuickDB({ filePath: process.cwd() + `/db/srv_settings/commands/${guildId}.sqlite` });
            const check = await db.get("owner_alert_check")
            if (check != true) return;
            const guild = client.guilds.cache.get(guildId)
            //client.users.cache.get(guild.ownerId).send(`**${guild.name}**: owner alert. \n if you want to disable alerts use **$settings owner_alert off** on the server from which the notification came`);
            client.users.cache.get(guild.ownerId).send(`**${guild.name}**: owner alert.`);
            return client.users.cache.get(guild.ownerId).send({ embeds: [logs_embed] });

            //dodać ustawienia jaki typ logów ma być wysyłany
        }
    }
    main()
    //dodać do welocme
}