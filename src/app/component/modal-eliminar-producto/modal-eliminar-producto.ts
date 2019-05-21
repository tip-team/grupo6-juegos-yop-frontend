import { Component, Input } from '@angular/core';
import { ProductoService } from '../../service/producto/producto.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {MatProgressButtonOptions} from 'mat-progress-buttons';
import { EventEmitter } from 'events';

const modalEliminarProductoEvent = new EventEmitter();

@Component({
  selector: 'modal-eliminar-producto',
  templateUrl: './modal-eliminar-producto.html',
  styleUrls: ['./modal-eliminar-producto.css']
})
class ModalEliminarProductoComponent {

  barButtonOptions: MatProgressButtonOptions = {
    active: false,
    text: 'Eliminar',
    buttonColor: 'warn',
    barColor: 'primary',
    raised: true,
    stroked: false,
    mode: 'indeterminate',
    value: 0,
    disabled: false,
    fullWidth: false
  };

  @Input() public producto;

  constructor(private productoService: ProductoService, public modalService: NgbModal) {}

  handleSubmit() {
    this.barButtonOptions.active = true;
    this.barButtonOptions.text = 'Eliminando...';
    this.productoService.delProducto(this.producto.id).subscribe(() => {
      modalEliminarProductoEvent.emit('eliminarProducto', this.producto.id, this.producto.nombre);
      this.modalService.dismissAll('close');
    }, error => {
      console.log(error)
      this.modalService.dismissAll('close');
    });
  }
}

export { ModalEliminarProductoComponent, modalEliminarProductoEvent };