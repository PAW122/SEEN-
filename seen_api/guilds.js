module.exports = (client) => {


    function main() {
        let data = [];
        let guilds = client.guilds.cache
        guilds.forEach(element => {
            data.push(element)
        });
        return data;
    }

    return main();
}