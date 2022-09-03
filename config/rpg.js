module.exports = {

    //daily
    daily_basic_coins: 1000,
    daily_basic_daimonds_min: 5,
    daily_basic_daimonds_max: 50,
    daily_basic_xp_min: 1000,
    daily_basic_xp_max: 5000,
    rpg_coins_emoji: "💵",

    //shop (lvl1 cost)
    basic_hełm_upgrade_cost: 150,
    basic_klata_upgrade_cost: 200,
    basic_spodnie_upgrade_cost: 150,
    basic_buty_upgrade_cost: 100,

    //grafika gui:
    heart_icon: "c/",//ikonka serduszka(życia)
    armor_icon: "",//ikonka tarczy(armora)
    class_tank_icon: "",//ikonka klasy postaci: tank
    class_mag_icon: "",//ikonka klasy postaci: mag
    class_knight_icon: "",//ikonka klasy postaci: ryceż(knight)
    class_berserka_icon: "",//ikonka klasy postaci: berserka
    class_sprinter_icon: "",//ikonka klasy postaci: sprinter

    //statystyki wrogów:

    //enemy tank:
    e_t_hp: 100,//enemy-tank-hp
    e_t_def: 50,//punkty armora
    e_t_xp: 100,//ilość expa za zabicie moba
    e_t_r_lvl: 1,//deafultowy lvl nagród za zabicia mobra (monety, mały % na dropnięcie itemu tanka, który można sprzedać)
    e_t_r_armor: 5,//% szans na dropnięcie części seta za zabicie moba
    e_t_r_coins: 15,//ilość monet za zabicie mona na 1lvl (skalowanie ilość monet * lvl moba)
    e_t_lvl: 1,//wymagane do skalowania stat
    e_t_dodge: 10, //szansa na unik w %
    e_t_m_rez: 50, //odporność na magie w %
    e_t_dmg: 10,//obrażenia na atak (dla każdego moba od +15% do - 15%)
    e_t_a_speed: 2,//atack speed (co ile rund może zaatakować) (dla tanka wyjątkowo co 2)
    e_t_assets: "c/" //lokalizacja pliku z grafiką moba

    //enemy 
}