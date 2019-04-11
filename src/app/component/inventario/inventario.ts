import { Component, OnInit } from '@angular/core';
import { Producto } from '../../model/producto';
import { ProductoService } from '../../service/producto/producto.service';

@Component({
    selector: 'inventario',
    templateUrl: './inventario.html',
    styleUrls: ['./inventario.css']
})
export class InventarioComponent implements OnInit {

    productos: Producto[];

    constructor(private _productoService: ProductoService) { }

    ngOnInit() {
        this._productoService.getAllProductos().subscribe(productos => {
            this.productos = productos;
            console.log(productos);
        }, error => console.log(error));
    }

}