import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Producto } from '../../model/producto';
import {BehaviorSubject, Observable} from 'rxjs';
import { Configuration } from 'src/app/model/configuration';
import {TokenStorageService} from '../JWT/token.service';

@Injectable({
  providedIn: 'root'
})

export class ProductoService {

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) { }

  getAllProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(Configuration.BASE_URL + '/productos');
  }

  addProducto(data: { precio: number; imagen: string; nombre: string, habilitado: boolean }) {
    console.log('me traigo el token del storage');
    console.log(this.tokenStorage.getToken());
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.tokenStorage.getToken()
      }),
    };
    return this.http.post(Configuration.BASE_URL + '/productos', data, httpOptions);
  }

  delProducto(id: number) {
    console.log('me traigo el token del storage para borrar');
    console.log(this.tokenStorage.getToken());
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.tokenStorage.getToken()
      }),
    };
    return this.http.delete(Configuration.BASE_URL + '/productos/' + id, httpOptions);
  }

  updateProducto(data: {id: any; precio: any; imagen: string; nombre: any}) {
    console.log('me traigo el token del storage para actualizar');
    console.log(this.tokenStorage.getToken());
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.tokenStorage.getToken()
      }),
    };
    return this.http.put(Configuration.BASE_URL + '/productos/' + data.id, data, httpOptions);
  }

  getProducto(idP: number) {
    console.log('me traigo el token del storage para traer un producto');
    console.log(this.tokenStorage.getToken());
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.tokenStorage.getToken()
      }),
    };
    return this.http.get(Configuration.BASE_URL + '/productos/' + idP, httpOptions);
  }
}
