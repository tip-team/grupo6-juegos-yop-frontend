import { AbstractControl } from '@angular/forms';
import * as EmailValidator from 'email-validator';

export function ValidateEmail(control: AbstractControl) {
    if (control.value && !EmailValidator.validate(control.value)) { return { validEmail: true }; }
    return null;
}
