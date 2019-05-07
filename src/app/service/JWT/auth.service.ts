import {Injectable} from '@angular/core';
import {LoginData} from '../../model/login';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TokenStorageService} from './token.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  observe: 'response' as 'response'
};

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private loginUrl = 'https://tip-juegos-yop-backend.herokuapp.com/auth/token';

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {}

  public login(loginData: LoginData) {
    return this.http.post(this.loginUrl, loginData, httpOptions);
  }

  public logout() {
    this.tokenStorage.clear();
  }
}
