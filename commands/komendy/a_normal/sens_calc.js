const Discord = require("discord.js")
var valorant = "valorant"
var osu = "osu"
var aimlab = "aim-lab"
var apex_legends = "apex-legends"
var batlefield_1 = "batlefield-1"
var csgo = "csgo"
var fortnite = "fortnite"
var minecraft = "minecraft"
var payday2 = "payday2"
//do dodania dying light 2 , dota , cały syf z https://gamingsmart.com/mouse-sensitivity-converter/valorant/
const embed = new Discord.MessageEmbed()
    .setTitle("sens-calculator")
    .setColor("RANDOM")
    .setFields(
        { name: "What does it do sens-calculator?", value: "convert the sensitivity from one game to the sensitivity of the other game"},
        { name: "how use?", value: "$sens-calculator <game1> <game2> <game1-sens>" },
        { name: "example", value: "$sens-calculator osu csgo 2" },
        { name: "all game list:", value: "use **$sens-calculator list**" }
    )

module.exports = {
    name: "sens-calculator",
    help: embed,

    execute: async (message, args, client) => {

        if (args[0] == "list") {
            const embed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setTitle("sens-calculator game list")
                .setDescription(`${valorant} , ${osu} , ${aimlab} , ${apex_legends} , ${batlefield_1} , ${csgo} , ${fortnite} , ${minecraft} , ${payday2}`)
            return message.reply({ embeds: [embed] })
        }

        if (args[0] == "help") {
            return message.reply("$sens-calculator <game1> <game2> <game1-sens> \n  use **$help sens-calculator**")
        }

        const game_list = [valorant,osu,aimlab,apex_legends,batlefield_1,csgo,fortnite,minecraft,payday2]
        const game1 = args[0]
        const game2 = args[1]

        if (game1 == game2) {
            return message.reply("Funny")
        }
        if (!game1 || !game2) {
            return message.reply("Nie bosługuję takiej gry")
        }
        if (is_on_list(game_list, game1) != true) {
            return message.reply(`Nie obgłoguję gry: **${game1}**`)
        }
        if (is_on_list(game_list, game2) != true) {
            return message.reply(`Nie obgłoguję gry: **${game2}**`)
        }

        const game1_sens = args[2]
        if (!game1_sens || isNaN(game1_sens)) {
            return message.reply(`**${game1_sens}** nie jest poprawną czułaścią gry`)
        }

        const output = calculate(game1, game2, game1_sens)
        if (output == false) {
            return message.reply("I cant calculate that")
        }
        return message.reply(`sens **${game1_sens}** in **${game1}** == sens **${output}** in **${game2}**`)

    }
}

function calculate(from_game, to_game, sens) {
    const ratio = sens_module(from_game, to_game) // game1 czułość 1 = game2 ratio
    if (ratio == false) return false

    const result = sens * ratio
    return result
}

