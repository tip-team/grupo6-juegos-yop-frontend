import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Producto } from '../../model/producto';
import { MercadoPagoService } from '../../service/mercado-pago/mercado-pago.service';

@Component({
    selector: 'product-card',
    templateUrl: './product-card.html',
    styleUrls: ['./product-card.css']
})
export class ProductCardComponent {

    @Input() producto: Producto;
    @Output() mercadoPagoEvento = new EventEmitter<boolean>();

    constructor(private _mercadoPagoService: MercadoPagoService) { }

    sendToMercadoPago() {
        this.mercadoPagoEvento.next(true);
        this._mercadoPagoService.getUrlPago(this.producto.id).subscribe(response => {
            this.mercadoPagoEvento.next(false);
            window.open(response.urlPago);
        }, error => {
            this.mercadoPagoEvento.next(false);
            console.log(error);
        });
    }

}