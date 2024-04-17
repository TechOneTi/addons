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
            complemento:"",
            rua: "",
            bairro: "",
            numero: "",
            telefone: "",
            name: "",
            isAddressComplete: 0,
        });

        
        this.loadCookie();
    }

    handleTelefoneChange(event){
        this.state.telefone = event.target.value;
        this.updateAddress(); 
        this.updateCookie();
    }
    
    handleNomeChange(event){
        this.state.name = event.target.value;
        this.updateAddress(); 
        this.updateCookie();
    }

    handleRuaChange(event) {
        this.state.rua = event.target.value;
        this.updateAddress(); 
        this.updateCookie();
    }
    
    handleNumeroChange(event) {
        this.state.numero = event.target.value;
        this.updateAddress(); 
        this.updateCookie();
    }
    
    handleBairroChange(event) {
        this.state.bairro = event.target.value;
        this.updateAddress(); 
        this.updateCookie();
    }

    updateAddress() {
        if (this.state.telefone && this.state.name && this.state.rua && this.state.numero && this.state.bairro) {
            this.state.address = 'Nome: ' + this.state.name + ', Telefone: ' + this.state.telefone +  ', Rua: ' + this.state.rua + ', N°: ' + this.state.numero + ', Bairro: ' + this.state.bairro;
            this.state.isAddressComplete = 1;
        } else {
            this.state.address = "";
            this.state.isAddressComplete = 0;
        }

    }
    
    handleComplementoChange(event){
        this.state.address += ' (Obs: '+event.target.value+')';
        this.updateCookie(); 
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
        } else if (event.target.value == 'Credit') {   
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

    
    loadCookie() {
        const name = localStorage.getItem("costumerName");
        if (name) {
            this.state.name = name;
        }
        const rua = localStorage.getItem("costumerStreet");
        if (rua) {
            this.state.rua = rua;
        }
        const bairro = localStorage.getItem("costumerDistrict");
        if (bairro) {
            this.state.bairro = bairro;
        }
        const telefone = localStorage.getItem("costumerTelephone");
        if (telefone) {
            this.state.telefone = telefone;
        }
        
            

        const numero = localStorage.getItem("costumerNumber");
        if (numero) {
            this.state.numero = numero;
        }
        
        if (this.state.telefone && this.state.name && this.state.rua && this.state.numero && this.state.bairro) {
            this.state.address = 'Nome: ' + this.state.name + ', Telefone: ' + this.state.telefone +  ', Rua: ' + this.state.rua + ', N°: ' + this.state.numero + ', Bairro: ' + this.state.bairro;
            this.state.isAddressComplete = 1;
        } else {
            this.state.address = "";
            this.state.isAddressComplete = 0;
        }

    }

    
    updateCookie() {
        
        localStorage.setItem("costumerNumber", this.state.numero);
        localStorage.setItem("costumerName", this.state.name);
        localStorage.setItem("costumerStreet", this.state.rua);
        localStorage.setItem("costumerDistrict", this.state.bairro);
        localStorage.setItem("costumerTelephone", this.state.telefone);
        
    }
}