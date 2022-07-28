/*
komenda ma:
po użyciu pierwszy raz napisać: dziękuje za dodanie bota do gildi
dodaje idgildi do yaml
przy następnym użyciu wypisuje: dziękuje za korzystanie z bota
*/
const Discord = require('discord.js');
module.exports = {
    name: "test5",

    execute: async(message, args, client) => {
        const {settings} = client
        const guild_id = message.guild.id

        if(!settings.get(guild_id)) {
            settings.set(guild_id, {test_command: []})
            message.channel.send("dziękuje za dodanie bota do gildi")
        }else{
            message.channel.send("dziękuje za korzystanie z bota")
        }

    }
}

/*

w komendzie blitz stats zrobić:
zapisywanie id konta/nicku z wota
i jeżeli następnym razem użytkownik użyje komendy i znajduje się w bazie danych, ma wpis z id konta
pobierz id z yaml i wywołaj komende

jeżeli nie ma użytkownika w bazie yaml:
poproś o nick,
sprawdż czy taki nick istnieje w wocie,
wyślij na kanale wiadomość czy to twoje konto: <nick_konta_z_blitza>
dodaj buttony TAK i NIE
jeżeli urzytkownik kliknie TAK
to zapisz id konta w bazie yaml,
i wywołaj statystyki dla konta i wyślij na kanale

*/