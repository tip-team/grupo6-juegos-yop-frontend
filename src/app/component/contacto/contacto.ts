import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmailService } from 'src/app/service/email/email.service';
import { NotificationsService } from 'angular2-notifications';
import { activeBarButton, getPrimaryBarButtonOptions, getValues, getFormErrors, formGroupWithEmail, setStyle } from '../../model/util';
import { interval } from 'rxjs';

@Component({
    selector: 'contacto',
    templateUrl: './contacto.html',
    styleUrls: ['./contacto.css']
})
export class ContactoComponent implements OnInit {

    contactForm: FormGroup;
    barButtonOptions = getPrimaryBarButtonOptions('Enviar');

    constructor(private formBuilder: FormBuilder, private _emailService: EmailService, private _notificationsService: NotificationsService) {
    }

    ngOnInit() {
        this.contactForm = formGroupWithEmail(this.formBuilder, 'remitente', 'nombre', 'asunto', 'cuerpo');
        this.contactForm.statusChanges.subscribe(() => {
            if (this.contactForm.valid) {
                const styleButton = interval(10).subscribe(() => {
                    let matBarButton = document.getElementsByTagName('mat-bar-button')[0];
                    if (matBarButton) {
                        setStyle(matBarButton.getElementsByClassName('mat-button-wrapper')[0]);
                        styleButton.unsubscribe();
                    }
                });
            }
        });
    }

    getEmailErrorMessage() {
        return getFormErrors(this.contactForm, 'remitente').required ? 'Debe ingresar su email.' : 'El email ingresado es inválido.';
    }

    getErrorMessage() {
        const { contactForm } = this;
        const getErrors = field => getFormErrors(contactForm, field);
        if (getErrors('nombre')) return 'Para enviar la consulta debe ingresar su nombre.';
        if (getErrors('asunto')) return 'Para enviar la consulta debe ingresar un asunto.';
        if (getErrors('cuerpo')) return 'Para enviar la consulta debe ingresar un mensaje.';
        const remitenteHasErrors = getErrors('remitente');
        if (remitenteHasErrors) {
            return remitenteHasErrors.required ? 'Para enviar la consulta debe ingresar su email.' : 'Para enviar la consulta su email debe ser válido.';
        }
    }

    handleSubmit() {
        activeBarButton(this.barButtonOptions, 'Enviando');
        const data = getValues(this.contactForm, 'nombre', 'remitente', 'asunto', 'cuerpo');
        this._emailService.sendEmail(data).subscribe(
            () => {
                this.deactiveBarButton();
                this._notificationsService.success('', `Gracias ${data.nombre} por contactarte con nosotros, pronto recibirás nuestra respuesta.`);
            }, () => {
                this.deactiveBarButton();
                this._notificationsService.error('Ocurrió un error', 'Por favor vuelve a intentar más tarde.');
            }
        );
    }

    deactiveBarButton() {
        this.barButtonOptions.active = false;
        this.barButtonOptions.text = 'Enviar';
    }
}
