import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private http:HttpClient) { }
  private baseUrl = 'http://localhost:8000/api/promotion/'

  public themkm(form){
    return this.http.post(this.baseUrl+'add',form);
  }
  public status(promotion_id){
    return this.http.post(this.baseUrl+'status?promotion_id='+promotion_id,null);
  }
  public remove(promotion_id){
    return this.http.post(this.baseUrl+'remove?promotion_id='+promotion_id,null);
  }
  public getedit(promotion_id){
    return this.http.get(this.baseUrl+'edit?promotion_id='+promotion_id);
  }
  public postedit(form){
    return this.http.post(this.baseUrl+'postedit',form);
  }
}
