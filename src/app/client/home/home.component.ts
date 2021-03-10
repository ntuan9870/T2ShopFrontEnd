import { Component, OnInit } from '@angular/core';
import { stringify } from 'querystring';
import { BehaviorSubject } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { Promotion } from 'src/app/models/promotion.model';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
declare function showSwal(type,message):any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  allProduct = new BehaviorSubject<Product[]>(null);
  products:Product[];
  allPromotion = new BehaviorSubject<Promotion[]>(null);
  promotions:Promotion[];
  allProductFeatured = new BehaviorSubject<Product[]>(null);
  productsFeatured:Product[];
  public loading = true;
  constructor(private productService:ProductService,private cartService:CartService) { }

  ngOnInit(): void {
    this.getNewProduct();
    this.getFeaturedProduct();
  }

  getNewProduct(){
    this.productService.getNewProduct(12).subscribe(
      res=>{
        var r:any = res;
        this.allProduct.next(r.products);
        this.allPromotion.next(r.promotions);
      },
      error=>{
        alert('Có lỗi trong quá trình xử lý thông tin!');
      }
    );
    this.allProduct.subscribe(
      res=>{
        this.products = res;
      },
      error=>{
        alert('Có lỗi trong quá trình xử lý thông tin!');
      }
    );
    this.allPromotion.subscribe(res=>{
      this.promotions=res;
    });
  }
  getFeaturedProduct(){
      this.productService.getFeaturedProduct(12).subscribe(
        res=>{
          var r:any = res;
          this.allProductFeatured.next(r.products);
          this.allPromotion.next(r.promotions);
          this.loading = false;
        },
        error=>{
          this.loading = false;
          alert('Có lỗi trong quá trình truy xuất dữ liệu!');
        }
      );
      this.allProductFeatured.subscribe(
        res=>{
          this.productsFeatured = res;
        },
        error=>{
          alert('Có lỗi trong quá trình xử lý dữ liệu!');
        }
      );
      this.allPromotion.subscribe(res=>{
        this.promotions=res;
        console.log( this.promotions);
      });
  }

  addtocart(p:Product,promotion:number){
    this.cartService.addtocart(p,promotion);
    showSwal('auto-close','Thêm sản phẩm vào giỏ hàng thành công!');
  }

}
