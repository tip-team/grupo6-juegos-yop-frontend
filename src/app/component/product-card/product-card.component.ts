import { Component, Input, OnInit } from '@angular/core';
import { Producto } from '../../model/producto';

@Component({
    selector: 'product-card',
    templateUrl: './product-card.component.html',
    styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit{

    @Input() producto: Producto;

    ngOnInit() {
        console.log(this.producto);
    }

}