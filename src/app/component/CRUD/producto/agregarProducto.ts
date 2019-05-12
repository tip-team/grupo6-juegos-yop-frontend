import {Component, EventEmitter} from '@angular/core';
import { ProductoService } from '../../../service/producto/producto.service';
import { BsModalRef } from 'ngx-bootstrap';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'agregar-producto-2',
  templateUrl: './agregarProducto-2.html',
  styleUrls: ['./agregarProducto-2.css']
})
export class AgregarProductoComponent {

  productoForm: FormGroup;
  event: EventEmitter<any> = new EventEmitter();
  base64textString: string;

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
      'imagen': this.base64textString
      // 'habilitado': this.productoForm.get('habilitado').value este campo todavia no existe
    };

    // this.productoService.addProducto(producto).subscribe(
    //   data => this.onSuccess(data),
    //   error => this.handleError(error));
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

  public guardarImagen(evt) {
    const files = evt.target.files;
    const file = files[0];

    if (files && file) {
      const reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded(readerEvt) {
    const binaryString = readerEvt.target.result;
    this.base64textString = 'data:image/png;base64,' + btoa(binaryString);
    console.log(btoa(binaryString));
  }
}

