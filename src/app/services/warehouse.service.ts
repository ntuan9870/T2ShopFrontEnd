import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {

  constructor(private http:HttpClient) { }
  private baseUrl = 'http://localhost:8000/api/warehouse/'

  public themhang(form){
    return this.http.post(this.baseUrl+'add',form);
  }
  // public getSupplier(){
  //   return this.http.get(this.baseUrl+'getSupplier',null);
  // }
  public addorder(form){
    return this.http.post(this.baseUrl+'addOrder',form);
  }
  public addorder1(form){
    return this.http.post(this.baseUrl+'addOrder1',form);
  }
  public remove(orderWh_id){
    return this.http.post(this.baseUrl+'order/remove?orderWh_id='+orderWh_id,null);
  }
  public update(orderWh_id){
    return this.http.post(this.baseUrl+'order/update?orderWh_id='+orderWh_id,null);
  }
  public getdetail(orderWh_id){
    return this.http.get(this.baseUrl+'getdetailOrder?orderWh_id='+orderWh_id);
  }
  public search(key){
    return this.http.get(this.baseUrl+'search?key='+key);
  }
  public search2(form){
    return this.http.post(this.baseUrl+'search2',form);
  }
  public checkwh_id(form){
    return this.http.post(this.baseUrl+'checkwh_id',form);
  }
  public postStatus(form){
    return this.http.post(this.baseUrl+'postStatus',form);
  }
  public getCategory(){
    return this.http.get(this.baseUrl+'getCategory');
  }
  public postProductWH(form){
    return this.http.post(this.baseUrl+'postProductWH',form);
  }
  // public updateProductWH(form){
  //   return this.http.post(this.baseUrl+'updateProductWH',form);
  // }
  public getdetailWH(wh_id){
    return this.http.get(this.baseUrl+'getdetailWH?wh_id='+wh_id);
  }
  public getProductWH(wh_id){
    return this.http.get(this.baseUrl+'getProductWH?wh_id='+wh_id);
  }
  public WareHouse(form){
    return this.http.post(this.baseUrl+'addWareHouse',form);
  }
  public Removewh(wh_id){
    return this.http.get(this.baseUrl+'Removewh?wh_id='+wh_id);
  }
  public EditWareHouse(form){
    return this.http.post(this.baseUrl+'EditWareHouse',form);
  }
  public getwarehouse(){
    return this.http.get(this.baseUrl+'getwarehouse');
  }
  public addDeliverybill(form){
    return this.http.post(this.baseUrl+'addDeliverybill',form);
  }
  public getDeliverybill(){
    return this.http.get(this.baseUrl+'getDeliverybill');
  }
  public getDetailDeBill(db_id){
    return this.http.get(this.baseUrl+'getDetailDeBill?db_id='+db_id);
  }
  public minus_amount(form){
    return this.http.post(this.baseUrl+'minusamount',form);
  }
  public plus_amount(form){
    return this.http.post(this.baseUrl+'plusamount',form);
  }
  public checkcapcity(form){
    return this.http.post(this.baseUrl+'checkcapcity',form);
  }
  public checkname(form){
    return this.http.post(this.baseUrl+'checkname',form);
  }

  public importProductWH(form){
    return this.http.post(this.baseUrl+'importProductWH',form);
  }

  public getAllBI(){
     return this.http.post(this.baseUrl+'getAllBI',null);
  }
  public getAllBDIByBIID(bi_id){
    return this.http.post(this.baseUrl+'getAllBDIByBIID?bi_id='+bi_id,null);
  }
  public getAllBIEligible(form){
    return this.http.post(this.baseUrl+'getAllBIEligible',form);
  }
  public checkOutOfProduct(form){
    return this.http.post(this.baseUrl+'checkOutOfProduct',form);
  }
  public changeAmountElement(form){
    return this.http.post(this.baseUrl+'changeAmountElement',form);
  }
}
