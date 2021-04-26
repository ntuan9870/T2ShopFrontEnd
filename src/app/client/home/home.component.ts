import { Component, OnInit } from '@angular/core';
import { stringify } from 'querystring';
import { BehaviorSubject } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { Promotion } from 'src/app/models/promotion.model';
// import { SwPush } from 'src/app/models/sw-push.model';
import {SwPush} from '@angular/service-worker';
import { CartService } from 'src/app/services/cart.service';
import { NewsletterService } from 'src/app/services/newsletter.service';
import { ProductService } from 'src/app/services/product.service';
import { RecommenedService } from 'src/app/services/recommened.service';
declare function showSwal(type,message):any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user_id='';
  user_name='';
  allProduct = new BehaviorSubject<Product[]>(null);
  products:Product[];
  allPromotion = new BehaviorSubject<Promotion[]>(null);
  allPromotionF = new BehaviorSubject<Promotion[]>(null);
  allPromotionR = new BehaviorSubject<Promotion[]>(null);
  allPromotionFR = new BehaviorSubject<Promotion[]>(null);
  promotions:Promotion[];
  promotionsF:Promotion[];
  promotionsR:Promotion[];
  promotionsFR:Promotion[];
  allProductFeatured = new BehaviorSubject<Product[]>(null);
  allProductRecommend = new BehaviorSubject<Product[]>(null);
  allProductFavorite = new BehaviorSubject<Product[]>(null);
  productsFeatured:Product[];
  productsrecommend:Product[];
  FavoriteProduct:Product[];
  public loading = true;
  readonly VAPID_PUBLIC_KEY ="BGgqRns0vqv3lxOHhXyFDG8TVtQq_SsPt9ulSPT1PQbJkgsPc8lpOznH7oG3E7_4RIFuFNCAkORiuqvs2Ub-lQU";

  constructor(private recommendservice:RecommenedService,private productService:ProductService,private cartService:CartService,private swPush: SwPush,
    private newsletterService: NewsletterService) { }

  ngOnInit(): void {
    if(sessionStorage.getItem('user_name')){
      this.user_name = sessionStorage.getItem('user_name');
      this.user_id = sessionStorage.getItem('user_id');
      // this.checklogin = true;
    }else{
      if(localStorage.getItem('user_name')){
        this.user_name = localStorage.getItem('user_name');
        this.user_id = localStorage.getItem('user_id');
        // this.checklogin = true;
      }else{
        // this.checklogin = false;
      }
    }
    this.getNewProduct();
    this.getFeaturedProduct();
    this.getRecommendProduct();
    this.getFavoriteProduct();
    this.subscribeToNotifications();
  }

  subscribeToNotifications() {
    this.swPush.requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC_KEY
    })
    .then(sub => this.newsletterService.addPushSubscriber(sub).subscribe())
    .catch(err => console.error("Could not subscribe to notifications", err));
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
      console.log(this.promotions);
    });
  }
  getFeaturedProduct(){
      this.productService.getFeaturedProduct(12).subscribe(
        res=>{
          var r:any = res;
          this.allProductFeatured.next(r.products);
          this.allPromotionF.next(r.promotions);
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
      this.allPromotionF.subscribe(res=>{
        this.promotionsF=res;
        console.log(this.promotionsF);
      });
  }
  getRecommendProduct(){
    if(this.user_id!=''){
      this.recommendservice.getRecommend(this.user_id).subscribe(
        res=>{
          var r:any = res;
          this.allProductRecommend.next(r.products);
          this.allPromotionR.next(r.promotions);
          this.loading = false;
          console.log(this.productsrecommend);
        },
        error=>{
          this.loading = false;
          alert('Có lỗi trong quá trình xử lý thông tin!');
        }
      );
      this.allProductRecommend.subscribe(
        res=>{
          this.productsrecommend = res;
        },
        error=>{
          alert('Có lỗi trong quá trình xử lý thông tin!');
        }
      );
      this.allPromotionR.subscribe(res=>{
        this.promotionsR=res;
      });
    }
  }
  getFavoriteProduct(){
    if(this.user_id!=''){
      this.productService.getFavoriteProduct(this.user_id).subscribe(
        res=>{
          var r:any = res;
          this.allProductFavorite.next(r.products);
          this.allPromotionFR.next(r.promotions);
          this.loading = false;
        },
        error=>{
          this.loading = false;
          alert('Có lỗi trong quá trình xử lý thông tin!');
        }
      );
      this.allProductFavorite.subscribe(
        res=>{
          this.FavoriteProduct = res;
          console.log(this.FavoriteProduct);
        },
        error=>{
          alert('Có lỗi trong quá trình xử lý thông tin!');
        }
      );
      this.allPromotionFR.subscribe(res=>{
        this.promotionsFR=res;
      });
    }
  }
  addtocart(p:Product,promotion:number){
    this.cartService.addtocart(p,promotion);
    showSwal('auto-close','Thêm sản phẩm vào giỏ hàng thành công!');
  }

}
