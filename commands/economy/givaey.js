//komenda ma stworzyć konkurs
// $konkurs <ilość monet> <id kanału> <ile czasu ma trwać>

/*bot musi:
zabrać monety autorowi konkursu
zapisać id kanału
zapisać kieyd konkurs został stworzony
zapisać kiedy konkurs ma się skończyć

wysłać wiadomośc konkursową
zapisać id wiadomości

gdy minie czas:
sprawdzić kto zostawił reakcje pod wiadomością konkursową
wylosować 1 osobe
wysłać wiadomość na kanale że wygrała dana osoba i co wygrała
dodać do eq danej osoby coinsy
*/

const { QuickDB } = require("quick.db");
const check_db = require("./economy_handler")
const config = require("../../config/config")
const emoji = config.economy_emoji
const { Permissions: { FLAGS } } = require('discord.js');
const Discord = require('discord.js');
module.exports = {
    name: "givaey",

    execute: async (message, args, client) => {
        //load server settings
        const guildId = message.guild.id
        const db2 = new QuickDB({ filePath: process.cwd() + `/db/srv_settings/commands/${guildId}.sqlite` });
        if(await db2.get(`check.check`) == true){
            const settings = await db2.get(`economy_command.worker`)
            const settings_reason = await db2.get(`economy_command.reason`)
            if(settings != true){return message.channel.send(settings_reason)}
        }

    }
}