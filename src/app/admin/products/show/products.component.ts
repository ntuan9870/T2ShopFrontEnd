import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Promotion } from 'src/app/models/promotion.model';
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
  constructor(
    private productService:ProductService,
    private aR:ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.id = this.aR.snapshot.params['id'];
    this.show();
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

}
