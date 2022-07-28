module.exports = {
    name: 'ready', once: true, async execute(client) {
        console.log('Bot jest online');
        /*  const statuses = [{ name: 'Spotify', type: 'LISTENING' },
          { name: 'CoinLabiryntCollect', type: 'PLAYING' },
          { name: `${client.guilds.cache.size} serwery`, type: 'WATCHING' },
          { name: 'komendy', type: 'WATCHING' },]; setInterval(() => {
              var randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
              client.user.setActivity(randomStatus);
          }, 10000);*/
        
    },
}