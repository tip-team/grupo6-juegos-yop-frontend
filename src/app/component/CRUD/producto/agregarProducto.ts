import {Component, EventEmitter} from '@angular/core';
import { ProductoService } from '../../../service/producto/producto.service';
import { BsModalRef } from 'ngx-bootstrap';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'agregar-proucto',
  templateUrl: './agregarProducto.html',
  styleUrls: ['./agregarProducto.css']
})
export class AgregarProductoComponent {

  productoForm: FormGroup;
  event: EventEmitter<any> = new EventEmitter();

  constructor(private productoService: ProductoService, private builder: FormBuilder, private bsModalRef: BsModalRef) {
    this.productoForm = this.builder.group({
      nombre: new FormControl(null, []),
      precio: new FormControl('', []),
      imagen: new FormControl('', []),
      habilitado: new FormControl('', [])
    });
  }

  public cerrar() {
    this.bsModalRef.hide();
  }

  public agregarProducto() {
    const producto = {
      'nombre': this.productoForm.get('nombre').value,
      'precio': this.productoForm.get('precio').value,
      'imagen': this.productoForm.get('imagen').value
      // 'habilitado': this.productoForm.get('habilitado').value este campo todavia no existe
    };

    this.productoService.addProducto(producto).subscribe(
      data => this.onSuccess(data),
      error => this.handleError(error));
  }

  private handleError(error: any) {
    this.event.emit('FAILED');
    this.bsModalRef.hide();
    this.reloadPage();
  }

  private onSuccess(data: Object) {
    this.event.emit('OK');
    this.bsModalRef.hide();
    this.reloadPage();
  }

  private reloadPage() {
    window.location.reload();
  }
}

