import { Component, OnInit } from '@angular/core';
import {SupplierService} from 'src/app/services/supplier.service';
import { ActivatedRoute } from '@angular/router';
import { newArray } from '@angular/compiler/src/util';
import { Location } from '@angular/common';
declare function showSwal(type,message):any;

@Component({
  selector: 'app-detailsupplier',
  templateUrl: './detailsupplier.component.html',
  styleUrls: ['./detailsupplier.component.css']
})
export class DetailsupplierComponent implements OnInit {

  public supplier;
  public supplier_id;
  public cost;
  public money;
  public debt;
  amount:number = 0;
  config: any;
  labelnext = 'Sau';
  labelprevious = 'Trước';
  public order;
  public table_order:boolean=false;
  public table_infor:boolean=true;

  constructor(private activatedRoute:ActivatedRoute,private supplierService:SupplierService,private location: Location) { }

  ngOnInit(): void {
    this.supplier_id = this.activatedRoute.snapshot.params['id'];
    this.infor();
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: this.amount 
    };
  }
  infor(){
    this.table_order=false;
    this.table_infor=true;
    this.supplierService.getdetail(this.supplier_id).subscribe(
      res=>{
        // console.log( res['supplier']);
        // const mapped = Object.entries( res['supplier']).map(([type, value]) => ({type, value}));
        this.supplier=res['supplier'];
        this.cost=res['cost'];
        this.money=res['money'];
        this.debt=res['debt'];
        // console.log(mapped);
      },
      error=>{
        showSwal('auto-close','Có lỗi trong quá trình xử lý thông tin!');
      }
    );
  }
  infororder(){
    this.table_order=true;
    this.table_infor=false;
    this.supplierService.getorder(this.supplier_id).subscribe(
      res=>{
        this.order=res['order'];
      },
      error=>{
        showSwal('auto-close','Có lỗi trong quá trình xử lý thông tin!');
      }
    );
  }
  trackByFn(index, item) {
    return index;
  }
  quaylai(){
    this.location.back();
  }
  
  pageChanged(event){
    this.config.currentPage = event;
  }
}
