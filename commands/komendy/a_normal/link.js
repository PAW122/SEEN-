
module.exports = {
    name: "link",

    execute: async(message,args,client) => {
        if(args[0] == "help") {
            return message.reply("user **$link** to get invite bot link")
        }

        return message.reply("** Invite bot link:** \n https://discord.com/api/oauth2/authorize?client_id=797070806885990431&permissions=8&scope=bot%20applications.commands")
    }
}