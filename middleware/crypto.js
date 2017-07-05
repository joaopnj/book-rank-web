module.exports = (app) => { 
    var token      = '9575711200';
    const saltRounds = 10;
    const bcrypt     = require('bcrypt');

    var CryptoMiddleware = {
        token : () => {
		    bcrypt.hash(token, saltRounds, (err, hash) => {
			    return (err) ? console(err) : hash;
			});
        }
    }

    return CryptoMiddleware;
}