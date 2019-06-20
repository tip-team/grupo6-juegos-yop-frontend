import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductoService } from 'src/app/service/producto/producto.service';
import { getBase64, resizeBase64 } from 'base64js-es6';
import { EventEmitter } from 'events';
import {
  activeBarButton,
  getPrimaryBarButtonOptions,
  saveImagenPrin,
  saveImagenDesc,
  getValues
} from '../../model/configuration';

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
    this.registerForm = this.formBuilder.group({
      nombre: new FormControl(undefined, [Validators.required]),
      imagen: [''],
      imagenDesc: [''],
      precio: new FormControl(undefined, [Validators.required])
    });
  }

  ngAfterViewInit() {
    const bla: any = document.getElementsByClassName('mat-slide-toggle-content')[0];
    bla.style['font-family'] = 'Fredoka One';
    bla.style.color =  'black';
    bla.style['font-size'] = '15px';
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
