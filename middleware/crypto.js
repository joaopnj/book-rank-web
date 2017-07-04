module.exports = (app) => { 
    const token      = '9575711200';
    const saltRounds = 10;
    const bcrypt     = require('bcrypt');

    var CryptoMiddleware = {
        token : () => {
		    bcrypt.hash(token, saltRounds, (err, hash) => {
                console.log("Hash token: "+hash);
                console.log("Token: "+token);
				    return (err) ? console(err) : hash;
			});
        }
    }

    return CryptoMiddleware;
}