import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user';
import { AuthService } from '../../service/JWT/auth.service';
import { TokenStorageService } from '../../service/JWT/token.service';
import { HttpResponse } from '@angular/common/http';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'login',
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  private user: User;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
    this.loginForm = this.formBuilder.group({
      username: [''],
      password: ['']
    });
  }

  public logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.isLoginFailed = false;
  }

  public login() {
    this.user = new User(
        this.loginForm.controls.username.value,
        this.loginForm.controls.password.value);

    this.authService.login(this.user).subscribe(
      data => this.onSuccess(data),
      error => this.handleError(error));
  }
  private onSuccess(data: HttpResponse<any>) {
    this.tokenStorage.saveToken(data.headers.get('Authorization'));
    this.isLoginFailed = false;
    this.isLoggedIn = true;
  }

  private handleError(error: any) {
    this.errorMessage = error.error.message;
    this.isLoginFailed = true;
  }

}
