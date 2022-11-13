//agents
const Discord = require("discord.js");
const axios = require("axios")
const uuid = require("./UUIDs.json")

const Breach = uuid.characters.Breach
const Raze = uuid.characters.Raze
const Skye = uuid.characters.Skye
const Cypher = uuid.characters.Cypher
const Sova = uuid.characters.Sova
const Killjoy = uuid.characters.Killjoy
const Viper = uuid.characters.Viper
const Phoenix = uuid.characters.Phoenix
const Brimstone = uuid.characters.Brimstone
const Yoru = uuid.characters.Yoru
const Sage = uuid.characters.Sage
const Reyna = uuid.characters.Reyna
const Omen = uuid.characters.Omen
const Jett = uuid.characters.Jett

module.exports = (message, args, client) => {
    if (!args[1]) {
        const embed_pl = new Discord.MessageEmbed()
            .setColor(`BLUE`)//PL
            .setTitle("$valo agents <agent name>")
            .setDescription(`Agents name list:\n
            Breach,Raze,Skye,Cypher,Sova,Killjoy,Viper,\nPhoenix,Brimstone,Yoru,Sage,Reyna\n,Omen,Jett`)

            //.setImage(`${card_image}`)
            .setFooter(message.author.tag, message.author.avatarURL({ dynamic: true }));
        return message.channel.send({ embeds: [embed_pl] });
    }
    message.react("✅")
    if (args[1] != "Breach" && args[1] != "Raze" && args[1] != "Skye" && args[1] != "Cypher" && args[1] != "Sova" && args[1] != "Killjoy"
        && args[1] != "Viper" && args[1] != "Phoenix" && args[1] != "Brimstone" && args[1] != "Yoru" && args[1] != "Sage" && args[1] != "Reyna"
        && args[1] != "Omen" && args[1] != "Jett") {
        return message.reply("you type wrong character name. try use $valo agents to see list of all agents names")
    }
    if (args[1] == "Breach") { var link = `https://valorant-api.com/v1/agents/${Breach}` }
    if (args[1] == "Raze") { var link = `https://valorant-api.com/v1/agents/${Raze}` }
    if (args[1] == "Skye") { var link = `https://valorant-api.com/v1/agents/${Skye}` }
    if (args[1] == "Cypher") { var link = `https://valorant-api.com/v1/agents/${Cypher}` }
    if (args[1] == "Sova") { var link = `https://valorant-api.com/v1/agents/${Sova}` }
    if (args[1] == "Killjoy") { var link = `https://valorant-api.com/v1/agents/${Killjoy}` }
    if (args[1] == "Viper") { var link = `https://valorant-api.com/v1/agents/${Viper}` }
    if (args[1] == "Phoenix") { var link = `https://valorant-api.com/v1/agents/${Phoenix}` }
    if (args[1] == "Brimstone") { var link = `https://valorant-api.com/v1/agents/${Brimstone}` }
    if (args[1] == "Yoru") { var link = `https://valorant-api.com/v1/agents/${Yoru}` }
    if (args[1] == "Sage") { var link = `https://valorant-api.com/v1/agents/${Sage}` }
    if (args[1] == "Reyna") { var link = `https://valorant-api.com/v1/agents/${Reyna}` }
    if (args[1] == "Omen") { var link = `https://valorant-api.com/v1/agents/${Omen}` }
    if (args[1] == "Jett") { var link = `https://valorant-api.com/v1/agents/${Jett}` }


    const response = axios.get(link).then(data => {
        console.log(data.data)
        const status = data.data.status
        if (status != 200) return message.reply("Error");

        const displayName = data.data.data.displayName
        const description = data.data.data.description
        const displayIcon = data.data.data.displayIcon
        
        const role = data.data.data.role
        const Role = data.data.data.role.displayName
        const description_role = data.data.data.role.description

        const abilities = data.data.data.abilities
        console.log(abilities)

        const embed_pl = new Discord.MessageEmbed()
            .setColor(`BLUE`)//PL
            .setTitle(`${args[1]}`)
            .setFields(
                { name: `Name`, value: `${displayName}` },
                { name: `description`, value: `${description}` },
                { name: `Role`, value: `${Role}` },
                { name: `Role description`, value: `${description_role}` },
                {name: `abilities`, value: `---------------------`},
                {name: `${abilities[0].displayName}`, value: `${description}`},
                {name: `${abilities[1].displayName}`, value: `${description}`},
                {name: `${abilities[2].displayName}`, value: `${description}`},
                {name: `${abilities[3].displayName}`, value: `${description}`}
            )
            .setImage(displayIcon)
            .setFooter(message.author.tag, message.author.avatarURL({ dynamic: true }));
        return message.channel.send({ embeds: [embed_pl] });


    })
        .catch(err => {
            console.log(err)
        })



}