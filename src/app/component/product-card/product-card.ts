import { Component, Input } from '@angular/core';

@Component({
    selector: 'product-card',
    templateUrl: './product-card.html',
    styleUrls: ['./product-card.css']
})
export class ProductCardComponent {

    @Input() srcImage: string;
    @Input() description: string;
    @Input() mercadoPagoURL: string;

    sendToMercadoPago() {
        window.open(this.mercadoPagoURL, '_blank');
    }

}