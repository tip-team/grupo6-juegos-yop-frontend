import { Component, Input } from '@angular/core';
import { Producto } from '../../model/producto';
import { MercadoPagoService } from '../../service/mercado-pago/mercado-pago.service';

@Component({
    selector: 'product-card',
    templateUrl: './product-card.html',
    styleUrls: ['./product-card.css']
})
export class ProductCardComponent {

    @Input() producto: Producto;

    constructor(private _mercadoPagoService: MercadoPagoService) { }

    sendToMercadoPago() {
        this._mercadoPagoService.getUrlPago(this.producto.id).subscribe(response => {
            window.open(response.urlPago);
        }, error => {
            console.log(error);
        });
    }

}