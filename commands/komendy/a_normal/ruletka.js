const config = require(process.cwd() + `/config/worker.js`)
    const work = config.ruletka
    const worker = config.ruletka_work
    const reason = config.ruletka_disable

const Discord = require('discord.js');
//$ruletka
//$ruletka help
//$ruletka help en
//$roulette
//$roulette help
//$roulette help en
module.exports = {
    name: "ruletka",
    name_en:"roulette",
    description: "wysyła pong",
    usage: "$ruletka <@users>",
    work: worker,

    execute: async(message, args) => {

    if(work != true){return message.channel.send(reason)}
         

        if(args[0] == "help"){
            if(args[1] == "en"){
                const embed_en = new Discord.MessageEmbed()

                .setColor(`RED`)//EN
                .setTitle(`roulette`)
                .setDescription(`roulette is available to 1-5 players. After using the command, the bot informs which player is eliminated \n
                use: "$roulette @ user1 @ user2"`)
        
                .setFooter(message.author.tag, message.author.avatarURL({dynamic: true}));
        
        
                message.channel.send({embeds: [embed_en]});
            }else{
                const embed_pl = new Discord.MessageEmbed()

            .setColor(`BLUE`)//PL
            .setTitle(`ruletka`)
            .setDescription(`ruletka jest dostępna dla 1-5 graczy. Po użycie komendy bot informuje który z graczy zostaje wyeliminowany\n
            użycie: "$ruletka @user1 @user2"
            \n ruletka ma problemy z funkcjonowaniem na serwerże i czasem nie działa`)
    
            .setFooter(message.author.tag, message.author.avatarURL({dynamic: true}));
    
    
            message.channel.send({embeds: [embed_pl]});
            }
        }else{

           


let i = 0
let pl = null
if(message.content.startsWith("ruletka")){pl = 8}
if(message.content.startsWith("roulette")){pl = 9}
        const ilosc_osob = message.content.slice(pl)//usówa $ruletak albo $roulette
    
        //sprawdz ile jest graczy

        const liczba_graczy = args.length
   

        const rng = Math.floor(Math.random() * liczba_graczy);//max liczba to ilosc graczy
 

        const embed = new Discord.MessageEmbed()
        .setColor("RED")
        .setTitle("Ruletka")
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


          //nie można wyeliminować bota
          const id_bota = "<@&809403148875464706>";
          if(args[0] == id_bota || args[1] == id_bota || args[2] == id_bota || args[3] == id_bota || args[4] == id_bota){
              //jeżli tak == bot jest na liście
              if(args[rng] == id_bota) {
                  const embed3 = new Discord.MessageEmbed()
                  .setColor("BLUE")
                  .setTitle("Ruletka")
                  .setDescription("Nie można mie wyeliminować")
  
                  .setFooter(message.author.tag, message.author.avatarURL({dynamic: true}));

                  const embed3_en = new Discord.MessageEmbed()
                  .setColor("BLUE")
                  .setTitle("Roulette")
                  .setDescription("You can't eliminate me")
  
                  .setFooter(message.author.tag, message.author.avatarURL({dynamic: true}));

                  //wersja ang i pl
                  /*
                  if(pl == "8"){message.channel.send({embeds: [embed3]});}
                  if(pl == "9"){message.channel.send({embeds: [embed3_en]});}
                  */
                  message.channel.send({embeds: [embed3]});
                  return
              }else{            const embed2 = new Discord.MessageEmbed()
                .setColor("RED")
                .setTitle("Ruletka")
                //.setDescription("Lista graczy:")
                .addFields(//inline-w embedzie zamiast po dobą będą obok siebie
                    {name: `Wyeliminowany został gracz:`,value: `${args[rng]}`,inline: false},)
                .setFooter(message.author.tag, message.author.avatarURL({dynamic: true}));
    
    
                if(liczba_graczy == 0){
                    message.reply(`Niewypał-Nikt nie ginie`)
                    args.splice(args[rng])//usówa nick z listy
                    i += 1
                    return 0
                }
                if(liczba_graczy >= 2){
                    args.splice(args[rng])//usówa nick z listy
                    message.channel.send({embeds: [embed2]});
                    i += 1
                    return 0
                }
            }
          }else{
            if(i > 0){return 0}else{
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
                if(liczba_graczy >= 2){
                    args.splice(args[rng])//usówa nick z listy
                    message.channel.send({embeds: [embed2]});
                    return 0
                }
            }
            }
        }
    }
}