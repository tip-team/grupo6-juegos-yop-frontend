import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getHttpOptions } from '../http-util/http-util';
import { BASE_URL } from '../../model/configuration';

const url = BASE_URL + 'api/';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(protected http: HttpClient) { }

  protected get(endpoint, options?) {
    return options ? this.http.get(url + endpoint, options) : this.http.get(url + endpoint);
  };

  protected postAdmin(endpoint, body) {
    return this.http.post(url + endpoint, body, getHttpOptions());
  }

  protected post(endpoint, body) {
    return this.http.post(url + endpoint, body);
  }

  protected putAdmin(endpoint, body) {
    return this.http.put(url + endpoint, body, getHttpOptions());
  }

  protected delete(endpoint, param) {
    return this.http.delete(`${url + endpoint}/${param}`, getHttpOptions());
  }

}
