import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private base_url = "http://localhost:8000/api/store/";

  constructor(private http:HttpClient) { }

  public addStore(fd){
    return this.http.post(this.base_url+'addStore', fd);
  }
  public checkSameName(store_name){
    return this.http.post(this.base_url+'checkSameName?store_name='+store_name, null);
  }
  public checkSameAddress(fd){
    return this.http.post(this.base_url+'checkSameAddress', fd);
  }
  public showStore(){
    return this.http.post(this.base_url+'showStore', null);
  }
  public changeStatus(store_id){
    return this.http.post(this.base_url+'changeStatus?store_id='+store_id, null);
  }
  
  public getAdmin(){
    return this.http.post(this.base_url+'getAdmin', null);
  }
  public getStore(store_id){
    return this.http.post(this.base_url+'getStore?store_id='+store_id, null);
  }
  public editStore(fd){
    return this.http.post(this.base_url+'editStore', fd);
  }
  public getAllProductInWH(store_id){
    return this.http.post(this.base_url+'getAllProductInWH?store_id='+store_id, null);
  }
  public showStoreWarehouse(store_id){
    return this.http.post(this.base_url+'showStoreWarehouse?store_id='+store_id, null);
  }
  public addStoreWareHouse(fd){
    return this.http.post(this.base_url+'addStoreWareHouse', fd);
  }
  public getStoreWarehouseByID(store_wh_id){
    return this.http.post(this.base_url+'getStoreWarehouseByID?store_wh_id='+store_wh_id, null);
  }
  public editWH(fd){
    return this.http.post(this.base_url+'editWH', fd);
  }
  public getAllP(store_wh_id){
    return this.http.post(this.base_url+'getAllP?store_wh_id='+store_wh_id, null);
  }
  public getAllStoreWarehouseByStoreID(store_id){
    return this.http.post(this.base_url+'getAllStoreWarehouseByStoreID?store_id='+store_id, null);
  }
}
