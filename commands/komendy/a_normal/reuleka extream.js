const config = require(process.cwd() + `/config/worker.js`)
    const work = config.ruletka_extream
    const worker = config.ruletka_extream_work
    const reason = config.ruletka_extream_disable

//ruletka extream
const Discord = require('discord.js');
module.exports = {
    name: "ruletkaextream",
    description: "wysyła pong",
    usage: "$ruletka <@users>",
    work: worker,

    execute: async(message, args) => {

    if(work != true){return message.channel.send(reason)}
         
        
    try{
        console.log("test")
        console.log(args)


            //permisje
            if(!message.member.permissions.has("KICK_MEMBERS")) {//permisja na kikowanie
                return message.channel.send("nie masz uprawnień do wyrzucania użytkowników")
            }

            if(!message.guild.me.permissions.has("KICK_MEMBERS")) {
                return message.channel.send("Nie posiadam uprawnień do wyrzucania użytkowników")
            }

        const ilosc_osob = message.content.slice(8)//usówa $ruletak

        

        const liczba_graczy = args.length //odejmuje "extream" z listy argumentów


        const rng = Math.floor(Math.random() * liczba_graczy);//max liczba to ilosc graczy
      
      

        const embed = new Discord.MessageEmbed()
        .setColor("RED")
        .setTitle("Ruletka extream")
        .setDescription("Lista graczy:")
        .addFields(//inline-w embedzie zamiast po dobą będą obok siebie
            {name: `Gracz1`,value: `${args[0]}`,inline: true},
            {name: "Gracz2",value: `${args[1]}`,inline: true},
            {name: "Gracz3",value: `${args[2]}`,inline: true},
            {name: "Gracz4",value: `${args[3]}`,inline: true},
            {name: "Gracz5",value: `${args[4]}`,inline: true},
            )
        .setFooter(message.author.tag, message.author.avatarURL({dynamic: true}));
        message.channel.send({embeds: [embed]});

        const embed2 = new Discord.MessageEmbed()
        .setColor("RED")
        .setTitle("Ruletka")
        //.setDescription("Lista graczy:")
        .addFields(//inline-w embedzie zamiast po dobą będą obok siebie
            {name: `Wyeliminowany został gracz:`,value: `${args[rng]}`,inline: false},)
        .setFooter(message.author.tag, message.author.avatarURL({dynamic: true}));


        if(liczba_graczy == 0){
            message.reply(`Niewypał-Nikt nie ginie`)
            args.splice(args[rng])//usówa nick z listy
            return 0
        }
        /*
        if(liczba_graczy >= 1){
            message.channel.send({embeds: [embed2]});

            console.log(`cel do wyjebania ${args[rng]}`)

            const target = message.mentions.members.first()

            if(target == true){
            target.kick()
            }else{message.channel.send(`nie moge wyjebać <@${target.id}>`)}


            return 0
            */

            if(liczba_graczy >= 1){
                message.channel.send({embeds: [embed2]});
    
                console.log(`cel do wyjebania ${args[rng]}`)
    
                const target = args[rng]
                
                
                target.kick()
                
                return 0
            }
        }catch (error) {message.channel.send(`ruletka extream nie jest jeszcze skończona: error(${error})`)}
    }
}