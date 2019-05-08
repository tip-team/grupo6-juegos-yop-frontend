import { Component, OnInit } from '@angular/core';
import { Producto } from '../../model/producto';
import { ProductoService } from '../../service/producto/producto.service';
import { AgregarProductoComponent } from '../CRUD/producto/agregarProducto';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {EliminarProductoComponent} from '../CRUD/producto/eliminarProducto';

@Component({
  selector: 'admin',
  templateUrl: './admin.html',
  styleUrls: ['./admin.css']
})
export class AdminComponent implements OnInit {

  productos: Producto[];
  bsModalRef: BsModalRef;

  constructor(private productoService: ProductoService, private bsModalService: BsModalService) { }

  ngOnInit() {
    this.obtenerProductos();
  }

  public agregarProducto() {
    this.bsModalRef = this.bsModalService.show(AgregarProductoComponent);
    this.refresh();
  }

  public eliminarProducto(producto: Producto) {
    this.bsModalRef = this.bsModalService.show(EliminarProductoComponent);
    // this.bsModalRef.content.producto = producto; Esto da undefined
    this.bsModalRef.content.idP = producto.id;
    this.bsModalRef.content.nombre = producto.nombre;
    this.refresh();
  }

  private obtenerProductos() {
    this.productoService.getAllProductos().subscribe(productos => {
      this.productos = productos;
      console.log(productos);
    }, error => console.log(error));
  }

  private refresh() {
    this.bsModalRef.content.event.subscribe(result => {
      if (result === 'OK') {
        this.obtenerProductos();
      }
    });
  }

}
