import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { WarehouseService } from 'src/app/services/warehouse.service';
declare function showSwal(type,message):any;

@Component({
  selector: 'app-deliverybill',
  templateUrl: './deliverybill.component.html',
  styleUrls: ['./deliverybill.component.css']
})
export class DeliverybillComponent implements OnInit {

  public user_name = "";
  public user_id = '';
  amount:number = 0;
  config: any;
  labelnext = 'Sau';
  labelprevious = 'Trước';
  public deliverybill;
  public  deliverybill_id;
  public  date;
  // public form:boolean=false;
  public products:Product[];
  public allproducts=[];
  public prod_amount;
  public loading:boolean=false;
  public deliveryBills;
  public users;
  public detail;
  public nameproduct;
  public inventory=[];
  public allamount=[];
  public product_amount;


  constructor( private warehouseservies:WarehouseService) { }

  ngOnInit(): void {
    if(localStorage.getItem('user_name')){
      this.user_name=localStorage.getItem('user_name');
      this.user_id=localStorage.getItem('user_id');
    }
    if(sessionStorage.getItem('user_name')){
      this.user_name=sessionStorage.getItem('user_name');
      this.user_id=sessionStorage.getItem('user_id');
    }
    this.getDeliverybill();
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: this.amount 
    };
  }
  // openform(){
  //   this.form=true;
  // }
  getDeliverybill(){
    this.warehouseservies.getDeliverybill().subscribe(
      res=>{
        this.deliveryBills=res['deliveryBill'];
        this.users=res['users'];
        console.log( this.deliveryBills);
      },
      error=>{
        showSwal('auto-close','Có lỗi trong quá trình xử lý thông tin!');
      }
    );
  }
  getdetail(id){
    this.warehouseservies.getDetailDeBill(id).subscribe(
      res=>{
        this.detail=res['detail'];
        this.nameproduct=res['nameproduct'];
        console.log( this.detail);
      },
      error=>{
        showSwal('auto-close','Có lỗi trong quá trình xử lý thông tin!');
      }
    );
  }
  addDeliverybill(){
    this.loading = true;
    const fd = new FormData();
    fd.append('user_id',this.user_id);
    fd.append('date',this.date);
    fd.append('item',JSON.stringify(this.allproducts));
    fd.append('prod_amount',JSON.stringify(this.allamount));
    this.warehouseservies.addDeliverybill(fd).subscribe(
      res=>{
        console.log(res['message']);
        this.loading = false;
        this.playAudioSuccess();
        this.allproducts.splice(0, this.allproducts.length);
        this.getDeliverybill();
        showSwal('auto-close','Tạo phiếu xuất hàng thành công!');
      },
      error=>{
        this.loading = false;
        this.playAudioError();
        showSwal('auto-close','Có lỗi trong quá trình xử lý thông tin!');
      }
    );
  }
  addproducts(p,amount){
    const fd = new FormData();
    fd.append('prod_id',p.prod_id);
    fd.append('amount',amount);
    this.warehouseservies.minus_amount(fd).subscribe(
      res=>{
        this.allproducts.push(p);
        this.allamount.push(amount);
        var pos = this.products.indexOf(p);
        this.products.splice(pos,1);
        showSwal('auto-close','OK!');
      },
      error=>{
        showSwal('auto-close','Có lỗi trong quá trình xử lý thông tin!');
      }
    );
  }
  remove(p,amount){
    const fd = new FormData();
    fd.append('prod_id',p.prod_id);
    fd.append('amount',amount);
    this.warehouseservies.plus_amount(fd).subscribe(
      res=>{
        var pos = this.allproducts.indexOf(p);
        this.allproducts.splice(pos,1);
        this.allamount.splice(pos,1);
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
        this.inventory=res['inventory'];
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
  playAudioError(){
    let audio = new Audio();
    audio.src = "../../../assets/sound/error.mp3";
    audio.load();
    audio.play();
  }

}
