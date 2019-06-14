import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Configuration } from 'src/app/model/configuration';
import { Pago } from '../../model/pago';
import { HttpUtil } from '../http-util/http-util';

@Injectable({
  providedIn: 'root'
})
export class MercadoPagoService {

  constructor(private http: HttpClient) { }

  getUrlPago(intencionDeCompra): Observable<any> {
    const params = HttpUtil.createHttpParams(intencionDeCompra);
    return this.http.get<string>(`${Configuration.BASE_URL}/mp/obtenerUrlPago`, { params });
  }

  getAllPagos() {
    return this.http.get<Pago[]>(`${Configuration.BASE_URL}/mp/pagos`, HttpUtil.getHttpOptions());
  }

}
