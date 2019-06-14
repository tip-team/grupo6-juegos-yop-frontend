import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MercadoPagoService } from '../../service/mercado-pago/mercado-pago.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ValidateEmail } from 'src/app/validators/EmailValidator';

@Component({
  selector: 'email-modal',
  templateUrl: './email-modal.html',
  styleUrls: ['./email-modal.css']
})
export class EmailModalComponent implements OnInit {

  @Input() idProducto: number;
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private modalService: NgbModal, private spinner: NgxSpinnerService, private _mercadoPagoService: MercadoPagoService) {
  }

  ngOnInit() {
    this.init();
  }

  init() {
    this.registerForm = this.formBuilder.group({
      nombre: new FormControl(undefined, [Validators.required]),
      email: new FormControl(undefined, [Validators.required, ValidateEmail]),
      telefono: new FormControl(undefined, [Validators.required])
    });
  }

  handleSubmit() {
    this.spinner.show('solicitandoCompra');
    const { idProducto, registerForm } = this;
    const { email: { value: emailValue }, telefono: { value: telefonoValue }, nombre: { value: nombreValue } } = registerForm.controls;

    //const emailValue = this.registerForm.controls.email.value;
    //const telefonoValue = this.registerForm.controls.telefono.value.internationalNumber.replace(/\s+/g, '').replace(/\+/g, '%2B').replace(/-/i, '');
    //const nombre = this.registerForm.controls.nombre.value;
    const getNumeroTelefono = numeroTelefono => numeroTelefono.internationalNumber.replace(/\s+/g, '').replace(/\+/g, '%2B').replace(/-/i, '');
    const intencionDeCompra = { id: idProducto, email: emailValue, telefono: getNumeroTelefono(telefonoValue), nombre: nombreValue };
    this._mercadoPagoService.getUrlPago(intencionDeCompra).subscribe(response => {
      this.spinner.hide('solicitandoCompra');
      window.open(response.urlPago);
      this.modalService.dismissAll('close');
    }, error => {
      console.log(error);
      this.spinner.hide('solicitandoCompra');
      this.modalService.dismissAll('close');
    });
  }

  getTelefonoErrorMessage() {
    const telefonoValue = this.registerForm.controls.telefono.value;
    const telefonoIsNotEmpty = telefonoValue && telefonoValue.number.length > 0;
    return telefonoIsNotEmpty ? 'El número de teléfono ingresado es incorrecto.' : 'Debe ingresar su número de teléfono.';
  }

  getEmailErrorMessage() {
    return this.registerForm.controls.email.errors.required ? 'Debe ingresar su email.' : 'El email ingresado es incorrecto.';
  }

  openModal(content) {
    this.init();
    this.modalService.open(content, { backdrop: 'static', keyboard: false, centered: true });
  }

}
