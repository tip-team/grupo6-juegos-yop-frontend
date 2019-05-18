import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductoService } from 'src/app/service/producto/producto.service';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { getBase64, resizeBase64 } from 'base64js-es6';

@Component({
  selector: 'modal-agregar-producto',
  templateUrl: './modal-agregar-producto.html',
  styleUrls: ['./modal-agregar-producto.css']
})
export class ModalAgregarProductoComponent implements OnInit {

  registerForm: FormGroup;
  base64textString: string;
  checked: boolean;

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
      nombre: [''],
      imagen: [''],
      precio: ['']
    });
    this.base64textString = null;
  }

  handleSubmit() {
    this.barButtonOptions.active = true;
    this.barButtonOptions.text = 'Guardando...';
    this.productoService.addProducto({
      precio: this.registerForm.controls.precio.value,
      imagen: this.base64textString,
      nombre: this.registerForm.controls.nombre.value,
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
    getBase64(files[0]).then((response) => {
        resizeBase64(response, 361, 158).then((result) => {
            this.base64textString = result;
        });
    });
  }

  cambiarHabilitado(evento) {
    this.checked = evento.checked;
  }

}
