const Discord = require('discord.js');

const config = require(process.cwd() + `/config/worker.js`)
    const work = config.autoroles
    const worker = config.autoroles_work
    const reason = config.autoroles_disable


    module.exports = {
        name: 'autorole',
        description: 'Wysyła embeda button roles',

        execute: async(message, args, client) => {

            if(args[0] == "help"){
                return message.channel.send(`
                użycie: $autorole
                funkcja nie jest w finalnej wersji.
                jak dodać konfiguracje roli dla serwera?: $autorole config`)
            }

            if(args[0] == "config"){
                message.reply(`
                $autorole addrole <role_id>
                `)
            }

            if(work != true){return message.channel.send(reason)}

            if(args[0] == "addrole"){

                const role_id = args[1]

                const {settings} = client
                const guild_id = message.guild.id
            //zapisywanie danych do confiu

            if(settings.get(guild_id)) {
                settings.set(guild_id, {role_id: []})
            }

            client.settings.get(guild_id).autorole.push(role_id)//dodaje roleid do configu
            client.saveConfig(guild_id)

            }

    

            const rola_1_id = "1001069879148953673"
            const rola_2_id = "1001069963437686824"

            const buttons = new Discord.MessageActionRow().addComponents(
                new Discord.MessageButton()
                .setCustomId('role1')
                .setLabel('Testowa rola 1')
                .setStyle('PRIMARY'),
    
                new Discord.MessageButton()
                .setCustomId('role2')
                .setLabel('Testowa rola 2')
                .setStyle('PRIMARY'),
    

            );
    
            const embed = new Discord.MessageEmbed()
            .setTitle('Wybierz role')
            .setDescription(`<@&${rola_1_id}> - Opis roli 1\n<@&${rola_2_id}> - Opis roli 2`);
    
            message.channel.send({ embeds: [embed], components: [buttons] });
        }
    }