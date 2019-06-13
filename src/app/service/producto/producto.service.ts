import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Producto } from '../../model/producto';
import { Observable } from 'rxjs';
import { Configuration } from 'src/app/model/configuration';
import { TokenStorageService } from '../JWT/token.service';

@Injectable({
  providedIn: 'root'
})

export class ProductoService {

  url = `${Configuration.BASE_URL}/productos`;

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) { }

  getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.tokenStorage.getToken()
      })
    };
  }

  async getAllProductos() {
    return this.http.get<Producto[]>(this.url).toPromise();
  }

  addProducto(data: { precio: number; imagen: string; nombre: string, habilitado: boolean }): any {
    return this.http.post(this.url, data, this.getHttpOptions());
  }

  delProducto(id: number) {
    return this.http.delete(`${this.url}/${id}`, this.getHttpOptions());
  }

  async getProductoDesc(id: number) {
    return this.http.get<any>(`${this.url}/desc/${id}`).toPromise();
  }

  updateProducto(data: {id: number; precio: number; imagen: string; nombre: string, habilitado: boolean }) {
    return this.http.put(this.url, data, this.getHttpOptions());
  }

  updatePriorities(priorities) {
    return this.http.put(`${this.url}/order`, priorities, this.getHttpOptions());
  }

}
