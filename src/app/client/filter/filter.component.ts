import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
declare function showSwal(type,message):any;

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  public allproducts = new BehaviorSubject<Product[]>(null);
  public products:Product[] = new Array();
  config: any;
  amount:number = 0;
  labelnext = 'Sau';
  labelprevious = 'Trước';
  public sl_price = '';
  public sl_time = '';
  public sl_featured = '';


  constructor(private productService:ProductService,private cartService:CartService) { }

  ngOnInit(): void {
    this.config = {
      itemsPerPage: 12,
      currentPage: 1,
      totalItems: this.amount
    };
  }

  addtocart(p:Product,promotion:number){
    this.cartService.addtocart(p,promotion);
    showSwal('auto-close','Thêm sản phẩm vào giỏ hàng thành công!');
  }
  pageChanged(event){
    this.config.currentPage = event;
  }
  filter(){
    alert(this.sl_price);
    const fd = new FormData();
    fd.append('sl_price',this.sl_price);
    fd.append('sl_time',this.sl_time);
    fd.append('sl_featured',this.sl_featured);
    this.productService.filter(fd).subscribe(
      res=>{
        var r:any = res;
        this.products = r; 
      },error=>{

      }
    );
  }

}
