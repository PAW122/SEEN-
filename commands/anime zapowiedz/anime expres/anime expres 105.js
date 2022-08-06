//$zapoiwedzi anime
const Discord = require('discord.js');
const { QuickDB } = require("quick.db");
// spychu12@gmail.com
module.exports = {
    name: "animeexpres",
    description: "wysyła pong",
    usage: "$ping",

    execute: async(message, args) => {
        //load server settings
        const guildId = message.guild.id
        const db = new QuickDB({ filePath: process.cwd() + `/db/srv_settings/commands/${guildId}.sqlite` });
        if(await db.get(`check.check`) == true){
            const settings = await db.get(`eight_ball.worker`)
            const settings_reason = await db.get(`eight_ball.reason`)
            if(settings != true){return message.channel.send(settings_reason)}
        }

        const embed = new Discord.MessageEmbed()
        

        .setColor("BLUE")
        .setTitle("Anime")
        .setDescription("Anime Expres:")
        .addFields(
        {name: "Zapowiedzi,kontynuacje nowe pv",value: "------------------------------------------------------------------------", inline: false},
        
        {name: "Tiger And Bunny",value: `premiera 2 cześci anime zadebiutuje już 7 pażdziernika
        będą to odcinki od 14 do 25`, inline: false},
        
        {name: "Record Of Rangnarok",value: `Serial zadebiutuje na początku 2023r. Dzisiaj twórcy dołożyli nowy zwiastun.
        anime opowiada np: o samej walce Adama z samym ojcem Greciej mitologi czyli Zeusem.
        anime zadebiutuje na platformie netflix a jego wykonaniem zajmuje się ponownie studio Grafinika`, inline: false},
        
        {name: "Nokemono-tachi no Yoru",value: `Powstaje adaptacja mangi o nazwie Nokemono-tachi no Yoru  autorstwa Makoto Hoshino otrzyma ekranizację.\n
        Wisteria to sierota mieszkająca w zakątku Imperium Brytyjskiego w końcówce XIX wieku. Jej życie jest samotne i ponure, dopóki nie spotyka Malbusa, potężną, ale równie samotną, nieśmiertelną istotę o futrzanym wyglądzie i którą ścigają myśliwi. Razem Wisteria i Malbus wędrują po Imperium zamieszkanym przez ludzi i podobne do ludzi bestie w poszukiwaniu miejsca, w którym mogliby żyć razem w spokoju.`, inline: false},
        
        {name: "Egend Of Mana: The Teardrop Crystal",value: `Serial ma zadebiutować w sezonie jesień 2022`, inline: false},

        {name: "Junji Ito: Uzumaki",value: `Seria została ponownie przesunięta ponieważ personel potrzebuje więcej czasu na odtworzenie skąplikowanych projektów i szczegółowej pracy mangi. Personel dodał, że nie chce narażać jakości serialu i dostarczać przeciętnego produktu końcowego.
        Data wydania została przesunięta z 2022r a następnie do 2021 ponownie zostało przesunięte do pażdziernika 2022r przed dzisiejszym opużnieniem, `, inline: false},

        {name: "Uoto Chi: Chikyu No Undo Ni Tsuite",value: `Miejsce akcji to 15 wieczna Polska. Był to czas kiedy cheretyckie ide prowadziły do spalenia na stosie. Rafał cudowne dziecko ma ukończyć teologie-najważniejszy przedmiot na uniwersytecie.Pewnego dnia spotyka tajemniczego człowieka, który ukazuje mu całą prawdę o świecie z automatu czyniąc go cheretukiem.`, inline: false},

        {name: "Kaguya Sama: Love Is War",value: `Zakońcony sezon anime w dniu publikacji filmu wciąż zajmuje 1 miejsce na portalu MyAnimeList`, inline: false},

        {name: "Date A Live",value: `Zapowiedż 5 sezonu
        na ten moment nie znamy nietety zadnych konkretów`, inline: false},

        {name: "Akiba Meido Senso",value: `Anime opowie o nagomi kazuchira. Kobiecie która przeprowadza się do Tokio i maży o zostaniu uroczą pokojówką w akihabarze. W serialu występuje również rankokazutoshi-była pokojówka, która przez długi czas przebywała z dala od akihabary. 
        Data wydania nie została narazie ujawniona`, inline: false},

        {name: "manga,fandom",value: `------------------------------------------------------------------------`, inline: false},
        
        {name: "Berserk",value:`Manga Berserk powraca
        po ponad roku po smierci mangaki dowiedzieliśmy się czegoś na temat dalszych jej losów seria będzie kontynuowana przez studio gaga i nadwzorowana przez przyjaciela autora` ,inline: false},
        
        {name: "one pice",value: `Twórca one pica robi sobie 1 miesięczną przerwę podczas której mangaka chce się przygotować do obchodów 25lecia mangi oraz do jej ostatecznej sagi
        Tytuł powróci 25lipca wraz z wydaniem rozdziału 1054` ,inline: false},
        
        {name: "one punch man",value:`one punch man otrzyma hollyłudzki. Za produkcję będzie odpowiedzailne Arat productions. Produkcja filmu ma ruszyc pod koniec tego roku`  ,inline: false},
        )

        .setFooter("https://youtu.be/WjfMF_nfsGQ")
        message.channel.send({embeds: [embed]});
    }

}