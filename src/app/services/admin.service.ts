import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }

  public gethome(){
    return this.http.post('http://localhost:8000/api/admin/gethome',null);
  }
}
