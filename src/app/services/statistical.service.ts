import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StatisticalService {

  private baseUrl = 'http://localhost:8000/api/statistical/'

  constructor(private http:HttpClient) { }
  public theongay(form){
    return this.http.post(this.baseUrl+'date',form);
  }
  public theothang (form) {
    return this.http.post(this.baseUrl+'month',form);
  }
  public theonam (form) {
    return this.http.post(this.baseUrl+'year',form);
  }
  public getRevenueMonth(month){
    return this.http.post(this.baseUrl + 'getRevenueMonth?month='+month, null);
  }

}
