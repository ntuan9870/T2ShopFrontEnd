import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {WarehouseService} from 'src/app/services/warehouse.service';
declare function showSwal(type,message):any;

@Component({
  selector: 'app-orderwarehouse',
  templateUrl: './orderwarehouse.component.html',
  styleUrls: ['./orderwarehouse.component.css']
})
export class OrderwarehouseComponent implements OnInit {

  OrderWH_id=" ";
  orderWH;
  amount:number = 0;
  config: any;
  labelnext = 'Sau';
  labelprevious = 'Trước';

  constructor(private http:HttpClient,private warehouseservies:WarehouseService) { }

  ngOnInit(): void {
    this.show();
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: this.amount 
    };
  }
  show(){
    this.http.get('http://localhost:8000/api/warehouse/getOrderWareHouse').subscribe(
      res=>{
        this.orderWH=res['orderWH']; 
      },
      error=>{
        showSwal('auto-close','Có lỗi trong quá trình xử lý thông tin!');
      }
    );
  }
  timkiem(){
    console.log(this.OrderWH_id);
    if(this.OrderWH_id!=" "){
      this.http.get('http://localhost:8000/api/warehouse/getOrderWH/'+this.OrderWH_id).subscribe(
        res=>{
          this.orderWH=res['orderWH'];
        }
      );
    }else{
      this.show();
    }
   
  }
  remove(o){
    if(confirm('Bạn chắc chắn muốn hủy phiếu đặt hàng này không')){
      this.warehouseservies.remove(o.orderWh_id).subscribe(
        res=>{
          this.show();
          this.playAudioSuccess();
          showSwal('auto-close','Hủy phiếu đặt hàng  thành công!');
        },error=>{
          showSwal('auto-close','Có lỗi trong quá trình truy xuất dữ liệu!');
        }
      );
    }
  }
  update(o){
    if(confirm('Bạn chắc chắn hàng đã tới chưa')){
      this.warehouseservies.update(o.orderWh_id).subscribe(
        res=>{
          this.show();
          this.playAudioSuccess();
          showSwal('auto-close','cập nhật đặt hàng thành công!');
        },error=>{
          showSwal('auto-close','Có lỗi trong quá trình truy xuất dữ liệu!');
        }
      );
    }
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
  playAudioError(){
    let audio = new Audio();
    audio.src = "../../../assets/sound/error.mp3";
    audio.load();
    audio.play();
  }

}
