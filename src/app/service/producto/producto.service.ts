import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../../model/producto';
import { Configuration } from 'src/app/model/configuration';
import { HttpUtil } from '../http-util/http-util';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  url = `${Configuration.BASE_URL}/productos`;

  constructor(private http: HttpClient) { }

  async getAllProductos() {
    return this.http.get<Producto[]>(this.url).toPromise();
  }

  addProducto(data: { precio: number; imagen: string; nombre: string, habilitado: boolean }): any {
    return this.http.post(this.url, data, HttpUtil.getHttpOptions());
  }

  delProducto(id: number) {
    return this.http.delete(`${this.url}/${id}`, HttpUtil.getHttpOptions());
  }

  async getProductoDesc(id: number) {
    return this.http.get<any>(`${this.url}/desc/${id}`).toPromise();
  }

  updateProducto(data: {id: number; precio: number; imagen: string; nombre: string, habilitado: boolean }) {
    return this.http.put(this.url, data, HttpUtil.getHttpOptions());
  }

  updatePriorities(priorities) {
    return this.http.put(`${this.url}/order`, priorities, HttpUtil.getHttpOptions());
  }

}
