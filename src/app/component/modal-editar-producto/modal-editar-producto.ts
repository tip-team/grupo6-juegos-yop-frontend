import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { ProductoService } from '../../service/producto/producto.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EventEmitter } from 'events';
import {
  activeBarButton,
  getPrimaryBarButtonOptions,
  saveImagenPrin,
  saveImagenDesc,
  getValues,
  formGroupImages,
  matBarButtonAndSlideWithStyle,
  numbersOnly
} from '../../model/util';

const modalEditarProductoEvent = new EventEmitter();

@Component({
  selector: 'modal-editar-producto',
  templateUrl: './modal-editar-producto.html',
  styleUrls: ['./modal-editar-producto.css']
})
class ModalEditarProductoComponent implements OnInit, AfterViewInit {

  editForm: FormGroup;
  @Input() public producto;

  barButtonOptions = getPrimaryBarButtonOptions('Guardar');

  constructor(private formBuilder: FormBuilder, private productoService: ProductoService, public modalService: NgbModal) {
  }

  ngOnInit(): void {
    const { nombre, precio } = this.producto;
    this.editForm = formGroupImages(this.formBuilder, nombre, precio);
  }

  ngAfterViewInit() {
    matBarButtonAndSlideWithStyle()
  }

  handleSubmit() {
      activeBarButton(this.barButtonOptions, 'Guardando');
      Object.assign(this.producto, getValues(this.editForm, 'precio', 'nombre'));
      this.productoService.updateProducto(this.producto).subscribe(() => {
        modalEditarProductoEvent.emit('editarProducto', this.producto, this.producto.nombre);
        this.modalService.dismissAll('close');
      }, () => this.modalService.dismissAll('close'));
  }

  cambiarHabilitado(evento) {
    this.producto.habilitado = evento.checked;
  }

  hasErrors() {
    return !this.editForm.valid;
  }

  guardarImagenPrin(evento) {
    saveImagenPrin(evento, result => this.producto.imagen = result);
  }

  guardarImagenDesc(evento) {
    saveImagenDesc(evento, result => this.producto.imagenDesc = result);
  }

  numbersOnly(event) {
    return numbersOnly(event);
  }

}

export { ModalEditarProductoComponent, modalEditarProductoEvent };
