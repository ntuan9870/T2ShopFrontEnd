import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Voucher } from 'src/app/models/voucher.model';
import { VoucherService } from 'src/app/services/voucher.service';
declare function showSwal(type,message):any;

@Component({
  selector: 'app-vouchers',
  templateUrl: './vouchers.component.html',
  styleUrls: ['./vouchers.component.css']
})
export class VouchersComponent implements OnInit {
  
  config: any;
  amount:number = 0;
  labelnext = 'Sau';
  labelprevious = 'Trước';
  allVouchers = new BehaviorSubject<Voucher[]>(null);
  vouchers:Voucher[];


  constructor(private voucherService:VoucherService) { }

  ngOnInit(): void {
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: this.amount
    };
    this.show();
  }
  show(){
    this.voucherService.showVoucher().subscribe(
      res=>{
        var r:any = res;
        this.allVouchers.next(r.vouchers);
      },error=>{
        alert('Có lỗi trong quá trình truy xuất dữ liệu!');
      }
    );
    this.allVouchers.subscribe(
      res=>{
        this.vouchers = res;
      }
    );
  }

  pageChanged(event){
    this.config.currentPage = event;
  }

  changeAppply(voucher_id){
    this.voucherService.changeApply(voucher_id).subscribe(
      res=>{
        if(res['message']=='success'){
          showSwal('auto-close','Thay đổi thành công!');
        }
      },error=>{

      }
    );
  }
  removeVoucher(voucher_id){
    if(confirm('Bạn chắc chắn muốn xóa à?')){
      this.voucherService.removeVoucher(voucher_id).subscribe(
        res=>{
          if(res['message']=='success'){
            this.show();
            showSwal('auto-close','Xóa thành công!');
          }
        },error=>{
          alert('Có lỗi!');
        }
      );
    }
  }

}
