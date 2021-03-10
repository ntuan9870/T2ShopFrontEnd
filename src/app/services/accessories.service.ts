import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccessoriesService {

  constructor(private http:HttpClient) { }
  private baseUrl = 'http://localhost:8000/api/accessories/'

  public add(form){
    return this.http.post(this.baseUrl+'add',form);
  }
  public show(){
    return this.http.get(this.baseUrl+'show',);
  }
}
