const config = require(process.cwd() + `/config/worker.js`)
        const work = config.srv_info
        const worker = config.srv_info_work
        const reason = config.srv_info_disable

const Discord = require('discord.js');
//$srvinfo
//$srvinfo help
//$srvinfo help en
module.exports = {
    name: "srvinfo",
    name_en:"srvinfo",
    description: "wysyła informacje o serweże",
    usage: "$srvinfo",
    work: worker,

    execute: async(message, args) => {

    if(work != true){return message.channel.send(reason)}
         

        if(args[0 == "help"]){
            if(args[1] == "en"){
                const embed_en = new Discord.MessageEmbed()

                .setColor(`RED`)//EN
                .setTitle(`srvinfo`)
                .setDescription(`bot is sending information about servos \n
                usage: "$srvinfo"`)
        
                .setFooter(message.author.tag, message.author.avatarURL({dynamic: true}));
        
        
                message.channel.send({embeds: [embed_en]});
            }else{
                const embed_pl = new Discord.MessageEmbed()

            .setColor(`BLUE`)//PL
            .setTitle(`srvinfo`)
            .setDescription(`bot wysyła informacje o serweże\n
            użycie: "$srvinfo"\n`)
    
            .setFooter(message.author.tag, message.author.avatarURL({dynamic: true}));
    
    
            message.channel.send({embeds: [embed_pl]});
            }
        }else{

        const regions = {brazil: 'Brazil', EUROPE: 'Europe', hongkong: 'Hong Kong', india: 'India', japan: 'Japan', russia: 'Russia', singapore: 'Singapore', southafrica: 'South Africa', sydeny: 'Sydeny', 'us-central': 'US Central','us-east': 'US Eastside','us-west': 'US Westside','us-south': 'US Southside'};

        const roles = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
        const members = message.guild.members.cache;
        const channels = message.guild.channels.cache;
        const emojis = message.guild.emojis.cache;
     
        

        //const właściciel = message.guild.owner.id;
        //let właściciel_id = message.guild.member(`${właściciel}`);

        /*
        **Online:** ${message.guild.members.cache.filter(member => member.presence.status !== "offline").map(member => member.user.username).join(", ")} \n
        **Offline:** ${members.filter((member) => member.presence?.status === 'offline').size}\n
        **Urzytkowników:** ${message.guild.members.cache.filter(member => member !== member.bot).size} \n
        **Botów:** ${guild.members.filter(member => !member.user.bot).size} \n
        **Kanałów textowych:** ${channels.filter(channel => channel.type === 'text').size} \n
        **Kanałów głosowych:** ${channels.filter(channel => channel.type === 'voice').size} \n
        **Region:**${regions[message.guild.region] }\n
        */

        const embed = new Discord.MessageEmbed()

        .setTitle("Informacje ogólne:")
        .setDescription(` **Nazwa serwera:**${message.guild.name} \n
        **ID:** ${message.guild.id} \n
        **Data stworzenia:**${message.guild.createdAt.toDateString()}\n
        **Ilość rang:**${roles.length} \n
        **Emoji:**${emojis.size} \n
        **Animowane Emoji:** ${emojis.filter(emoji => emoji.animated).size} \n
        **Ilość osób na serwerze:** ${message.guild.memberCount}\n
        `)


        /*
        .addFields('Statystyki:',[
            `**Ilość rang:** ${roles.length}`,
            `**Emoji Count:** ${emojis.size}`,
            `**Zwykłe Emoji Count:** ${emojis.filter(emoji => !emoji.animated).size}`,
            `**Animowane Emoji Count:** ${emojis.filter(emoji => emoji.animated).size}`,
            `**Ilość osób na serwerze:** ${message.guild.memberCount}`,
            `**Urzytkowników:** ${members.filter(member => !member.user.bot).size}`,
            `**Botów:** ${members.filter(member => member.user.bot).size}`,
            `**Kanałów textowych:** ${channels.filter(channel => channel.type === 'text').size}`,
            `**Kanałów głosowych:** ${channels.filter(channel => channel.type === 'voice').size}`,
            `**Online:** ${members.filter(member => member.presence.status === 'online').size}`,
            `**Offline:** ${members.filter(member => member.presence.status === 'offline').size}`,
        ]) */

        .setThumbnail(message.guild.iconURL({ dynamic: true }));

        message.channel.send({embeds: [embed]});
    }
    }
}