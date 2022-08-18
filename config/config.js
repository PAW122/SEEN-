module.exports = {
    //token for tests
    token: "ODY5NTg3ODc3NDc3MTAxNTkw.GlzDM1.-g1GK0ESq9eZOp92S77v_oo6-SquxCiBLFetaY",
    test_bot: false,
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

    economy_emoji: "💵",
    weekly_coins: 500,
    birthday_coins: 1000,
    //dodać cofig vip mnożnik

    //zwiększać z każdą aktualizacją db
    db_version: "0.7",
    economy_db_version: "0.2",

    report_channel_id: "1006283491568267374",
    ban_channel_id: "1006297123521835049",

    black_list: true,

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