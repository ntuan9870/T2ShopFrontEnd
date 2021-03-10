import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import {SupplierService} from 'src/app/services/supplier.service';
import { Location } from '@angular/common';
declare function showSwal(type,message):any;

@Component({
  selector: 'app-addsupplier',
  templateUrl: './addsupplier.component.html',
  styleUrls: ['./addsupplier.component.css']
})
export class AddsupplierComponent implements OnInit {

  public loading:boolean=false;
  supplier_name;
  supplier_address;
  supplier_phone;
  supplier_email;

  constructor(private supplierService:SupplierService,private location:Location) { }

  ngOnInit(): void {
  }
  checkphone(phone){
    this.supplierService.checkphone(phone).subscribe(
      res=>{
        console.log(res);
        showSwal('auto-close',res['error']);
      },
      error=>{
        showSwal('auto-close','Có lỗi trong quá trình xử lý thông tin!');
      }
    );
  }
  addSupplier(){
    this.loading = true;
    const fd = new FormData();
    fd.append('supplier_name',this.supplier_name);
    fd.append('supplier_address',this.supplier_address);
    fd.append('supplier_phone',this.supplier_phone);
    fd.append('supplier_email',this.supplier_email);
    this.supplierService.themNCC(fd).subscribe(
      res=>{
        this.loading = false;
        if(res['message']=='success'){
          this.location.back();
          this.playAudioSuccess();
          showSwal('auto-close','Thêm nhà cung cấp thành công!');
        }else{
          showSwal('auto-close',res['error']);
        }
       
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
}
