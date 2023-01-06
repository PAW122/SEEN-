//npm i puppeteer
const Discord = require("discord.js")
const help_embed = new Discord.MessageEmbed()

    .setColor(`RANDOM`)
    .setTitle(`html`)
    .setFields(
        {name: "$html", value: "will render a web page based on your code"},
        {name: "usage", value: "$html <head><body><h1>Hello World!<h1></body></html>"}
    )

module.exports = {
    name: "html",
    help: help_embed,

    execute: async (message, args, client) => {

        const puppeteer = require('puppeteer');

        const renderHTMLAsImage = async (html) => {
            // launch a headless browser instance
            const browser = await puppeteer.launch();
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

        const content = message.content
        const html = content.slice(5)
        if (html < 1) return message.reply("try use $help html")
        renderHTMLAsImage(html).then((image) => {

            message.channel.send({
                content: "Your Webside",
                files: [image]
            })
        })


    }
}