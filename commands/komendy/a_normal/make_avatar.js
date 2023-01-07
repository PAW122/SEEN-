const axios = require("axios")
const Discord = require("discord.js")

var style_list = ["adventurer","adventurer-neutral","avataaars","big-ears","big-ears-neutral","big-smile",
"bottts","croodles","croodles-neutral","identicon","initials","micah","miniavs","open-peeps","personas",
"pixel-art","pixel-art-neutral"]

const help_embed = new Discord.MessageEmbed()

    .setColor(`RANDOM`)
    .setTitle(`avatar-generator`)
    .setFields(
        {name: "$avatar-generator", value: "generate custom avatar"},
        {name: "usage", value: "$avatar-generator <style> <avatar name>"},
        {name: "style list:", value: `adventurer,adventurer-neutral,avataaars,big-ears,big-ears-neutral,big-smile,bottts,croodles,croodles-neutral,identicon,initials,micah,miniavs,open-peeps,personas,pixel-art,pixel-art-neutral`},
        {name: "example:", value: "$avatar-generator pixel-art seen"}
        )

module.exports = {
    name: "avatar-generator",
    help: help_embed,

    execute: async (message, args, client) => {
        function check() {
            var res = false
            const style = args[0]
            style_list.forEach(styl => {
                if(style == styl){
                    res = true
                } 
            })
            return res
        }

        if(check() != true) {
            return message.reply("bad style name")
        }

        const seed = args[1]
        if(!seed) {
            return message.reply("Bad avatar name")
        }

        const link = `https://avatars.dicebear.com/api/${args[0]}/${seed}.svg?mood[]=happy`
        axios.get(link).then(res => {
            renderHTMLAsImage(res.data).then((image) => {

                message.channel.send({
                    content: "Your avatar:",
                    files: [image]
                })
            }).catch(err => {
                console.log(err)
                return message.reply("somethink goes wrong")
            })
        })

        const puppeteer = require('puppeteer');

        const renderHTMLAsImage = async (html) => {
            // launch a headless browser instance
            const browser = await puppeteer.launch({
                defaultViewport: {width: 1920, height: 2160}
            });
            // create a new page
            const page = await browser.newPage();
            // set the HTML content of the page
            await page.setContent(html);
            // generate a screenshot of the page
            const image = await page.screenshot();
            // close the browser
            await browser.close();
            // return the image
            return image;
        }
    }
}