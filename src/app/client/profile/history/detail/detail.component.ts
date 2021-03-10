import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Order } from 'src/app/models/order.model';
import { Orderitem } from 'src/app/models/orderitem.model';
import { OrderService } from 'src/app/services/order.service';
declare function showSwal(type,message):any;

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  public order_id = '';
  public order:Order = new Order;
  private allOrderItem = new BehaviorSubject<Orderitem[]>(null);
  public orderitems:Orderitem[] = null;
  public shipper;
  public ship;

  constructor(private orderService:OrderService, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.order_id = this.activatedRoute.snapshot.params['id'];
    this.showOrderItem();
    this.getOrder();
    this.getShip();
  }

  getOrder(){
    this.orderService.getOrderById(this.order_id).subscribe(
      res=>{
        var r:any = res;
        this.order = r;
      },error=>{

      }
    );
  }
  getShip(){
    this.orderService.getShip(this.order_id).subscribe(
      res=>{
        // var r:any = res;
        this.shipper = res['shipper'];
        this.ship=res['ship'];
      },error=>{

      }
    );
  }
  showOrderItem(){
    this.orderService.showOrderItem(this.order_id).subscribe(
      res=>{
        var r:any = res;
        this.allOrderItem.next(r.orderitems);
      },error=>{
        showSwal('auto-close','Có lỗi trong quá trình truy xuất dữ liệu!');
      }
    );
    this.allOrderItem.subscribe(
      res=>{
        this.orderitems = res;
      },error=>{
        showSwal('auto-close','Có lỗi trong quá trình truy xuất dữ liệu!');
      }
    );
  }

}
