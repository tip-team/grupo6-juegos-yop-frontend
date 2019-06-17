import { Component, Input, OnInit } from '@angular/core';
import { ProductoService } from '../../service/producto/producto.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { EventEmitter } from 'events';
import { getBase64, resizeBase64 } from 'base64js-es6';
import { activeBarButton, getPrimaryBarButtonOptions, saveImagenPrin, saveImagenDesc } from '../../model/configuration';

const modalEditarProductoEvent = new EventEmitter();

@Component({
  selector: 'modal-editar-producto',
  templateUrl: './modal-editar-producto.html',
  styleUrls: ['./modal-editar-producto.css']
})
class ModalEditarProductoComponent implements OnInit {

  editForm: FormGroup;
  imagenPrin: string;
  imagenDesc: string;
  checked: boolean;
  error;
  @Input() public producto;

  barButtonOptions = getPrimaryBarButtonOptions('Guardar');

  constructor(private formBuilder: FormBuilder, private productoService: ProductoService, public modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.checked = this.producto.habilitado;
    this.imagenPrin = this.producto.imagen;
    this.imagenDesc = this.producto.imagenDesc;
    this.editForm = this.formBuilder.group({
      nombre: new FormControl(this.producto.nombre, [Validators.required]),
      imagen: [''],
      imagenDesc: [''],
      precio: new FormControl(this.producto.precio, [Validators.required])
    });
  }

  handleSubmit() {
      activeBarButton(this.barButtonOptions, 'Guardando');
      const producto = {
        id: this.producto.id,
        precio: this.editForm.controls.precio.value,
        imagen: this.imagenPrin,
        imagenDesc: this.imagenDesc,
        nombre: this.editForm.controls.nombre.value,
        habilitado: this.checked
      };
      this.productoService.updateProducto(producto).subscribe(() => {
        modalEditarProductoEvent.emit('editarProducto', producto, this.producto.nombre);
        this.modalService.dismissAll('close');
      });

  }

  cambiarHabilitado(evento) {
    this.checked = evento.checked;
  }

  hasErrors() {
    return this.editForm.controls.nombre.errors || this.editForm.controls.precio.errors;
  }

  guardarImagenPrin(evento) {
    saveImagenPrin(evento, result => this.imagenPrin = result);
  }

  guardarImagenDesc(evento) {
    saveImagenDesc(evento, result => this.imagenDesc = result);
  }

}

export { ModalEditarProductoComponent, modalEditarProductoEvent };
