import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Voucher } from 'src/app/models/voucher.model';
import { VoucherService } from 'src/app/services/voucher.service';
declare function showSwal(type,message):any;

@Component({
  selector: 'app-edit-voucher',
  templateUrl: './edit-voucher.component.html',
  styleUrls: ['./edit-voucher.component.css']
})
export class EditVoucherComponent implements OnInit {

  public loading = false;
  public oldVoucher = new Voucher();
  public voucher_id = '';
  public voucher_name = '';
  public voucher_start = '';
  public voucher_end = '';
  public voucher_apply = false;
  public checksameu = '';
  public checksamev = '';
  public old_voucher_start = '';
  public old_voucher_end = '';
  public voucher_total;
  public dt = new Date();
  public voucher_discount = 10000;
  public voucher_price = 0;
  public select_discount = '0';
  public voucher_score:number = 1;
  public sumVouderUsed;

  constructor(private voucherService:VoucherService, private activatedRoute:ActivatedRoute, public location:Location) {}

  ngOnInit(): void {
    this.voucher_id = this.activatedRoute.snapshot.params['id'];
    this.voucherService.getVoucherByID(this.voucher_id).subscribe(
      res=>{
        if(res['voucher']!=null){
          this.oldVoucher = res['voucher'];
          this.old_voucher_start = this.oldVoucher.voucher_start;
          this.old_voucher_end = this.oldVoucher.voucher_end;
          this.voucher_id = this.oldVoucher.voucher_id;
          this.voucher_name = this.oldVoucher.voucher_name;
          this.voucher_score = this.oldVoucher.voucher_score;
          this.voucher_price = this.oldVoucher.voucher_price;
          this.voucher_total=this.oldVoucher.voucher_total;
          if(this.oldVoucher.voucher_discount!=0){
            this.select_discount = '1';
            this.voucher_discount = this.oldVoucher.voucher_discount;
          }else{
            this.select_discount = '0';
            this.voucher_discount = this.oldVoucher.voucher_value;
          }
          this.voucher_start = this.oldVoucher.voucher_start;
          this.voucher_end = this.oldVoucher.voucher_end;
          if(this.oldVoucher.voucher_apply == 'true'){
            this.voucher_apply = true;
          }else{
            this.voucher_apply = false;
          }
        }
      },error=>{
        alert('Có lỗi trong quá trình truy xuất dữ liệu!');
      }
    );
    this.vouchertotalcheck();
  }

  vouchertotalcheck(){
    this.voucherService.getSumVoucherUser(this.voucher_id).subscribe(
      res=>{
        this.sumVouderUsed=res['sum'];
      },error=>{
        showSwal('auto-close','Có lỗi trên Serve!');
      }
    );
  }

  editVoucher(){
    var a = '';
    if(this.voucher_apply == true){
      a = 'true';
    }else{
      a = 'false';
    }
    if(this.voucher_name == this.oldVoucher.voucher_name
      &&this.voucher_start == this.oldVoucher.voucher_start
      &&this.voucher_score == this.oldVoucher.voucher_score
      &&this.voucher_end == this.oldVoucher.voucher_end
      &&this.voucher_discount == this.oldVoucher.voucher_discount
      &&this.voucher_price == this.oldVoucher.voucher_price
      &&a == this.oldVoucher.voucher_apply){
        this.location.back();
        showSwal('auto-close','Bạn không thay đổi gì cả!');
    }
    if(this.voucher_total>this.sumVouderUsed){
      const fd = new FormData();
      fd.append('voucher_id', this.voucher_id);
      fd.append('voucher_name', this.voucher_name);
      fd.append('voucher_score', this.voucher_score.toString());
      fd.append('voucher_price', this.voucher_price.toString());
      fd.append('voucher_discount', this.voucher_discount.toString());
      fd.append('select_discount', this.select_discount);
      fd.append('voucher_start', this.voucher_start);
      fd.append('voucher_end', this.voucher_end);
      fd.append('voucher_apply', this.voucher_apply.toString());
      fd.append('voucher_total', this.voucher_total);
      this.voucherService.editVoucher(fd).subscribe(
        res=>{
          if(res['message']=='success'){
            this.location.back();
            showSwal('auto-close','Sửa thông tin thành công!');
          }
        },error=>{
          this.location.back();
          showSwal('auto-close','Có lỗi trên Serve!');
        }
      );
    }else{
      showSwal('auto-close','Số lượng cần phải lớn hơn số lượng cấp phát cho khách hàng!');
    }
  }
  checkvoucherscore(){
    if(this.voucher_score < 1 && this.voucher_score!=null){
      this.voucher_score = 1;
    }
  }
  checksamevouchername(){
    this.voucherService.checksamevouchername(this.voucher_name).subscribe(
      res=>{
        if(res['message']=='exists'){
          this.checksamev = 'exists';
        }else if(res['message']=='notexists'){
          this.checksamev = 'notexists';
        }
      },error=>{
      }
    );
  }

