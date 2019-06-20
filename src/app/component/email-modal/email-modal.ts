import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MercadoPagoService } from '../../service/mercado-pago/mercado-pago.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ValidateEmail } from 'src/app/validators/EmailValidator';
import {getValues} from '../../model/configuration';

@Component({
  selector: 'email-modal',
  templateUrl: './email-modal.html',
  styleUrls: ['./email-modal.css']
})
export class EmailModalComponent implements OnInit {

  @Input() idProducto: number;
  registerForm: FormGroup;
  telefonoColor;

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
    const intencionDeCompra: any = getValues(this.registerForm, 'email', 'nombre', 'telefono');
    intencionDeCompra.telefono = intencionDeCompra.telefono.internationalNumber.replace(/\s+/g, '').replace(/\+/g, '%2B').replace(/-/i, '');
    intencionDeCompra.id = this.idProducto;
    this._mercadoPagoService.getUrlPago(intencionDeCompra).subscribe(({urlPago}) => {
      this.spinner.hide('solicitandoCompra');
      window.open(urlPago);
      this.modalService.dismissAll('close');
    }, error => {
      this.spinner.hide('solicitandoCompra');
      this.modalService.dismissAll('close');
    });
  }

  getTelefonoErrorMessage() {
    const telefonoValue = this.registerForm.controls.telefono.value;
    return telefonoValue ? 'El número de teléfono ingresado es incorrecto.' : 'Debe ingresar su número de teléfono.';
  }

  getEmailErrorMessage() {
    return this.registerForm.controls.email.errors.required ? 'Debe ingresar su email.' : 'El email ingresado es incorrecto.';
  }

  openModal(content) {
    this.init();
    this.modalService.open(content, { backdrop: 'static', keyboard: false, centered: true });
  }

}
