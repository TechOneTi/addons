{
    'name': 'TelaCozinhaTechone',
    'version': '1.0',
    'summary': 'Modulo extencao pos_self',
    'descriotion':'modulo para ajudar na venda kiosk',
    'depends': [
        "pos_self_order",
        "point_of_sale",
    ],
    'data': [
        "views/view.xml",
        #"static/src/js/pedidoatt.js"
        # "views/cozinha.xml",
        # "report/report_pedido_cozinha.xml",
        # "data/report_action.xml",
    ],
    'demo': [ ],
     "assets": {
        
    },
    'author': 'Guilherme',
    'installable': True,
    'auto_install': False,
    'license': 'LGPL-3',
}