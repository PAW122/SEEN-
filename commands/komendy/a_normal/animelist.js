const config = require(process.cwd() + `/config/worker.js`)
const work = config.anime_list
const worker = config.anime_list_work
const reason = config.anime_list_disable
const { QuickDB } = require("quick.db");
const Discord = require('discord.js');
//$animelist
//$animelist help
//$animelist help en
const { SlashCommandBuilder } = require('@discordjs/builders');
const embed1 = new Discord.MessageEmbed()

    .setColor("BLUE")
    .setTitle("Anime 1/8")
    .setDescription("Moja lista obejrzanych anime:")
    .addFields(//inline-w embedzie zamiast po dobą będą obok siebie
        { name: "1", value: "Amnestia", inline: false },//info zrobione
        { name: "2", value: " gokukoku no  brynhildr ", inline: false },//info zrobione
        { name: "3", value: " Senko-san", inline: false },//info zrobione
        { name: "4", value: " Re:zero", inline: false },
        { name: "5", value: " Itai no wa Iya nano de Bougyoryoku ni Kyokufuri Shitai to Omoimasu", inline: false },
        { name: "6", value: " norn9 nornnonet ", inline: false },
        { name: "7", value: " happy sugar life ", inline: false },
        { name: "8", value: " Nagi no asukara ", inline: false },
        { name: "9", value: " Kanata no Astra ", inline: false },
        { name: "10", value: " Kami-sama no Inai Nichiyoubi ", inline: false },

        { name: "11", value: " Deth note", inline: false },
        { name: "12", value: " Sword art online ", inline: false },
        { name: "13", value: " SAO Alt GGO ", inline: false },
        { name: "14", value: " Wydanie specjalne SAO", inline: false },
        { name: "15", value: " Sword Art Online 01: 'Ordinal Scale'", inline: false },
        { name: "16", value: " Mahou shoujo site", inline: false },
        { name: "17", value: " Charlotte ", inline: false },
        { name: "18", value: " Satsuriku no teshi/angels of deth", inline: false },
        { name: "19", value: " Rokudenashi majustu koushi to akashic records", inline: false },
        { name: "20", value: " Owari no Seraph", inline: false },
    )
const embed2 = new Discord.MessageEmbed()

    .setColor("BLUE")
    .setTitle("Anime 2/8")
    .setDescription("Moja lista anime:")
    .addFields(//inline-w embedzie zamiast po dobą będą obok siebie
        { name: "21", value: " date a live", inline: false },
        { name: "22", value: " Tate no Yuusha no Nariagari", inline: false },
        { name: "23", value: " High School DxD", inline: false },
        { name: "24", value: " Darling In The Franxx", inline: false },
        { name: "25", value: " Girls und panzer", inline: false },
        { name: "26", value: " No game no live", inline: false },
        { name: "27", value: " No game no live-zero-", inline: false },
        { name: "28", value: " Tonikaku Kawaii", inline: false },
        { name: "29", value: " Knights & Magic", inline: false },
        { name: "30", value: " Maou Gakuin no Futekigousha ", inline: false },


        { name: "31", value: " Sakasama no Patema ", inline: false },
        { name: "32", value: " Enen No Shouboutai", inline: false },
        { name: "33", value: " Sousei no Onmyouji", inline: false },
        { name: "34", value: " Tensei Shitara Slime Datta Ken", inline: false },
        { name: "35", value: " Toaru Kagaku no Railgun", inline: false },
        { name: "36", value: " Dr. Stone", inline: false },
        { name: "37", value: " Ansatsu Kyoushitsu", inline: false },
        { name: "38", value: " RK Flag (BD)", inline: false },
        { name: "39", value: " fireforce", inline: false },
        { name: "40", value: " Kiseijuu: Sei no Kakuritsu", inline: false },
    )
