import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {WarehouseService} from 'src/app/services/warehouse.service';
import { Location } from '@angular/common';
declare function showSwal(type,message):any;

@Component({
  selector: 'app-detailorderwarehouse',
  templateUrl: './detailorderwarehouse.component.html',
  styleUrls: ['./detailorderwarehouse.component.css']
})
export class DetailorderwarehouseComponent implements OnInit {
  public orderWh_id;
  public orderWh;
  public detail;
  public user;
  public supplier;
  amount:number = 0;
  config: any;
  labelnext = 'Sau';
  labelprevious = 'Trước';


  constructor(private activatedRoute:ActivatedRoute,private warehouseservies:WarehouseService , private location:Location) { }

  ngOnInit(): void {
    this.orderWh_id = this.activatedRoute.snapshot.params['id'];
    this.infor();
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: this.amount 
    };
  }
  infor(){
    this.warehouseservies.getdetail(this.orderWh_id).subscribe(
      res=>{
        // console.log( res['supplier']);
        // const mapped = Object.entries( res['orderWh']).map(([type, value]) => ({type, value}));
        // this.orderWh=mapped;
        this.supplier=res['supplier'];
        this.user=res['user'];
        this.orderWh=res['orderWh'];
        this.detail=res['detail'];
        // console.log(mapped);
      },
      error=>{
        showSwal('auto-close','Có lỗi trong quá trình xử lý thông tin!');
      }
    );
  }
  trackByFn(index, item) {
    return index;
  }
  pageChanged(event){
    this.config.currentPage = event;
  }
  quayve(){
    this.location.back();
  }

}
