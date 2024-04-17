from odoo import models,fields

class PosOrder(models.Model):
    _inherit = "pos.order"

    status_delivery = fields.Selection([('online', 'Online'), ('away', 'Away'), ('offline', 'Offline')], 'IM Status', default='offline')

    Teste=fields.Text(string="teste")
    
    
