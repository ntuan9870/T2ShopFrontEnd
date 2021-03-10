import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShipperService } from 'src/app/services/shipper.service';
declare function showSwal(type,message):any;

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  amount:number = 0;
  config: any;
  labelnext = 'Sau';
  labelprevious = 'Trước';
  public orders;
  public shipper_phone;

  constructor(private shipperService:ShipperService , private router:Router) { }
 
  ngOnInit(): void {
    if(sessionStorage.getItem('shipper_phone')){
      this.shipper_phone = sessionStorage.getItem('shipper_phone');
    }else{
      if(localStorage.getItem('shipper_phone')){
        this.shipper_phone = sessionStorage.getItem('shipper_phone');
      }
    }
    this.show();
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: this.amount 
    };
  }

  take(o){
    console.log(this.shipper_phone);
    const fd = new FormData();
    fd.append('order_id',o.order_id);
    fd.append('shipper_phone',this.shipper_phone);
    this.shipperService.addShip(fd).subscribe(
      res=>{
        this.playAudioSuccess();
        this.show();
        // this.router.navigate(['../../shipperinfor']);
        showSwal('auto-close','Nhận đơn hàng thành công!');
      },
      error=>{
        showSwal('auto-close','Có lỗi trong quá trình xử lý thông tin!');
      }
    );
  }

  show(){
    this.shipperService.getOrder().subscribe(
      res=>{
        this.orders=res['orders'];
      },
      error=>{
        showSwal('auto-close','Có lỗi trong quá trình xử lý thông tin!');
      }
    );
  }
  trackByFn(index, item) {
    return index;
  }
  pageChanged(event){
    this.config.currentPage = event;
  }
  playAudioSuccess(){
    let audio = new Audio();
    audio.src = "../../../assets/sound/success.mp3";
    audio.load();
    audio.play();
  }

}
