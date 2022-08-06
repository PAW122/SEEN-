const Canvas = require("canvas")
const Discord = require("discord.js")
const background = "https://i.imgur.com/zvWTUVu.jpg"
const { QuickDB } = require("quick.db");
const dim = {
    height: 675,
    width: 1200,
    margin: 50
}

const av = {
    size: 256,
    x: 480,
    y: 170
}

module.exports = (client) => {
client.once("guildMemberAdd", member => {
    async function welcome() {
        let username = member.user.username
        let discrim = member.user.discriminator
        let avatarURL = member.user.displayAvatarURL({ format: "png", dynamic: false, size: av.size })

        const canvas = Canvas.createCanvas(dim.width, dim.height)
        const ctx = canvas.getContext("2d")

        // draw in the background
        const backimg = await Canvas.loadImage(background)
        ctx.drawImage(backimg, 0, 0)

        // draw black tinted box
        ctx.fillStyle = "rgba(0,0,0,0.8)"
        ctx.fillRect(dim.margin, dim.margin, dim.width - 2 * dim.margin, dim.height - 2 * dim.margin)

        const avimg = await Canvas.loadImage(avatarURL)
        ctx.save()

        ctx.beginPath()
        ctx.arc(av.x + av.size / 2, av.y + av.size / 2, av.size / 2, 0, Math.PI * 2, true)
        ctx.closePath()
        ctx.clip()

        ctx.drawImage(avimg, av.x, av.y)
        ctx.restore()

        // write in text
        ctx.fillStyle = "white"
        ctx.textAlign = "center"

        // draw in Welcome
        ctx.font = "bold 50px serif"
        ctx.fillText("Welcome", dim.width / 2, dim.margin + 70)

        // draw in the username
        ctx.font = "bold 60px serif"
        ctx.fillText(username + discrim, dim.width / 2, dim.height - dim.margin - 125)

        // draw in to the server
        ctx.font = "bold 40px serif"
        ctx.fillText("to the server", dim.width / 2, dim.height - dim.margin - 50)

        const guildId = member.guild.id
        const db = new QuickDB({ filePath: process.cwd() + `/db/srv_settings/commands/${guildId}.sqlite` });

        const welcomeChannelId = await db.get(`welcome.channelId`)
        if (welcomeChannelId == "null" || welcomeChannelId == null) {
            return
        } else {
            const attachment = new Discord.MessageAttachment(canvas.toBuffer(), "welcome.png")
            const channelId = member.guild.channels.cache.get(welcomeChannelId)
            return channelId.send({
                content: `<@${member.id}> Welcome to the server!`,
                files: [attachment]
            })
        }

    }
    welcome(member)
})
}

//module.exports = generateImage