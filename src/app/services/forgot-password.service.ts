import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

  private baseUrl = 'http://localhost:8000/api/auth/forgotPassword/';

  constructor(private http:HttpClient) { }

  sendEmail(){

  }

}
