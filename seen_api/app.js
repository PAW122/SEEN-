module.exports = (port, client) => {
    //npm i express
    const economy = require("./economy")
    const guilds = require("./guilds")
    const guild_info = require("./guild_info")
    const servers = require("./servers")
    const commands = require("./commands")
    const channels = require("./channels")
    const messages = require("./messages")

    //http://localhost:2137/api/seen/economy/438621187132751873/438336824516149249
    //http://localhost:2137/api/seen/server_settings/727662119553728532
    const express = require("express")
    const app = express();
    const { QuickDB } = require("quick.db");

    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        next();
    });

    app.get('/', (req, res) => {
        res.send("Hello world");
    });

    //tu wysyła dane z db
    //http://localhost:2137/api/paw
    app.get("/api/paw", (req, res) => {
        res.send([1, 2, 3]);
    });

    app.get("/ready", (req, res) => {
        res.send(true)
    })

    //http://localhost:2137/api/guilds
    app.get("/api/guilds", (req, res) => {
        const guild = guilds(client)
        res.send(guild)
    })

    app.get("/api/guilds/info/:guildId",async (req,res) => {
        const guildId = req.params.guildId
        const info = await guild_info(client,guildId)
        res.send(info)
    })

    //zwraca wysztkie kanały na serweże
    app.get("/api/guilds/channels/:guildId",async (req,res) => {
        const guildId = req.params.guildId
        const info = await channels(client,guildId)
        res.send(info)
    })

    //messages
    app.get("/api/guilds/messages/:guildId/:channelId/:message_limit",async (req,res) => {
        const guildId = req.params.guildId
        const channelId = req.params.channelId
        const message_limit = req.params.message_limit
        const info = await messages(client,guildId,channelId,message_limit)
        res.send(info)
    })


    app.get("/api/servers", (req, res) => {
        const to_send = servers(client)
        res.send(to_send.toString());
    })

    app.get("/api/commands/:action", async (req, res) => {
        //action: read (ilość komend,)  list(lista wszystkich komend)
        const action = req.params.action
        const exec = await commands(client,action)
        res.send(exec)
    })

    //economy
    //http://localhost:2137/api/seen/economy/:guildId/:userid/:read
    //http://localhost:2137/api/seen/economy/:guildId/:userid/true
    //http://localhost:2137/api/seen/economy/:guildId/:userid/false
    app.get("/api/seen/economy/:guildId/:userid/:read", (req, res) => {

        async function data() {
            const guildId = req.params.guildId
            const userId = req.params.userid
            const read = req.params.read

            const data = await economy(guildId, userId, read)

            if (read == "true") {
                res.send({
                    "userId": userId,
                    "guildId": guildId,
                    "coins": data.coins,
                    "items": data.items,
                    "roll_usages": data.roll_usage,
                    "weekly": data.weekly,
                    "birthday": data.birthday,
                    "birthday_changes": data.birthday_changes
                })

            } else {
                res.send(`
        <p>userId: ${userId} </p>
        <p>guildId: ${guildId} </p>
        <p>coins: ${data.coins} </p>
        <p>items: ${data.items} </p>
        <p>roll_usages: ${data.roll_usage} </p>
        <p>weekly: ${data.weekly} </p>
        <p>birthday: ${data.birthday} </p>
        <p>birthday_changes: ${data.birthday_changes} </p>`)
            }

        }
        data()
    });

    //http://localhost:2137/api/seen/server_settings/:guildId
    app.get("/api/seen/server_settings/:guildId", (req, res) => {

        async function data2() {
            const guildId = req.params.guildId

            const db = new QuickDB({ filePath: `../db/srv_settings/commands/${guildId}.sqlite` });

            const prefix = await db.get(`prefix.check`);
            const welcome = await db.get(`welcome.channelId`);
            const version = await db.get(`version.check`);
            const tickets = await db.get(`tickets.settings`);

            const anime_gif = await db.get(`anime_gif.worker`);
            const anime_gif_reason = await db.get(`anime_gif.reason`);
            const eight_ball = await db.get(`eight_ball.worker`);
            const eight_ball_reason = await db.get(`eight_ball.reason`);
            const anime_seem_help = await db.get(`anime_seem_help.worker`);
            const anime_seem_help_reason = await db.get(`anime_seem_help.reason`);
            const anime_help = await db.get(`anime_help.worker`);
            const anime_help_reason = await db.get(`anime_help.reason`);
            const updaty = await db.get(`updaty.worker`);
            const updaty_reason = await db.get(`updaty.reason`);
            const anime_list = await db.get(`anime_list.worker`);
            const anime_list_reason = await db.get(`anime_list.reason`);
            const ankieta = await db.get(`ankieta.worker`);
            const ankieta_reason = await db.get(`ankieta.reason`);
            const awatar = await db.get(`awatar.worker`);
            const awatar_reason = await db.get(`awatar.reason`);
            const ban = await db.get(`ban.worker`);
            const ban_reason = await db.get(`ban.reason`);
            const bot_info = await db.get(`bot_info.worker`);
            const bot_info_reason = await db.get(`bot_info.reason`);
            const clear = await db.get(`clear.worker`);
            const clear_reason = await db.get(`clear.reason`);
            const embed = await db.get(`embed.worker`);
            const embed_reason = await db.get(`embed.reason`);
            const kick = await db.get(`kick.worker`);
            const kick_reason = await db.get(`kick.reason`);
            const ping = await db.get(`ping.worker`);
            const ping_reason = await db.get(`ping.reason`);
            const random = await db.get(`random.worker`);
            const random_reason = await db.get(`random.reason`);
            const ruletka = await db.get(`ruletka.worker`);
            const ruletka_reason = await db.get(`ruletka.reason`);
            const say = await db.get(`say.worker`);
            const say_reason = await db.get(`say.reason`);
            const srv_info = await db.get(`srv_info.worker`);
            const srv_info_reason = await db.get(`srv_info.reason`);
            const blitz_stats = await db.get(`blitz_stats.worker`);
            const blitz_stats_reason = await db.get(`blitz_stats.reason`);
            const blitz_clan = await db.get(`blitz_clan.worker`);
            const blitz_clan_reason = await db.get(`blitz_clan.reason`);
            const autoroles = await db.get(`autoroles.worker`);
            const autoroles_reason = await db.get(`autoroles.reason`);
            const user_info = await db.get(`user_info.worker`);
            const user_info_reason = await db.get(`user_info.reason`);
            const lvl_command = await db.get(`lvl_command.worker`);
            const lvl_command_reason = await db.get(`lvl_command.reason`);
            const economy_command = await db.get(`economy_command.worker`);
            const economy_command_reason = await db.get(`economy_command.reason`);

            const anime_zapowiedzi = await db.get(`anime_zapowiedzi.worker`);
            const anime_zapowiedzi_reason = await db.get(`anime_zapowiedzi.reason`);
            const anime_seen = await db.get(`anime_seen.worker`);
            const anime_seen_reason = await db.get(`anime_seen.reason`);
            const unban = await db.get(`unban.worker`);
            const unban_reason = await db.get(`unban.reason`);
            const ticket = await db.get(`ticket.worker`);
            const ticket_reason = await db.get(`ticket.reason`);


            res.send([
                req.params.guildId,
                prefix,
                welcome,
                version,
                tickets,
                ["commands data:",
                    ["anime_gif", anime_gif, anime_gif_reason],
                    ["eight_ball", eight_ball, eight_ball_reason],
                    ["anime_seem_help", anime_seem_help, anime_seem_help_reason],
                    ["anime_help", anime_help, anime_help_reason],
                    ["updaty", updaty, updaty_reason],
                    ["anime_list", anime_list, anime_list_reason],
                    ["ankieta", ankieta, ankieta_reason],
                    ["awatar", awatar, awatar_reason],
                    ["ban", ban, ban_reason],
                    ["bot_info", bot_info, bot_info_reason],
                    ["clear", clear, clear_reason],
                    ["embed", embed, embed_reason],
                    ["kick", kick, kick_reason],
                    ["ping", ping, ping_reason],
                    ["random", random, random_reason],
                    ["ruletka", ruletka, ruletka_reason],
                    ["say", say, say_reason],
                    ["srv_info", srv_info, srv_info_reason],
                    ["blitz_stats", blitz_stats, blitz_stats_reason],
                    ["blitz_clan", blitz_clan, blitz_clan_reason],
                    ["autoroles", autoroles, autoroles_reason],
                    ["user_info", user_info, user_info_reason],
                    ["lvl_command", lvl_command, lvl_command_reason],
                    ["economy_command", economy_command, economy_command_reason],
                    ["anime_zapowiedzi", anime_zapowiedzi, anime_zapowiedzi_reason],
                    ["anime_seen", anime_seen, anime_seen_reason],
                    ["unban", unban, unban_reason],
                    ["ticket", ticket, ticket_reason]
                ]
            ])
        }
        data2()
    });
    /*
    Documentacion:
    get economy user profil:
    /api/seen/user_profil/:guildId/:userid
    --> ["guildId", "prefix",welcome,version,tickets:[cr_t, t_send],[com_name,worker,reason]]
    
    prefix -- server custom prefix
    welcome -- server welcome messages
    version -- server db version
    tickets -- server ticket channel
    cr_t -- channel id when ticket can be created
    t_send -- channel id where ticket been send
    com_name -- command name
    worker -- true=command is enable, dalse=command is disabled
    reason -- if command is disabeld sending this message
    */

    // PORT

    app.listen(port, () => {
        console.log(`Server started on port ${port}`);
    });

}