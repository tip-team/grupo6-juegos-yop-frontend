import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductoService } from 'src/app/service/producto/producto.service';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { getBase64, resizeBase64 } from 'base64js-es6';
import { EventEmitter } from 'events';

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

  barButtonOptions: MatProgressButtonOptions = {
    active: false,
    text: 'Agregar',
    buttonColor: 'primary',
    barColor: 'primary',
    raised: true,
    stroked: false,
    mode: 'indeterminate',
    value: 0,
    disabled: false,
    fullWidth: false
  };

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
        this.barButtonOptions.text = 'Agregar';
        this.barButtonOptions.active = false;
      });
    }
  }

  cambiarHabilitado(evento) {
    this.checked = evento.checked;
  }

  getErrorMessage() {
    if (!this.imagenPrin) return 'Para crear un producto debe ingresar una imágen.';
    if (!this.imagenDesc) return 'Para crear un producto debe ingresar una imágen.';
    if (this.registerForm.controls.nombre.errors) return 'Para crear un producto debe ingresar un nombre.';
    if (this.registerForm.controls.precio.errors) return 'Para crear un producto debe ingresar un precio.';
  }

  hasErrors() {
    return this.registerForm.controls.nombre.errors || this.registerForm.controls.precio.errors || (!this.imagenPrin) || (!this.imagenDesc);
  }

  guardarImagenPrin(evento) {
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
      resizeBase64(response, 722, 316).then((result) => {
        this.imagenDesc = result;
      });
    });
  }

}

export { ModalAgregarProductoComponent, modalAgregarProductoEvent };
