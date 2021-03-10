import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseUrl = "http://localhost:8000/api/category/";
  allCategory = new BehaviorSubject<Category[]>(null);
  public category_name="";

  constructor(private http:HttpClient) {
    this.show();
   }

  public add(form) {
    return this.http.post(this.baseUrl+'add',form);
  }

  public show(){
    return this.http.post(this.baseUrl+'show',null).subscribe(res=>{
      var r:any = res;
      this.allCategory.next(r.categories);
    });
  }

  public getEdit(id){
    return this.http.post(this.baseUrl+"getEdit?id="+id,null);
  }

  public update(fd){
    return this.http.post(this.baseUrl+"postEdit",fd);
  }

  public checkname(categoryname){
    return this.http.post(this.baseUrl+"checkname?category_name="+categoryname,null);
  }

  public removeCategory(category_id){
    return this.http.post(this.baseUrl+'remove?category_id='+category_id,null);
  }

}
