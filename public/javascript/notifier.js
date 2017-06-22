const notifier = require('node-notifier');

function initNotification(){
    notifier.notify({
        title: 'Só testando pra ver',
        message: 'Olá, minha primeira notificação',
        icon : 'imagens/Ok.png',
        sound: true,
        wait: true // Wait with callback, until user action is taken against notification 
    }, function (err, response) {
    // Response is response from notification 
    });
}