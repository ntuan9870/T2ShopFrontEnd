import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { Promotion } from 'src/app/models/promotion.model';
import { PromotionService } from 'src/app/services/promotion.service';

@Component({
  selector: 'app-promotionmax',
  templateUrl: './promotionmax.component.html',
  styleUrls: ['./promotionmax.component.css']
})
export class PromotionmaxComponent implements OnInit {

  table:boolean=false;
  message:boolean=true;
  products:Product = new Product;
  promotions:Promotion=new Promotion;
  constructor(private promorionservice:PromotionService) { }

  ngOnInit(): void {
    this.show();
  }
  open(){
    this.message=false;
    this.table=true;
    
  }
  close(){
    this.table=false;
    this.message=true;
  }
  show(){
    this.promorionservice.getproduct().subscribe(
      res=>{
       this.products=res['products'];
      //  this.promotions=res['promotions'];
      },
      error=>{
        alert('Có lỗi trong quá trình truy xuất dữ liệu!');
      }
    );
  }

}
