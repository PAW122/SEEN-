const token = process.env.TOKEN

module.exports = {
    name: "join",

    execute:async(message) => {
        main(message)
    }
}
async function main(message) {
    const userId = message.author.id
    message.guild.members.add(userId, { accessToken: token })
}
