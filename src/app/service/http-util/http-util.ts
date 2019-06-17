import { HttpHeaders, HttpParams } from '@angular/common/http';
import { getToken } from '../token-storage-util/token-storage-util';

const getHttpOptions = () => ({
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
    })
});

const getHttpOptionsAuth = () => ({
        headers: new HttpHeaders({
            'Content-Type': 'application/json' }),
        observe: 'response' as 'response'
});

const createHttpParams = httpParams => {
    let params = new HttpParams();
    Object.entries(httpParams).forEach(([key, value]) => params = params.set(key, value.toString()));
    return params;
}

export { getHttpOptions, getHttpOptionsAuth, createHttpParams };
