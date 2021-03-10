import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8000/api/auth/'
  constructor(private http:HttpClient) { }

  public dangky(form){
    return this.http.post(this.baseUrl+'register',form);
  }

  public dangnhap(form){
    return this.http.post(this.baseUrl+'login',form);
  }
  
  public dangnhapshipper(form){
    return this.http.post(this.baseUrl+'login/shipper',form);
  }

  public forgotPhone(form){
    return this.http.post(this.baseUrl+'shipper/forgot',form);
  }

  public checsameusername(username){
    return this.http.post(this.baseUrl+'checksameusername?username='+username,null);
  }

  public checsameemail(email){
    return this.http.post(this.baseUrl+'checksameemail?useremail='+email,null);
  }

  public sendEmail(email){
    return this.http.post(this.baseUrl+'sendemail?email='+email,null);
  }

  public getcode(email){
    return this.http.post(this.baseUrl+'getcode?email='+email,null);
  }

  public sendnewpass(form){
    return this.http.post(this.baseUrl+'sendnewpass',form);
  }

  public sendwrong(form){
    return this.http.post(this.baseUrl+'sendwrong',form);
  }

}
