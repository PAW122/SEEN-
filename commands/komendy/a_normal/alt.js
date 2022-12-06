const config = require("../../../config/config")
const owner_id = config.owner_id
const ms = require("ms");
const timesamp = ms("7 days");
const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
    name: "isalt",
    isSlash: true,

    data: new SlashCommandBuilder()
        .setName('isalt')
        .setDescription('check someone is alt')
        .addUserOption((option) =>
            option
                .setName("mark_user")
                .setDescription("mark someone to check is alt")
                .setRequired(true)
        ),
    executeInteraction: async (inter) => {
        const target = inter.options.getUser('mark_user')
        if(!target) return inter.reply("you have to tag someone");
        if(target.id == owner_id) return inter.reply("I'm sure it's not alt");

        const createdAt = new Date(target.createdAt).getTime();
        const Diffrence = Date.now() - createdAt

        if(Diffrence < timesamp) {
            return inter.reply(`User ${target} is probably alt.\n because this account is less than 7 days old`)
        }else{
            return inter.reply("This user is not on record as his account is more than 7 days old")
        }
    },






    
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