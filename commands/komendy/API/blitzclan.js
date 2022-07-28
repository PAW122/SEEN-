const axios = require("axios")
const Discord = require('discord.js');

const config1 = require(process.cwd() + `/config/worker.js`)
        const work = config1.blitz_clan
        const worker = config1.blitz_clan_work
        const reason = config1.blitz_clan_disable

const config = require(process.cwd() + `/config/config.js`)
    const API_KEY = config.wargaming_api_key
    


module.exports = {
    name: "blitzclan",
    work: worker,

    execute: async(message, args) => {

        if(!args[0]){message.reply("nie podałeś nazwy klanu")}
        const clan_name = args[0]
    
        if(args[0] == "help"){
            message.reply(`
            użycie: $blitzclan <clan tag>
            przykład: $blitzclan DM-`)
        }else{

            if(work != true){return message.channel.send(reason)}

            const clan_tak = args[0]

        const clan_data_link = `https://api.wotblitz.eu/wotb/clans/list/?application_id=${API_KEY}&search=${clan_tak}`
        const response = await axios.get(clan_data_link)
        const clan_tag = response.data.data[0].tag
        const clan_name = response.data.data[0].name
        const clan_id = response.data.data[0].clan_id
        console.log(clan_id)
        const members_count = response.data.data[0].members_count
        const created_at = response.data.data[0].created_at




        var a = new Date(created_at * 1000);
                    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
                    var year = a.getFullYear();
                    var month = months[a.getMonth()];
                    var date = a.getDate();
                    var hour = a.getHours();
                    var min = a.getMinutes();
                    var sec = a.getSeconds();
                    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
                    



        const embed_pl = new Discord.MessageEmbed()

                .setColor(`BLUE`)//PL
                .setTitle("Clan Info")
                .addFields(
                {name: `tag`, value:`${clan_tag}`, inline: true},
                {name: `name`, value:`${clan_name}`, inline: false},
                {name: `members\ncount`, value:`${members_count}`, inline: true},
                {name: `created at`, value:`${time}`, inline: true},
                )
        
                .setFooter(message.author.tag, message.author.avatarURL({dynamic: true}));
        
        
                message.channel.send({embeds: [embed_pl]});

    }
    }
}