module.exports = (client) => {
    function main() {
        let i = 0;
        const guilds = client.guilds.cache
        guilds.forEach(element => {
            i++
        });
        return i;
    }
    return main()
}