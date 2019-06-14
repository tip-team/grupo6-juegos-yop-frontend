import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user';
import { AuthService } from '../../service/JWT/auth.service';
// import { TokenStorageService } from '../../service/JWT/token.service';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, FormControl, Validators, FormGroup} from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';
import { TokenStorageUtil } from 'src/app/service/token-storage-util/token-storage-util';

@Component({
  selector: 'login',
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  hide = true;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  private user: User;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private _notificationsservice: NotificationsService) { }

  ngOnInit() {
    if (TokenStorageUtil.getToken()) {
      this.isLoggedIn = true;
    }
    this.loginForm = this.formBuilder.group({
      username: new FormControl(undefined, [Validators.required]),
      password: new FormControl(undefined, [Validators.required])
    });
  }

  public logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.isLoginFailed = false;
  }

  public login() {
    const { username: { value: userNameValue }, password: { value: passwordValue } } = this.loginForm.controls;
    this.user = new User(userNameValue, passwordValue);
    this.authService.login(this.user).subscribe(
      data => this.onSuccess(data),
      error => error.status === 403 ? this.handleInvalidLogin() : this.handleServerException()
    );
  }

  handleServerException() {
    this._notificationsservice.error('Ocurrió un error', 'Por favor vuelve a intentar más tarde.', {
      timeOut: 8000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true,
      clickIconToClose: true
    });
  }

  private onSuccess(data: HttpResponse<any>) {
    TokenStorageUtil.saveToken(data.headers.get('Authorization'));
    this.isLoginFailed = false;
    this.isLoggedIn = true;
    this.hide = true;
    this.loginForm = this.formBuilder.group({
      username: new FormControl(undefined, [Validators.required]),
      password: new FormControl(undefined, [Validators.required])
    });
  }

  private handleInvalidLogin() {
    this._notificationsservice.error('Error al ingresar', 'Usuario y/o contraseña incorrecta.', {
      timeOut: 8000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true,
      clickIconToClose: true
    });
  }

}
