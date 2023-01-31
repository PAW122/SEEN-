const Discord = require("discord.js")
const user_messages_stats = require("../../../handlers/stats_handlers.js/user_msg_stats")
const action_list = ["msg"]
const { QuickDB } = require("quick.db");
const db = new QuickDB({ filePath: process.cwd() + `/db/stats/messages.sqlite` });
const moment = require("moment")

const help_embed = new Discord.MessageEmbed()
    .setTitle("stats help page")
    .setColor("RANDOM")
    .setFields(
        { name: "user messages stats", value: "$stats msg @user" }
    )

module.exports = {
    name: "stats",
    help: help_embed,

    execute: async (message, args, client) => {
        
        if(message.author.id != "438336824516149249") {
            return console.log(`${message.author.id} try use $stats command`)
        }

        if (args[0] == "help") {
            return message.reply({ embeds: [help_embed] })
        }

        if(args[0] == "test") {
            return message.reply(convertTimestampToDate(1677625200000))
        }

        const action = args[0]
        if (!action || check_action(action) != true) {
            return message.reply("**" + action + "** in not a valid action\n use $help stats to get informations how use this command")
        }
        let user = message.mentions.members.first()
        if (!user) user = message.author

        message.reply(`${message.author.username} stats:`)
        data_menager(message)

    }
}

async function data_menager(message) {
    //const db_guilds = new QuickDB({ filePath: process.cwd() + `/db/stats/guilds/${guild_id}.sqlite` });

    const data = await db.get(`${message.author.id}`)
    const all_msg = data.all_msg
    const msg_per_day_list = data.msg_per_day_list
    const msg_date_list = data.msg_date_list

    const len = msg_date_list.length
    let string = "stats: \n"
   // console.log("len:" + len)
    let i = 0;

    console.log(msg_date_list)

    msg_date_list.forEach(element => {

        console.log("data ts: " + msg_date_list[i])
        string += `${msg_per_day_list[i]} : ${formatTimestamp(msg_date_list[i])}`
       // console.log(msg_per_day_list[i])
       // console.log(msg_date_list[i])
       // console.log(i)
        i++
    })

    //console.log("---------------------------------")
    //console.log(string)

    const embed = new Discord.MessageEmbed()
        .setTitle("user global stats")
        .setColor("RANDOM")
        .setFields(
            { name: "wszystkie wiadomości: ", value: `${string}` }
        )
    return message.reply({ embeds: [embed] })

    // console.log(`${all_msg}\n ${msg_per_day_list} \n ${msg_date_list}`)

}

const formatTimestamp = (timestamp) => {
    moment.locale('pl');
    const date = moment(timestamp).add(30, 'days').format('DD.MM.YYYY');
    return date;
  }

function check_action(action) {
    let res = false
    action_list.forEach(act => {
        if (act == action) res = true
    })
    return res
}