import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { VoucherService } from 'src/app/services/voucher.service';
declare function showSwal(type,message):any;

@Component({
  selector: 'app-addvoucher',
  templateUrl: './addvoucher.component.html',
  styleUrls: ['./addvoucher.component.css']
})
export class AddvoucherComponent implements OnInit {

  public voucher_name = '';
  public loading = false;
  public checksameu = '';
  public checksamev = '';
  public voucher_start = '2020-01-01';
  public voucher_end = '2020-01-02';
  public old_voucher_start = '2020-01-01';
  public old_voucher_end = '2020-01-02';
  public voucher_score:number = 1;
  public voucher_apply = true;
  public voucher_discount = 10000;
  public voucher_price = 0;
  public voucher_total:number = 1;
  public select_discount = '0';
  public dt = new Date();

  constructor(private voucherService:VoucherService, public location:Location) { }

  ngOnInit(): void {
    var dt = new Date()
    this.voucher_start = this.dateFormat(dt,'YYYY-MM-DD');
    dt.setDate(dt.getDate() + 1);
    this.voucher_end = this.dateFormat(dt,'YYYY-MM-DD');
    this.old_voucher_start = this.voucher_start;
    this.old_voucher_end = this.voucher_end;
  }
  addVoucher(){
    const fd = new FormData();
    fd.append('voucher_name', this.voucher_name);
    fd.append('voucher_score', this.voucher_score.toString());
    fd.append('voucher_start', this.voucher_start);
    fd.append('voucher_end', this.voucher_end);
    fd.append('voucher_apply',this.voucher_apply.toString());
    fd.append('select_discount',this.select_discount);
    fd.append('voucher_discount',this.voucher_discount.toString());
    fd.append('voucher_total',this.voucher_total.toString());
    fd.append('voucher_price',this.voucher_discount.toString());
    this.voucherService.addVoucher(fd).subscribe(
      res=>{
        this.location.back();
        showSwal('auto-close','Thêm Voucher thành công!');
      },error=>{
        showSwal('auto-close','Không thành công!');
      }
    );
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

  checkvoucherscore(){
    if(this.voucher_score < 1 && this.voucher_score!=null){
      this.voucher_score = 1;
    }
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

  vouchertotalchange(){
    if(this.voucher_total < 1 && this.voucher_total!=null){
      this.voucher_total = 1;
    }
  }

}
