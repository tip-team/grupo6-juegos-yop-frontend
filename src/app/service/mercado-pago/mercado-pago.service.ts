import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Configuration } from 'src/app/model/configuration';
import {Pago} from '../../model/pago';
import {TokenStorageService} from '../JWT/token.service';

@Injectable({
  providedIn: 'root'
})
export class MercadoPagoService {

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) { }

  getUrlPago(id: number, email: string): Observable<any> {
    let params = new HttpParams();
    params = params.set('id', id.toString()).set('email', email.toString());
    return this.http.get<string>(`${Configuration.BASE_URL}/mp/obtenerUrlPago`, {params: params});
  }

  getAllPagos() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.tokenStorage.getToken()
      }),
    };
    return this.http.get<Pago[]>(Configuration.BASE_URL + '/mp/pagos', httpOptions);
  }
}
