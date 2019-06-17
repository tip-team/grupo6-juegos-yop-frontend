import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductoService } from 'src/app/service/producto/producto.service';
import { getBase64, resizeBase64 } from 'base64js-es6';
import { EventEmitter } from 'events';
import { activeBarButton, getPrimaryBarButtonOptions, saveImagenPrin, saveImagenDesc } from '../../model/configuration';

const modalAgregarProductoEvent = new EventEmitter();

@Component({
  selector: 'modal-agregar-producto',
  templateUrl: './modal-agregar-producto.html',
  styleUrls: ['./modal-agregar-producto.css']
})
class ModalAgregarProductoComponent implements OnInit {

  registerForm: FormGroup;
  imagenPrin: string;
  imagenDesc: string;
  checked: boolean;
  error;

  barButtonOptions = getPrimaryBarButtonOptions('Agregar');

  constructor(private formBuilder: FormBuilder, public modalService: NgbModal, private productoService: ProductoService) {
  }

  ngOnInit() {
    this.checked = true;
    this.registerForm = this.formBuilder.group({
      nombre: new FormControl(undefined, [Validators.required]),
      imagen: [''],
      imagenDesc: [''],
      precio: new FormControl(undefined, [Validators.required])
    });
    this.imagenPrin = null;
    this.imagenDesc = null;
  }

  handleSubmit() {
    activeBarButton(this.barButtonOptions, 'Guardando');
    const { precio: { value: precioValue }, nombre: { value: nombreValue } } = this.registerForm.controls;
    const producto: any = {
      precio: precioValue,
      imagen: this.imagenPrin,
      imagenDesc: this.imagenDesc,
      nombre: nombreValue,
      habilitado: this.checked
    };
    this.productoService.addProducto(producto).subscribe(productoResponse => {
      producto.id = productoResponse.id;
      modalAgregarProductoEvent.emit('agregarProducto', producto);
      this.modalService.dismissAll('close');
    });

  }

  cambiarHabilitado(evento) {
    this.checked = evento.checked;
  }

  hasErrors() {
    return this.registerForm.controls.nombre.errors || this.registerForm.controls.precio.errors || (!this.imagenPrin) || (!this.imagenDesc);
  }

  guardarImagenPrin(evento) {
    saveImagenPrin(evento, result => this.imagenPrin = result);
  }

  guardarImagenDesc(evento) {
    saveImagenDesc(evento, result => this.imagenDesc = result);
  }

}

export { ModalAgregarProductoComponent, modalAgregarProductoEvent };
