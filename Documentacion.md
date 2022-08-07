# packages:
    "@discordjs/rest": "^1.0.1",
    "anime-images-api": "^2.0.0",
    "ascii-table": "^0.0.9",
    "axios": "^0.27.2",
    "better-sqlite3": "^7.6.2",
    "canvas": "^2.9.3",
    "chalk": "^5.0.1",
    "consola": "^2.15.3",
    "discord-xp": "^1.1.16",
    "discord.js": "^13.9.2",
    "dotenv": "^16.0.1",
    "env": "^0.0.2",
    "js-yaml": "^4.1.0",
    "node-fetch": "^3.2.9",
    "quick.db": "^9.0.6"

## Commands:

# acc_menager:
system zarządzania bazą kont
acc_help -- informacje jak korzystać z wszystkich komend z kategori
add_acc -- służy do dodawania nowych kont do bazy danych
add_user -- służy do dodawania nowych urzytkowników do bazy danych
del_user -- służy do usówania kont urzytkowników z bazy danych
info_acc -- służy do pobierania informacji o koncie 

# anime:
kategoria for fun wysyłająca przypadkowe grafiki postaci
oraz podająca informacje o kilku tytułach anime

# anime zapowiedzi:
zawiera komendy wysyłające informacje o zapowiedziach anime na konkretne sezony

# economy:
add_coins -- daje możliwość dodawania monet urzytkownikom przez administracje serwera
buy -- dodaje przedmioty do przfili urzytkowników
daily -- odbieranie dziennej nagrody monet
economy_handler -- tworzy nowe profile urzytkowników
economy_help -- informacje o wszystkich komendach z kategori economy
givaey -- komenda powstanie w przyszłości
profil -- informacje o aktualnym stanie moent itp urzytkownika
roll -- system gry hazardowej o monety
shop -- sklep z przedmiotami

# komendy:
8ball -- wysyła randomową fraze
a_anime seen help -- komenda help dla kategori anime
animehelp -- help dla kategori anime zapowiedzi
a_help -- lista komend dla urzytkowników
a_updaty -- lista aktualizacji bota
animelist -- lista anime obejrzanych przez autora bota
ankieta -- tworzy ankiete
awatar -- wysyła awatar oznaczonego urzytkownika
ban -- banuje urzytkownika
botinfo -- wysyła informacje o bocie
clear -- usówa podaną ilość wiadomości
embed -- wysyła testową wiadomość embed
kick -- wyrzuca urzytkowników z serwera
message_logs -- zapisuje wszystkie wiadomości na serweże i wysyła plik txt na komende administracji
ping -- wysyła opóżnienie bota
random -- wysyła randomową liczbe od 0 do liczby podanej przez urzytkownika
ruletka -- umożliwia zagranie w ruletkę od 2 do 5 osób
say -- komenda pozwalająca administracji wysyłać wiadomości jako bot
srv_info -- wysyła informacje o serweże
ticket -- umożliwia tworzenie ticketów dla administracji
unban -- służy do unbanowania urzytkoników podając ich id
userinfo -- wysyła informacje na temat oznaczonego urzytkownika

anime_gif -- wysyła gifa za pomocą anime gif api
blitz_clan -- wysyła informacje o klanie z wotb
blitz_stats -- wysyła statystyki konta z ry wotb
button_roles -- komenda testowa (autorole)

testowe: komendy tworzone podczas pomagania urzytkownikom z ich botami

command_settings -- zmienia ustawienia danych komend dla serwera na którym została urzyta komenda
settings_handler -- tworzy profil ustawień serwera w bazie danych
srv_set -- wyświetla liste komend dla kategori servers_settings,
wysyła liste z statusem komend

## INFORMACJE O FUNKCJI POSZCZEGULNYCH PLIKÓW:

# config:
config -- pozwala łatwo zmieniać kluczowe funkcje bota
worker -- pozwala wyłączyć indywidualnie każdą komende z osobna

# db:
folder przechowujący bazy danych dla:
ustawień serwerów
ekonomi
bazy kont

# handlers:
events, functions -- foldery z plikami slash command handlera
logs -- zawiera pliki txt z logami bota
ascii -- handler tworzący tabele ascii z informacjami o załadowaniu komend
emoji-reactions -- handler automatycznych reakcji emoji
handler -- wczytuje wszystkie komendy bazujące na prefxie
interaction_handler -- handler dla interakcji
logs -- handler dla zapisywania logów bota
msg_handler -- handler wywołujący komendy
slash_command_handler -- wczytuje slashcomendy
welcome -- handler dla wiadomościpowitalnych

.env -- przechowuje token bota (plik nie widnieje w repozytorium)
.gitignore -- zapobiega przesyłaniu do repozytorium nieporządanych plików
README.md -- zawiera autora bota oraz liste rzeczy do zrobienia
## 07.08.2022
## w przyszłości planowana jest szczegułowa dokumentacja wszystkich komend