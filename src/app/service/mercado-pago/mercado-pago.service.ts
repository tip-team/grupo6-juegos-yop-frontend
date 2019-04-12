import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Configuration } from 'src/app/model/configuration';

@Injectable({
  providedIn: 'root'
})
export class MercadoPagoService {

  constructor(private http: HttpClient) { }

  getUrlPago(id: number): Observable<any> {
    return this.http.get<string>(`${Configuration.BASE_URL}/mp/obtenerUrlPago/${id}`);
  }

}
