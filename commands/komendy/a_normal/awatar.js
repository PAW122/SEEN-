const config = require(process.cwd() + `/config/worker.js`)
const work = config.awatar
const worker = config.awatar_work
const reason = config.awatar_disable
const { QuickDB } = require("quick.db");
const Discord = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
//$awatar
//$awatar help
//$awatar help en
//$avatar
//$avatar help
//$avatar help en


module.exports = {
    name: "awatar",
    name_en: "avatar",
    description: "wysyła grafika z zdjęciem profilowym",
    usage: "$awatar <@nick>",
    work: worker,
    isSlash: true,


    data: new SlashCommandBuilder()
        .setName('awatar')
        .setDescription('wysyła liste anime obejrzanych przez autora bota')
        .addUserOption((option) =>
            option
                .setName("oznacz_osobe")
                .setDescription("oznacz osobe aby zobaczyć jej awatar")
                .setRequired(true)
        ),
    executeInteraction: async (inter) => {
        if (work != true) {
            const embed_worker = new Discord.MessageEmbed()
                .setTitle('**Avatar**')
                .setColor('RANDOM')
                .setDescription(`${reason}`)
            inter.reply({ embeds: [embed_worker] });
            return (console.log("command id disabled"))
        } else {
            //load server settings
            const guildId = inter.guild.id
            const db = new QuickDB({ filePath: process.cwd() + `/db/srv_settings/commands/${guildId}.sqlite` });
            if (await db.get(`check.check`) == true) {
                const settings = await db.get(`ankieta.worker`)
                const settings_reason = await db.get(`ankieta.reason`)
                if (settings == false) { return message.channel.send(settings_reason) }
            }

            const user = inter.options.getUser('oznacz_osobe')

            const embed2 = new Discord.MessageEmbed()
                .setColor("DARK_GOLD")
                .setTitle('Avatar')
                .setDescription(`Avatar użytkownika ${user}\n[kliknij tutaj](${user.avatarURL({ dunamic: true, size: 2048 })}), aby zobaczyć awatar w większej rozdzielczośći`)
                .setImage(user.avatarURL({ dynamic: true, size: 512 }))
                .setTimestamp()


            inter.reply({ embeds: [embed2] })

        }
    },

    execute: async (message, args) => {
        //load server settings
        const guildId = message.guild.id
        const db = new QuickDB({ filePath: process.cwd() + `/db/srv_settings/commands/${guildId}.sqlite` });
        if (await db.get(`check.check`) == true) {
            const settings = await db.get(`ankieta.worker`)
            const settings_reason = await db.get(`ankieta.reason`)
            if (settings == false) { return message.channel.send(settings_reason) }
        }

        if (work != true) { return message.channel.send(reason) }


        if (args[0] == "help") {
            if (args[1] == "en") {
                const embed_en = new Discord.MessageEmbed()

                    .setColor(`RED`)//EN
                    .setTitle(`Avatar`)
                    .setDescription(`the command sends the avatar of the marked user:\n
            usage:
            $avatar @user -- sends an avatar of the marked user\n
            $avatar --is sending your avatar`)

                    .setFooter(message.author.tag, message.author.avatarURL({ dynamic: true }));


                message.channel.send({ embeds: [embed_en] });
            } else {
                const embed_pl = new Discord.MessageEmbed()

                    .setColor(`BLUE`)//PL
                    .setTitle(`Awatar`)
                    .setDescription(`komenda wysyła awatar oznaczonego urzytkownika:\n
                sposób użycia:
                $awatar @user -- wysyła awatar oznaczonego urzytkowniaka\n
                $awatar -- wysyła twój awatar`)

                    .setFooter(message.author.tag, message.author.avatarURL({ dynamic: true }));


                message.channel.send({ embeds: [embed_pl] });
            }
        } else {

            //towrzy zmienną do której przypisze urzytkownika
            let user = null;
            const mention = message.mentions.members.first();
            //jeżeli spingujemy prawdziwą osobe
            if (mention) user = mention.user;
            //jeśli nie spingujemy nikogo
            else user = message.author;

            const embed = new Discord.MessageEmbed()
                .setColor("DARK_GOLD")
                .setTitle('Avatar')
                .setDescription(`Avatar użytkownika ${user}\n[kliknij tutaj](${user.avatarURL({ dunamic: true, size: 2048 })}), aby zobaczyć awatar w większej rozdzielczośći`)
                .setImage(user.avatarURL({ dynamic: true, size: 512 }))
                .setTimestamp()
                .setFooter(message.author.tag, message.author.avatarURL({ dynamic: true }));

            message.channel.send({ embeds: [embed] })
        }
    }
}

/*
const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
const { Permissions: { FLAGS } } = require('discord.js');
 module.exports = { 
    data: new SlashCommandBuilder()
     .setName('ban') 
     .setDescription('Banuje użytkownika') 
     .addUserOption((option) => option 
     .setName('user') 
     .setDescription('Użytkownik którego chcesz zbanować') 
     .setRequired(true) ) 
     .addStringOption((option) => option 
     .setName('reason') 
     .setDescription('Powód zbanowania użytkownika') 
     
     .setRequired(true) ), async execute(inter) {
         if(!inter.member.permissions.has(FLAGS.BAN_MEMBERS))
          return inter.reply({ 
            content: 'Nie masz wystarczająco permisji aby użyć tej komendy!',
             ephemeral: true}); 

             const user = inter.options.getUser('user');
              const member = inter.guild.members.cache.get(user.id) || await inter.guild.members.fetch(user.id).catch(err => {})
               if(!member) return inter.reply("Nie można uzyskać informacji o użytkowniku!");
                const reason = inter.options.getString('reason');
                 if(!member.bannable || member.user.id === inter.user.id) 
                 return inter.reply("Nie mogę zbanować tego użytkownika!");
                  if(inter.member.roles.highest.position <= member.roles.highest.position)
                   return inter.reply('Użytkownik ma wyższą rolę niż ja,
                    dlatego nie mogę go zbanować!') const embed = new Discord.MessageEmbed() 
                    .setDescription(`**${member.user.tag}** został zbanowany z powodu \`${reason}\``) 
                    .setColor("RED") 
                    .setFooter({ text: inter.user.tag, iconURL: inter.user.avatarURL({ dynamic: true }) }) 
                    .setTimestamp() 
                    await member.user.send(`Zostałeś zbanowany na serverze **\`${inter.guild.name}\`** z powodu \`${reason}\``).catch(err => {}) 
                    member.ban({ reason }) 
                    return inter.reply({ embeds: [ embed ]}) }}
*/
