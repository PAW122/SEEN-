const config = require(process.cwd() + `/config/worker.js`)
const work = config.ban
const worker = config.ban_work
const reason = config.ban_disable

//$ban
//$ban help
//$ban help en
const { Permissions: { FLAGS } } = require('discord.js');
const Discord = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
    name: "ban",
    description: "usówa wiadomości",
    usage: "$clear <ilość wiadomości>",
    work: worker,
    isSlash: false,//wyłączone bo coś jest zjebane

    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Banuje użytkownika')
        .addUserOption((option) => option
            .setName('user')
            .setDescription('Użytkownik którego chcesz zbanować')
            .setRequired(true))
        .addStringOption((option) => option
            .setName('reason')
            .setDescription('Powód zbanowania użytkownika')

            .setRequired(true)),
    executeInteraction: async (inter) => {
        if (!inter.member.permissions.has(FLAGS.BAN_MEMBERS)) {
            return(inter.reply({ content: 'Nie masz wystarczająco permisji aby użyć tej komendy!', ephemeral: true }));
        }
        const user = inter.options.getUser('user');
        const member = inter.guild.members.cache.get(user.id) || await inter.guild.members.fetch(user.id).catch(err => { console.log(err) })
        console.log(member)
        if (!member == true) {
            return(inter.reply("Nie można uzyskać informacji o użytkowniku!"))
        };

        const reason = inter.options.getString('reason');

        if (!member.bannable) {
            return(inter.reply("Nie mogę zbanować tego użytkownika!"))
        };
        
        if(inter.member.roles.highest.position <= member.roles.highest.position){
            return(inter.reply('Użytkownik ma wyższą rolę niż ja,dlatego nie mogę go zbanować!'))};
        

        const embed = new Discord.MessageEmbed()
            .setDescription(`**${member.user.tag}** został zbanowany z powodu \`${reason}\``)
            .setColor("RED")
            .setFooter({ text: inter.user.tag, iconURL: inter.user.avatarURL({ dynamic: true }) })
            .setTimestamp()
        await member.user.send(`Zostałeś zbanowany na serverze **\`${inter.guild.name}\`** z powodu \`${reason}\``).catch(err => {console.log(err)})
        member.ban({reason})
        return(inter.reply({ embeds: [embed] }))
    },


    execute: async (message, args, client) => {


        if (work != true) { return message.channel.send(reason) }


        if (args[0] == "help") {
            if (args[1] == "en") {
                const embed_en = new Discord.MessageEmbed()

                    .setColor(`RED`)
                    .setTitle(`Ban`)
                    .setDescription(`ban the user from the server \n
            use: "$ban @user"`)

                    .setFooter(message.author.tag, message.author.avatarURL({ dynamic: true }));


                message.channel.send({ embeds: [embed_en] });
            } else {
                const embed_pl = new Discord.MessageEmbed()

                    .setColor(`BLUE`)//PL
                    .setTitle(`Ban`)
                    .setDescription(`banuje urzytkownika z serwera\n
            użycie: "$ban @user"`)

                    .setFooter(message.author.tag, message.author.avatarURL({ dynamic: true }));


                message.channel.send({ embeds: [embed_pl] });
            }
        } else {


            //permisje
            if (!message.member.permissions.has("BAN_MEMBERS")) {
                return message.channel.send("nie masz uprawnień do banowania")
            }


            //bot sprawdza czy ma permisje do usówania na dc
            if (!message.guild.me.permissions.has("KICK_MEMBERS")) {
                return message.channel.send("Nie posiadam uprawnień do banowania")
            }

            const target = message.mentions.members.first()

            //console.log(target)
            //console.log(args)
            if (target == true) {
                target.ban()
            } else { message.channel.send("nie mogę wykonać tego polecenia") }

        }
    }
}