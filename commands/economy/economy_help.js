const config = require("../../config/config")
const emoji = config.economy_emoji
const economy_db_version = config.economy_db_version
const Discord = require("discord.js")
module.exports = {
    name: "helpeco",

    execute: async (message, args) => {
        //load server settings
        const guildId = message.guild.id
        const db2 = new QuickDB({ filePath: process.cwd() + `/db/srv_settings/commands/${guildId}.sqlite` });
        if(await db2.get(`check.check`) == true){
            const settings = await db2.get(`economy_command.worker`)
            const settings_reason = await db2.get(`economy_command.reason`)
            if(settings != true){return message.channel.send(settings_reason)}
        }
        
        const embed_pl = new Discord.MessageEmbed()
    .setColor(`BLUE`)
    .setTitle(`Help`)
    .addFields(//inline-w embedzie zamiast po dobą będą obok siebie
        { name: `Economy version: ${economy_db_version}`, value: `jeżeli twoja wersja wsystemu ekonomi jest starsza użyj $ecodeafult -- przywróci to system do deafultowych ustawień, statystki wszystkich urzytkowników zostaną zrestartowane, ale uzyskasz dostęp do nowych funkcji`, inline: true },
        { name: `$daily`, value: `odbierz dzienną nagrode od 50 do 100 ${emoji}`, inline: true },
        { name: `$birthday`, value: `odbierz przeznt urodzinowy`, inline: true },
        { name: `$profil`, value: `wyświetla informacje ile posiadasz ${emoji} itp`, inline: true },
        { name: `$weekly`, value: `odbierz tygondniową nagrodę${emoji}`, inline: true },
        { name: `$roll`, value: `masz 30% szans na podwojenie ${emoji}. Maxymalnie można użyć 15 razy dziennie\n użycie: $roll 10`, inline: true },
        { name: `$shop`, value: `wyświetla liste przedmiotów, które można kupićc`, inline: true },
        { name: `$add`, value: `pozwala administracji dodawać i odejmować ${emoji} urzytkownikom
        użycie: $add <ilość${emoji}> <userId>
        przykład: $add 100 797070806885990431`, inline: true },
        { name: `$birthday`, value: `ustaw date sowich urodzi żeby odebrać urodzinową nagrode`, inline: true },
    )
    message.channel.send({embeds: [embed_pl] })
    }
}