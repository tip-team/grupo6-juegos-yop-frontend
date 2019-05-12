import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductoService } from 'src/app/service/producto/producto.service';

@Component({
  selector: 'modal-agregar-producto',
  templateUrl: './modal-agregar-producto.html',
  styleUrls: ['./modal-agregar-producto.css']
})
export class ModalAgregarProductoComponent implements OnInit {

  registerForm: FormGroup;
  base64textString: string;
  checked: boolean;

  constructor(private formBuilder: FormBuilder, private modalService: NgbModal, private productoService: ProductoService) {
  }

  ngOnInit() {
    this.checked = true;
    this.registerForm = this.formBuilder.group({
      nombre: [''],
      imagen: [''],
      precio: ['']
    });
  }

  open(content) {
    this.checked = true;
    this.registerForm = this.formBuilder.group({
        nombre: [''],
        imagen: [''],
        precio: ['']
      });
      this.base64textString = null;
    this.modalService.open(content, { centered: true });
  }

  handleSubmit() {
    console.log(this.registerForm.controls.nombre.value);
    console.log(this.base64textString);
    console.log(this.registerForm.controls.precio.value);
    this.modalService.dismissAll('close');
    this.productoService.addProducto({
        precio: this.registerForm.controls.precio.value,
        imagen: this.base64textString,
        nombre: this.registerForm.controls.nombre.value,
        habilitado: this.checked
    })
  }

  guardarImagen(evento) {
    const files = evento.target.files;
    const file = files[0];

    if (files && file) {
      const reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded(readerEvt) {
    const binaryString = readerEvt.target.result;
    this.base64textString = 'data:image/png;base64,' + btoa(binaryString);
  }

  cambiarHabilitado(evento) {
    this.checked = evento.checked;
  }

}
