/** @odoo-module */

import { Component, useState } from "@odoo/owl";
import { useSelfOrder } from "@pos_self_order/app/self_order_service";
import { useService } from "@web/core/utils/hooks";

export class StandNumberPage extends Component {
    static template = "pos_self_order.StandNumberPage";

    setup() {
        this.selfOrder = useSelfOrder();
        this.selfOrder.isOrder();
        this.router = useService("router");
        this.state = useState({
            standNumber: "25",
            address:"",
            obs:"",
        });
    }
    handleAddressChange(event){
        this.state.address += event.target.value;
    }
    handleRuaChange(event){
        this.state.address += ', Rua:'+event.target.value;
    }
    handleNumeroChange(event){
        this.state.address += ', N° '+event.target.value;
    }
    handleBairroChange(event){
        this.state.address += ' Bairro: '+event.target.value;
    }
    handleComplementoChange(event){
        this.state.address += ' (Obs: '+event.target.value+')';
    }

    handleCheckboxChange(event) {
        const campo = document.getElementById('troco');
        const obs = document.getElementById('obs');
        if (event.target.value == 'debit') {   
            this.state.obs = "";
            this.state.obs += 'Cartão debito, Observação do pedido: '+obs.value;
            console.log("CREDITO");
        } else if (event.target.value == 'money') {
            this.state.obs = "";
            this.state.obs += 'Dinheiro, Troco: (' + campo.value + ') '+obs.value;
            console.log("DEBITO");
            
        }
        else if (event.target.value == 'Credit') {   
            this.state.obs = "";
            this.state.obs += 'Cartão de credito, Observação do pedido: '+obs.value;
            console.log("CREDITO");
        }
    }
    handleTrocoChange(event){
        this.state.obs += ' Troco: ('+event.target.value+')';
    }
    handleObsChange(event){
        this.state.obs += 'Observação do pedido: '+event.target.value;
    }
    confirm() {
        if (this.state.standNumber.length > 0) {
            this.selfOrder.currentOrder.table_stand_number = this.state.standNumber;
            this.selfOrder.currentOrder.address = this.state.address;
            this.selfOrder.currentOrder.obs= this.state.obs;
            this.selfOrder.confirmOrder();
        }
    }
}
