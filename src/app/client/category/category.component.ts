import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { Product } from 'src/app/models/product.model';
import { Promotion } from 'src/app/models/promotion.model';
import { CartService } from 'src/app/services/cart.service';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
declare function showSwal(type,message):any;
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  allProduct = new BehaviorSubject<Product[]>(null);
  products:Product[];
  allPromotion = new BehaviorSubject<Promotion[]>(null);
  promotions:Promotion[];
  public id = '';
  category:Category;
  config: any;
  amount:number = 0;
  labelnext = 'Sau';
  labelprevious = 'Trước';
  public sl_featured = '0';
  public sl_filter = '0';

  constructor(private productService:ProductService,private activatedRoute:ActivatedRoute,private categoryService:CategoryService,private router:Router,private cartService:CartService) {
    // this.router.routeReuseStrategy.shouldReuseRoute=()=>false;
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.activatedRoute.params.subscribe(routeParams => {
      this.id = this.activatedRoute.snapshot.params['id'];
      this.getAll(routeParams.id);
    });
    this.config = {
      itemsPerPage: 12,
      currentPage: 1,
      totalItems: this.amount
    };
  }

  pageChanged(event){
    this.config.currentPage = event;
  }

  getAll(id){
    this.getAllProduct(id);
    this.getCategory(id);
  }

  getAllProduct(id){
    const fd = new FormData();
    fd.append('key',"");
    fd.append('id',id);
    fd.append('sl_filter',this.sl_filter);
    fd.append('sl_featured',this.sl_featured);
    this.productService.getFromDB(fd).subscribe(
      res=>{
        var r:any = res;
        this.allProduct.next(r.products);
        this.allPromotion.next(r.promotions);
      }
    );
    this.allProduct.subscribe(
      res=>{
        this.products = res;
      }
    );
    this.allPromotion.subscribe(res=>{
      this.promotions=res;
    });
  }
  getCategory(id){
    this.categoryService.getEdit(id).subscribe(
      res=>{
        var r:any = res;
        this.category = r;
      }
    );
  }
  addtocart(p:Product,promotion:number){
    this.cartService.addtocart(p,promotion);
    showSwal('auto-close','Thêm sản phẩm vào giỏ hàng thành công!');
  }

}
