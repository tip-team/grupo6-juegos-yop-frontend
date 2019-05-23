import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';


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
            contactFormName: [''],
            contactFormEmail: [''],
            contactFormSubject: [''],
            contactFormMessage: ['']
        });
    }

    handleSubmit() {
    }
}
