//npm i request
const request = require("request")

const config = require("../config/config")

const baseurl = "https://www.googleapis.com/youtube/v3"
const key = config.yt_api_key

module.exports = (channelId) => {
    async function getData() {
    const url = `${baseurl}/channels/part=statistics&id=${channelId}&key=${key}`;

    const result = await new Promise((resolve, reject) => {
        request({
            method: "GET",
            url: url
        }, (err,response, text) => {
            if(err)return reject(err);

            const json = JSON.parse(text);
            const statistics = json.items[0].statistics

            const subscribers = parseInt(statistics.subscriberCount);
            const views = parseInt(statistics.vievCount);
            const videos = parseInt(statistics.videoCount);

            resolve(
                {
                    subscribers: subscribers,
                    views: views,
                    videos: videos
                }
            )
        })
    } )
    return result;
}
getData(channelId)
}