import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { createHttpParams, getHttpOptions } from '../http-util/http-util';
import { HttpService } from '../http/http.service';

const endpoint = url => 'mp/' + url;

@Injectable({
  providedIn: 'root'
})
export class MercadoPagoService extends HttpService {

  constructor(protected http: HttpClient) {
    super(http);
  }

  private getEndpoint(url, options) {
    return this.get(endpoint(url), options);
  }

  getUrlPago(intencionDeCompra): Observable<any> {
    return this.getEndpoint('obtenerUrlPago', { params: createHttpParams(intencionDeCompra) });
  }

  getAllPagos(): any {
    return this.getEndpoint('pagos', getHttpOptions());
  }

}
