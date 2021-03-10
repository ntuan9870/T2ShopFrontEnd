import { Component, OnInit } from '@angular/core';
import {SupplierService} from 'src/app/services/supplier.service';
declare function showSwal(type,message):any;

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit {
  public supplier;
  amount:number = 0;
  config: any;
  labelnext = 'Sau';
  labelprevious = 'Trước';

  constructor(private supplierService:SupplierService) { }

  ngOnInit(): void {
    this.show();
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: this.amount 
    };
  }
  show(){
    this.supplierService.show().subscribe(
      res=>{
        this.supplier=res['supplier'];
      },
      error=>{
        showSwal('auto-close','Có lỗi trong quá trình xử lý thông tin!');
      }
    );
  }
  deleteSuppiler(s){
    if(confirm('Bạn chắc chắn muốn xóa nhà cung cấp này không')){
      this.supplierService.remove(s.supplier_id).subscribe(
        res=>{
          this.show();
          this.playAudioSuccess();
          showSwal('auto-close','Xóa nhà cung cấp thành công!');
        },error=>{
          showSwal('auto-close','Có lỗi trong quá trình truy xuất dữ liệu!');
        }
      );
    }
  }
  playAudioSuccess(){
    let audio = new Audio();
    audio.src = "../../../assets/sound/success.mp3";
    audio.load();
    audio.play();
  }
  trackByFn(index, item) {
    return index;
  }
  pageChanged(event){
    this.config.currentPage = event;
  }

}
