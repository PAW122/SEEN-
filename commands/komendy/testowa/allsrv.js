module.exports = {
    name: "allsrv",
    description: "wysyła pong",
    usage: "$ping",

    execute: async(message, args, client) => {

        const author = message.author.tag
        if(author != "PAW#5844"){return message.reply("You cant use this command")}
    try{
        //loguje liste wszystkich srv na których jest
        client.guilds.cache.forEach(guild => {
            console.log(`${guild.name} | ${guild.id}`);
          })

          client.guilds.cache.forEach(guild => {
            const list = client.guilds.cache.get(`${guild.id}`); 
            console.log(`lista: ${list}`)
            list.members.cache.forEach(member => console.log(member.user.username));
          }) 


    }catch(err){
        console.log(err)
    }
    }
}