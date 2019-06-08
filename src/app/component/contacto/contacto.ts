import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ValidateEmail } from 'src/app/validators/EmailValidator';
import { EmailService } from 'src/app/service/email/email.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
    selector: 'contacto',
    templateUrl: './contacto.html',
    styleUrls: ['./contacto.css']
})
export class ContactoComponent implements OnInit {

    contactForm: FormGroup;
    barButtonOptions = {
        active: false,
        text: 'Enviar',
        buttonColor: 'primary',
        barColor: 'primary',
        raised: true,
        stroked: false,
        mode: 'indeterminate',
        value: 0,
        disabled: false,
        fullWidth: false
    };

    constructor(private formBuilder: FormBuilder, private _emailService: EmailService, private _notificationsService: NotificationsService) {
    }

    ngOnInit() {
        this.contactForm = this.formBuilder.group({
            name: new FormControl(undefined, [Validators.required]),
            email: new FormControl(undefined, [Validators.required, ValidateEmail]),
            subject: new FormControl(undefined, [Validators.required]),
            message: new FormControl(undefined, [Validators.required])
        });
    }

    getEmailErrorMessage() {
        return this.contactForm.controls.email.errors.required ? 'Debe ingresar su email.' : 'El email ingresado es inválido.';
    }

    getErrorMessage() {
        if (this.contactForm.controls.name.errors) return 'Para enviar la consulta debe ingresar su nombre.';
        if (this.contactForm.controls.email.errors) {
            return this.contactForm.controls.email.errors.required ? 'Para enviar la consulta debe ingresar su email.' : 'Para enviar la consulta su email debe ser válido.';
        }
        if (this.contactForm.controls.subject.errors) return 'Para enviar la consulta debe ingresar un asunto.';
        if (this.contactForm.controls.message.errors) return 'Para enviar la consulta debe ingresar un mensaje.';
    }

    handleSubmit() {
        this.barButtonOptions.active = true;
        this.barButtonOptions.text = 'Enviando...';
        const { name: { value: nombre }, email: { value: remitente }, subject: { value: asunto }, message: { value: cuerpo } } = this.contactForm.controls;

        this._emailService.sendEmail({ nombre, remitente, asunto, cuerpo }).subscribe(
            () => {
                this.barButtonOptions.active = false;
                this.barButtonOptions.text = 'Enviar';
                this._notificationsService.success('', `Gracias ${nombre} por contactarte con nosotros, pronto recibirás nuestra respuesta.`, {
                    timeOut: 8000,
                    showProgressBar: true,
                    pauseOnHover: true,
                    clickToClose: true,
                    clickIconToClose: true
                });
            }, () => {
                this.barButtonOptions.active = false;
                this.barButtonOptions.text = 'Enviar';
                this._notificationsService.error('Ocurrió un error', 'Por favor vuelve a intentar más tarde.', {
                    timeOut: 8000,
                    showProgressBar: true,
                    pauseOnHover: true,
                    clickToClose: true,
                    clickIconToClose: true
                });
            }
        );
    }
}