const embed3 = new Discord.MessageEmbed()

    .setColor("BLUE")
    .setTitle("Anime 3/8")
    .setDescription("Moja lista anime:")
    .addFields(//inline-w embedzie zamiast po dobą będą obok siebie
        { name: "41", value: " Sukutte Moratte Ii desu ka", inline: false },
        { name: "42", value: " Amagi Brilliant Park", inline: false },
        { name: "43", value: " Gabriel DropOut", inline: false },
        { name: "44", value: " Grisaia no Kajitsu", inline: false },
        { name: "45", value: " Kaifuku Jutsushi no Yarinaoshi (uncensored)", inline: false },
        { name: "46", value: " Anime Azur Lane Bisoku Zenshin", inline: false },
        { name: "47", value: " Higurashi no Naku Koro ni", inline: false },
        { name: "48", value: " planetarian:hoshi no hito", inline: false },
        { name: "49", value: " Tokyo Ravens", inline: false },
        { name: "50", value: " Yamada kun to 7-nin no Majo", inline: false },

        { name: "51", value: " Dog Days", inline: false },
        { name: "52", value: " Mahouka Koukou no Rettousei", inline: false },
        { name: "53", value: " Seishun Buta Yarou wa Bunny Girl Senpai no Yume wo Minai", inline: false },
        { name: "54", value: " Seishun Buta Yarou wa Yumemiru Shoujo no Yume o Minai", inline: false },
        { name: "55", value: " Kiznaiver", inline: false },
        { name: "56", value: " Boku no Hero Academia", inline: false },
        { name: "57", value: " Suppose a Kid from the Last Dungeon Boonies Moved to a Starter Town", inline: false },
        { name: "58", value: " Tatoeba Last Dungeon Mae no Mura no Shounen ga Joban no Machi de Kurasu...", inline: false },
        { name: "59", value: " Netoge", inline: false },
        { name: "60", value: " Kemono Jihen", inline: false },
    )
const embed4 = new Discord.MessageEmbed()

    .setColor("BLUE")
    .setTitle("Anime 4/8")
    .setDescription("Moja lista anime:")
    .addFields(//inline-w embedzie zamiast po dobą będą obok siebie
        { name: "61", value: " To LOVE-Ru Darkness", inline: false },
        { name: "62", value: " kenja no mago", inline: false },
        { name: "63", value: " Fumetsu no Anata", inline: false },
        { name: "64", value: " IS: Infinite Stratos", inline: false },
        { name: "65", value: " Mushoku Tensei: Isekai Ittara Honki Dasu", inline: false },
        { name: "66", value: " -bagel-girl-episode", inline: false },
        { name: "67", value: " Busou Shoujo Machiavellianism", inline: false },
        { name: "68", value: " Kokoro Connect", inline: false },
        { name: "69", value: " Ascendance of a Bookworm", inline: false },
        { name: "70", value: " summer wars", inline: false },

        { name: "71", value: " Konosuba", inline: false },
        { name: "72", value: " Shinchou Yuusha", inline: false },
        { name: "73", value: " Isekai Maou to Shoukan Shoujo no Dorei Majutsu", inline: false },
        { name: "74", value: " 86 - Eighty Six", inline: false },
        { name: "75", value: " Hundred", inline: false },
        { name: "76", value: " Slime Taoshite 300-nen, Shiranai Uchi ni Level Max ni Nattemashita", inline: false },
        { name: "77", value: " Wiedźmin: Zmora wilka (2021)", inline: false },
        { name: "78", value: " sakurasou no Pet Kanjo", inline: false },
        { name: "79", value: " Gunjou no Magmel", inline: false },
        { name: "80", value: " Hinamatsuri", inline: false },
    )
