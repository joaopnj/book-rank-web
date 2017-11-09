module.exports = () => {


    Util = {
        criaData : (data, hora) => {
            ano   = data.substring(6);
            mes   = data.substring(3,5);
            dia   = data.substring(0,2);
            horas = hora.substring(0,2);
            min   = hora.substring(2);
            return new Date(ano+"-"+mes+"-"+dia+"T"+horas+":"+min);
        }
    }

    return Util;
}