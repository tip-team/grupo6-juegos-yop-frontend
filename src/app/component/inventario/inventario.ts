import { Component, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Producto } from '../../model/producto';
import { ProductoService } from '../../service/producto/producto.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
    selector: 'inventario',
    templateUrl: './inventario.html',
    styleUrls: ['./inventario.css']
})
export class InventarioComponent implements AfterViewInit {

    productos: Producto[];
    show: boolean;

    constructor(private _productoService: ProductoService, private spinner: NgxSpinnerService, private cdRef : ChangeDetectorRef) { 
    }

    ngAfterViewInit() {
        this.spinner.show("cargandoProductos");
        this.cdRef.detectChanges();
        this._productoService.getAllProductos().subscribe(productos => {
            this.productos = productos;
            this.spinner.hide("cargandoProductos");
            this.show = true;
        }, error => {
            console.log(error);
            this.spinner.hide("cargandoProductos");
        });
    }

}
