
const Discord = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const embed_pl = new Discord.MessageEmbed()
    .setColor(`BLUE`)
    .setTitle(`Help Page`)
    .setDescription(`use **$help commandname** to get for a more detailed description`)
    .setFooter("use $name help to get comand info")
    .addFields(
        { name: `***😁fun***`, value: 
        "``ruletka``" +","+ "``bruh``" +","+ "``random``"+","+ "``8ball``" +","+"``flags``"+","+"``animegif``"+","+"``przemyślenia``"+ "," + "``random`` , ``avatar-generator``", inline: false },

        { name: `***❓info***`, value: 
        "``awatar``"+ ","+"``ping``"+","+"``botinfo``"+","+"``srvinfo``"+","+"``lvl``"+","+"``link``"+","+"``isalt`` , ``server``", inline: false },

        { name: `***👑administration***`, value: 
        "``clear``"+","+"``say``"+","+"``kick``"+","+"``ban``"+","+"``message_logs``"+","+"``mute``"+","+"``autorole ``", inline: false },

        { name: `***⚙️bot config***`, value: 
        "``srv_set ``"+","+"``srv_logs``"+","+"``automod ``" + "," + "``settings auto``" + "," + "``settings owner_alert help`` , ``$stats-channel help``", inline: false },

        { name: `***💵economy***`, value: 
        "``helpeco``"+","+"``daily``"+","+"``profil``"+","+"``weekly``"+","+"``roll``"+","+"``shop``"+","+"``pvp``"+","+"``pay``"+","+"``add``"+","+"``birthday``"+","+"``bank``", inline: false },

        { name: `***🤯reactions***`, value: 
        "``reactions help``"+","+"``angry``"+","+"``eat``"+","+"``happy``"+","+"``kill``"+","+"``love``"+","+"``run``"+","+"``scarry``"+","+"``sleep``", inline: false },

        { name: `***🎮Valorant***`, value:
        "``valo help``" + "," + "``valo mmr``" + "," + "``valo mmr history``" + "," + "``valo get_article``" + "," + "``valo last mathces``" + "," + "``valo agents``" + "," + "``valo player_cards``" + "," + "``valo maps``" + "," + "``version``" + "," + "``valo eavents``", inline: false },

        { name: `***🧠Special***`, value:
        "``mechatronic``,``mp3editor``,``html``", inline: false },

        { name: `***🌐APIS***`, value:
        " ``$write`` , ``chess help`` , ``chess profil`` , ``chess stats``, ``wot``"},

        { name: `🇯🇵***Anime***`, value:
        "``animeseen``" + "," + "``anime``", inline: false },

        { name: `***🆘Support***`, value: 
        "``contact``"+","+"``report``", inline: false }
    )
module.exports = {
    name: `help!`,
    description: `help command`,
    execute: async (message, args) => {//trzeba dodać help do anime!!!!

        if (work != true) { return message.channel.send(reason) }
            //wersja polska
            return message.channel.send({ embeds: [embed_pl] });
        
    }

}