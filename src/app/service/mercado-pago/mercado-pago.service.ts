import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MercadoPagoService {

  constructor(private http: HttpClient) { }

  getUrlPago(id: number): Observable<any> {
    return this.http.get<string>(`http://localhost:8080/api/mp/obtenerUrlPago/${id}`);
  }

}
