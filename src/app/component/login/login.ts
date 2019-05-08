import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user';
import { AuthService } from '../../service/JWT/auth.service';
import { TokenStorageService } from '../../service/JWT/token.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'login',
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent implements OnInit {
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  private user: User;

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
  }

  public logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.isLoginFailed = false;
    // this.reloadPage();
  }

  public login() {
    this.user = new User(
      this.form.username,
      this.form.password);

    this.authService.login(this.user).subscribe(
      data => this.onSuccess(data),
      error => this.handleError(error));
  }
  private onSuccess(data: HttpResponse<any>) {
    console.log('Miro que me llego');
    console.log(data.headers.keys());
    this.tokenStorage.saveToken(data.headers.get('Authorization'));
    console.log('Miro que guarde');
    console.log(this.tokenStorage.getToken());
    this.isLoginFailed = false;
    this.isLoggedIn = true;
    // this.reloadPage();
  }

  private handleError(error: any) {
    this.errorMessage = error.error.message;
    this.isLoginFailed = true;
  }

  private reloadPage() {
    window.location.reload();
  }
}
