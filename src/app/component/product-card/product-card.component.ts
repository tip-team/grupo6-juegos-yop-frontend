import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Producto } from '../../model/producto';
import { MercadoPagoService } from '../../service/mercado-pago/mercado-pago.service';

@Component({
    selector: 'product-card',
    templateUrl: './product-card.component.html',
    styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {

    @Input() producto: Producto;
    @Output() mercadoPagoEvento = new EventEmitter<boolean>();

}