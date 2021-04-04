import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Product } from 'src/app/models/product.model';
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
  public productCate:Product[];

  constructor(private recommendservice:RecommenedService,private productService:ProductService, private routeActivated:ActivatedRoute,private cartService:CartService) {}

  ngOnInit(): void {
    this.routeActivated.params.subscribe(routeParams => {
      this.getAll(routeParams.key);
      this.getCategory(routeParams.key);
    });
    this.config = {
      itemsPerPage: 12,
      currentPage: 1,
      totalItems: this.amount
    };
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
       this.productCate=res['productCate'];
      },
      error=>{
        alert('Error');
      }
    );
  }
  check(){
    if(this.productCate.length>0){
      for(var i=0; i<=this.productCate.length;i++){
        console.log(this.productCate[i].category_name);
      }
    }
  }
}
