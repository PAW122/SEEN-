const Discord = require("discord.js");
const yaml = require("js-yaml");
const fs = require("fs");
const raw = fs.readFileSync(process.cwd() + "/yamldb/mal.yaml")

module.exports = {
    name: "mal",

    execute: async(message,args,client) => {
        return message.reply("komenda jest w trakcie tworzenia")
        if(args[0] == "help") {
            const embed_pl = new Discord.MessageEmbed()

            .setColor(`BLUE`)//PL
            .setTitle(`mal help`)
            .setDescription("add your anime to anime list")
            .setFields(
                {name: "$mal add <id> <title>", value: "title need to be only 1 word", inline: false}
            )

            .setFooter(message.author.tag, message.author.avatarURL({ dynamic: true }));
            return message.channel.send({ embeds: [embed_pl]});
        }

        if(args[0] == "add") {
            if(!args[1] || isNaN(args[1])) {
                return message.reply("you need specify id")
            }
            if(!args[2]) return message.reply("you dont type title!!")
            const user = message.author.id
            const id = args[1]
            const title = args[2]

            let doc = yaml.load(raw, 'utf-8');

            doc.mal[0].user = user
            doc.mal[0].id = id
            doc.mal[0][id] = title

            fs.writeFileSync(raw, yaml.dump(doc));
        }


        const data = yaml.load(raw);
        console.log(data)
    }
}