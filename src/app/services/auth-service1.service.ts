import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService1Service {
	private baseUrl = 'http://localhost:8000/api/auth/'

  constructor(private http:HttpClient) { }
  public dangky(form){
    return this.http.post(this.baseUrl+'register',form);
  }

  public dangnhap(form){
    return this.http.post(this.baseUrl+'login',form);
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
