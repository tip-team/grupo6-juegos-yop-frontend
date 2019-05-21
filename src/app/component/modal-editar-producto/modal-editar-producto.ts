import {Component, Input, OnInit} from '@angular/core';
import { ProductoService } from '../../service/producto/producto.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';
import {MatProgressButtonOptions} from 'mat-progress-buttons';
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
  base64textString: string;
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

  handleSubmit() {
    this.barButtonOptions.active = true;
    this.barButtonOptions.text = 'Guardando...';
    const producto = {
      id: this.producto.id,
      precio: this.editForm.controls.precio.value,
      imagen: this.base64textString,
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
      }
      else {
        console.log(httpError);
      }
      this.barButtonOptions.text = 'Guardar';
      this.barButtonOptions.active = false;
    });
  }

  guardarImagen(evento) {
    const files = evento.target.files;
    getBase64(files[0]).then((response) => {
      resizeBase64(response, 361, 158).then((result) => {
        this.base64textString = result;
      });
    });
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

export { ModalEditarProductoComponent, modalEditarProductoEvent };