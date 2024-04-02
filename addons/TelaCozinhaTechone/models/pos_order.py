from odoo import models,fields

class PosOrder(models.Model):
    _inherit = "pos.order"

    status_delivery = fields.Selection([('online', 'Online'), ('away', 'Away'), ('offline', 'Offline')], 'IM Status', default='offline')

    Teste=fields.Text(string="teste")
    
    
    def create_from_ui(self, orders):
        result = super(PosOrder, self).create_from_ui(orders)

        for order_id in result['res_ids']:
            self.env['bus.bus'].sendone('pos.sync', {
                'message': 'Novo pedido criado',
                'order_id': order_id
            })
        return result


    def print_order(self):
        # Use o método `sudo` para garantir que temos acesso a todos os registros
        orders = self.env['pos.order'].sudo().search([])

        # Renderize o relatório e retorne o PDF
        report_name = 'TelaCozinhaTechone.report_pedido_cozinha'
        pdf = self.env.ref(report_name).sudo().render_qweb_pdf(orders.ids)

        # Retorne o PDF gerado
        return pdf