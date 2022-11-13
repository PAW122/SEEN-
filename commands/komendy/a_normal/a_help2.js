const workerhandler = require(process.cwd() + `/config/worker.js`)
const work = workerhandler.help
const worker = workerhandler.help_work
const reason = workerhandler.help_disable
const config = require("../../../config/config")
const Discord = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const prefix = config.prefix
const embed_pl = new Discord.MessageEmbed()
    .setColor(`BLUE`)
    .setTitle(`Help Page 1/2`)
    .setDescription(`use **$help!** to get for a more detailed description
    command list:`)
    .setFooter("use $name help to get comand info")
    .addFields(
        { name: `***😁fun***`, value: 
        "``ruletka``" +","+ "``bruh``" +","+ "``random``"+","+ "``8ball``" +","+"``flags``"+","+"``animegif``"+","+"``przemyślenia``", inline: false },

        { name: `***❓info***`, value: 
        "``awatar``"+ ","+"``ping``"+","+"``botinfo``"+","+"``srvinfo``"+","+"``lvl``"+","+"``link``"+","+"``isalt``", inline: false },

        { name: `***👑administration***`, value: 
        "``clear``"+","+"``say``"+","+"``kick``"+","+"``ban``"+","+"``message_logs``"+","+"``mute``"+","+"``autorole ``", inline: false },

        { name: `***⚙️bot config***`, value: 
        "``srv_set ``"+","+"``srv_logs``"+","+"``automod ``", inline: false },

        { name: `***💵economy***`, value: 
        "``helpeco``"+","+"``daily``"+","+"``profil``"+","+"``weekly``"+","+"``roll``"+","+"``shop``"+","+"``pvp``"+","+"``pay``"+","+"``add``"+","+"``birthday``"+","+"``bank``", inline: false },

        { name: `***🤯reactions***`, value: 
        "``reactions help``"+","+"``angry``"+","+"``eat``"+","+"``happy``"+","+"``kill``"+","+"``love``"+","+"``run``"+","+"``scarry``"+","+"``sleep``", inline: false },

        { name: `***🎮Valorant***`, value:
        "``valo help``" + "," + "``valo mmr``" + "," + "``valo mmr history``" + "," + "``valo get_article``" + "," + "``valo last mathces``" + "," + "``valo agents``" + "," + "``valo player_cards``" + "," + "``valo maps``" + "," + "``version``" + "," + "``valo eavents``", inline: false },
        
        { name: `***🆘Support***`, value: 
        "``contact``"+","+"``report``", inline: false },

        { name: `***🧠Quiz***`, value:
        "``mechatronic``", inline: false }
    )
module.exports = {
    name: `help`,
    description: `help command`,
    usage: `$help`,
    work: worker,
    isSlash: true,

    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('send list with all bot commands'),
    executeInteraction: async (inter) => { 
        if(work != true){
            const embed_worker = new Discord.MessageEmbed()
            .setTitle('**help**')
            .setColor('RANDOM')
            .setDescription(`${reason}`)
        inter.reply({ embeds: [embed_worker] });
        return(console.log("command id disabled"))
        }else{
        inter.reply({ embeds: [embed_pl] });
        }
    },

    execute: async (message, args) => {//trzeba dodać help do anime!!!!

        if (work != true) { return message.channel.send(reason) }
            //wersja polska
            return message.channel.send({ embeds: [embed_pl] });
        
    }

}