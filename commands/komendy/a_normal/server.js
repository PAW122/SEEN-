const os = require("os")
const Discord = require("discord.js")

module.exports = {
    name: "server",

    execute: async (message, args, client) => {

        if (args[0] == "help") {
            return message.reply("Bot server stats")
        }

        const cpu_usage = os.cpus()
        const total_mem = os.totalmem()
        const free_mem = os.freemem()

        var total_mem_in_kb = total_mem / 1024;
        var total_mem_in_mb = total_mem_in_kb / 1024;
        var total_mem_in_gb = total_mem_in_mb / 1024;

        var total_free_mem_in_kb = free_mem / 1024;
        var total_free_mem_in_mb = total_free_mem_in_kb / 1024;
        var total_free_mem_in_gb = total_free_mem_in_mb / 1024;

        const used = process.memoryUsage().heapUsed / 1024 / 1024;


        const cores = cpu_usage.length
        const embed = new Discord.MessageEmbed()
            .setTitle("Bot server informations:")
            .setColor("RANDOM")
            .setFields(
                { name: "Processor:", value: `${cpu_usage[0].model}` },
                { name: "Cpu speed:", value: `${cpu_usage[0].speed} Hz` },
                { name: "Cpu Cores:", value: `${cores}` },
                { name: "Bot Memory usage:", value: `${`The script uses approximately ${Math.round(used * 100) / 100} MB`}` },
                { name: "Server Memory usage:", value: `${total_free_mem_in_mb.toFixed(2)} / ${total_mem_in_mb.toFixed(2)} MB` }
            )

        message.channel.send({ embeds: [embed] })
    }
}
