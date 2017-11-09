module.exports = (app) => {
    const token      = '9575711200';

    var CryptoMiddleware = {
        // Método que retorna o TOKEN da API.
        token : () => {
		    return token;
        }
    }

    return CryptoMiddleware;
}