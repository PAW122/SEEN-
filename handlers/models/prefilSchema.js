const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    //unique: true powoduje że nie może być 2 osób z tym samym id
    userID: {type: String, require: true, unique: true},
    serverID: {type: String, require: true},
    //deafult: 1000 -- po dołączeniu na srv ma się 1000 coinsów
    coins: {type: number, deafult: 1000},
    banl: {type: Number}
})

const model = mongoose.model("ProfileModels", profileSchema);

model.exports = model;