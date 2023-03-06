module.exports = async (client,guildID,channel,messages_limmit) => {
    //limit jednorazowego wczytnia to 100wiadomości
    //ominąć to poprzez pobieranie id ostatniej wiadomości
    //i wczytywanie kolejnych 100 od tej wiadomości
    const guild = client.guilds.cache.get(guildID)
    const all_channels = guild.channels.cache
    const channell = all_channels.get(channel)
    const lastMessageId = channell.lastMessageId

    let messages = Array.from(await channell.messages.fetch({
        limit: messages_limmit,
        before: lastMessageId
    }))

    let data = [];

    console.log(`messages data= ${messages}`)

    messages.forEach(msg => {

        let local_data = [];

        const content = msg[1].content
        const author = msg[1].author
        const author_username = author.username + "#" + author.discriminator
        const author_id = author.id

        local_data.push(content)
        local_data.push(author)
        local_data.push(author_username)
        local_data.push(author_id)

        console.log(`local data return = ${local_data}`)

        data.push(local_data)
    })
    
    console.log(`msg return data= ${data}`)
    return data;
}