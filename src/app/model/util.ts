import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { getBase64, resizeBase64 } from 'base64js-es6';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ValidateEmail } from 'src/app/validators/EmailValidator';

const BASE_URL = 'https://tip-juegos-yop.appspot.com/';

const getWarnBarButtonOptions = (text): MatProgressButtonOptions => getBarButtonOptions(text, 'warn');
const getPrimaryBarButtonOptions = (text): MatProgressButtonOptions => getBarButtonOptions(text, 'primary');


const getBarButtonOptions = (text, color): MatProgressButtonOptions => ({
    active: false,
    text,
    buttonColor: color,
    barColor: color,
    raised: true,
    stroked: false,
    mode: 'indeterminate',
    value: 0,
    disabled: false,
    fullWidth: false
});

const activeBarButton = (options, text) => {
    options.active = true;
    options.text = text + '...';
};

const guardarImagen = (evento, setImagen, x, y) => {
    const { files } = evento.target;
    getBase64(files[0]).then(response => {
        resizeBase64(response, x, y).then(setImagen);
    });
}

const saveImagenPrin = (evento, setImagen) => guardarImagen(evento, setImagen, 361, 158);

const saveImagenDesc = (evento, setImagen) => {
    const { files } = evento.target;
    getBase64(files[0]).then(setImagen);
}

const getValues = (form, ...values): any => {
    const result = {};
    values.forEach(value => result[value] = form.controls[value].value)
    return result;
}

const getFormErrors = (form, value) => form.controls[value].errors;

const formGroupWithEmail = (form, emailControl, ...controls): FormGroup => {
    const formGroup = {};
    controls.forEach(control => formGroup[control] = new FormControl(undefined, [Validators.required]));
    formGroup[emailControl] = new FormControl(undefined, [Validators.required, ValidateEmail]);
    return form.group(formGroup);
}

const formGroup = (form, ...controls): FormGroup => {
    const formGroup = {};
    controls.forEach(control => formGroup[control] = new FormControl(undefined, [Validators.required]));
    return form.group(formGroup);
}

const formGroupImages = (form, nombre, precio) =>
    form.group({
        nombre: new FormControl(nombre, [Validators.required]),
        imagen: [''],
        imagenDesc: [''],
        precio: new FormControl(precio, [Validators.required])
    });

const setStyle = element => {
    element.style['font-family'] = 'Fredoka One';
    element.style.color = 'black';
    element.style['font-size'] = '15px';
}

const matBarButtonWithStyle = () => {
    setStyle(document.getElementsByTagName('mat-bar-button')[0].getElementsByClassName('mat-button-wrapper')[0]);
}

const matBarButtonAndSlideWithStyle = () => {
    setStyle(document.getElementsByClassName('mat-slide-toggle-content')[0]);
    matBarButtonWithStyle();
}

export {
    BASE_URL, getPrimaryBarButtonOptions, getWarnBarButtonOptions, activeBarButton,
    saveImagenPrin, saveImagenDesc, getValues, getFormErrors, formGroupWithEmail, formGroup, formGroupImages,
    matBarButtonAndSlideWithStyle, matBarButtonWithStyle, setStyle
};
