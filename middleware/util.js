module.exports = () => {


    Util = {
        // Método que cria objeto data a partir de uma string data, e uma string hora passadas por parametro.
        criaData : (data, hora) => {
            if(!data || !hora) { return console.log('Data/Hora vazias'); } 
            ano   = data.substring(6);
            mes   = data.substring(3,5);
            dia   = data.substring(0,2);
            horas = hora.substring(0,2);
            min   = hora.substring(2);
            return new Date(ano+"-"+mes+"-"+dia+"T"+horas+min);
        }
    }

    return Util;
}