import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { ProductoService } from '../../service/producto/producto.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { EventEmitter } from 'events';
import { getBase64, resizeBase64 } from 'base64js-es6';
import {
  activeBarButton,
  getPrimaryBarButtonOptions,
  saveImagenPrin,
  saveImagenDesc,
  getValues
} from '../../model/configuration';

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
    this.editForm = this.formBuilder.group({
      nombre: new FormControl(this.producto.nombre, [Validators.required]),
      imagen: [''],
      imagenDesc: [''],
      precio: new FormControl(this.producto.precio, [Validators.required])
    });
  }

  ngAfterViewInit() {
    const setStyle = element => {
      element.style['font-family'] = 'Fredoka One';
      element.style.color =  'black';
      element.style['font-size'] = '15px';
    }

    setStyle(document.getElementsByClassName('mat-slide-toggle-content')[0]);
    setStyle(document.getElementsByTagName('mat-bar-button')[0].getElementsByClassName('mat-button-wrapper')[0]);
  }

  handleSubmit() {
      activeBarButton(this.barButtonOptions, 'Guardando');
      Object.assign(this.producto, getValues(this.editForm, 'precio', 'nombre'));
      this.productoService.updateProducto(this.producto).subscribe(() => {
        modalEditarProductoEvent.emit('editarProducto', this.producto, this.producto.nombre);
        this.modalService.dismissAll('close');
      });
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

}

export { ModalEditarProductoComponent, modalEditarProductoEvent };
