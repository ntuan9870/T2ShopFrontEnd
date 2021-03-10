import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cart } from '../models/cart.model';
import { Product } from '../models/product.model';
import { Promotion } from '../models/promotion.model';
import { PromotionService } from './promotion.service';
import { ShareService } from './share.service';
declare function showSwal(type,message):any;

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public productincarts:Cart[]
  cart = [];
  public procart:Cart = new Cart();
  private baseUrl='http://localhost:8000/api/cart/';
  constructor(private http:HttpClient,private shareService:ShareService, private promotionService:PromotionService) { }

  public addtocart(p,promotion){
    this.productincarts = this.showcart();
    this.procart.product = p;
    this.procart.num = 1;
    this.procart.promotion = promotion;
    this.cart = [];
    localStorage.removeItem('cart');
    if(this.productincarts==null){
      this.cart.push(this.procart);
      localStorage.setItem('cart',JSON.stringify(this.cart));
      this.saveAll();
      return;
    }
    var m = true;
    for(var i = 0; i < this.productincarts.length; i++){
      if(p.product_id==this.productincarts[i].product.product_id){
        if(this.productincarts[i].num+1>this.productincarts[i].product.product_amount){
          this.productincarts[i].num =this.productincarts[i].num;
          m = false;
        }else{
          this.productincarts[i].num =this.productincarts[i].num+1;
        }
        this.cart.push(this.productincarts[i]);
        continue;
      }
      this.cart.push(this.productincarts[i]);
    }
    if(!this.productincarts.find(x=>x.product.product_id == p.product_id)){
      this.cart.push(this.procart);
    }
    localStorage.setItem('cart',JSON.stringify(this.cart));
    this.saveAll();
    if(m==false){
      showSwal('auto-close','Xin lỗi bạn, mặt hàng này hiện không đủ!');
    }
  }
  public saveAll(){
    var tongthanhtoan = 0;
    var tonghang = 0;
    var cartProductList:Cart[] = this.showcart();
    var prod_num:number[] = new Array();
    var thanhtien:number[]= new Array();
    if(cartProductList==null){
      return;
    }
    for(var i = 0; i < cartProductList.length; i++){
      prod_num[i] = cartProductList[i].num;
      thanhtien[i] = cartProductList[i].product.product_price*cartProductList[i].num;
      tongthanhtoan += thanhtien[i];
      tonghang += prod_num[i];
    }
    this.luutongtien(tongthanhtoan);
    this.luutonghang(tonghang);
    this.shareService.emitChange(tonghang);
  }
  public changenumberproductincart(p,sl){
    this.productincarts = this.showcart();
    this.procart.product = p;
    this.procart.num = sl;
    this.cart = [];
    localStorage.removeItem('cart');
    for(var i = 0; i < this.productincarts.length; i++){
      if(p.product_id==this.productincarts[i].product.product_id){
        this.productincarts[i].num = sl;
        this.cart.push(this.productincarts[i]);
        continue;
      }
      this.cart.push(this.productincarts[i]);
    }
    localStorage.setItem('cart',JSON.stringify(this.cart));
    this.saveAll();
  }
  public removeProduct(p){
    this.productincarts = this.showcart();
    this.cart = [];
    localStorage.removeItem('cart');
    for(var i = 0; i < this.productincarts.length; i++){
      if(p.product_id!=this.productincarts[i].product.product_id){
        this.cart.push(this.productincarts[i]);
      }
    }
    localStorage.setItem('cart',JSON.stringify(this.cart));
    this.saveAll();
  }
  public showcart(){
    return JSON.parse(localStorage.getItem('cart'));
  }

  public tinhthanhtien(i,prod_price, prod_num){
    return prod_price*prod_num;
  }
  public xoagiohang(){
    localStorage.removeItem('cart');
    localStorage.removeItem('total');
    localStorage.removeItem('totalamount');
    // localStorage.removeItem('promotion');
    this.shareService.emitChange(0);
  }

  public luutongtien(tt){
    if(localStorage.getItem('total')){
      localStorage.removeItem('total');
    }
    localStorage.setItem('total',tt);
  }

  public tongtien(){
    return localStorage.getItem('total');
  }

  luutonghang(th){
    if(localStorage.getItem('totalamount')){
      localStorage.removeItem('totalamount');
    }
    localStorage.setItem('totalamount',th);
  }

  public tonghang(){
    if(!localStorage.getItem('totalamount')){
      return '0';
    }
    return localStorage.getItem('totalamount');
  }
  public getAllDistrict(){
    return this.http.post('https://thongtindoanhnghiep.co/api/city/4/district',null);
  }

}
