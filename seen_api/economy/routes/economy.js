const express = require("express");
const router = express.Router()

router.get('/:guildId/:userId', (req,res) => {
    console.log("user on webside")
    res.render("economy", {
         text: "server name",
        serverId: "someId"})
})


module.exports = router