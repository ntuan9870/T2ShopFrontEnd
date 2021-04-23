import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { StoreWarehouse } from 'src/app/models/store-warehouse.class';
import { StoreWHInventory } from 'src/app/models/store-whinventory.model';
import { StoreService } from 'src/app/services/store.service';
declare function showSwal(type,message):any;
declare var $;

@Component({
  selector: 'app-whstore',
  templateUrl: './whstore.component.html',
  styleUrls: ['./whstore.component.css']
})
export class WhstoreComponent implements OnInit {

  config: any;
  amount:number = 0;
  labelnext = 'Sau';
  labelprevious = 'Trước';
  public allWareHouse = new BehaviorSubject<StoreWarehouse[]>(null);
  public ws:StoreWarehouse[] = [];
  public store_id = '';
  public wh_unit = '';
  public wh_capacity:number = 1;
  public loading=false;
  public wh_store_edit_old:StoreWarehouse = new StoreWarehouse;
  public wh_store_edit:StoreWarehouse = new StoreWarehouse;
  public edit_wh_capacity='';
  public edit_wh_empty='';
  public edit_wh_unit='';
  public allP = new BehaviorSubject<StoreWHInventory[]>(null);
  public ps:StoreWHInventory[] = [];
  constructor(private storeService:StoreService, private routeActive:ActivatedRoute) { }

  ngOnInit(): void {
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: this.amount
    };
    this.store_id = this.routeActive.snapshot.params['id'];
    this.show();
  }

  pageChanged(event){
    this.config.currentPage = event;
  }

  show(){
    this.storeService.showStoreWarehouse(this.store_id).subscribe(
      res=>{
        var r:any = res;
        this.allWareHouse.next(r.warehouses);
      },error=>{
        alert('Có lỗi trong quá trình truy xuất dữ liệu!');
      }
    );
    this.allWareHouse.subscribe(
      res=>{
        this.ws = res;
      }
    );
  }
  checkCapacity(){
    if(this.wh_capacity<1&&this.wh_capacity.toString()!=''){
      this.wh_capacity = 1;
    }
  }
  addStoreWareHouse(){
    const fd = new FormData();
    fd.append('store_id', this.store_id);
    fd.append('wh_capacity', this.wh_capacity.toString());
    fd.append('wh_unit', this.wh_unit);
    this.storeService.addStoreWareHouse(fd).subscribe(
      res=>{
        if(res['message']=='success'){
          $('#addModal').modal('hide');
          this.show();
          showSwal('auto-close', 'Thêm kho thành công!');
        }else{  
          alert('Có lỗi');
        }
      },error=>{
        alert('Có lỗi truy xuất dữ liệu!');
      }
    );
  }

  getEditWH(store_wh_id){
    this.storeService.getStoreWarehouseByID(store_wh_id).subscribe(
      res=>{
        if(res['message']=='success'){
          this.wh_store_edit_old = res['store_warehouse'];
          this.edit_wh_unit = this.wh_store_edit_old.wh_unit;
          this.edit_wh_capacity = this.wh_store_edit_old.wh_capacity;
          this.edit_wh_empty = this.wh_store_edit_old.wh_empty;
        }
      },error=>{
        alert('Có lỗi truy xuất dữ liệu!');
      }
    );
  }

  editWH(){
    if(this.edit_wh_capacity==this.wh_store_edit_old.wh_capacity
      &&this.edit_wh_unit==this.wh_store_edit_old.wh_unit){
        $('#editModal').modal('hide');
        showSwal('auto-close','Bạn không đổi gì cả!');
    }else{
      const fd = new FormData();
      fd.append('store_wh_id',this.wh_store_edit_old.store_wh_id);
      fd.append('wh_capacity',this.edit_wh_capacity);
      fd.append('wh_unit',this.edit_wh_unit);
      this.storeService.editWH(fd).subscribe(
        res=>{
          if(res['message']=='success'){
            $('#editModal').modal('hide');
            this.show();
            showSwal('auto-close', 'Sửa thông tin thành công!');
          }else{
            alert('Lỗi');
          }
        },error=>{
          alert('Lỗi truy xuất dữ liệu!');
        }
      );
    }
  }

  checkCapacityEdit(){
    if(this.wh_store_edit.wh_capacity<1&&this.wh_store_edit.wh_capacity.toString()!=''){
      this.wh_store_edit.wh_capacity = 1;
    }
  }

  getAllP(store_wh_id){
    this.storeService.getAllP(store_wh_id).subscribe(res=>{
      var r:any = res;
      this.allP.next(r.ps);
    });
    this.allP.subscribe(res=>{
      this.ps=res;
    });
  }

}
