import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Producto } from '../../model/producto';
import { Observable } from 'rxjs';
import { Configuration } from 'src/app/model/configuration';
import { TokenStorageService } from '../JWT/token.service';

@Injectable({
  providedIn: 'root'
})

export class ProductoService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.tokenStorage.getToken()
    }),
  };

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) { }

  getAllProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(Configuration.BASE_URL + '/productos');
  }

  addProducto(data: { precio: number; imagen: string; nombre: string, habilitado: boolean }) {
    return this.http.post(Configuration.BASE_URL + '/productos', data, this.httpOptions);
  }

  delProducto(id: number) {
    return this.http.delete(Configuration.BASE_URL + '/productos/' + id, this.httpOptions);
  }

  updateProducto(data: {id: number; precio: number; imagen: string; nombre: string, habilitado: boolean }) {
    return this.http.put(Configuration.BASE_URL + '/productos/' + data.id, data, this.httpOptions);
  }
}
