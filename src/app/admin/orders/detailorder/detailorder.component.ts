import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Order } from 'src/app/models/order.model';
import { Orderitem } from 'src/app/models/orderitem.model';
import { User } from 'src/app/models/user.model';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
declare function showSwal(type,message):any;

@Component({
  selector: 'app-detailorder',
  templateUrl: './detailorder.component.html',
  styleUrls: ['./detailorder.component.css']
})
export class DetailorderComponent implements OnInit {

  public order_id = '';
  public user_id = '';
  public order:Order = new Order;
  private allOrderItem = new BehaviorSubject<Orderitem[]>(null);
  public orderitems:Orderitem[] = null;
  public user:User = null;
  public shipper;
  public ship;
  
  constructor(private orderService:OrderService, private activatedRoute:ActivatedRoute, private userService:UserService, private location:Location) { }

  ngOnInit(): void {
    this.order_id = this.activatedRoute.snapshot.params['id'];
    this.user_id = this.activatedRoute.snapshot.params['user_id'];
    this.getUser();
    this.getOrder();
    this.showOrderItem();
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

  getUser(){
    this.userService.getUser(this.user_id).subscribe(
      res=>{
        var r:any = res;
        this.user=r;
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
  quayve(){
    this.location.back();
  }

}
