//komenda ma stworzyć konkurs
// $konkurs <ilość monet> <id kanału> <ile czasu ma trwać>

/*bot musi:
zabrać monety autorowi konkursu
zapisać id kanału
zapisać kieyd konkurs został stworzony
zapisać kiedy konkurs ma się skończyć

wysłać wiadomośc konkursową
zapisać id wiadomości

gdy minie czas:
sprawdzić kto zostawił reakcje pod wiadomością konkursową
wylosować 1 osobe
wysłać wiadomość na kanale że wygrała dana osoba i co wygrała
dodać do eq danej osoby coinsy
*/

const { QuickDB } = require("quick.db");
const check_db = require("./economy_handler")
const config = require("../../config/config")
const emoji = config.economy_emoji
const { Permissions: { FLAGS } } = require('discord.js');
const Discord = require('discord.js');
module.exports = {
    name: "givaey",

    execute: async (message, args, client) => {
        //load server settings
        const guildId = message.guild.id
        const db2 = new QuickDB({ filePath: process.cwd() + `/db/srv_settings/commands/${guildId}.sqlite` });
        if(await db2.get(`check.check`) == true){
            const settings = await db2.get(`economy_command.worker`)
            const settings_reason = await db2.get(`economy_command.reason`)
            if(settings != true){return message.channel.send(settings_reason)}
        }

        //zapisz do db date startu
        //zapisać date końca
        //zapisz id gildi
        //zapisz id wiadomości

        //zrobić pentle która co 10min sprawdza czy givaey się skończył

        //$givaey <ilość_monet_do_wygrania> <end_rok> <end_month> <end_day> <treść_givaeya>
        
        const to_cut = args[0].lenght +args[1].lenght +args[2].lenght +args[3].lenght
        const kontent = message.content.slice(to_cut)//nie działa


        //ustawić limit na 1 miesiąc givaeya

        var current = new Date();
        const rok = current.getFullYear();
            const month = current.getMonth() + 1;
            const day = current.getDay();

        const db = new QuickDB({ filePath: process.cwd() + `/db/givaey/givaey.sqlite` });
        
        const redwad = args[0]
        const end_rok = args[1]
        const end_month = args[2]
        const end_day = args[3]

        if (await db.set(`${guildId}.check`) == true){
            return message.reply("trwa już givaey. Poczekaj na jego zakończenie aby stworzyć nowy")
        }

        await db.set(`${guildId}`,
                {
                    check: true,
                    created_time: [rok, month, day],
                    end_by: [end_rok, end_month, end_day],
                    guild_id: "",
                    message_id: "",
                    redwad: redwad,
                    free_space: []
                })

                const embed_pl = new Discord.MessageEmbed()

                .setColor(`BLUE`)//PL
                .setTitle(`Givaey`)
                .setDescription(`redwad: ${redwad}
                end: ${end_rok}.${end_month}.${end_day}
                
                ${kontent}`)
        
                .setFooter(message.author.tag, message.author.avatarURL({dynamic: true}));
        
        
                message.channel.send({embeds: [embed_pl]});

    }
}