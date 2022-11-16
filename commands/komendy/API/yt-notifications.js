//npm install youtube-notification
const { QuickDB } = require("quick.db");
const http = require("http");
const express = require("express");
const app = express();
var server = http.createServer(app);

const config = require("../../../config/config")
const token = config.token

const works = require(process.cwd() + `/config/worker.js`)
const work = works.yt_notify_handler
const reason = works.yt_notify_handler_disable

module.exports = () => {

    if (work != true) { return console.log(reason) }

    const channel_id = "UCyFhRlWsqH1mD3c6If3U9Lw"
    const channel_link = "https://youtube.com/channel/UCyFhRlWsqH1mD3c6If3U9Lw"
    const server_channel_id = "745768777022701648"

    app.get("/", (request, response) => {
        console.log(`Ping Received.`);
        response.writeHead(200, { "Content-Type": "text/plain" });
        response.end(".");
    });

    const listener = server.listen(token.PORT, function () {
        console.log(`Your app is listening on port ` + listener.address().port);
    });

    const YouTubeNotifier = require('youtube-notification');

    const notifier = new YouTubeNotifier({
        hubCallback: channel_link,
        secret: 'Something',
    });
    notifier.setup();

    notifier.on('notified', data => {
        console.log('New Video');
        client.channels.cache.get(server_channel_id).send(
            `${data.channel.name} just uploaded a new video titled: ${data.video.title}`
        );
    });
    notifier.subscribe(channel_id);

    app.use("/yt", notifier.listener());
}