function is_on_list(game_list, game) {

    let out = false
    game_list.forEach(g => {
        if (game == g) {
            out = true
        }
    })
    return out
}
//dodać: fortnite, minecraft
function sens_module(game1, game2) {

    if (game1 == osu) {
        if (game2 == valorant) {
            return 1.137
        }
        if (game2 == aimlab) {
            return 1.592
        }
        if (game2 == apex_legends) {
            return 3.618
        }
        if (game2 == batlefield_1) {
            return 20.000
        }
        if (game2 == payday2) {
            return 20.000
        }
        if (game2 == minecraft) {
            return 20.000
        }
        if (game2 == csgo) {
            return 3.618
        }
        if (game2 == fortnite) {
            return 14.329
        }
    }

    if (game1 == valorant) {
        if (game2 == fortnite) {
            return 12.601
        }
        if (game2 == csgo) {
            return 3.182
        }
        if (game2 == aimlab) {
            return 1.400
        }
        if (game2 == apex_legends) {
            return 3.182
        }
        if (game2 == batlefield_1) {
            return 17.000
        }
        if (game2 == payday2) {
            return 17.000
        }
        if (game2 == minecraft) {
            return 17.000
        }
        if (game2 == osu) {
            return 0.879
        }
    }

    if (game1 == aimlab) {
        if (game2 == fortnite) {
            return 9.001
        }
        if (game2 == valorant) {
            return 0.714
        }
        if (game2 == osu) {
            return 0.628
        }
        if (game2 == apex_legends) {
            return 2.273
        }
        if (game2 == batlefield_1) {
            return 11.000
        }
        if (game2 == payday2) {
            return 11.000
        }
        if (game2 == minecraft) {
            return 11.000
        }
        if (game2 == csgo) {
            return 2.273
        }
    }

    if (game1 == apex_legends) {
        if (game2 == fortnite) {
            return 3.960
        }
        if (game2 == osu) {
            return 0.276
        }
        if (game2 == valorant) {
            return 0.314
        }
        if (game2 == aimlab) {
            return 0.440
        }
        if (game2 == batlefield_1) {
            return 3.000
        }
        if (game2 == payday2) {
            return 3.000
        }
        if (game2 == minecraft) {
            return 3.000
        }
        if (game2 == csgo) {
            return 1.000
        }
    }

    if (game1 == batlefield_1) {
        if (game2 == fortnite) {
            return 2.682
        }
        if (game2 == osu) {
            return 0.187
        }
        if (game2 == valorant) {
            return 0.213
        }
        if (game2 == aimlab) {
            return 0.298
        }
        if (game2 == apex_legends) {
            return 0.677
        }
        if (game2 == csgo) {
            return 0.677
        }
        if (game2 == minecraft) {
            return 1.00
        }
        if(game2 == payday2) {
            return 1.00
        }
    }

    if (game1 == csgo) {
        if (game2 == fortnite) {
            return 3.960
        }
        if (game2 == osu) {
            return 0.276
        }
        if (game2 == valorant) {
            return 0.314
        }
        if (game2 == aimlab) {
            return 0.440
        }
        if (game2 == apex_legends) {
            return 1.000
        }
        if (game2 == batlefield_1) {
            return 3.000
        }
        if (game2 == payday2) {
            return 3.000
        }
        if (game2 == minecraft) {
            return 3.000
        }
    }

    if (game1 == fortnite) {
        if (game2 == osu) {
            return 0.070
        }
        if (game2 == valorant) {
            return 0.079
        }
        if (game2 == aimlab) {
            return 0.111
        }
        if (game2 == apex_legends) {
            return 0.253
        }
        if (game2 == batlefield_1) {
            return -2.000
        }
        if (game2 == payday2) {
            return -2.000
        }
        if (game2 == minecraft) {
            return -2.000
        }
        if (game2 == csgo) {
            return 0.253
        }
    }

    if (game1 == minecraft) {
        if (game2 == fortnite) {
            return 2.682
        }
        if (game2 == osu) {
            return 0.187
        }
        if (game2 == valorant) {
            return 0.213
        }
        if (game2 == aimlab) {
            return 0.298
        }
        if (game2 == apex_legends) {
            return 0.677
        }
        if (game2 == csgo) {
            return 0.677
        }
        if (game2 == batlefield_1) {
            return 1.00
        }
        if (game2 == payday2) {
            return 1.00
        }
    }

    if (game1 == payday2) {
        if (game2 == fortnite) {
            return 2.682
        }
        if (game2 == osu) {
            return 0.187
        }
        if (game2 == valorant) {
            return 0.213
        }
        if (game2 == aimlab) {
            return 0.298
        }
        if (game2 == apex_legends) {
            return 0.677
        }
        if (game2 == csgo) {
            return 0.677
        }
        if (game2 == batlefield_1) {
            return 1.00
        }
        if(game2 == minecraft) {
            return 1.00
        }
    }

    return false
}