import {Component, EventEmitter, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ProductoService} from '../../../service/producto/producto.service';
import {BsModalRef, ModalOptions} from 'ngx-bootstrap';

@Component({
  selector: 'editar-producto',
  templateUrl: './editarProducto.html',
  styleUrls: ['./editarProducto.css']
})
export class EditarProductoComponent {

  postData: any;
  idP: number;
  nombre: string;
  precio: number;
  productoForm: FormGroup;
  base64textString: string;
  event: EventEmitter<any> = new EventEmitter();

  constructor(private productoService: ProductoService, private builder: FormBuilder, private bsModalRef: BsModalRef, private options: ModalOptions) {
    console.log('opciones   ');
    console.log(options.initialState['idProducto']);
    this.idP = options.initialState['idProducto']
    this.productoForm = this.builder.group({
      id: new FormControl(null, []),
      nombre: new FormControl('', []),
      precio: new FormControl('', []),
      imagen: new FormControl('', []),
      habilitado: new FormControl('', [])
    });
    console.log('veo el id a buscar');
    console.log(this.idP);
    this.productoService.getProducto(this.idP).subscribe(data2 => {
      this.postData = data2;

      if (this.productoForm != null && this.postData != null) {
        this.productoForm.controls['id'].setValue(this.postData.id);
        this.productoForm.controls['nombre'].setValue(this.postData.nombre);
        this.productoForm.controls['precio'].setValue(this.postData.precio);
        // this.productoForm.controls['imagen'].setValue(this.postData.imagen);
        this.base64textString = this.postData.imagen;
      }
    }, error => { console.log('Error en la obtencion de datos'); });


  }

  public cerrar() {
    this.bsModalRef.hide();
  }

  public editarProducto() {

    const producto = {
      'id': this.productoForm.get('id').value,
      'nombre': this.productoForm.get('nombre').value,
      'precio': this.productoForm.get('precio').value,
      'imagen': this.base64textString
    };

    this.productoService.updateProducto(producto).subscribe(
      data => this.onSuccess(data),
      error => this.handleError(error));
  }

  private handleError(error: any) {
    this.event.emit('FAILED');
    this.bsModalRef.hide();
    // this.reloadPage();
  }

  private onSuccess(data: Object) {
    this.event.emit('OK');
    this.bsModalRef.hide();
    // this.reloadPage();
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
