import { Component, Input } from '@angular/core';
import { Producto } from '../../model/producto';

@Component({
    selector: 'product-card',
    templateUrl: './product-card.component.html',
    styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
    @Input() producto: Producto;
}
