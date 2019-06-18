import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { getBase64, resizeBase64 } from 'base64js-es6';

const BASE_URL = 'https://tip-juegos-yop-backend.herokuapp.com/';

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


const saveImagenDesc = (evento, setImagen) =>  {
    const { files } = evento.target;
    getBase64(files[0]).then(setImagen);
}

const getValues = (form, ...values): any => {
    const result = {};
    values.forEach(value => result[value] = form.controls[value].value)
    return result;
}

export { BASE_URL, getPrimaryBarButtonOptions, getWarnBarButtonOptions, activeBarButton, saveImagenPrin, saveImagenDesc, getValues };
