module.exports = {
    //token for tests
    token: "ODY5NTg3ODc3NDc3MTAxNTkw.GIyN9g.NpipCONWmTPmMR8Qfz09xXgfX6HH1o67_L9HZ0",
    test_bot: false,
    status: "idle",//online/idle/invisible/dnd
    prefix: "$",//set deafult prefix
    commands_logs: "True",//True/False
    load_commands_logs: "True", //True/False 

    service_mode: false, //false/true

    owner_id: "438336824516149249",

    save_logs: "False", //True/False
    logs_dir: `./handlers/logs/logs.txt`,
    error_logs_dir: `./handlers/logs/error.txt`,

    save_messages_logs: "True",//True/False
    save_messages_logs_dir: `./handlers/logs/messages.txt`,

    servers_logs: true,

    wargaming_api_key: "ebc751064d5418bfefad7af6819e9c19",
    riot_api: "RGAPI-0fcf3318-d4f7-4f44-b06b-cc20fa574b0e",
    yt_api_key: "AIzaSyAuBIMudnt0-hHzBQGVjhs89G1Dz6P2aw4",
    openAI_api_key: "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",//do ogarnięcia (nie zaczete)
    osu_api_key: "ff4d117022adfe7968d8e4248a9867a8d9811ea8",
    
    osu_app_url: "sync.pl",
    osu_app_name: "sync",

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
}