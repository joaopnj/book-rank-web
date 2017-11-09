module.exports = (app) => {
    const token      = '9575711200';

    var CryptoMiddleware = {
        token : () => {
		    return token;
        }
    }

    return CryptoMiddleware;
}