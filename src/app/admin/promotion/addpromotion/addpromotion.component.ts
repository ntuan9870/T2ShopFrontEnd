import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { from } from 'rxjs';
import {PromotionService} from 'src/app/services/promotion.service';
import { ITS_JUST_ANGULAR } from '@angular/core/src/r3_symbols';
declare function showSwal(type,message):any;

@Component({
  selector: 'app-addpromotion',
  templateUrl: './addpromotion.component.html',
  styleUrls: ['./addpromotion.component.css']
})
export class AddpromotionComponent implements OnInit {

  public promotion_name;
  public promotion_status;
  public start_date;
  public end_date;
  public promotion_infor;
  public loading:boolean = false;
  public check:boolean=true
  

  constructor(private promotionService:PromotionService,private location:Location) { }

  ngOnInit(): void {
    
  }
  status(){
    this.startdate();
  }
  startdate(){
    var today= new Date();
    var d=this.start_date.split("-");
    var d2=today.getDate();
    if(d[2]-d2<0){
      this.playAudioError();
      showSwal('auto-close','Ngày bắt đầu không được nhỏ hơn ngày hiện tại!');
    }
  }
  enddate(){
    var d = Date.parse(this.start_date);
    var d1 = Date.parse(this.end_date);
    if(d1-d==0){
      this.playAudioError();
      showSwal('auto-close','Ngày bắt đầu và ngày kết thúc không được bằng nhau!');
    }
    else{
      if(d1-d<0){
        this.playAudioError();
        showSwal('auto-close','ngày kết thúc không nhỏ hơn ngày bắt đầu!');
      }
    }
  }
  addPromotion(){
    var d = Date.parse(this.start_date);
    var d1 = Date.parse(this.end_date);
    var today= new Date();
    var d2=Date.parse(today.toString());
    this.startdate();
    this.enddate();
    if(this.promotion_infor<=0){
      showSwal('auto-close','Giá trị lớn hơn  0!');
      return false;
    }
    this.loading = true;
    const fd = new FormData();
    fd.append('promotion_name',this.promotion_name);
    fd.append('promotion_status',this.promotion_status);
    fd.append('start_date',this.start_date);
    fd.append('end_date',this.end_date);
    fd.append('promotion_infor',this.promotion_infor);
    this.promotionService.themkm(fd).subscribe(
      res=>{
        this.loading = false;
        this.location.back();
        this.playAudioSuccess();
        showSwal('auto-close','Thêm khuyến mãi thành công!');
      },
      error=>{
        this.loading = false;
        showSwal('auto-close','Có lỗi trong quá trình xử lý thông tin!');
      }
    );
  }
  playAudioSuccess(){
    let audio = new Audio();
    audio.src = "../../../assets/sound/success.mp3";
    audio.load();
    audio.play();
  }
  playAudioError(){
    let audio = new Audio();
    audio.src = "../../../assets/sound/error.mp3";
    audio.load();
    audio.play();
  }
  
}
