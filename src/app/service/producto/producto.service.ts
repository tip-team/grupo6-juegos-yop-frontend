import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../http/http.service';

const url = 'productos';

@Injectable({
  providedIn: 'root'
})
export class ProductoService extends HttpService {

  constructor(protected http: HttpClient) {
    super(http);
  }

  private getPromise(endpoint) {
    return this.get(endpoint).toPromise();
  }

  async getAllProductos() {
    return this.getPromise(url);
  }

  addProducto(data): any {
    return this.postAdmin(url, data);
  }

  delProducto(id: number) {
    return this.delete(url, id);
  }

  async getProductoDesc(id: number): Promise<any> {
    return this.getPromise(`${url}/desc/${id}`);
  }

  updateProducto(data) {
    return this.putAdmin(url, data);
  }

  updatePriorities(priorities) {
    return this.putAdmin(`${url}/order`, priorities);
  }

}
