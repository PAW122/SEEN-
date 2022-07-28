const config = require(process.cwd() + `/config/worker.js`)
        const work = config.anime_gif
        const worker = config.anime_gif_work
        const reason = config.anime_gif_disable

const Discord = require('discord.js');
//npm i anime-images-api
//https://www.npmjs.com/package/anime-images-api
const API = require('anime-images-api')
const images_api = new API() 
//$animegif
//$animegif help
//$animegif help en
module.exports = {

    name: "animegif",
    description: "wysyła pong",
    usage: "$ping",
    work: worker,
    //opcje:
            /*
        hug()	Sends a hug Gif
        kiss()	Sends a kiss Gif
        slap()	Sends a slap Gif
        punch()	Sends a punch Gif
        wink()	Sends a winking Gif
        pat()	Sends a pat Gif
        kill()	Sends a kill Gif
        cuddle()	Sends a cuddle Gif
        wafiu()	Sends a waifu
        API.nsfw:

        Endpoint	Description
        hentai()	Sends a hentai Gif
        boobs()	Sends a boob Gif
        lesbian()	Sends a lesbian Gif
            */


    execute: async(message, args) => {


        if(work != true){return message.channel.send(reason)}
        
        

        if(!args[0]){message.channel.send(`podaj rodzaj gifa:\n
        1.hug
        2.kiss
        3.slap
        4.punch
        5.wink
        6.pat
        7.kill
        8.cuddle
        9.waifu
        !!NSFW!!:\n
        1.hentai
        2.boobs
        3.lesbian`)}

    if(args[0] == "help"){
        if(args[1] == "en"){
            return message.reply(`use one of the options:
            1.hug
            2.kiss
            3.slap
            4.punch
            5.wink
            6 patent
            7.kill
            8.cuddle
            9.waifu
            !! NSFW !!: \ n
            1.hentai
            2.boobs
            3.lesbian
           
            !! bot may take a while to send a gif !!
            example: $ animegif pat`)
        }else{
        return message.reply(`użyj jedniej z opcji:
        1.hug
        2.kiss
        3.slap
        4.punch
        5.wink
        6.pat
        7.kill
        8.cuddle
        9.waifu
        !!NSFW!!:\n
        1.hentai
        2.boobs
        3.lesbian
        
        !!bot czasami miże potrzebować dłuższej chwili na wysłanie gif!!
        przykład: $animegif pat`)}
    }
try{

        if(args[0] == "hug"){
            images_api.sfw.hug().then(response => {
                message.channel.send(response.image)
                return
            })} 

        if(args[0] == "kiss"){
            images_api.sfw.kiss().then(response => {
                 message.channel.send(response.image)
                return
        })} 
        if(args[0] == "slap"){
            images_api.sfw.slap().then(response => {
                 message.channel.send(response.image)
                return
        })}
        if(args[0] == "wink"){
            images_api.sfw.wink().then(response => {
                 message.channel.send(response.image)
                return
        })}
        if(args[0] == "pat"){
            images_api.sfw.pat().then(response => {
                 message.channel.send(response.image)
                return
        })}
        if(args[0] == "kill"){
            images_api.sfw.kill().then(response => {
                 message.channel.send(response.image)
                return
        })}
        if(args[0] == "cuddle"){
            images_api.sfw.cuddle().then(response => {
                 message.channel.send(response.image)
                return
        })}
        if(args[0] == "waifu"){
            images_api.sfw.waifu().then(response => {
                 message.channel.send(response.image)
                return
        })}


        const odmowa = "nie możesz tego zrobić\n ten kanał nie jest nsfw"
        //nfs
        if(args[0] == "hentai"){

            if (!message.channel.nsfw){return message.reply(odmowa)}

            images_api.nsfw.hentai().then(response => {
                 message.channel.send(response.image)
                return
        })}
        if(args[0] == "boobs"){
            if (!message.channel.nsfw){return message.reply(odmowa)}
            images_api.nsfw.boobs().then(response => {
                 message.channel.send(response.image)
                return
        })}
        if(args[0] == "lesbian"){
            if (!message.channel.nsfw){return message.reply(odmowa)}
            images_api.nsfw.lesbian().then(response => {
                 message.channel.send(response.image)
                return
        })}

    }catch(error) {message.reply("coś siem wysypało")}

    }
   
}