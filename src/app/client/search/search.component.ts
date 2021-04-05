import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { Category } from 'src/app/models/category.model';
import { Promotion } from 'src/app/models/promotion.model';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { RecommenedService } from 'src/app/services/recommened.service';
declare function showSwal(type,message):any;
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public allproducts = new BehaviorSubject<Product[]>(null);
  public products:Product[];
  allPromotion = new BehaviorSubject<Promotion[]>(null);
  promotions:Promotion[];
  public key = '';
  config: any;
  amount:number = 0;
  labelnext = 'Sau';
  labelprevious = 'Trước';
  public Cate:Category[];
  public user_id='';

  constructor(private recommendservice:RecommenedService,private productService:ProductService, private routeActivated:ActivatedRoute,private cartService:CartService) {}

  ngOnInit(): void {
    this.routeActivated.params.subscribe(routeParams => {
      this.getAll(routeParams.key);
      // this.getCategory(routeParams.key);
    });
    this.config = {
      itemsPerPage: 12,
      currentPage: 1,
      totalItems: this.amount
    };
    this.check();
  }

  addtocart(p:Product,promotion:Number){
    this.cartService.addtocart(p,promotion);
    showSwal('auto-close','Thêm sản phẩm vào giỏ hàng thành công!');
  }

  pageChanged(event){
    this.config.currentPage = event;
  }

  getAll(key){
    this.key = this.routeActivated.snapshot.params['key'];
    const fd = new FormData();
    fd.append('key',key);
    fd.append('id','');
    this.productService.getFromDB(fd).subscribe(
      res=>{
        var r:any = res;
        this.allproducts.next(r.products);
        this.allPromotion.next(r.promotions);
      },
      error=>{
        alert('Error');
      }
    );
    this.allproducts.subscribe(
      res=>{
        this.products = res;
        // this.check();
      },
      error=>{
        alert('Error');
      }
    );
    this.allPromotion.subscribe(
      res=>{
        this.promotions = res;
      },
      error=>{
        alert('Error');
      }
    );
  }
  getCategory(key){
    this.key = this.routeActivated.snapshot.params['key'];
    const fd = new FormData();
    fd.append('key',key);
    // fd.append('id','');
    this.recommendservice.getCategory(fd).subscribe(
      res=>{
       this.Cate=res['productCate'];
       if(this.Cate.length>0){
        this.add();
       }else{
         console.log("không thấy gì");
       }
     
      },
      error=>{
        alert('Error');
      }
    );
  }
  // check(){
  //   if(this.Cate.length>0){
  //     for(var i=0; i<=this.Cate.length;i++){
  //       if(this.key==this.Cate[i].category_name){
  //         this.add();
  //       }
  //     }
  //   }
  // }
  check(){
    if(this.products.length>0){
      this.add();
    }
  }
  add(){
    if(this.user_id != ''){
      this.key = this.routeActivated.snapshot.params['key'];
      const fd = new FormData();
      fd.append('product_id',this.key);
      fd.append('user_id',this.user_id);
      this.recommendservice.add(fd).subscribe(
        res=>{
         console.log(res['message']);
        },error=>{
          alert('Có lỗi trong quá trình xử lý dữ liệu!');
        }
      );
    }
    
  }
}
