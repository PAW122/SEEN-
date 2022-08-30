/*
pozwala przekazywać swoje pieniądze innej osobie,
jeżeli osoba przekazująca pieniądze miała dodawane poieniądze
to obydwie osoby nie będą liczone do globalnego banku
*/
const { QuickDB } = require("quick.db");
const Discord = require("discord.js")
module.exports = {
    name: "pay",

    execute: async (message, args, client) => {

        const guildId = message.guild.id
        const userId = message.author.id

        const db2 = new QuickDB({ filePath: process.cwd() + `/db/srv_settings/commands/${guildId}.sqlite` });
        if (await db2.get(`check.check`) == true) {
            const settings = await db2.get(`economy_command.worker`)
            const settings_reason = await db2.get(`economy_command.reason`)
            if (settings == false) { return message.channel.send(settings_reason) }
        }

        if (args[0] == "help") {
            return message.reply("Send your money to someone\n usage: $pay <userID> <coins>\n example: $pay 438336824516149249 100")
        }

        const db = new QuickDB({ filePath: process.cwd() + `/db/economy/local_economy/${guildId}.sqlite` });
        const author_coins = await db.get(`${userId}.coins[0]`);
        const author_roll_status = await db.get(`${userId}.added_coins`)

        if (!args[1] || isNaN(args[1])) {
            return message.reply("You type wrong coins number")
        }
        const coins_to_pat_args = args[1]
        if (coins_to_pat_args > author_coins) {
            return message.reply("You dont have thays many coins")
        }
        const coins_to_pat = parseInt(args[1])

        if (!args[0] || isNaN(args[0])) {
            return message.reply("Wrong user id")
        }

        const target_id = args[0]
        //sprawdz, czy urzytkownik któremu chcemy przekazać pieniądze istnieje
        if (await db.get(`${target_id}.check`) != true) {
            return message.reply("This person dont have profil in economy on this server")
        }

        if (author_roll_status == true) {
            //przypisz urzytkownikowi, któremu sa dodawane pieniądze, żeby miał status dodawanych pieniędzy
        }

        async function save_data() {
            //odejmij autorowi monety:
            const author_coins = await db.get(`${userId}.coins[0]`);
            const set_coins = parseInt(author_coins) - parseInt(coins_to_pat)
            await db.set(`${userId}.coins[0]`, set_coins);

            //dodaj urzytkownikowi monety
            const target_coins = await db.get(`${target_id}.coins[0]`);
            const coins_to_add = parseInt(target_coins) + parseInt(coins_to_pat)
            await db.set(`${target_id}.coins[0]`, coins_to_add);

            //ewentualnie dodaj roll status
            if (author_roll_status == true) {
                await db.set(`${target_id}.added_coins`, true)
                console.log("test dodano status dodawanych coinsów")
            }

            return message.reply(`You send ${coins_to_pat} coins to <@${target_id}> sukcesfully`)
        }

        save_data()

    }
}