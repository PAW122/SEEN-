## kategoria economy
kategoria odpowiadająca za ekoomie
wszystkie dane są zapisywane indywidualnie dla każdego serwera

jażeli nowa osoba użyje komendy po raz pierwszy zostaje stworzony jej prefil
jeżeli komenda z kategori economy zostanie urzyta na serweże po raz pierwszy
następuje stworzenie profilu serwera w bazie danych

* economy_handler -- tworzy nowe konta urzytkowników

# add_coins:
służy do dodawania monet urzytkownikom przez administracje serwera
użycie: $add <ilość_monet> <userId>
przykład: $add 100 778643150981562368

# buy:
pozwala zakupić przedmioty
użycie: $buy <nazwa_przedmiotu>
przykład: $buy vip
wymagania: posiadanie odpowiedznij ilości monet,
posiadanie profilu w db (jest on tworzony automatycznie podczas pierwszego urzycia komendy)

# daily:
służy do odbierania dziennych nagród w postaci monet
od 50 do 100 dziennie
w przypadku posiadania przedmiotu VIP monety są podwajane
komendy można urzyć raz dziennie | komenda odnawia się o godzinie 00:00
użycie: $daily

# economy help:
wysyła liste komend do obsługi funkcji komend z kategori ekonomia
użycie: $helpeco

# profil:
wyświetla aktualne informacje o ilości posiadanych monet
oraz wyświetla wszystkie posiadane przedmioty
użycie: $profil

# roll:
pozwala zagrać w gre losową w której obstawia się określoną liczbe monet
szane na wygranie wynoszą 33%
jeżeli gracz wygra liczba obstawionych monet zostaje podwojona
jeżelo gracz przegra traci obstawione monety
użycie: $roll <ilość_monet>
jedna osoba może użyć roll maxymalnie 15 razy w ciągu jenego dnia
uzycia odnawiają się o godzinie 00:00

# shop:
wyswietla listę przedmiotów które można zakupić,
nazwe oraz cene przedmiotu
użycie $shop