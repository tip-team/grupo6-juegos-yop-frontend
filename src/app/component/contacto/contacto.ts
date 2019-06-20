import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ValidateEmail } from 'src/app/validators/EmailValidator';
import { EmailService } from 'src/app/service/email/email.service';
import { NotificationsService } from 'angular2-notifications';
import { activeBarButton, getPrimaryBarButtonOptions, getValues } from '../../model/configuration';
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
        this.contactForm = this.formBuilder.group({
            nombre: new FormControl(undefined, [Validators.required]),
            remitente: new FormControl(undefined, [Validators.required, ValidateEmail]),
            asunto: new FormControl(undefined, [Validators.required]),
            cuerpo: new FormControl(undefined, [Validators.required])
        });

        this.contactForm.statusChanges.subscribe(() => {
            if (this.contactForm.valid) {
                const styleButton = interval(10).subscribe(() => {
                    const setStyle = element => {
                        element.style['font-family'] = 'Fredoka One';
                        element.style.color = 'black';
                        element.style['font-size'] = '15px';
                    }

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
        return this.contactForm.controls.remitente.errors.required ? 'Debe ingresar su email.' : 'El email ingresado es inválido.';
    }

    getErrorMessage() {
        if (this.contactForm.controls.nombre.errors) return 'Para enviar la consulta debe ingresar su nombre.';
        if (this.contactForm.controls.remitente.errors) {
            return this.contactForm.controls.remitente.errors.required ? 'Para enviar la consulta debe ingresar su email.' : 'Para enviar la consulta su email debe ser válido.';
        }
        if (this.contactForm.controls.asunto.errors) return 'Para enviar la consulta debe ingresar un asunto.';
        if (this.contactForm.controls.cuerpo.errors) return 'Para enviar la consulta debe ingresar un mensaje.';
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
