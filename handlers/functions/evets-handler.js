module.exports = (client,eventFiles) => {
   // client.handlerevents = async (eventFiles, path) => {
        
        for (const file of eventFiles) {
            const event = require(`../events/${file}`);
            if (event.once) {
                client.once(event.name, (...args) => event.execute(...args, client));
            } else {
                console.log(file)
                client.on(event.name, (...args) => event.execute(...args, client));
            }
        }
   // };
}