const embed5 = new Discord.MessageEmbed()

    .setColor("BLUE")
    .setTitle("Anime 5/8")
    .setDescription("Moja lista anime:")
    .addFields(//inline-w embedzie zamiast po dobą będą obok siebie
        { name: "81", value: " Kumo Desu ga, Nani ka?", inline: false },
        { name: "82", value: " Saijaku Muhai no Bahamut", inline: false },
        { name: "83", value: " Ichi Daimaou Unc", inline: false },
        { name: "84", value: " World Trigger", inline: false },
        { name: "85", value: " machine-Doll wa Kizutsukanai", inline: false },
        { name: "86", value: " Rewrite", inline: false },
        { name: "87", value: " Kamit4chi Ni Hir0wareta 0toko", inline: false },
        { name: "88", value: " Seirei Tsukai no Blade Dance", inline: false },
        { name: "89", value: " Assassins Pride", inline: false },
        { name: "90", value: " Okashiinda ga", inline: false },

        { name: "91", value: " Choujin Koukousei-tachi wa Isekai demo Yoyuu de Ikinuku you desu!", inline: false },
        { name: "92", value: " Watashi, Nouryoku wa Heikinchi de tte Itta yo ne!	", inline: false },
        { name: "93", value: " [Yorigami] Seirei Gensouki", inline: false },
        { name: "94", value: " Hai to Gensou no Grimgar", inline: false },
        { name: "95", value: " Arifureta Shokugyou de Sekai Saikyou", inline: false },
        { name: "96", value: " Youjo Senki//// Saga of Tanya the Evil ", inline: false },
        { name: "97", value: " Youjo Senki Movie", inline: false },
        { name: "98", value: " Rokka no Yuusha", inline: false },
        { name: "99", value: " Tsuki ga Michibiku Isekai Douchuu", inline: false },
        { name: "100", value: " Hyakuren no Haou to Seiyaku no Valkyria", inline: false },//miejscec 116 na liście
    )
const embed6 = new Discord.MessageEmbed()

    .setColor("BLUE")
    .setTitle("Anime 6/8")
    .setDescription("Moja lista anime:")
    .addFields(//inline-w embedzie zamiast po dobą będą obok siebie
        { name: "101", value: " isekai cheat magician", inline: false },
        { name: "102", value: " mieruko-chan", inline: false },
        { name: "103", value: " Denpa Kyoushi ", inline: false },
        { name: "104", value: " Hataraku Maou-sama!", inline: false },
        { name: "105", value: " Overlord", inline: false },
        { name: "106", value: " Comic Girls", inline: false },
        { name: "107", value: " Danmachi", inline: false },
        { name: "108", value: " Gotoubun no Hanayome", inline: false },
        { name: "109", value: " number 24", inline: false },
        { name: "110", value: " Uma Musume:Pretty Derby", inline: false },

        { name: "111", value: " Tsuki to Laika to Nosferatu", inline: false },
        { name: "112", value: " Jaku-Chara Tomozaki-kun", inline: false },
        { name: "113", value: " Tokyo Ghul", inline: false },
        { name: "114", value: " The Orbital Children", inline: false },
        { name: "115", value: " A Whisker Away", inline: false },
        { name: "116", value: " BNA", inline: false },
        { name: "117", value: " Player One	", inline: false },
        { name: "118", value: " fantasy bishojo juniku ojisan", inline: false },
        { name: "119", value: " shikkaku no saikyou kenja", inline: false },
        { name: "120", value: " kenja no deshi wo nanoru kenja ", inline: false },//pozycja 136
    )
const embed7 = new Discord.MessageEmbed()

    .setColor("BLUE")
    .setTitle("Anime 7/8")
    .setDescription("Moja lista anime:")
    .addFields(//inline-w embedzie zamiast po dobą będą obok siebie
        { name: "121", value: " A.I.C.O", inline: false },
        { name: "122", value: " Arifureta Shokugyou de Sekai Saikyou", inline: false },
        { name: "123", value: " Shuumatsu Nani Shitemasu ka? Isogashii desu ka? Sukutte Moratte Ii desu ka?", inline: false },
        { name: "124", value: " Kami no Tou (Tower of God)", inline: false },
        { name: "125", value: " shikkaku no saikyou kenja", inline: false },
        { name: "126", value: " kenja no deshi wo nanoru kenja", inline: false },
        { name: "127", value: " fantasy bishojo juniku ojisan", inline: false },
        { name: "128", value: " sono bisque doll wa koi wo suru", inline: false },
        { name: "129", value: " Leadale no Daichi nite", inline: false },
        { name: "130", value: " buble", inline: false },

        { name: "131", value: " Spare Me, Great Lord", inline: false },
        { name: "132", value: " Killing Bites", inline: false },
        { name: "133", value: " ReLIFE", inline: false },
        { name: "134", value: " Kimi to Boku no Saigo no Senjou Arui wa Sekai ga Hajimaru Seisen", inline: false },
        { name: "135", value: " Granblue Fantasy The Animation", inline: false },
        { name: "136", value: " Darwin's Game", inline: false },
        { name: "137", value: " Wonder Egg Priority", inline: false },
        { name: "138", value: " 100-man no Inochi no Ue ni Ore wa Tatteiru", inline: false },
        { name: "139", value: " Fruits Basket s1", inline: false },//157
    )

