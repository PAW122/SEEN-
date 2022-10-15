//sprawdza czy user to alt (czy konto ma więcej niż 7 dni)
//$is alt
const config = require("../../../config/config")
const owner_id = config.owner_id
const ms = require("ms");
const timesamp = ms("7 days");
module.exports = {
    name: "isalt",

    execute: async(message,args,client) => {

        if(args[0] == "help") {
            return message.reply("usage: **$isalt @user**")
        }

        const target = message.mentions.users.first();
        if(!target) return message.reply("you have to tag someone");
        if(target.id == owner_id) return message.reply("I'm sure it's not alt");

        const createdAt = new Date(target.createdAt).getTime();
        const Diffrence = Date.now() - createdAt

        if(Diffrence < timesamp) {
            return message.reply(`User ${target} is probably alt.\n because this account is less than 7 days old`)
        }else{
            return message.reply("This user is not on record as his account is more than 7 days old")
        }

    } 
}