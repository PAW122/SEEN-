const { QuickDB } = require("quick.db");
const db = new QuickDB({ filePath: process.cwd() + `/db/stats/messages.sqlite` });

module.exports = (message) => {
    if (message.author.bot) return;
    let myDate = new Date()
    let day = myDate.getDate() + 1
    let month = myDate.getMonth() + 1
    let year = myDate.getFullYear()
    
   // console.log(`${year}:${month}:${day}`)

    const date_test = parseDate(`${year}:${month}:${day}`)

    save(message, date_test)
}

function parseDate(dateStr) {
    return Date.parse(dateStr.replace(':', '-'));
    //data jest przesunięta o 1h w tył bo odczytywana jest zła strefa czasowa
  }

async function save(message, myDate) {
    const guild_id = message.guild.id
    const db_guilds = new QuickDB({ filePath: process.cwd() + `/db/stats/guilds/${guild_id}.sqlite` });
    //globalne dane

    const user_id = message.author.id
    const data = await db.get(`${user_id}`)

    let all_msg_ts;
    if (data) {
        all_msg_ts = parseInt(data.all_msg) + 1
    } else {
        all_msg_ts = 0
    }
//listy są nadpisywane zamiast dodawać nowych leentów
//soróbowac urzyć coś ala push z biblioteki quick db 
    let mpdl = await db.get(`${user_id}`).msg_per_day_list
    let mdl = await db.get(`${user_id}`).msg_date_list

    if(!mpdl) {
        mpdl = []
    }
    if(!mdl) {
        mdl = []
    }

    //sprawdza czy dzisiajsza data jest na liście
    let mpdl_res = false
    let i = 0
    mdl.forEach(element => {
        if(element == myDate) {
            mpdl_res = true
        }
        i++
    });
    if(mpdl_res != true) {
        mpdl.push(all_msg_ts)
        mdl.push(myDate)
    }


    console.log("mpdl " + mpdl)
    console.log("mdl " + mdl)

    await db.set(`${user_id}`, {
        date: myDate,
        check: true,
        all_msg: all_msg_ts,
        msg_per_day_list: mpdl,
        msg_date_list: mdl
    })

    //dane dla konkretnej gildii
    let user_msg = 0
    const guild_data = await db_guilds.get(`${user_id}.messages`)

    if (!guild_data) {
        await db_guilds.set(`${user_id}.messages`, {
            msg: 1,
            date: myDate
        })
        return
    }

    if (guild_data.msg) {
        user_msg = guild_data.msg
    } else {
        user_msg = 0
    }
    const user_messages = user_msg + 1

    await db_guilds.set(`${user_id}.messages`, {
        msg: user_messages,
        date: myDate
    })

    //console.log("guild " + user_messages + "  " + myDate)
}

//zrobić 2 listy
// jedna ma ilość wiadomości danego dnia
// druga ma datę w postaci rok - mies - day