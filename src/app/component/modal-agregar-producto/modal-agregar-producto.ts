import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductoService } from 'src/app/service/producto/producto.service';
import { EventEmitter } from 'events';
import {
  activeBarButton,
  getPrimaryBarButtonOptions,
  saveImagenPrin,
  saveImagenDesc,
  getValues,
  formGroupImages,
  matBarButtonAndSlideWithStyle
} from '../../model/util';

const modalAgregarProductoEvent = new EventEmitter();

@Component({
  selector: 'modal-agregar-producto',
  templateUrl: './modal-agregar-producto.html',
  styleUrls: ['./modal-agregar-producto.css']
})
class ModalAgregarProductoComponent implements OnInit, AfterViewInit {

  registerForm: FormGroup;
  producto;
  barButtonOptions = getPrimaryBarButtonOptions('Agregar');

  constructor(private formBuilder: FormBuilder, public modalService: NgbModal, private productoService: ProductoService) {
  }

  ngOnInit() {
    this.producto = {};
    this.producto.habilitado = true;
    this.registerForm = formGroupImages(this.formBuilder, undefined, undefined);
  }

  ngAfterViewInit() {
    matBarButtonAndSlideWithStyle();
  }

  handleSubmit() {
    activeBarButton(this.barButtonOptions, 'Guardando');
    Object.assign(this.producto, getValues(this.registerForm, 'precio', 'nombre'));
    this.productoService.addProducto(this.producto).subscribe(({id}) => {
      this.producto.id = id;
      modalAgregarProductoEvent.emit('agregarProducto', this.producto);
      this.modalService.dismissAll('close');
    });
  }

  cambiarHabilitado(evento) {
    this.producto.habilitado = evento.checked;
  }

  hasErrors() {
    return !this.registerForm.valid || (!this.producto.imagen) || (!this.producto.imagenDesc);
  }

  guardarImagenPrin(evento) {
    saveImagenPrin(evento, result => this.producto.imagen = result);
  }

  guardarImagenDesc(evento) {
    saveImagenDesc(evento, result => this.producto.imagenDesc = result);
  }

}

export { ModalAgregarProductoComponent, modalAgregarProductoEvent };
