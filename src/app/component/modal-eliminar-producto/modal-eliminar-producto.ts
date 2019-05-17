import { Component, Input } from '@angular/core';
import { ProductoService } from '../../service/producto/producto.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'modal-eliminar-producto',
  templateUrl: './modal-eliminar-producto.html',
  styleUrls: ['./modal-eliminar-producto.css']
})
export class ModalEliminarProductoComponent {

  @Input() public producto;

  constructor(private productoService: ProductoService, public modalService: NgbModal) {}

  handleSubmit() {
    this.productoService.delProducto(this.producto.id).subscribe(() => {
      this.modalService.dismissAll('close');
    }, error => {
      console.log(error)
      this.modalService.dismissAll('close');
    });
  }
}
