import { HttpHeaders, HttpParams } from '@angular/common/http';
import { TokenStorageUtil } from '../token-storage-util/token-storage-util';

export class HttpUtil {

    static getHttpOptions() {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${TokenStorageUtil.getToken()}`
            })
        }
    }

    static createHttpParams(httpParams): HttpParams {
        let params = new HttpParams();
        Object.entries(httpParams).forEach(([key, value]) => params = params.set(key, value.toString()));
        return params;
    }

}