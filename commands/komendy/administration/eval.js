/*
komenda przetwarza text z stringa i pozwala
na wykonywanie kodu z poziomu discorda
*/
const config = require("../../../config/config")
const prefix = config.prefix
const owner_id = config.owner_id
module.exports = {
    name: "eval",

    execute: async(message,args,client) => {

        if(message.author.id != owner_id){
            return message.reply("Only bot owner can execute code")
        }
        try{
       const code = eval(message.content.replace(`${prefix}eval`, ""));
       
       

       //jeżeli wykonany kod jest stringiem => wyślij na kanał
       if(typeof code == "string"){
        message.channel.send(code);
       }
    }catch(err){
        return message.channel.send(`You meke mistake, error code:\n ${err}`)
    }
    }
}