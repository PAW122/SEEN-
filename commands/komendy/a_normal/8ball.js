const config = require(process.cwd() + `/config/worker.js`)
const work = config.eight_ball
const worker = config.eight_ball_work
const reason = config.eight_ball_disable

var fortunes = [
    "**Tak**",
    "**Nie**",
    "**Może**",
    "**Nie Wiem**",
    "**Prawdopodobnie**",
    "**Chyba**",
    "**Nie Jestem Pewien**",
    "**Na Pewno**"
];
//8ball
//8ball help
//8ball help en
module.exports = {
    name: "8ball",
    description: "",
    //work: worker,
    work: worker,


    execute: async(message, args) => { 
        
        
        if(work != true){return message.channel.send(reason)}
         

        if(args[0] == "help"){
            if(args[1] == "en"){
                message.channel.send(`the bot sends a random message from the list:
                **Tak**
                **Nie**
                **Może**
                **Nie Wiem**
                **Prawdopodobnie**
                **Chyba**",
                **Nie Jestem Pewien**
                **Na Pewno**`)
            }else{
                message.channel.send(`bot wysyła randomową wiadomość z listy:
                **Tak**
                **Nie**
                **Może**
                **Nie Wiem**
                **Prawdopodobnie**
                **Chyba**",
                **Nie Jestem Pewien**
                **Na Pewno**`)
            }
        }else{

        const { channel } = message
        var wynik = message.channel.send(fortunes[Math.floor(Math.random() * 8)]);
        }
    },
}