const embed8 = new Discord.MessageEmbed()
    .setColor("BLUE")
    .setTitle("Anime 8/8")
    .setDescription("Moja lista anime:")
    .addFields(//inline-w embedzie zamiast po dobą będą obok siebie
        { name: "140", value: " Fate/Kaleid Liner Prisma Illya Zwei", inline: false },
        { name: "141", value: " Fate/kaleid liner Prisma Illya 2wei Herz!", inline: false },
        { name: "142", value: " Kanojo, Okarishimasu 2nd Season", inline: false },
        { name: "143", value: " The Last Summoner", inline: false },
        { name: "144", value: " sirius the jaeger", inline: false },
        { name: "145", value: " Maou-sama, Retry!", inline: false },
        { name: "146", value: " Hachi-nan tte, Sore wa Nai deshou ", inline: false },
        { name: "147", value: " Magi: Sinbad no Bouken (TV)", inline: false },
        { name: "148", value: " Kunoichi Tsubaki no Mune no Uchi", inline: false },
        { name: "149", value: " Seirei Gensouki", inline: false },
        { name: "150", value: " Youkoso Jitsuryoku Shijou Shugi no Kyoushitsu e ", inline: false },

        { name: "150", value: " Isekai Yakkyoku", inline: false },
        { name: "151", value: " [Max] Shinka no Mi - Shiranai Uchi ni Kachigumi Jinsei ", inline: false },
        { name: "152", value: " Kuro no Shoukanshi", inline: false },
        { name: "153", value: " Tensei Shitara Ken Deshita", inline: false },
        { name: "154", value: " Gate: Jieitai Kanochi nite, Kaku Tatakaeri", inline: false },
        { name: "155", value: " Bocchi the Rock!", inline: false },
        { name: "156", value: " Yuusha Party o Tsuihou Sareta Beast Tamer, Saikyoushu no Nekomimi Shoujo to Deau", inline: false },
        { name: "157", value: " Lycoris Recoil", inline: false },
        { name: "158", value: " Toaru Kagaku no Railgun S (s2)", inline: false },
        { name: "159", value: " One punch man", inline: false },
        { name: "160", value: " Plastic Memories", inline: false }
    )

const help_embed = new Discord.MessageEmbed()

    .setColor(`RANDOM`)
    .setTitle(`animelist`)
    .setFields(
        { name: "$animelist", value: "Sends a list of anime watched by bot creator" },
        { name: "usage", value: "$sanimelist <page 1-7>" }
    )

