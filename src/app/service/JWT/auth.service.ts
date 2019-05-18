import {Injectable} from '@angular/core';
import {User} from '../../model/user';
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

  private loginUrl;

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {}

  public login(user: User) {
    return this.http.post(this.loginUrl, user, httpOptions);
  }

  public isLoggedIn() {
    return this.tokenStorage.getToken();
  }

  public logout() {
    this.tokenStorage.clear();
  }
}
