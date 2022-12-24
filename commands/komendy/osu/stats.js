const Discord = require("discord.js")
module.exports = {
    name: "osu",

    execute:async(message,args,client) => {
        if(args[0] == "help") {
            const embed = new Discord.MessageEmbed()
            .setTitle("Osu help")
            .setFields(
                {name: "make lobby", value: "command: **$osu make_lobby <lobby name> <password>**"}
            )
            return message.reply({embeds: [embed]})
        }

        if(args[0] == "make_lobby") {
            const lobby_name = args[1]
            if(!args[1] || args[1].length > 12) {
                return message.reply("Bad lobby name")
            }
            const lobby_password = args[1]
            if(!lobby_password) {
                var password = null
            }else{
                if(lobby_password.length > 12) return message.reply("to long password \n max 12 characters")
                var password = lobby_password
            }

            main(message,lobby_name,password)
        }
    }
}

async function main(message,lobby_name,password_user) {
    const Banchojs = require("bancho.js") // Replace .. by bancho.js when coding outside of the library
const client = new Banchojs.BanchoClient(require("./config.json"));

const beatmaps = [75, 1262832, 714001, 1378285, 1385398, 1373950];
let currentBeatmapIndex = 0;
let lobby;

client.connect().then(async () => {
	console.log("We're online!");
	const channel = await client.createLobby("Multiplayer rotator "+Math.random().toString(36).substring(8));
	lobby = channel.lobby;
	const password = Math.random().toString(36).substring(8);
	await Promise.all([lobby.setPassword(password), lobby.setMap(beatmaps[currentBeatmapIndex])]);
	console.log("Lobby created! Name: "+lobby.name+", password: "+password);
	console.log("Multiplayer link: https://osu.ppy.sh/mp/"+lobby.id);

	lobby.on("playerJoined", (obj) => {
		if(obj.player.user.isClient())
			lobby.setHost("#"+obj.player.user.id);
	});
	lobby.on("matchFinished", () => {
		currentBeatmapIndex++;
		if(currentBeatmapIndex == beatmaps.length)
			currentBeatmapIndex = 0;
		lobby.setMap(beatmaps[currentBeatmapIndex]);
	});
}).catch(console.error);

process.on("SIGINT", async () => {
	console.log("Closing lobby and disconnecting...");
	await lobby.closeLobby();
	await client.disconnect();
});
}