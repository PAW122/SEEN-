# SEEN-
 Public Discord Bot created by PAW#5844

# paczki
paczki znajdują się w dokumentacji

# paczki do usunięcia
npm i ytdl-core
npm i yt-search
npm i libsodium-wrappers
npm i ffmpeg-static
npm i distube
npm i @distube/spotify //nie działa

# nowe:
discord-player
@discordjs/voice
@discordjs/rest
@discordjs/opus 
@discordjs/builders
npm i js-queue

# w trakcie:
mal -- do dokończenia system odczytywania listy

game -- flags:
wysyła grafike randomowej flagi i jeżeli gracz zgadnie dodaje
mu 1 punkt.
zapisuje w db rekord punktów pod rząd żeby gracz mógł sprawdzić swój rekord

# do dodania:

    4.ruletka dla ekonomi
    5.system lvl na db z canvasem
    6.canvas dla komend z ekonomi
    7.slashe dla komend z ekonomi
    8.work w ekonomi + wbijanie lvl żeby uzyskać dostęp do lepszej pracy
    9.naprawić slashe dla anime gif
    10.userinfo dodać exeute, worker
    11.unban dodać execute, worker, config, chyba srv_config
    12.slash dla kicka
    13.slash dla embeda
    14.zrobić coś żeby po dodaniu aktułki db zapisywały się ustawienia serwera
    15.zrobić komende, która będzie wysyłała powiadomienia o errorach na kanale na dc
    17.wsystkie srv_set w komendach (sprawdzanie czy komenda jest włączona na srv) -
    zrobić w jakimś handlerze
    18.dodać możliwość ustawienia w srv_set wiadomości pv powitalnej dla nowych osób na srv
    19.dodać komende, która na każdym serweże obok nazwy bota ustawi prefix ustawiony przez adminów
    20.zrobić button role na srv_set dla każdego serwera
    23.dodać możliwość oznaczenia kanału śledzączgo updaty bota z githuba (na db)
    25.wywalić animelist na plkach textowych i zrobić na db
    27.zrobić staty z lola na api
    28.dodać żeby kazdy serwer mógł do ekonomi ustawić własne emoji
    29.komenda na kanał do ankiet -- każda wiadomość na danym kanale zamieniana na ankiete
    30.eoknomia -- im więcej dni z rzędu się odbiera coinsy tym wiekszy ma sie bonus
    31.zrobić komende, która pozwala trackować powiadomienia z danego kanału yt
    32.ekonomia -- depozyt który po jakmś czasie oddaje coinsy z np 20% dodatku
    33.dodać skszynki -- możliwość kupowania i otwierania skrzynek z randomowymi przedmiotami np goldem i vip jako nagorda główna
    34.warnt -- dodać warny. po dostaniu ilości warnów ustawionych przez administracje na kanał administracji będzie wysyłana wiadomość że urzytkownik ma już x warnów i jest do zbanowania
    35.birthday -- jeżeli ktoś ma urodziny wysyła wiadomość że ktoś ma właśnie urzodziny i dostaje ileś cionsów
    36.dodać możliwość dodania kanału gdzie bot będzie wysyłał informacje o zmianach (aktułkach)
    37.zrobić komende $porg która będzie wysyłała randomowa grafike porga
    38.{
         // dzień mieś rok liczba_dni_z_rzędu
                    //zapisuje dzień odebrania nagrody 1 dnia
                    //i dodaje 1 do liczby_dni
                    //jeżeli podczas odbierania dailt liczba == 0 nie nalicza boosta
                    //jeżeli liczba jest > 0 
                    //data pierwszego daily. do dnia + liczba jeżeli to == obecna data
                    //daje nagrody z boostem i dodaje 1 do liczby

                    //maxymalna liczba dni z rzędu (z bostowanymi nagrodami)
                    //to 7 dni. Jeżeli liczba == 7 wysyła gratulacje i resetuje liczbe do 0
    }

    ekonomia -- daily, weekly daje lootboxy
    lootboxy:{
        item        monety  szanse na drop
        wooden logg = 10        30%
        
    }

## GRA
    pomysł na gre cos ala afk arena:
    bot zapisuje o jakiej godz ostatnio były dobierane nagrody

    normalne nagrody{ (za 1h afka)
        1000 monet
        od 5 do 50 diamentów
        od 1k do 10k expa
    }

daily nagorody{
    1h = normalne nagrody
    2h = nagrody * 1.5
    3h = nagrody * 2.0
    4h = nagrody * 2.5
    5h = nagordy * 3.0
    6h = nagrody * 3.5
    7h = nagrody * 4.0
    8h = nagrody * 4.5
    9h = nagrody * 5.0
    10h = nagrody * 5.5
    11h = nagrody * 6.0
    12h = nagrody * 6.5
    13h = nagrody * 7.0
    14h = nagrody * 7.5
    15h = nagrody * 8.0
    16h = nagrody * 8.5
    17h = nagrody * 9.0
    18h = nagrody * 9.5
    19h = nagrody * 10.0
    20h = nagrody * 10.5
    21h = nagrody * 11.0
    22h = nagrody * 11.5
    23h = nagrody * 12.0
    24h = nagrody * 12.5
    }
lewele {
    deafultowo lvl 0
   lvl   ilość expa
    1 - 1k
    2 - 2k
    3 - 4k
    4 - 8k
    5 - 16k
    6 - 32k
    7 - 60k
    8 - 100k

    każdy następny lvl = obecny_lvl -8.foreach(100k + 30k)
    //jeżeli lvl jest większy niż 8
    //bierze 100k expa z 8 lvl
    //i dla każdego lvl w góre dodaje 30k

    //np obecnie 10lvl = 100k + 30 + 30 = 160k na 10lvl



}

# info
messages log -- nie robie server settings bo i tak jest tylko dla adminów
24.naprawić na /ankieta bot nie zostawia reakcji(emotek) pod ankietą -- idk jak to zrobić

zrobic komendy na separatorach zamiast na args 
args.join(" ").split(/* separator */)


# pomysł na drugą gre typu czat
gierka typu rozmowy z anime dziewczynkami albo przygodówka
po wybraniu każdej odpowiedzi będzie wysyłana grafika postaci
z dymkiem czatu

po wybraniu każdej z pocji będzie zapisywane w db czy np
wybór 1 = lewo/prawo
wybór[2] = tak/nie
itp



# zrobić gre na podstawie chos or die
gracz musi wybrać odp z gry bo inaczej gracz przegra

# economy update
dodaje system, który zwiększa nagrody jeżeli gracz odbiera nagrody kilka dni z rzędu