  checkcorrectstartday(){
    if(this.voucher_start < this.dateFormat(this.dt,'YYYY-MM-DD')){
      this.voucher_start = this.old_voucher_start;
      showSwal('auto-close','Không được chọn ngày quá khứ!');
    }else{
      if(this.voucher_start>=this.voucher_end){
        this.voucher_end = this.addDay(this.voucher_start,1);
      }
      this.old_voucher_start = this.voucher_start;
      this.old_voucher_end = this.voucher_end;
    }
  }
  checkcorrectendday(){
    if(this.voucher_start>=this.voucher_end){
      this.voucher_start = this.old_voucher_start;
      this.voucher_end = this.old_voucher_end;
      showSwal('auto-close','Vui lòng chọn ngày bắt đầu trước ngày kết thúc!');
    }else{
      this.old_voucher_start = this.voucher_start;
      this.old_voucher_end = this.voucher_end;
    }
  }
  dateFormat(dt:Date, f:string){
    var y:string = '';
    var m:string = '';
    var d:string = '';
    if(dt.getMonth() < 10){
      m = '0'+(dt.getMonth()+1);
    }else{
      m = ''+(dt.getMonth()+1);
    }
    if(dt.getDate() < 10){
      d = '0'+(dt.getDate());
    }else{
      d = ''+(dt.getDate());
    }
    y = '' + dt.getFullYear();
    switch(f){
      case 'YYYY-MM-DD':
        return y + '-' + m + '-'+d;
      case 'DD-MM-YYYY':
        return d + '-' + m + '-'+y;
      default:
        return y + '-' + m + '-'+d;
    }
  }

  addDay(d:string, n:number){
    var now = new Date();
    now.setFullYear(parseInt(d.substring(0,4)));
    now.setMonth(parseInt(d.substring(5,7))-1);
    now.setDate(parseInt(d.substring(8,10)));
    now.setDate(now.getDate() + 1);
    return this.dateFormat(now, 'YYYY-MM-DD');
  }

  checkvoucherdiscount(){
    if(this.voucher_discount < 1 && this.voucher_discount != null){
      this.voucher_discount = 1;
    }
    if(this.select_discount == '1'){
      if(this.voucher_discount > 100){
        this.voucher_discount = 100;
      }
    }
  }
  checkvoucherdiscount2(){
    this.checkvoucherdiscount();
    if(this.select_discount == '0'){
      if(this.voucher_discount < 10000){
        this.voucher_discount = 10000;
      }
    }
  }


  voucherpricescore(){
    if(this.voucher_price < 0 && this.voucher_price!=null){
      this.voucher_price = 0;
    }
  }

  changeselectdiscount(){
    if(this.select_discount=='0'){
      this.voucher_discount = 10000;
    }else{
      this.voucher_discount = 1;
    }
  }

}
