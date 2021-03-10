import { Component, OnInit } from '@angular/core';
import { ShipperService } from 'src/app/services/shipper.service';
declare function showSwal(type,message):any;

@Component({
  selector: 'app-infor',
  templateUrl: './infor.component.html',
  styleUrls: ['./infor.component.css']
})
export class InforComponent implements OnInit {

  amount:number = 0;
  config: any;
  labelnext = 'Sau';
  labelprevious = 'Trước';
  public ships;
  public shipper_phone;
  public orders;
  public shipper_password;
  public shipper_password_cf;

  constructor(private shipperService:ShipperService) { }

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

  editPW(){
    if(this.shipper_password==this.shipper_password_cf){
      const fd = new FormData();
      fd.append('shipper_phone',this.shipper_phone);
      fd.append('shipper_password',this.shipper_password);
      fd.append('shipper_password_cf',this.shipper_password_cf);
      this.shipperService.changePassword(fd).subscribe(
        res=>{
          this.playAudioSuccess();
          showSwal('auto-close','Sửa mật khẩu thành công!');
        document.getElementById('myModal').style.display="none";
        },
        error=>{
          showSwal('auto-close','Có lỗi trong quá trình xử lý thông tin!');
        }
      );
    }else{
      showSwal('auto-close','Mật khẩu không trùng với nhau!');
    }
  }
  updateShip(s){
    if(confirm("Bạn hãy kiểm tra thông tin trước khi giao hàng")){
      const fd = new FormData();
      fd.append('shipper_phone',s.shipper_phone);
      fd.append('order_id',s.order_id);
      this.shipperService.UpdateOrder(fd).subscribe(
        res=>{
          this.playAudioSuccess();
          this.show();
          showSwal('auto-close','Giao hàng thành thành công!');
        },
        error=>{
          showSwal('auto-close','Có lỗi trong quá trình xử lý thông tin!');
        }
      );
    }
  }
  destroyShip(s){
    if(confirm("Bạn có chắc không muốn giao đơn hàng này nữa không")){
      const fd = new FormData();
      fd.append('ship_id',s.ship_id);
      fd.append('order_id',s.order_id);
      this.shipperService.destroyShip(fd).subscribe(
        res=>{
          this.playAudioSuccess();
          this.show();
          showSwal('auto-close','Hủy đơn hàng thành công!');
        },
        error=>{
          showSwal('auto-close','Có lỗi trong quá trình xử lý thông tin!');
        }
      );
    }
  }
  show(){
    this.shipperService.getShip(this.shipper_phone).subscribe(
      res=>{
        this.ships=res['ships'];
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
