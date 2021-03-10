import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {SupplierService} from 'src/app/services/supplier.service';
import { Location } from '@angular/common';
declare function showSwal(type,message):any;

@Component({
  selector: 'app-editsupplier',
  templateUrl: './editsupplier.component.html',
  styleUrls: ['./editsupplier.component.css']
})
export class EditsupplierComponent implements OnInit {

  public loading:boolean=false;
  supplier_id;
  supplier_name;
  supplier_email;
  supplier_phone;
  supplier_address;
  oldSupplier;

  constructor(private activatedRoute:ActivatedRoute,private supplierService:SupplierService,private location:Location) { }

  ngOnInit(): void {
    this.supplier_id = this.activatedRoute.snapshot.params['id'];
    this.show();
  }
  show(){
    this.supplierService.getedit(this.supplier_id).subscribe(
      res=>{
        var r : any = res['supplier'];
        this.oldSupplier = r;
        this.supplier_name=this.oldSupplier.supplier_name;
        this.supplier_email=this.oldSupplier.supplier_email;
        this.supplier_phone=this.oldSupplier.supplier_phone;
        this.supplier_address=this.oldSupplier.supplier_address;
      },error=>{
        this.playAudioError();
        showSwal('auto-close','Có lỗi trong quá trình truy xuất dữ liệu!');
      }
    );
  }
  editSupplier(){
    const fd = new FormData();
    fd.append('supplier_id',this.supplier_id);
    fd.append('supplier_name',this.supplier_name);
    fd.append('supplier_email',this.supplier_email);
    fd.append('supplier_phone',this.supplier_phone);
    fd.append('supplier_address',this.supplier_address);
    this.supplierService.postedit(fd).subscribe(
      res=>{
        if(res['success']){
          this.location.back();
          this.playAudioSuccess();
          showSwal('auto-close','Sửa nhà cung cấp thành công!');
        }else{
          showSwal('auto-close',res['error']);
        }
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

  playAudioError(){
    let audio = new Audio();
    audio.src = "../../../assets/sound/error.mp3";
    audio.load();
    audio.play();
  }
}
