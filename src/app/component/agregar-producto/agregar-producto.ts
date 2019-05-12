import { Component } from '@angular/core';
import { ProductoService } from 'src/app/service/producto/producto.service';

@Component({
  selector: 'agregar-producto',
  templateUrl: './agregar-producto.html',
  styleUrls: ['./agregar-producto.css']
})
export class AgregarProductoComponent {

    productos;

    constructor(private productoService: ProductoService) {}

    ngOnInit() {
        this.productoService.getAllProductos().subscribe(productosResponse => this.productos = productosResponse, error => console.log(error));
    }

}