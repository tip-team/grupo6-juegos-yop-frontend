import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MercadoPagoService } from '../../service/mercado-pago/mercado-pago.service';
import { NgxSpinnerService } from 'ngx-spinner';

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
    this.registerForm = this.formBuilder.group({
      email: ['']
    });
  }

  open(content) {
    this.registerForm = this.formBuilder.group({
        email: [''],
    });
    this.modalService.open(content, { centered: true });
  }

  handleSubmit() {
    this.spinner.show("solicitandoCompra");
    this._mercadoPagoService.getUrlPago(this.idProducto, this.registerForm.controls.email.value).subscribe(response => {
      this.spinner.hide("solicitandoCompra");  
      window.open(response.urlPago);
      this.modalService.dismissAll('close');
    }, error => {
      console.log(error);
      this.spinner.hide("solicitandoCompra"); 
      this.modalService.dismissAll('close');
    });
  }

}
