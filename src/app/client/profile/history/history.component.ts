import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Order } from 'src/app/models/order.model';
import { OrderService } from 'src/app/services/order.service';
declare function showSwal(type,message):any;
@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  public user_id = '';
  private allOrder = new BehaviorSubject<Order[]>(null);
  public orders:Order[] = null;
  config: any;
  amount:number = 0;
  labelnext = 'Sau';
  labelprevious = 'Trước';

  constructor(private orderService:OrderService) { }

  ngOnInit(): void {
    if(localStorage.getItem('user_id')){
      this.user_id = localStorage.getItem('user_id');
    }else if(sessionStorage.getItem('user_id')){
      this.user_id = sessionStorage.getItem('user_id');
    }
    this.showOrder();
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: this.amount
    };
  }

  pageChanged(event){
    this.config.currentPage = event;
  }

  showOrder(){
    const fd = new FormData();
    fd.append('user_id',this.user_id);
    this.orderService.showorder(fd).subscribe(
      res=>{
        var r:any = res;
        this.allOrder.next(r.orders);
      },error=>{
        showSwal('auto-close','Có lỗi trong quá trình truy xuất dữ liệu!');
      }
    );
    this.allOrder.subscribe(
      res=>{
        this.orders = res;

      },error=>{
        showSwal('auto-close','Có lỗi trong quá trình truy xuất dữ liệu!');
      }
    );
  }

  removeOrder(o:Order){
    if(confirm('Bạn chắc chắn xóa chứ!')){
      if(o.status==1){
        showSwal('auto-close','Bạn không thể xóa đơn hàng chưa được giao');
      }else{
        this.orderService.removeOrder(o.order_id).subscribe(
          res=>{
            this.showOrder();
            showSwal('auto-close','Hủy đơn hàng thành công!');
          },error=>{
            showSwal('auto-close','Có lỗi trong quá trình truy xuất dữ liệu!');
          }
        );
      }
    }
  }

}
