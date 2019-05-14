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

  constructor(private productoService: ProductoService, private modalService: NgbModal) {}

  handleSubmit() {
    console.log('Voy a eliminar ');
    console.log(this.producto.id);
    this.productoService.delProducto(this.producto.id).subscribe(() => {
      console.log('OK');
      this.modalService.dismissAll('close');
    }, error => {
      console.log(error)
      this.modalService.dismissAll('close');
    });
  }
}