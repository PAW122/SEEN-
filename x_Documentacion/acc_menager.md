# ACC menager:
służy do zarządzania bazą kont z gry wotb
komendy z tej kategori nie są widoczne w komendzie help,
aby skorzystać z komend urzytkownik musi zostać dodany przez osobe 
z uprawnieniami administratora do db

## funkcje: ##

# oddawanie nowego konta do db:
użycie: $add_acc <accmail@gmail.com> <acc_password> <nickname> <bans> <tiery> <wr> <all_battles> <gold>
przykład: $add_acc accmail@gmail.com 123pass456 nick_name_123 0 8,9,10 56.42 13257 100
wymagane uprawnienia konta w db: Administrator

# dodawanie nowego użytkownika do db:
użycie: $add_user <userId> <permisions> <administrator>
przykład: $add_user 438336824516149249 1 false
wymagane uprawnienia konta w db: Administrator

# usówanie konta użytkownika z db:
użycie: $del_user <userID>
przykład: $del_user 438336824516149249
wymagane uprawnienia konta w db: Administrator

# uzyskiwanie informacji o koncie :
wymagane uprawnienia konta w db: permisions: 1

jakie dane można uzyskać:
mail | chasło | nick | ilość bitew | ilość godla | tiery czołgów | 

wymagane informacje do pobrania informacji o koncie:
znajomość maila konta