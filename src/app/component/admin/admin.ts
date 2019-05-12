import { Component } from '@angular/core';
// import { Producto } from '../../model/producto';
// import { ProductoService } from '../../service/producto/producto.service';
// import { AgregarProductoComponent } from '../CRUD/producto/agregarProducto';
// import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
// import {EliminarProductoComponent} from '../CRUD/producto/eliminarProducto';
// import {EditarProductoComponent} from '../CRUD/producto/editarProducto';
// import {Pago} from '../../model/pago';
// import {MercadoPagoService} from '../../service/mercado-pago/mercado-pago.service';
// import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'admin',
  templateUrl: './admin.html',
  styleUrls: ['./admin.css']
})
export class AdminComponent {

  // productos: Producto[];
  // pagos: Pago[];
  // bsModalRef: BsModalRef;
  // registerForm: FormGroup;
  // base64textString: string;

  // constructor(private productoService: ProductoService, private bsModalService: BsModalService, private mpService: MercadoPagoService, private formBuilder: FormBuilder) {
  // }

  // ngOnInit() {
  //   this.registerForm = this.formBuilder.group({
  //     nombre: [''],
  //     imagen: [''],
  //     precio: ['']
  //   });
  //   this.obtenerProductos();
  //   this.obtenerPagos();
  // }

  // handleSubmit() {
  //   console.log(this.registerForm.controls.nombre.value);
  //   console.log(this.base64textString);
  //   console.log(this.registerForm.controls.precio.value);
  // }

  // guardarImagen(evento) {
  //   const files = evento.target.files;
  //   const file = files[0];

  //   if (files && file) {
  //     const reader = new FileReader();
  //     reader.onload = this._handleReaderLoaded.bind(this);
  //     reader.readAsBinaryString(file);
  //   }
  // }

  // _handleReaderLoaded(readerEvt) {
  //   const binaryString = readerEvt.target.result;
  //   this.base64textString = 'data:image/png;base64,' + btoa(binaryString);
  // }

  // cambiarHabilitado(evento) {
  //   console.log(evento.checked);
  // }

  // public agregarProducto() {
  //   this.bsModalRef = this.bsModalService.show(AgregarProductoComponent);
  //   this.refresh();
  // }

  // public editarProducto(producto: Producto) {
  //   const initialState = {idProducto: producto.id};
  //   this.bsModalRef = this.bsModalService.show(EditarProductoComponent, {initialState});
  //   this.bsModalRef.content.imagen = producto.imagen;
  //   this.refresh();
  // }
  // public eliminarProducto(producto: Producto) {
  //   this.bsModalRef = this.bsModalService.show(EliminarProductoComponent);
  //   this.bsModalRef.content.idP = producto.id;
  //   this.bsModalRef.content.nombre = producto.nombre;
  //   this.bsModalRef.content.imagen = producto.imagen;
  //   this.refresh();
  // }

  // private obtenerProductos() {
  //   this.productoService.getAllProductos().subscribe(productos => {
  //     this.productos = productos;
  //     console.log(productos);
  //   }, error => console.log(error));
  // }
  // private obtenerPagos() {
  //   this.mpService.getAllPagos().subscribe(pagos => {
  //     this.pagos = pagos;
  //     console.log(pagos);
  //   }, error => console.log(error));
  // }

  // private refresh() {
  //   this.bsModalRef.content.event.subscribe(result => {
  //     if (result === 'OK') {
  //       this.obtenerProductos();
  //       this.obtenerPagos();
  //     }
  //   });
  // }

}
