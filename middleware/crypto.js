module.exports = (app) => { 
    const saltRounds = 10;
    const token      = '9575711200';

    var CryptoMiddleware = {
        token : () => {
		    return token;
        }
    }

    return CryptoMiddleware;
}