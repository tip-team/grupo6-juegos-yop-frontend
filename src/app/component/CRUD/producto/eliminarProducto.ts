import {Component, EventEmitter} from '@angular/core';
import {Producto} from '../../../model/producto';
import {ProductoService} from '../../../service/producto/producto.service';
import {BsModalRef} from 'ngx-bootstrap';

@Component({
  selector: 'eliminarProducto',
  templateUrl: './eliminarProducto.html',
  styleUrls: ['./eliminarProducto.css']
})
export class EliminarProductoComponent {

  idP: number;
  nombre: string;
  producto: Producto;
  event: EventEmitter<any> = new EventEmitter();

  constructor(private productoService: ProductoService, private bsModalRef: BsModalRef) { }

  public borrarProducto(id: number) {
    console.log('quiero borrar ' + id);

    this.productoService.delProducto(id).subscribe(
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

  public cerrar() {
    this.bsModalRef.hide();
  }
}
