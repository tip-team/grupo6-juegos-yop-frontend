import { Injectable } from '@angular/core';
import { User } from '../../model/user';
import { HttpClient } from '@angular/common/http';
import { getToken, clear } from '../token-storage-util/token-storage-util';
import { BASE_URL } from '../../model/configuration';
import { getHttpOptionsAuth } from '../http-util/http-util';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  public login(user) {
    return this.http.post(BASE_URL + 'auth/token', user, getHttpOptionsAuth());
  }

  public isLoggedIn() {
    return getToken();
  }

  public logout() {
    clear();
  }

}
