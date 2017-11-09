module.exports = (app) => { 
    var token      = '9575711200';
    const saltRounds = 10;
    // const bcrypt     = require('bcrypt');

    var CryptoMiddleware = {
        token : () => {
		    return token;
        }
    }

    return CryptoMiddleware;
}