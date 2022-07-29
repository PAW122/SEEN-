const config = require(process.cwd() + `/config/config.js`)
const mongodb = process.env.MONGO
const mongoose = require("mongoose")
module.exports = () => {

    mongoose.connect(`${mongodb}`,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        //useFindAndModify: false,
    }).then(
        console.log("Połączono z mongo db")
    )
}
