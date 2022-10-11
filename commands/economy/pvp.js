const { QuickDB } = require("quick.db");

module.exports = {
    name: "pvp",

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
           return message.reply("$pvp <coins> <@user> \n example: $pvp 100 <@797070806885990431>")
        }

        const db = new QuickDB({ filePath: process.cwd() + `/db/economy/local_economy/${guildId}.sqlite` });

        const authorId = message.author.id
        const coins = args[0]
        const target = message.mentions.users.first();
        const target_id = target.id


        if (!args[0] || isNaN(args[0])) return message.reply("you did not enter the number of coins");
        if (!target_id) return message.reply("you did not enter the enemy userId");

        //sprawdż czy urzytkownik istnieje
        if (await db.get(`${authorId}.check`) != true) return message.reply("you do not have a profile in the economy system");
        if (await db.get(`${target_id}.check`) != true) return message.reply("your opponent has no profile in the economy system");

        if(authorId == target_id) return message.reply("you cant play with yourself");

        message.channel.send(`<@${target_id}> did you accept pvp with ${message.author} four ${coins} coins?\n you have 10 secounds to type **accept**`)

        //żeby zaakceptowac 2 użytkownik musi użyć accept
        let channel = client.channels.cache.get(message.channel.id)

        var i = 1;

        client.on('messageCreate', async message => {
            var i = i + 1
        });

        await new Promise(r => setTimeout(r, 10000));//10 sekund na wysłanie wiadomości

        channel.messages.fetch({ limit: i }).then(messages => {//sprawdza ostatnie 10 wiadomości (da isę oszukać i wyzwać go na walke po napisania accept)
            //trzeba dodać funkcje, client.on(messagecreate), która liczy ilość wiadomości i jako limit podaje te liczbe
            let lastMessage = messages.first();

            if (!lastMessage.author.bot) {
                if (lastMessage.author.id == target_id && lastMessage.content == "accept") {
                    pvp_game()
                }else{
                    return
                }
            }
        })
            .catch(console.error);



        async function pvp_game(){

            const player1_coins = await db.get(`${authorId}.coins[0]`)
            const player2_coins = await db.get(`${target_id}.coins[0]`)

            if(player1_coins < coins) return message.reply(`<@${userId}> dont have thats many coins`);
            if(player2_coins < coins) return message.reply(`<@${target_id}> You dont have thats many coins`);

            const rng = Math.floor(Math.random() * 2) + 1 // albo 1 albo 2
            if(rng == 1){
                const player1_setCoins = player1_coins + (coins)
                const player2_setCoins = player2_coins - (coins)

                //zapisz dane
                await db.set(`${authorId}.coins[0]`,player1_setCoins)
                await db.set(`${target_id}.coins[0]`,player2_setCoins)

                return message.reply(`<@${authorId}> is winner\n redwad is ${coins}`)
            }else if(rng == 2){
                const player1_setCoins = player1_coins - (coins)
                const player2_setCoins = player2_coins + (coins)

                //zapisz dane
                await db.set(`${authorId}.coins[0]`,player1_setCoins)
                await db.set(`${target_id}.coins[0]`,player2_setCoins)
                return message.reply(`<@${target_id}> is winner\n redwad is ${coins}`)
            }
        }



    }
}