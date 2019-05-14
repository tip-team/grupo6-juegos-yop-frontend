import {Component, Input, OnInit} from '@angular/core';
import { ProductoService } from '../../service/producto/producto.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'modal-editar-producto',
  templateUrl: './modal-editar-producto.html',
  styleUrls: ['./modal-editar-producto.css']
})
export class ModalEditarProductoComponent implements OnInit {

  editForm: FormGroup;
  base64textString: string;
  checked: boolean;
  @Input() public producto;

  constructor(private formBuilder: FormBuilder, private productoService: ProductoService, private modalService: NgbModal) {
  }

  handleSubmit() {
    this.productoService.updateProducto({
      id: this.producto.id,
      precio: this.editForm.controls.precio.value,
      imagen: this.base64textString,
      nombre: this.editForm.controls.nombre.value,
      habilitado: this.checked
    }).subscribe(() => {
      this.modalService.dismissAll('close');
    }, error => {
      console.log(error)
      this.modalService.dismissAll('close');
    });
  }

  guardarImagen(evento) {
    const files = evento.target.files;
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
  }

  cambiarHabilitado(evento) {
    this.checked = evento.checked;
  }
  ngOnInit(): void {
    this.checked = this.producto.habilitado;
    this.base64textString = this.producto.imagen;
    this.editForm = this.formBuilder.group({
      nombre: this.producto.nombre,
      imagen: [''],
      precio: this.producto.precio
    });
  }
}
