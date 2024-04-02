odoo.define('TelaCozinhaTechone.pedidoatt', function (require) {
    "use strict";

    var bus = require('bus.BusService');

    bus.on('notification', this, function (notifications) {
        notifications.forEach(function (notification) {
            if (notification[0][1].message === 'Novo pedido criado') {
                // Atualizar a página
                window.location.reload();
            }
        });
    });
});
