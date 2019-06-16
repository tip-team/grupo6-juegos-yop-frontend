import { HttpHeaders, HttpParams } from '@angular/common/http';
import { TokenStorageUtil } from '../token-storage-util/token-storage-util';

const getHttpOptions = () => ({
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TokenStorageUtil.getToken()}`
    })
});

const createHttpParams = httpParams => {
    let params = new HttpParams();
    Object.entries(httpParams).forEach(([key, value]) => params = params.set(key, value.toString()));
    return params;
}

const url = 'https://tip-juegos-yop-backend.herokuapp.com/api/';

const get = (http, endpoint, options?) => {
    const fullEndpoint = url + endpoint;
    return options ? http.get(fullEndpoint, options) : http.get(fullEndpoint);
};

export { getHttpOptions, createHttpParams, get };