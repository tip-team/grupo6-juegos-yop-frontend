import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MercadoPagoService } from '../../service/mercado-pago/mercado-pago.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { formGroupWithEmail, getValues, getFormErrors, openModal } from '../../model/util';

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
    this.registerForm = formGroupWithEmail(this.formBuilder, 'email', 'nombre', 'telefono');
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
    }, () => {
      this.spinner.hide('solicitandoCompra');
      this.modalService.dismissAll('close');
    });
  }

  getTelefonoErrorMessage() {
    const { telefono } = getValues(this.registerForm, 'telefono');
    return telefono ? 'El número de teléfono ingresado es incorrecto.' : 'Debe ingresar su número de teléfono.';
  }

  getEmailErrorMessage() {
    return getFormErrors(this.registerForm, 'email').required ? 'Debe ingresar su email.' : 'El email ingresado es incorrecto.';
  }

  openModal(content) {
    this.init();
    openModal(this.modalService, content);
  }

}
