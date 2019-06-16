import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Email } from 'src/app/model/email';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class EmailService extends HttpService{

  constructor(protected http: HttpClient) {
    super(http);
  }

  sendEmail(email: Email) {
    return this.post('email', email);
  }

}
