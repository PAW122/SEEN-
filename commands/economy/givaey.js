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
const srv_settings = require("../../handlers/check_srv_settings")
module.exports = {
    name: "givaey",

    execute: async (message, args, client) => {
        //load server settings
        const guildId = message.guild.id
        const command_name = "economy_command"
        srv_settings(command_name,guildId)

    }
}