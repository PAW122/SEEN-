const { QuickDB } = require("quick.db");
module.exports = (guildId, userid) => {
    async function main() {
        const path = require('path');
        const dbPath = path.join(__dirname, '..', 'db', 'economy', 'local_economy', `${guildId}.sqlite`);
        const db = new QuickDB({ filePath: dbPath });

        const data = await db.get(`${userid}`);
        const coins = data.coins
        const items = data.eq
        const roll_usage = data.roll_usage
        const weekly = data.weekly
        const birthday = data.birthday
        const birthday_changes = data.birthday_changes

        return {
            coins,
            items,
            roll_usage,
            weekly,
            birthday,
            birthday_changes
        }

    }

    return main()
}