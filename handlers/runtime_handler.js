const { QuickDB } = require("quick.db");

module.exports = {
    execute:async(action,data) => {
        const db = new QuickDB({ filePath: process.cwd() + `/db/runtime/data.sqlite` });
        

        if(action == "online") {
            await db.set("run_status", data)
        }
    }
}