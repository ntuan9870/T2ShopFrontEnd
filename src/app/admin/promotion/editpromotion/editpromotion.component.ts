import { Component, OnInit } from '@angular/core';
import {PromotionService} from 'src/app/services/promotion.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
declare function showSwal(type,message):any;

@Component({
  selector: 'app-editpromotion',
  templateUrl: './editpromotion.component.html',
  styleUrls: ['./editpromotion.component.css']
})
export class EditpromotionComponent implements OnInit {
  public promotion_id;
  public promotion;
  public promotion_infor;
  public end_date;
  public start_date;
  public promotion_status;
  public promotion_name='';
  public oldPromotion;

  constructor(private promotionService:PromotionService,private activatedRoute:ActivatedRoute,private location:Location) { }

  ngOnInit(): void {
    this.promotion_id = this.activatedRoute.snapshot.params['id'];
    this.show();
  }
  show(){
    this.promotionService.getedit(this.promotion_id).subscribe(
      res=>{
        var r : any = res['promotion'];
        this.oldPromotion = r;
        this.promotion_name=this.oldPromotion.promotion_name;
        this.promotion_infor=this.oldPromotion.promotion_infor;
        this.promotion_status=this.oldPromotion.promotion_status;
        this.end_date=this.oldPromotion.end_date;
        this.start_date=this.oldPromotion.start_date;
      },error=>{
        showSwal('auto-close','Có lỗi trong quá trình truy xuất dữ liệu!');
      }
    );
  }
  editPromotion(){
    var d = Date.parse(this.start_date);
    var d1 = Date.parse(this.end_date);
    var today= new Date();
    var d2=Date.parse(today.toString());
    // if(d-d2<0){
    //   showSwal('auto-close','Ngày bắt đầu không được nhỏ hơn ngày hiện tại!');
    //   return false;
    // }
    if(d1-d==0){
      showSwal('auto-close','Ngày bắt đầu và ngày kết thúc không được bằng nhau!');
      return false;
    }else{
      if(d1-d<0){
        showSwal('auto-close','ngày kết thúc không nhỏ hơn ngày bắt đầu!');
        return false;
      }
    }
    if(this.promotion_infor<=0){
      showSwal('auto-close','Giá trị không nhỏ hơn hoặc bằng 0!');
      return false;
    }
    // this.loading = true;
    const fd = new FormData();
    fd.append('promotion_id',this.promotion_id);
    fd.append('promotion_name',this.promotion_name);
    fd.append('promotion_status',this.promotion_status);
    fd.append('start_date',this.start_date);
    fd.append('end_date',this.end_date);
    fd.append('promotion_infor',this.promotion_infor);
    this.promotionService.postedit(fd).subscribe(
      res=>{
        // this.loading = false;
        this.location.back();
        this.playAudioSuccess();
        showSwal('auto-close','Sửa khuyến mãi thành công!');
      },
      error=>{
        // this.loading = false;
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

}
