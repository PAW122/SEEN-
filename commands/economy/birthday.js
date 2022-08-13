//config economy db update

const { QuickDB } = require("quick.db");
module.exports = {
    name: "birthday",

    execute: async (message, args) => {
        var current = new Date();
        const rok = current.getFullYear();

        const userId = message.author.id

        if(args[0] == "help"){
            return message.reply(`set your birthday date to get extra coins
            usage: $birthday <month> <day> <year>
            !!u can change birthday date only 1 time
            
            if you use $daily on your birthday you will get a reward`)
        }
        if(!args[0] || !args[1] || !args[2]){
            return message.reply("its not correct date")
        }
        if(isNaN(args[0]) || isNaN(args[1] || isNaN(args[2]))){
            return message.reply("date need by number")
        }

        const month = args[0]
        const day =  args[1]
        const year = args[2]

        const zmiany = await db.get(`${userId}.birthday_changes`)

        if(zmiany == 0){
            return message.reply("u cant change your birthday date\n user cah change birthday date only 1 time")
        }else{
            zmiany - 1
        }

        await db.set(`${userId}.birthday[0]`, month)
        await db.set(`${userId}.birthday[1]`, day)
        await db.set(`${userId}.birthday[2]`, rok)
        await db.set(`${userId}.bitrhday_used_year`, rok)
        await db.set(`${userId}.birthday_changes`, zmiany)
    }
}