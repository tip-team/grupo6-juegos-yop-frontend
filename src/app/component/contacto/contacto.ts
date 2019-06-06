import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ValidateEmail } from 'src/app/validators/EmailValidator';

@Component({
    selector: 'contacto',
    templateUrl: './contacto.html',
    styleUrls: ['./contacto.css']
})
export class ContactoComponent implements OnInit {

    contactForm: FormGroup;

    constructor(private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.contactForm = this.formBuilder.group({
            contactFormName: new FormControl(undefined, [Validators.required]),
            contactFormEmail: new FormControl(undefined, [Validators.required, ValidateEmail]),
            contactFormSubject: new FormControl(undefined, [Validators.required]),
            contactFormMessage: new FormControl(undefined, [Validators.required])
        });
    }

    getEmailErrorMessage() {
        return this.contactForm.controls.contactFormEmail.errors.required ? 'Debe ingresar su email.' : 'El email ingresado es inválido.';
    }

    handleSubmit() {
        console.log('Próximamente envía el mail.');
    }
}
