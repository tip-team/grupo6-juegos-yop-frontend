import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/service/producto.service';

@Component({
    selector: 'inventario',
    templateUrl: './inventario.html',
    styleUrls: ['./inventario.css']
})
export class InventarioComponent implements OnInit {

    constructor(private _productoService: ProductoService) { }

    ngOnInit() {
        this._productoService.getAllProductos().subscribe(productos => console.log(productos), error => console.log(error));
    }

}