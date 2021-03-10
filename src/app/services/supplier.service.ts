import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  constructor(private http:HttpClient) { }
  private baseUrl = 'http://localhost:8000/api/supplier/'

  public themNCC(form){
    return this.http.post(this.baseUrl+'add',form);
  }
  public checkphone(phone){
    return this.http.post(this.baseUrl+'checkphone?phone='+phone,null);
  }
  public show(){
    return this.http.post(this.baseUrl+'show',null);
  }
  public getedit(supplier_id){
    return this.http.get(this.baseUrl+'edit?supplier_id='+supplier_id);
  }
  public postedit(form){
    return this.http.post(this.baseUrl+'postedit',form);
  }
  public remove(supplier_id){
    return this.http.post(this.baseUrl+'remove?supplier_id='+supplier_id,null);
  }
  public getdetail(supplier_id){
    return this.http.get(this.baseUrl+'getdetail?supplier_id='+supplier_id);
  }
  public getorder(supplier_id){
    return this.http.get(this.baseUrl+'getorder?supplier_id='+supplier_id);
  }

}
