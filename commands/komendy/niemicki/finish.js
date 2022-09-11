/*
tak jak zadania z książki będzie 
jakiś text po niemcu ..... resztra textu
i user musi usupełnić (a/b/c/d)
*/

const Discord = require("discord.js")
const data = require("./finish.json")

module.exports = {
    name: "niemiec-finish",

    execute: async(message,args,client) => {
        process.setMaxListeners(0);
        // process.on('warning', e => { console.log(e)});
         //load server settings
         const author = message.author.id
         const guildId = message.guild.id

 
         if (args[0] == "help") {
             return message.reply("play: $niemiec")
         }
 

         const words = 4 //(-1)
         const channel = message.channel.id

 
         //losuj 3 randomowe nazwy krajów        wylosowana liczba nie może być równa 0
         const rng = Math.floor(Math.random() * words) + 1;
         const rng1 = Math.floor(Math.random() * words) + 1;
         const rng2 = Math.floor(Math.random() * words) + 1;
         const rng3 = Math.floor(Math.random() * words) + 1;
 
         if (rng1 != rng && rng2 != rng && rng3 != rng) {
 
         } else {
             const rng1 = Math.floor(Math.random() * words) + 1;
             const rng2 = Math.floor(Math.random() * words) + 1;
             const rng3 = Math.floor(Math.random() * words) + 1;
         }
 
 
         const anwser = Math.floor(Math.random() * 3) + 1;
         if (anwser == 1) {
             message.channel.send(`Przetłumacz: ${data[rng][1]}
             \nA: ${data[rng][0]}\nB:${data[rng1][0]}\nC:${data[rng2][0]}\nD:${data[rng3][0]}`);
             var good_anwser = "A"
         }
         if (anwser == 2) {
             message.channel.send(`Przetłumacz: ${data[rng][1]}
             A: ${data[rng1][0]}\nB:${data[rng][0]}\nC:${data[rng2][0]}\nD:${data[rng3][0]}`);
             var good_anwser = "B"
         }
         if (anwser == 3) {
             message.channel.send(`Przetłumacz: ${data[rng][1]}
             A: ${data[rng1][0]}\nB:${data[rng2][0]}\nC:${data[rng][0]}\nD:${data[rng3][0]}`);
             var good_anwser = "C"
         }
         if (anwser == 4) {
             message.channel.send(`Przetłumacz: ${data[rng][1]}
             A: ${data[rng1][0]}\nB:${data[rng2][0]}\nC:${data[rng3][0]}\nD:${data[rng][0]}`);
             var good_anwser = "D"
         }
 
 
         const embed_pl = new Discord.MessageEmbed()
 
             .setColor(`BLUE`)//PL
             .setTitle(`You have 10s to type: **A**/**B**/**C**/**D**`)
 
             .setFooter(message.author.tag, message.author.avatarURL({ dynamic: true }));
         message.channel.send({ embeds: [embed_pl]});
 
         var i = 1;
 
         client.on('messageCreate', async message => {
             var i = i += 1
         });
         await new Promise(r => setTimeout(r, 10000));//10 sekund na wysłanie wiadomości
 
         message.channel.messages.fetch({ limit: i }).then(messages => {
             let lastMessage = messages.first();
 
             if (!lastMessage.author.bot) {
                 if (lastMessage.author.id == message.author.id && lastMessage.content == good_anwser) {
                     return message.reply("Good anwser")
                 }
             }
             message.reply(`Bad answer. Correct answer is: **${good_anwser}**`)
         })
 
         
         
    }
}