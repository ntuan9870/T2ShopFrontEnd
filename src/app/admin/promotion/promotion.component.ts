import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {PromotionService} from 'src/app/services/promotion.service';
import { getLocaleMonthNames } from '@angular/common';
declare function showSwal(type,message):any;

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.css']
})
export class PromotionComponent implements OnInit {

  public promotion;
  amount:number = 0;
  config: any;
  labelnext = 'Sau';
  labelprevious = 'Trước';
  end=[];

  constructor(private http:HttpClient,private promotionService:PromotionService) { }

  ngOnInit(): void {
    this.show();
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: this.amount 
    };
  }
  show(){
    this.http.get('http://localhost:8000/api/promotion/show').subscribe(
  		res=>{
  			// var r : any = res;
          this.promotion = res['promotion'];
          this.check();
        	// console.log(this.current_orders);
  		}, error=>{
	        showSwal('auto-close','Có lỗi trong quá trình xử lý thông tin!');
	      }
  		);
  }
  check(){
    var today= new Date();
    var d1=today.getDate();
    for(var pop in this.promotion){
      for(var i in this.promotion[pop] ){
        if(i=='end_date'){
          var d=this.promotion[pop]['end_date'].split("-");
          if(d[0]>today.getFullYear()){
            this.end.push('cl');
          }else{
            if(d[0]==today.getFullYear()&&d[1]==today.getMonth()+1){
              this.end.push(d[2]-d1);
            }else{
              this.end.push('cl');
            }
          }
        }
      }
    }
    console.log(this.end);
  }

  trackByFn(index, item) {
    return index;
  }
  pageChanged(event){
    this.config.currentPage = event;
  }
  removePromotion(p){
    if(confirm('Bạn chắc chắn muốn xóa khuyến mãi này không')){
      this.promotionService.remove(p.promotion_id).subscribe(
        res=>{
          this.show();
          showSwal('auto-close','Xóa khuyến mãi thành công!');
        },error=>{
          showSwal('auto-close','Có lỗi trong quá trình truy xuất dữ liệu!');
        }
      );
    }
  }
  
  editstatus(p){
    if(confirm('Bạn chắc chắn chưa')){
        this.promotionService.status(p.promotion_id).subscribe(
          res=>{
            this.show();
            showSwal('auto-close','Cập nhật khuyến mãi thành công!');
          },error=>{
            showSwal('auto-close','Có lỗi trong quá trình truy xuất dữ liệu!');
          }
        );
    }
  }
}
