import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  baseUrl = 'http://localhost:8000/api/order/';
  vnpayUrl='http://localhost:8000/api/';

  constructor(private http:HttpClient) { }

  public addorder(form){
    return this.http.post(this.baseUrl+'add',form);
  }
  public showorder(form){
    return this.http.post(this.baseUrl+'show',form);
  }
  public showOrderItem(order_id){
    return this.http.post(this.baseUrl+'show/detail?order_id='+order_id,null);
  }
  public removeOrder(order_id){
    return this.http.post(this.baseUrl+'show/remove?order_id='+order_id,null);
  }
  public completeready(form){
    return this.http.post(this.baseUrl+'completeready',form);
  }
  public completestatus(form){
    return this.http.post(this.baseUrl+'completestatus',form);
  }
  public getOrderById(order_id){
    return this.http.post(this.baseUrl+'show/orderbyid?order_id='+order_id,null);
  }
  public vnpay(form){
    return this.http.post(this.vnpayUrl+'vnpay',form);
  }
  public thanhtoanvnpay(form){
    return this.http.post(this.baseUrl+'getvnpay',form);
  }
  public getShip(order_id){
    return this.http.post(this.baseUrl+'show/ordershipbyid?order_id='+order_id,null);
  }

}
