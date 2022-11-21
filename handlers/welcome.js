const Canvas = require("canvas")
const Discord = require("discord.js")
var background = "https://i.imgur.com/zvWTUVu.jpg"
const { QuickDB } = require("quick.db");
const owner_alert = require("./owner_alert")
const { MessageEmbed } = require('discord.js');
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
        
        //get background
        const guildId = member.guild.id
        const db = new QuickDB({ filePath: process.cwd() + `/db/srv_settings/commands/${guildId}.sqlite` });
        
        //owner alert
        const embed = new MessageEmbed()
        .setTitle('Member join server')
        .setColor('#2F3136')//kolor embeda (nie ma paska)
        .setDescription(`${member.user.tag}`);
        owner_alert(1,embed,guildId,null,null,client)
        
        
        if(await db.get(`background.check`) != true) {
            var background = "https://i.imgur.com/zvWTUVu.jpg"

        }else if(await db.get(`background.custom`) == true){
            if(await db.get(`bglink.check`) != true) return message.channel.send("Worng wellcome background settings")
            
            var background = `${await db.get(`bglink.link`)}`
        }else if(await db.get(`background.check`) == true){
            //tło z galeri bota
            const bgtype = await db.get(`background.type`)
            if(bgtype == 1)var background = `https://i.imgur.com/zvWTUVu.jpg`
            if(bgtype == 2)var background = `https://wallpaperaccess.com/full/2071603.jpg`
            if(bgtype == 3)var background = `https://www.geeklawblog.com/wp-content/uploads/sites/528/2018/12/liprofile.png`
            if(bgtype == 4)var background = `https://pbs.twimg.com/media/FUJ8dDrXEAIGk3o?format=jpg&name=large`
            if(bgtype == 5)var background = `https://cdn.wallpapersafari.com/39/38/SimM0C.jpg`
            if(bgtype == 6)var background = `https://img.freepik.com/free-vector/japanese-street-pastel-colours_52683-44714.jpg?w=2000`
            if(bgtype == 7)var background = `https://i.pinimg.com/736x/35/3b/fa/353bfaa8b76b23dc8dfaf1af6482d220.jpg`
            if(bgtype == 8)var background = `https://t4.ftcdn.net/jpg/03/08/24/29/360_F_308242904_BNor0M6K6I19nVW6AVv8Qg9fWtuU9hMB.jpg`
            if(bgtype == 9)var background = `https://t3.ftcdn.net/jpg/04/49/19/08/360_F_449190831_i2whvIQdDIGtuIVWT6QfenWwmRApVJ5l.jpg`
            if(bgtype == 10)var background = `https://impuls.nzsug.pl/wp-content/uploads/2020/01/HXcsVY5.png`
        }
        console.log(`bg: ${background}`)
        

        //const guildId = member.guild.id
        //const db = new QuickDB({ filePath: process.cwd() + `/db/srv_settings/commands/${guildId}.sqlite` });

        let username = member.user.username
        let discrim = member.user.discriminator
        let avatarURL = member.user.displayAvatarURL({ format: "png", dynamic: false, size: av.size })

        const canvas = Canvas.createCanvas(dim.width, dim.height)
        const ctx = canvas.getContext("2d")

        // draw in the background
        try{
        const backimg = await Canvas.loadImage(background)
        ctx.drawImage(backimg, 0, 0)
        }catch(err){
            console.log(`${background} -- link creating error`)
            const backimg = await Canvas.loadImage("https://i.imgur.com/zvWTUVu.jpg")
        ctx.drawImage(backimg, 0, 0)
        }

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


        const welcomeChannelId = await db.get(`welcome.channelId`)
        if(!welcomeChannelId) return;
        if (welcomeChannelId == "null" || welcomeChannelId == null) {
            return
        } else {
            const attachment = new Discord.MessageAttachment(canvas.toBuffer(), "welcome.png")
            const channelId = member.guild.channels.cache.get(welcomeChannelId)

            if(await db.get(`welocme_content_check`) == true){
                var welcom_message = await db.get(`welocme_content`)
            }else{
                var welcom_message = `<@${member.id}> Welcome to the **${member.guild.name}** server!`
            }

            return channelId.send({
                content: welcom_message,
                files: [attachment]
            })

        }

    }
    try{
    welcome(member)
    }catch(err){
        console.log(err)
    }
})
}