module.exports = {
    name: "animelist",
    work: worker,
    isSlash: true,
    help: help_embed,

    data: new SlashCommandBuilder()
        .setName('animelist')
        .setDescription('wysyła liste anime obejrzanych przez autora bota')
        .addNumberOption((option) =>
            option
                .setName("wybierz_strone_1-7")
                .setDescription("Wybierz numer strony z listy anime od 1 do 7")
                .setRequired(true)
        ),

    executeInteraction: async (inter) => {
        //load server settings
        const guildId = inter.guild.id
        const db = new QuickDB({ filePath: process.cwd() + `/db/srv_settings/commands/${guildId}.sqlite` });
        if (await db.get(`check.check`) == true) {
            const settings = await db.get(`anime_help.worker`)
            const settings_reason = await db.get(`anime_help.reason`)
            if (settings != true) { return message.channel.send(settings_reason) }
        }

        if (work != true) {
            const embed_worker = new Discord.MessageEmbed()
                .setTitle('**animelist**')
                .setColor('RANDOM')
                .setDescription(`${reason}`)
            inter.reply({ embeds: [embed_worker] });
            return (console.log("command id disabled"))
        } else {
            const user = inter.user.id
            const option = inter.options.getNumber('wybierz_strone_1-7')

            if (option == "1") {
                inter.reply({ embeds: [embed1], ephemeral: true })
            }
            if (option == "2") {
                inter.reply({ embeds: [embed2], ephemeral: true })
            }
            if (option == "3") {
                inter.reply({ embeds: [embed3], ephemeral: true })
            }
            if (option == "4") {
                inter.reply({ embeds: [embed4], ephemeral: true })
            }
            if (option == "5") {
                inter.reply({ embeds: [embed5], ephemeral: true })
            }
            if (option == "6") {
                inter.reply({ embeds: [embed6], ephemeral: true })
            }
            if (option == "7") {
                inter.reply({ embeds: [embed7], ephemeral: true })
            }
            if (option == "8") {
                inter.reply({ embeds: [embed8] })
            }
        }
    },


    execute: async (message, args) => {
        //load server settings
        const guildId = message.guild.id
        const db = new QuickDB({ filePath: process.cwd() + `/db/srv_settings/commands/${guildId}.sqlite` });
        if (await db.get(`check.check`) == true) {
            const settings = await db.get(`anime_help.worker`)
            const settings_reason = await db.get(`anime_help.reason`)
            if (settings != true) { return message.channel.send(settings_reason) }
        }

        if (work != true) { return message.channel.send(reason) }


        if (args[0] == "help") {

            if (args[1] == "en") {
                const embed_en = new Discord.MessageEmbed()

                    .setColor(`RED`)//EN
                    .setTitle(`animelist`)
                    .setDescription(`sends full list of anime watched by bot author \n
            usage: $anime -- send the entire anime list \n
            $anime <page_number> -- sends the given page from the anime list \n
            example: $animelist 5 \n
            page range: 1-8`)



                message.channel.send({ embeds: [embed_en] });
            } else {
                const embed_pl = new Discord.MessageEmbed()

                    .setColor(`BLUE`)//PL
                    .setTitle(`animelist`)
                    .setDescription(`wysyła pełną liste anime obejrzanych przez autora bota\n
            użycie: $anime -- wysyła całą liste anime\n
            $animelist <nr_storny> -- wysyła daną strone z listy anime\n
            przykład: $animelist 5\n
            zakres stron: 1-8`)



                message.channel.send({ embeds: [embed_pl] });
            }
        } else {

            if (args[0] != "help") {





                //wysyłanie strony po mumerku
                if (isNaN(args[0]) || parseInt(args[0]) <= 0) {
                    message.channel.send({ embeds: [embed1] }).then(
                        message.channel.send({ embeds: [embed2] })).then(
                            message.channel.send({ embeds: [embed3] })).then(
                                message.channel.send({ embeds: [embed4] })).then(
                                    message.channel.send({ embeds: [embed5] })).then(
                                        message.channel.send({ embeds: [embed6] })).then(
                                            message.channel.send({ embeds: [embed7] })).then(
                                                message.channel.send({ embeds: [embed8] })
                                            )
                    return
                }


                if (args[0] == "1") {
                    message.channel.send({ embeds: [embed1] })
                    return
                }
                if (args[0] == "2") {
                    message.channel.send({ embeds: [embed2] })
                    return
                }
                if (args[0] == "3") {
                    message.channel.send({ embeds: [embed3] })
                    return
                }
                if (args[0] == "4") {
                    message.channel.send({ embeds: [embed4] })
                    return
                }
                if (args[0] == "5") {
                    message.channel.send({ embeds: [embed5] })
                    return
                }
                if (args[0] == "6") {
                    message.channel.send({ embeds: [embed6] })
                    return
                }
                if (args[0] == "7") {
                    message.channel.send({ embeds: [embed7] })
                    return
                }
                if (args[0] == "8") {
                    message.channel.send({ embeds: [embed8] })
                    return
                }
            }
        }//od sprawdzania help  
    }
}