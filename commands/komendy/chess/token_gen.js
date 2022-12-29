//npm i uuid-token-generator
const TokenGenerator = require('uuid-token-generator');

module.exports = {
    execute:async() => {
         
        const tokgen = new TokenGenerator(256, TokenGenerator.BASE62);
        return tokgen.generate();
        
    }
}