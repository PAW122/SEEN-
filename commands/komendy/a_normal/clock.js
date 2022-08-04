const config = require(process.cwd() + `/config/worker.js`)
      const work = config.clock_disable
      const worker = config.clock_work
      const reason = config.clock_disable

      const { QuickDB } = require("quick.db");
module.exports = {
    name: "clock",
    description: "Clock command.",
    work: worker,//nie dodaje /commands bo komenda nie działa poprawnie

  
    execute: async(message, args) => {
              //load server settings
const guildId = message.guild.id
const db = new QuickDB({ filePath: process.cwd() + `/db/srv_settings/commands/${guildId}.sqlite` });
if(await db.get(`check.check`) == true){
    const settings = await db.get(`clock.worker`)
    const settings_reason = await db.get(`clock.reason`)
    if(settings != true){return message.channel.send(settings_reason)}
}

      
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