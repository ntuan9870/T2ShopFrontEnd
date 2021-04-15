import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = "http://localhost:8000/api/";
  constructor(private http:HttpClient) {
  }


  public add(form){
    return this.http.post(this.baseUrl+"add",form);
  }
  public delete(product_id){
    return this.http.post(this.baseUrl+"delete?product_id="+product_id,null);
  }
  public update(form){
    return this.http.post(this.baseUrl+"update",form);
  }
  public getFromDB(form){
    return this.http.post(this.baseUrl+"show",form);
  }
  public getEditProduct(id){
    return this.http.post(this.baseUrl+"getEditProduct?id="+id,null);
  }
  public getEditProduct1(id){
    return this.http.post(this.baseUrl+"getEditProduct1?id="+id,null);
  }
  public getidProduct(id){
    return this.http.post(this.baseUrl+"getidProduct?id="+id,null);
  }
  public ckeckid(id){
    return this.http.post(this.baseUrl+"ckeckid?id="+id,null);
  }
  public getNewProduct(sl){
    return this.http.post(this.baseUrl+"getNewProduct?sl="+sl,null);
  }
  public getFeaturedProduct(sl){
    return this.http.post(this.baseUrl+"getFeaturedProduct?sl="+sl,null);
  }
  public addComment(form){
    return this.http.post(this.baseUrl+"addComment",form);
  }
  public getComment(product_id){
    return this.http.post(this.baseUrl+"getComment?product_id="+product_id,null);
  }
  public removeComment(form){
    return this.http.post(this.baseUrl+"removeComment",form);
  }
  public danhgia(fd){
    return this.http.post(this.baseUrl+"danhgia",fd);
  }
  public getratingelement(user_id,product_id){
    return this.http.post(this.baseUrl+"getratingelement?user_id="+user_id+"&product_id="+product_id,null);
  }
  public getratingproduct(product_id){
    return this.http.post(this.baseUrl+"getratingproduct?product_id="+product_id,null);
  }
  public getratingall(product_id){
    return this.http.post(this.baseUrl+"getratingall?product_id="+product_id,null);
  }
  public filter(form){
    return this.http.post(this.baseUrl+"filter",form);
  }
  public pushFavoriteProduct(form){
    return this.http.post(this.baseUrl+"pushFavoriteProduct",form);
  }
}
