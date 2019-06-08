import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Configuration } from 'src/app/model/configuration';
import { Email } from 'src/app/model/email';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http: HttpClient) { }

  sendEmail(email: Email) {
    return this.http.post(`${Configuration.BASE_URL}/email`, email);
  }

}
