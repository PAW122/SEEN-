module.exports = {
    //token for tests
    token: "ODY5NTg3ODc3NDc3MTAxNTkw.GIyN9g.NpipCONWmTPmMR8Qfz09xXgfX6HH1o67_L9HZ0",
    test_bot: false,
    status: "idle",//online/idle/invisible/dnd
    prefix: "$",//set deafult prefix
    commands_logs: "True",//True/False
    load_commands_logs: "True", //True/False 

    owner_id: "438336824516149249",

    save_logs: "Flase", //True/False
    logs_dir: `./handlers/logs/logs.txt`,
    error_logs_dir: `./handlers/logs/error.txt`,

    save_messages_logs: "True",//True/False
    save_messages_logs_dir: `./handlers/logs/messages.txt`,

    servers_logs: "True",

    wargaming_api_key: "ebc751064d5418bfefad7af6819e9c19",
    riot_api: "RGAPI-dd865e39-d1fa-4360-bf07-c4f5aaa00eac",
    yt_api_key: "AIzaSyAuBIMudnt0-hHzBQGVjhs89G1Dz6P2aw4",


    //zwiększać z każdą aktualizacją db
    db_version: "1.0",

    //bot support
    report_channel_id: "1006283491568267374",
    ban_channel_id: "1006297123521835049",
    black_list: true,

    //lvling handler
    min_xp_per_message: 7,
    max_xp_per_message: 15,
    xp_per_lvl: 300,
    xp_per_lvl_scaling: 1.2,

    //rpg
    daily_basic_coins: 1000,
    daily_basic_daimonds_min: 5,
    daily_basic_daimonds_max: 50,
    daily_basic_xp_min: 1000,
    daily_basic_xp_max: 5000,
    rpg_coins_emoji: "💵",

    basic_hełm_upgrade_cost: 150,
    basic_klata_upgrade_cost: 200,
    basic_spodnie_upgrade_cost: 150,
    basic_buty_upgrade_cost: 100
}