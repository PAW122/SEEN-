document.getElementById("myButton").onclick = function () {
    document.getElementById("text").innerHTML = "<b>New Text<b/>";
}

document.getElementById("loader").onclick = function () {
    loader()
}

async function loader() {
    const { QuickDB } = require("quick.db")
    const db = new QuickDB({ filePath: process.cwd() + `/db/runtime/data.sqlite` });
    console.log("Loader triger")

    let status = await db.get("run_status")
    document.getElementById("status").innerHTML = `<b> Bot Online Status: ${status} <b/>`;
}
