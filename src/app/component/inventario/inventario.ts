import { Component, OnInit } from '@angular/core';
import { Producto } from '../../model/producto';
import { ProductoService } from '../../service/producto/producto.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
    selector: 'inventario',
    templateUrl: './inventario.html',
    styleUrls: ['./inventario.css']
})
export class InventarioComponent implements OnInit {

    productos: Producto[];

    constructor(private _productoService: ProductoService, private _spinner: NgxSpinnerService) { }

    ngOnInit() {
        this._productoService.getAllProductos().subscribe(productos => {
            this.productos = productos;
        }, error => console.log(error));
    }

    setSpinnerState(spinnerState: boolean) {
        if (spinnerState) {
            this._spinner.show();
        } else {
            this._spinner.hide();
        }
    }

}
