import { Injectable } from '@angular/core';
import { User } from '../../model/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenStorageUtil } from '../token-storage-util/token-storage-util';
import { BASE_URL } from '../../model/configuration';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  observe: 'response' as 'response'
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  public login(user: User) {
    return this.http.post(BASE_URL + 'auth/token', user, httpOptions);
  }

  public isLoggedIn() {
    return TokenStorageUtil.getToken();
  }

  public logout() {
    TokenStorageUtil.clear();
  }

}
