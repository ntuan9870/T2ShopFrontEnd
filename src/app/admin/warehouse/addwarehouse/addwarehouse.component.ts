import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import {WarehouseService} from 'src/app/services/warehouse.service';
import { Location } from '@angular/common';
import { Product } from 'src/app/models/product.model';
import { Category } from 'src/app/models/category.model';
import { HttpClient } from '@angular/common/http';
// import {Popup} from 'ng2-opd-popup';
declare function showSwal(type,message):any;
declare var $;

@Component({
  selector: 'app-addwarehouse',
  templateUrl: './addwarehouse.component.html',
  styleUrls: ['./addwarehouse.component.css']
})
export class AddwarehouseComponent implements OnInit {

  public loading:boolean=false;
  products : Product[];
  amount:number = 0;
  config: any;
  labelnext = 'Sau';
  labelprevious = 'Trước';
  public prod_id;
  public prod_name;
  public prod_amount;
  public prod_price;
  public selectedOption;
  public price;
  public warehouses;
  categorys:Category[];
  public selectedWH;
  public inventory=[];
 

  constructor( private warehouseservies:WarehouseService,private location:Location,private http:HttpClient) { }

  ngOnInit(): void {
    this.getCate();
    this.getwarehouse();
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: this.amount 
    };
  }
  timkiem(txtKeyword){
    this.warehouseservies.search(txtKeyword).subscribe(
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
  getCate(){
    this.warehouseservies.getCategory().subscribe(
      res=>{
        this.categorys=res['category'];
        console.log( this.categorys);
      },
      error=>{
        showSwal('auto-close','Có lỗi trong quá trình xử lý thông tin!');
      }
    );
  }
  getwarehouse(){
    this.warehouseservies.getwarehouse().subscribe(
      res=>{
        this.warehouses=res['warehouses'];
        console.log( this.warehouses);
      },
      error=>{
        showSwal('auto-close','Có lỗi trong quá trình xử lý thông tin!');
      }
    );
  }
  checkcapcity(wh_id){
    const fd = new FormData();
    fd.append('wh_id',wh_id);
    fd.append('prod_amount',this.prod_amount.toString());
    this.warehouseservies.checkcapcity(fd).subscribe(
      res=>{
        if(res['message']=='error'){
          showSwal('auto-close','Kho không đủ sức chứa!');
        }
      },
      error=>{
        showSwal('auto-close','Có lỗi trong quá trình xử lý thông tin!');
      }
    );
  }
  check_name(prod_name){
    const fd = new FormData();
    fd.append('prod_name',prod_name);
    this.warehouseservies.checkname(fd).subscribe(
      res=>{
        if(res['message']=='error'){
          showSwal('auto-close','Tên sản phẩm đã có trong kho!');
        }
      },
      error=>{
        showSwal('auto-close','Có lỗi trong quá trình xử lý thông tin!');
      }
    );
  }
  addProductWareHouse(){
    this.check_name(this.prod_name);
    this.checkcapcity(this.selectedWH);
    this.loading = true;
    const fd = new FormData();
    // fd.append('prod_id',this.prod_id);
    fd.append('cate_id',this.selectedOption.toString());
    fd.append('prod_name',this.prod_name);
    fd.append('price',this.price);
    fd.append('prod_amount',this.prod_amount.toString());
    fd.append('prod_price',this.prod_price.toString());
    fd.append('wh_id',this.selectedWH.toString());
    this.warehouseservies.postProductWH(fd).subscribe(
      res=>{
        this.loading = false;
        if(res['message']=='success'){
          this.playAudioSuccess();
          $('#myModal').modal('hide');
          showSwal('auto-close','Thêm hàng vào kho thành công!');
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
  updateamount(amount,id){
    if(amount>0){
      this.http.post('http://localhost:8000/api/warehouse/updateProductWH/amount',{
        prod_id:id,
        prod_amount:amount,
      }).subscribe(
        res=>{
          if(res['message']='success'){
            this.playAudioSuccess();
            showSwal('auto-close','Cập nhật số lượng của mặt hàng trong kho thành công!');
          }else{
            this.playAudioError();
            showSwal('auto-close','Kho không thể chứa thêm vui lòng kiểm tra lại!');
          }
        },
        error=>{
          // this.loading = false;
          showSwal('auto-close','Có lỗi trong quá trình xử lý thông tin!');
        }
      );
    }else{
      this.playAudioError();
    }
  }
  updateprice(price,id){
    if(price>0){
      this.http.post('http://localhost:8000/api/warehouse/updateProductWH/price',{
      prod_id:id,
      prod_price:price,
    }).subscribe(
      res=>{
        this.playAudioSuccess();
        showSwal('auto-close','Cập nhật tiền của mặt hàng trong kho thành công!');
      },
      error=>{
        // this.loading = false;
        showSwal('auto-close','Có lỗi trong quá trình xử lý thông tin!');
      }
    );
    }else{
      this.playAudioError();
    }
    
  }
  playAudioSuccess(){
    let audio = new Audio();
    audio.src = "../../../assets/sound/success.mp3";
    audio.load();
    audio.play();
  }
  playAudioError(){
    let audio = new Audio();
    audio.src = "../../../assets/sound/error.mp3";
    audio.load();
    audio.play();
  }
  trackByFn(index, item) {
    return index;
  }
  pageChanged(event){
    this.config.currentPage = event;
  }
  ClickButton(){
    // this.popup.show();
  }

}
