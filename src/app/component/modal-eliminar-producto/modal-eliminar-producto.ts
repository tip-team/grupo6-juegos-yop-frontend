import { Component, Input, AfterViewInit } from '@angular/core';
import { ProductoService } from '../../service/producto/producto.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EventEmitter } from 'events';
import { activeBarButton, getWarnBarButtonOptions, matBarButtonWithStyle } from '../../model/util';

const modalEliminarProductoEvent = new EventEmitter();

@Component({
  selector: 'modal-eliminar-producto',
  templateUrl: './modal-eliminar-producto.html',
  styleUrls: ['./modal-eliminar-producto.css']
})
class ModalEliminarProductoComponent implements AfterViewInit {

  barButtonOptions = getWarnBarButtonOptions('Eliminar');

  @Input() public producto;

  constructor(private productoService: ProductoService, public modalService: NgbModal) {}

  ngAfterViewInit() {
    matBarButtonWithStyle();
  }

  handleSubmit() {
    activeBarButton(this.barButtonOptions, 'Eliminando');
    this.productoService.delProducto(this.producto.id).subscribe(() => {
      const { id, nombre } = this.producto;
      modalEliminarProductoEvent.emit('eliminarProducto', id, nombre);
      this.modalService.dismissAll('close');
    });
  }
}

export { ModalEliminarProductoComponent, modalEliminarProductoEvent };
