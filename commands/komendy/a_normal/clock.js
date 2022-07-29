const config = require(process.cwd() + `/config/worker.js`)
      const work = config.clock_disable
      const worker = config.clock_work
      const reason = config.clock_disable

module.exports = {
    name: "clock",
    description: "Clock command.",
    work: worker,//nie dodaje /commands bo komenda nie działa poprawnie

  
    execute: async(message, args) => {

      
      if(work != true){return message.channel.send(reason)}
    
      const { channel, guild, client } = message
  
      const time = new Date().toLocaleTimeString().slice(0, 5)
      const channelName = `🕥 ${time}`
  
      const createdChannel = await guild.channels.create(channelName, {
        type: "Voice",
      })
  
      if (createdChannel) {
        const channelId = createdChannel.id
  
        const { settings } = client
        // Save channel id to config
        if (!settings.get(guild.id)) {
          settings.set(guild.id, { clocks: [] })
        }
        //client.settings.get(guild.id).clocks.push(channelId)
        //client.saveConfig(guild.id)
      }
    },
  }