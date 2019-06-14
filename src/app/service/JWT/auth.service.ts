import { Injectable } from '@angular/core';
import { User } from '../../model/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenStorageUtil } from '../token-storage-util/token-storage-util';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  observe: 'response' as 'response'
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl = 'https://tip-juegos-yop-backend.herokuapp.com/auth/token';

  constructor(private http: HttpClient) {}

  public login(user: User) {
    const { http, loginUrl } = this;
    return http.post(loginUrl, user, httpOptions);
  }

  public isLoggedIn() {
    return TokenStorageUtil.getToken();
  }

  public logout() {
    TokenStorageUtil.clear();
  }

}
