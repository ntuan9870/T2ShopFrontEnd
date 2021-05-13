import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = "http://localhost:8000/api/users/";

  constructor(private http:HttpClient) { }

  public show(){
    return this.http.post(this.baseUrl+'show',null);
  }

  public getUser(id){
    return this.http.post(this.baseUrl+'getUser?id='+id,null);
  }

  public postEdit(fd){
    return this.http.post(this.baseUrl+'postEdit',fd);
  }
  public Edit(fd){
    return this.http.post(this.baseUrl+'edit',fd);
  }
  removeUser(user_id){
    return this.http.post(this.baseUrl+'removeUser?user_id='+user_id,null);
  }

}
