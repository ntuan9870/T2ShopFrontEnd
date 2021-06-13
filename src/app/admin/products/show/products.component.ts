import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Promotion } from 'src/app/models/promotion.model';
import { HistoryPrice } from 'src/app/models/history-price.model';
import { formatDate } from "@angular/common";
declare function showSwal(type,message):any;

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  public id = "";
  allProduct = new BehaviorSubject<Product[]>(null);
  allPromotion = new BehaviorSubject<Promotion[]>(null);
  

  products : Product[];
  promotions : Promotion[];
  allHPs = new BehaviorSubject<HistoryPrice[]>(null);
  hps : HistoryPrice[];
  config: any;
  amount:number = 0;
  labelnext = 'Sau';
  labelprevious = 'Trước';
  constructor(
    private productService:ProductService,
    private aR:ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.id = this.aR.snapshot.params['id'];
    this.show();
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: this.amount 
    };
  }

  pageChanged(event){
    this.config.currentPage = event;
  }

  show(){
    const fd = new FormData();
    fd.append('key',"");
    fd.append('id',this.id);
    this.productService.getFromDB(fd).subscribe(res=>{
      var r:any = res;
      this.allProduct.next(r.products);
      this.allPromotion.next(r.promotions);
    });
    this.allProduct.subscribe(res=>{
      this.products=res;
    });
    this.allPromotion.subscribe(res=>{
      this.promotions=res;
    });
  }

  search(txtKeyword){
    const fd = new FormData();
    fd.append('key',txtKeyword);
    fd.append('id',this.id);
    this.productService.getFromDB(fd).subscribe(res=>{
        var r:any = res;
        this.allProduct.next(r.products);
    });
    this.allProduct.subscribe(res=>{
      this.products=res;
      console.log(this.products);
    });
  }

  removeProduct(p:Product){
    if(confirm('Bạn chắc chắn xóa chứ!')){
      this.productService.delete(p.product_id).subscribe(
        res=>{
          this.show();
          showSwal('auto-close','Xóa sản phẩm thành công!');
        },error=>{
          showSwal('auto-close','Có lỗi trong quá trình truy xuất dữ liệu!');
        }
      );
    }
  }
  getHistoryPrice(product_id){
    this.productService.getHistoryPrice(product_id).subscribe(
      res=>{
        var r:any = res;
        this.allHPs.next(r.hps);
      }
    );
    this.allHPs.subscribe(res=>{
      this.hps=res;
      if(res!=null){
        var tmp:HistoryPrice[] = this.hps;
        this.hps=[];
        for(var i = 0; i < tmp.length; i++){
          var h:HistoryPrice = new HistoryPrice;
          h = tmp[i];
          h.updated_at = h.updated_at.substring(0,10);
          this.hps.push(h);
        }
      }
      //   var tmp:HistoryPrice[] = this.hps;
      //   this.hps=[];
      //   for(var i = 0; i < tmp.length; i++){
      //     const format = 'dd/MM/yyyy';
      //     const myDate = this.hps[i].updated_at;
      //     const locale = 'en_US';
      //     var h:HistoryPrice = new HistoryPrice;
      //     h.hp_id = tmp[i].hp_id;
      //     h.product_id = tmp[i].product_id;
      //     h.product_price = tmp[i].product_price;
      //     h.created_at = tmp[i].created_at;
      //     h.updated_at = formatDate(myDate, format, locale);
      //     this.hps.push(h);
      //   }
      // }
    });
  }

}
