module.exports = (message) => {
    //auto reactions 
    if(message.content == "<@438336824516149249>"){message.react("🦚").then(console.log(`${message.author.tag} Triger auto reactions @PAW, execute: "✅"`))}//reakcja na @paw
    if(message.content == "<@797070806885990431>"){message.reply("use ```$help``` "); message.react("❤️").then(console.log(`${message.author.tag} Triger auto reactions @SEEN, execute: "✅"`))}//reakcja na @SEEN-
    if(message.content == "<@490214064207822848>"){message.react("🇰").then(message.react("🇴")).then(message.react("🇳")).then(message.react("🇦")).then(message.react("🇹")).then(message.react("🅰️"))}//reakcja na @.konata
    if(message.content == "@everyone") {message.react("🛑").then(console.log(`${message.author.tag} Triger auto reactions @everyone, execute: "✅"`))}//@everyone
    if(message.content == "<@430002871631872010>"){message.react("🇳").then(message.react("🇪")).then(message.react("🇷")).then(message.react("3️⃣")).then(message.react("🇸")).then(message.react("5️⃣")).then(console.log(`${message.author.tag} Triger auto reactions @Neress, execute: "✅"`))}//ping Neress
    if(message.content == "<@412363442486378517>"){{message.react("🇸").then(message.react("🇿")).then(message.react("🇪")).then(message.react("🇼")).then(message.react("🇨")).then(message.react("🇺")).then(console.log(`${message.author.tag} Triger auto reactions @Raseo, execute: "✅"`))}}//ping RaSeO_JON3S#1172
    if(message.content == "<@789811543420174356>"){{message.react("🇰").then(message.react("🇮")).then(message.react("🇪")).then(message.react("🇷")).then(message.react("🇴")).then(console.log(`${message.author.tag} Triger auto reactions @kiero, execute: "✅"`))}}//ping THE NIGGLEST#1337

}