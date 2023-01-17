const config = require("../../config/config")
const status = config.status

module.exports = {
  name: 'ready', once: true, async execute(client) {
    const statuses = [
      //{ name: 'Spotify', type: 'LISTENING' },
      { name: '$help', type: 'PLAYING', text: "power by PAW", status: status },
      { name: `${client.guilds.cache.size} servers`, type: 'WATCHING', text: "power by PAW", status: status },
      { name: '/help', type: 'WATCHING', text: "power by PAW", status: status },]; setInterval(() => {
        var randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
        client.user.setActivity(randomStatus);
      }, 10000);
  },
}