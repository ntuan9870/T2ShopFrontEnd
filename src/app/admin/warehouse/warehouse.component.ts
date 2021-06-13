import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {WarehouseService} from 'src/app/services/warehouse.service';
import { Product } from 'src/app/models/product.model';
import { BehaviorSubject } from 'rxjs';
import { Detailballotimport } from 'src/app/models/detailballotimport.model';
import { Ballotimport } from 'src/app/models/ballotimport.model';
import { DetailWHProduct } from 'src/app/models/detail-whproduct.model';
declare function showSwal(type,message):any;
declare var $;

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.css']
})
export class WarehouseComponent implements OnInit {

  public warehouse;
  public warehouse_id;
  public warehouse_name;
  public warehouse_address;
  public capacity;
  public loading:boolean=false;
  amount:number = 0;
  config: any;
  labelnext = 'Sau';
  labelprevious = 'Trước';
  public products;
  public inventory=[];
  public capacity1=[];
  public oldWarehouse;
  public wh_id;
  public wh_id_sl;
  public wh_name;
  public wh_capacity;
  public wh_address;
  public wh_empty;
  public change_capacity;
  public allP = new BehaviorSubject<Product[]>(null);
  public ps:Product[] = [];
  public allDWHP = new BehaviorSubject<DetailWHProduct[]>(null);
  public DWHPs:DetailWHProduct[] = [];

  constructor(private http:HttpClient, private warehouseservies:WarehouseService) { }

  ngOnInit(): void {
    this.show();
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: this.amount 
    };
  }
  getEditWH(wh_id){
    this.warehouseservies.getdetailWH(wh_id).subscribe(
      res=>{
        var r : any = res['warehouse'];
        this.oldWarehouse = r;
        this.wh_id=this.oldWarehouse.warehouse_id;
        this.wh_name=this.oldWarehouse.warehouse_name;
        this.wh_address=this.oldWarehouse.warehouse_address;
        this.wh_capacity=this.oldWarehouse.capacity;
        this.wh_empty=this.oldWarehouse.empty;
      },
      error=>{
        showSwal('auto-close','Có lỗi trong quá trình xử lý thông tin!');
      }
    );
  }
  update_empty(capacity){
    this.wh_empty+=capacity;
    this.wh_capacity+=capacity;
  }
  checkwh_id(wh_id){
    const fd = new FormData();
    fd.append('id',wh_id);
    this.warehouseservies.checkwh_id(fd).subscribe(
      res=>{
        if(res['message']=='error'){
          showSwal('auto-close','Mã kho đã tồn tại!');
        }
      },
      error=>{
        showSwal('auto-close','Có lỗi trong quá trình xử lý thông tin!');
      }
    );
  }
  editWH(){
    this.loading = true;
    const fd = new FormData();
    fd.append('warehouse_id',this.wh_id);
    fd.append('warehouse_name',this.wh_name);
    fd.append('warehouse_address',this.wh_address);
    fd.append('capacity',this.wh_capacity);
    fd.append('empty',this.wh_empty);
    this.warehouseservies.EditWareHouse(fd).subscribe(
      res=>{
        this.loading = false;
        this.playAudioSuccess();
        this.show();
        $('#myModal').modal('hide');
        showSwal('auto-close','Sửa kho thành công!');
      },
      error=>{
        this.loading = false;
        showSwal('auto-close','Có lỗi trong quá trình xử lý thông tin!');
      }
    );
  }
  remove(wh_id){
    if(confirm("Bạn có chắc muốn xóa kho này không?")){
      this.warehouseservies.Removewh(wh_id).subscribe(
        res=>{
          this.playAudioSuccess();
          this.show();
          showSwal('auto-close','Xóa kho thành công!');
        },
        error=>{
          showSwal('auto-close','Có lỗi trong quá trình xử lý thông tin!');
        }
      );
    }
  }
  addWareHouse(){
    this.loading = true;
    const fd = new FormData();
    fd.append('warehouse_id',this.warehouse_id);
    fd.append('warehouse_name',this.warehouse_name);
    fd.append('warehouse_address',this.warehouse_address);
    fd.append('capacity',this.capacity);
    this.warehouseservies.WareHouse(fd).subscribe(
      res=>{
        this.loading = false;
        if(res['message']=='success'){
          this.playAudioSuccess();
          this.show();
          $('#myModal').modal('hide');
          showSwal('auto-close','Thêm kho thành công!');
        }else{
          showSwal('auto-close',res['error']);
        }
       
      },
      error=>{
        this.loading = false;
        showSwal('auto-close','Có lỗi trong quá trình xử lý thông tin!');
      }
    );
  }
  show(){
    this.http.get('http://localhost:8000/api/warehouse/show').subscribe(
  		res=>{
  			// var r : any = res;
          this.warehouse = res['warehouse'];
          // this.capacity1=res['capacity1'];
        	// console.log(this.current_orders);
  		}, error=>{
	        showSwal('auto-close','Có lỗi trong quá trình xử lý thông tin!');
	      }
  		);
  }
  getProductWH(id){
    this.warehouseservies.getProductWH(id).subscribe(
      res=>{
        this.products=res['product'];
        this.inventory=res['inventory'];
        console.log( this.products);
      },
      error=>{
        showSwal('auto-close','Có lỗi trong quá trình xử lý thông tin!');
      }
    );
  }
  timkiem(txtKeyword){
    this.warehouseservies.search(txtKeyword).subscribe(
      res=>{
        this.products=res['product'];
        console.log( this.products);
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
  playAudioSuccess(){
    let audio = new Audio();
    audio.src = "../../../assets/sound/success.mp3";
    audio.load();
    audio.play();
  }
  getAllP(wh_id){
    this.wh_id_sl = wh_id;
    this.warehouseservies.getAllP(wh_id).subscribe(res=>{
      var r:any = res;
      this.allP.next(r.hts);
    });
    this.allP.subscribe(res=>{
      this.ps=res;
    });
  }
  getAllDWHP(product_id){
    this.warehouseservies.getAllDWHP(this.wh_id_sl, product_id).subscribe(res=>{
      var r:any = res;
      this.allDWHP.next(r.dbi);
    });
    this.allDWHP.subscribe(res=>{
      this.DWHPs=res;
      if(res!=null){
        var tmp:DetailWHProduct[] = this.DWHPs;
        this.DWHPs=[];
        for(var i = 0; i < tmp.length; i++){
          var h:DetailWHProduct = new DetailWHProduct;
          h = tmp[i];
          h.created_at = h.created_at.substring(0,10);
          this.DWHPs.push(h);
        }
      }
    });
  }

}
