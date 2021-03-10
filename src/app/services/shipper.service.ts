import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShipperService {

  private baseUrl = "http://localhost:8000/api/shipper/";

  constructor(private http:HttpClient , private router:Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(localStorage.getItem('shipper_phone')||sessionStorage.getItem('shipper_phone')){
        return true;
      }
      this.router.navigate(['/auth/loginshipper']);
    return false;
  }

  public addshipper(form){
    return this.http.post(this.baseUrl+'add',form);
  }
  public addShip(form){
    return this.http.post(this.baseUrl+'addShip',form);
  }
  public changePassword(form){
    return this.http.post(this.baseUrl+'changePassword',form);
  }
  public UpdateOrder(form){
    return this.http.post(this.baseUrl+'UpdateOrder',form);
  }
  public destroyShip(form){
    return this.http.post(this.baseUrl+'destroyShip',form);
  }
  public editshipper(form){
    return this.http.post(this.baseUrl+'edit',form);
  }
  public getallshipper(){
    return this.http.get(this.baseUrl+'getallshipper',);
  }
  public remove(shipper_phone){
    return this.http.post(this.baseUrl+'remove?shipper_phone='+shipper_phone,null);
  }
  public getdetailShipper(sh_phone){
    return this.http.get(this.baseUrl+'getdetailSH?sh_phone='+sh_phone);
  }
  public getOrderShipper(sh_phone){
    return this.http.get(this.baseUrl+'getOrderShipper?sh_phone='+sh_phone);
  }
  public  getOrder() {
    return this.http.get(this.baseUrl+'showorders',);
  }
  public getShip(shipper_phone) {
    return this.http.get(this.baseUrl+'showship?shipper_phone='+shipper_phone);
  }

}
