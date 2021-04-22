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
  public getStore(store_id){
    return this.http.post(this.base_url+'getStore?store_id='+store_id, null);
  }
  public editStore(fd){
    return this.http.post(this.base_url+'editStore', fd);
  }
}
