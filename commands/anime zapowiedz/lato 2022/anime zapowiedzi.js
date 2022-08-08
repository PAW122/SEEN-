//$zapoiwedzi anime
// spychu12@gmail.com
const Discord = require('discord.js');
const { QuickDB } = require("quick.db");
module.exports = {
    name: "zapowiedzi",
    name_en: "announcements",
    description: "wysyła pong",
    usage: "$ping",

    execute: async(message, args) => {
        //load server settings
        const guildId = message.guild.id
        const db = new QuickDB({ filePath: process.cwd() + `/db/srv_settings/commands/${guildId}.sqlite` });
        if(await db.get(`check.check`) == true){
            const settings = await db.get(`anime_zapowiedzi.worker`)
            const settings_reason = await db.get(`anime_zapowiedzi.reason`)
            if(settings != true){return message.channel.send(settings_reason)}
        }

        if(args[0] == "help"){
            if(args[1] == "en"){
                return message.channel.send("sending list of anime announcements on season\n $announcements <season>\n example: $announcements summer2022")
            }else{
                return message.channel.send("Wysyła liste zapowiedzi anime na sezon\n $zapowiedzi <sezon> \n przykład: $zapowiedzi lato2022")
            }
        }else{


        if(!args[0]){return message.channel.send("use: $zapowiedzi lato2022 \n $announcements summer2022")}

        const embed_2022 = new Discord.MessageEmbed()
        .setColor("BLUE")
        .setTitle("Anime")
        .setDescription("Zapowiedzi anime:")
        .addFields(
        {name: "LATO 2022",value: "------------------------------------------------------------------------", inline: false},
        //kanojo_okarishimasu_zapowiedz
        {name: "1.Bucchigire",value: "08.07.2022\n $Bucchigire_zapowiedz", inline: false},
        {name: "2.Engage Kiss",value: "03.07.2022\n $engage_kiss_zapowiedz", inline: false},
        {name: "3.Hoshi No Samidare",value: "09.07.2022\n $hoshi_no_samidare_zapowiedz", inline: false},
        {name: "4.Isekai Meikyuu De Harem Wo",value: "??.07.2022\n $isekai_meikyuu_de_harem_wo_zapowiedz", inline: false},
        {name: "5.Isekai Ojisan",value: "??.07.2022\n $isekai_ojisan_zapowiedz", inline: false},//zrobione
        {name: "6.Isekai Yakkyoku",value: "10.07.2022\n $isekai_yakkyoku_zapowiedz", inline: false},//zrobione
        {name: "7.Kinsou No Vermeil",value: "05.07.2022\n $kinsou_no_vermeil_zapowiedz", inline: false},
        {name: "8.Kumichou Musume To Sewagakari",value: "07.07.2022\n $kumichou_musume_to_sewagakari_zapowiedz", inline: false},//zrobione
        {name: "9.Kuro No Shoukanshi",value: "??.07.2022\n  $kuro_no_shoukanshi_zapowiedz", inline: false},
        {name: "10.Luminous Witches",value: "03.07.2022\n $luminous_witches_zapowiedz", inline: false},
        {name: "11.Lycoris Recoil",value: "??.07.2022\n $lycoris_recoil_zapowiedz", inline: false},
        {name: "12.Mamahaha No Tsurego Ga Motokano Datta",value: "06.07.2022\n $mamahaha_no_tsurego_ga_motokano_datta_zapowiedz", inline: false},
        {name: "13.RWBY: Hyosetsu Teikoku",value: "03.07.2022\n $hyosetsu_teikoku_zapowiedz", inline: false},
        {name: "14.Saikin Yatotta Maid Ga Ayashii.",value: "??.07.2022\n $saikin_yatotta_maid_ga_ayashii_zapowiedz", inline: false},
        {name: "15.Soredemo Ayumu Wa Yoserekuru",value: "08.07.2022\n $soredemo_ayumu_wa_yoserekuru_zapowiedz", inline: false},
        {name: "16.Tebesi Kenja No Isekai Life",value: "04.07.2022\n $tebesi_kenja_no_isekai_life_zapowiedz", inline: false},
        {name: "17.Yofukashi No Uta",value: "08.07.2022\n $yofukashi_no_uta_zapowiedz", inline: false},
        {name: "18.Yurei Deco",value: "??.07.2022\n $yurei_deco_zapowiedz", inline: false},
        {name: "19.Kanojo Okarishimasu",value: "11.07.2022\n $kanojo_okarishimasu_zapowiedz", inline: false},
        )
        const embed_2022_en = new Discord.MessageEmbed()
        .setColor("BLUE")
        .setTitle("Anime")
        .setDescription("announcements anime:")
        .addFields(
        {name: "SUMMER 2022",value: "------------------------------------------------------------------------", inline: false},
        
        {name: "1.Bucchigire",value: "08.07.2022\n $Bucchigire_zapowiedz", inline: false},
        {name: "2.Engage Kiss",value: "03.07.2022\n $engage_kiss_zapowiedz", inline: false},
        {name: "3.Hoshi No Samidare",value: "09.07.2022\n $hoshi_no_samidare_zapowiedz", inline: false},
        {name: "4.Isekai Meikyuu De Harem Wo",value: "??.07.2022\n $isekai_meikyuu_de_harem_wo_zapowiedz", inline: false},
        {name: "5.Isekai Ojisan",value: "??.07.2022\n $isekai_ojisan_zapowiedz", inline: false},//zrobione
        {name: "6.Isekai Yakkyoku",value: "10.07.2022\n $isekai_yakkyoku_zapowiedz", inline: false},//zrobione
        {name: "7.Kinsou No Vermeil",value: "05.07.2022\n $kinsou_no_vermeil_zapowiedz", inline: false},
        {name: "8.Kumichou Musume To Sewagakari",value: "07.07.2022\n $kumichou_musume_to_sewagakari_zapowiedz", inline: false},//zrobione
        {name: "9.Kuro No Shoukanshi",value: "??.07.2022\n  $kuro_no_shoukanshi_zapowiedz", inline: false},
        {name: "10.Luminous Witches",value: "03.07.2022\n $luminous_witches_zapowiedz", inline: false},
        {name: "11.Lycoris Recoil",value: "??.07.2022\n $lycoris_recoil_zapowiedz", inline: false},
        {name: "12.Mamahaha No Tsurego Ga Motokano Datta",value: "06.07.2022\n $mamahaha_no_tsurego_ga_motokano_datta_zapowiedz", inline: false},
        {name: "13.RWBY: Hyosetsu Teikoku",value: "03.07.2022\n $hyosetsu_teikoku_zapowiedz", inline: false},
        {name: "14.Saikin Yatotta Maid Ga Ayashii.",value: "??.07.2022\n $saikin_yatotta_maid_ga_ayashii_zapowiedz", inline: false},
        {name: "15.Soredemo Ayumu Wa Yoserekuru",value: "08.07.2022\n $soredemo_ayumu_wa_yoserekuru_zapowiedz", inline: false},
        {name: "16.Tebesi Kenja No Isekai Life",value: "04.07.2022\n $tebesi_kenja_no_isekai_life_zapowiedz", inline: false},
        {name: "17.Yofukashi No Uta",value: "08.07.2022\n $yofukashi_no_uta_zapowiedz", inline: false},
        {name: "18.Yurei Deco",value: "??.07.2022\n $yurei_deco_zapowiedz", inline: false},
        {name: "19.Kanojo Okarishimasu",value: "11.07.2022\n $kanojo_okarishimasu_announcements", inline: false},
        )

        if(args[0] == "summer2022"){message.channel.send({embeds: [embed_2022_en]});}
        if(args[0] == "lato2022"){message.channel.send({embeds: [embed_2022]});}
        }
    }
}


