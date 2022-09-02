const express = require("express");
const app = express()
const { QuickDB } = require("quick.db");

app.set('view engine', 'ejs')

const economy = require("./routes/economy")

app.use('/api/gui/economy', economy)

const port = process.env.PORT || 2137
app.listen(port, () => console.log(`SEEN api Listening on port ${port}`))


//ECONOMY
//http://localhost:2137/api/gui/economy/727662119553728532/438336824516149249