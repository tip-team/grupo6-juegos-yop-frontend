import { Component, Input, OnInit } from '@angular/core';
import { ProductoService } from '../../service/producto/producto.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { EventEmitter } from 'events';
import { getBase64, resizeBase64 } from 'base64js-es6';

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

  barButtonOptions: MatProgressButtonOptions = {
    active: false,
    text: 'Guardar',
    buttonColor: 'primary',
    barColor: 'primary',
    raised: true,
    stroked: false,
    mode: 'indeterminate',
    value: 0,
    disabled: false,
    fullWidth: false
  };

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
    if (this.hasErrors()) {
      const date = new Date();
      const error = this.getErrorMessage();
      this.error = { error, date: date };
      setTimeout(() => {
        if (this.error && this.error.date === date) this.error = undefined;
      }, 4000);
    } else {
      this.barButtonOptions.active = true;
      this.barButtonOptions.text = 'Guardando...';
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
      }, httpError => {
        if (httpError.status === 400) {
          const error = httpError.error.message;
          const date = new Date();
          this.error = { error: error, date: date };
          setTimeout(() => {
            if (this.error && this.error.date === date) this.error = undefined;
          }, 4000);
        } else {
          console.log(httpError);
        }
        this.barButtonOptions.text = 'Guardar';
        this.barButtonOptions.active = false;
      });
    }
  }

  cambiarHabilitado(evento) {
    this.checked = evento.checked;
  }

  getErrorMessage() {
    if (this.editForm.controls.nombre.errors) return 'Para editar un producto debe ingresar un nombre.';
    if (this.editForm.controls.precio.errors) return 'Para editar un producto debe ingresar un precio.';
  }

  hasErrors() {
    return this.editForm.controls.nombre.errors || this.editForm.controls.precio.errors;
  }

  guardarImagenPrin(evento) {
    console.log('entro al editar imagen ');
    const { files } = evento.target;
    getBase64(files[0]).then((response) => {
      resizeBase64(response, 361, 158).then((result) => {
        this.imagenPrin = result;
      });
    });
  }

  guardarImagenDesc(evento) {
    const { files } = evento.target;
    getBase64(files[0]).then((response) => {
      // resizeBase64(response, 722, 316).then((result) => { this.imagenDesc = result; });
      this.imagenDesc = response;
    });
  }

}

export { ModalEditarProductoComponent, modalEditarProductoEvent };
