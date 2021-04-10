import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, from } from 'rxjs';
import {WarehouseService} from 'src/app/services/warehouse.service';
import { Location } from '@angular/common';
import { Product } from 'src/app/models/product.model';
import { Category } from 'src/app/models/category.model';
import { HttpClient } from '@angular/common/http';
import { ProductService } from 'src/app/services/product.service';
import { Detailballotimport } from 'src/app/models/detailballotimport.model';
import { threadId } from 'worker_threads';
import { Ballotimport } from 'src/app/models/ballotimport.model';
// import {Popup} from 'ng2-opd-popup';
declare function showSwal(type,message):any;
declare var $;

@Component({
  selector: 'app-addwarehouse',
  templateUrl: './addwarehouse.component.html',
  styleUrls: ['./addwarehouse.component.css']
})
export class AddwarehouseComponent implements OnInit {
  @ViewChild('numberProductElement') numberProductElement:ElementRef; 
  @ViewChild('priceProductElement') priceProductElement:ElementRef; 
  @ViewChild('txtKeyword2') txtKeyword:ElementRef;
  @ViewChild('myModal') myModal:ElementRef;

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
  public warehouses = [];
  categorys:Category[];
  public selectedWH;
  public inventory=[];
  public allProducts = new BehaviorSubject<Product[]>(null);
  public searched_products : Product[];
  public selected_entries = 0;
  public ip_s = "";
  public show_option_product = false;
  public product_selected : Detailballotimport[] = [];
  public price_element = "";
  public amount_element = "";
  public pr_sl:Product = new Product; 
  public same_product = false;
  public ngaylapphieu = "";
  public am = 0;
  public user_name = "";
  public user_id = "";
  public allBI = new BehaviorSubject<Ballotimport[]>(null);
  public ballotImports:Ballotimport[] = [];
  public allDBI = new BehaviorSubject<Detailballotimport[]>(null);
  public detailBallotImports:Detailballotimport[] = [];

  constructor( private warehouseservies:WarehouseService,private location:Location,private http:HttpClient, private productService:ProductService, private changeDetection: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getCate();
    this.getwarehouse();
    this.getAllBI();
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: this.amount 
    };
    this.ngaylapphieu = this.dateFormat(new Date(),'YYYY-MM-DD');
    if(localStorage.getItem('user_id')){
      this.user_name =  localStorage.getItem('user_name');
      this.user_id =  localStorage.getItem('user_id');
    }
    if(sessionStorage.getItem('user_id')){
      this.user_name =  sessionStorage.getItem('user_name');
      this.user_id =  localStorage.getItem('user_id');
    }
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
    const fd = new FormData();
    var s = JSON.stringify(this.product_selected); 
    fd.append('product', s);
    fd.append('user_id', this.user_id.toString());
    fd.append('wh_id', this.selectedWH.toString());
    fd.append('sum_amount', this.am.toString());
    var s1 = 0;
    for(var i = 0; i < this.product_selected.length; i++){
      s1+=this.product_selected[i].amount;
    }
    for(var i = 0; i < this.warehouses.length; i++){
      if(this.warehouses[i].empty < s1){
        showSwal('auto-close','Kho đầy rồi!');
        return;
      }
    }
    fd.append('sum_product', s1.toString());
    this.warehouseservies.importProductWH(fd).subscribe(
      res=>{
        if(res['message']=="success"){
          this.product_selected = [];
          // this.myModal.nativeElement.modal('hide');
          $('#myModal').modal('hide');
          showSwal('auto-close','Thêm phiếu nhập thành công!');
        }else{
          showSwal('auto-close','Đã xảy ra lỗi');
        }
      },error=>{
        showSwal('auto-close','Có lỗi trong quá trình xử lý thông tin!');
      }
    );
  }
  addProductWareHouse2(){
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
  search(event, txtKeyword){
    if(event.key=='ArrowDown' || event.key=='ArrowUp'){
      return;
    }
    if(txtKeyword == ""){
      this.searched_products = null;
      return;
    }
    if(event.key=='Enter'){
      this.show_option_product = false;
      this.numberProductElement.nativeElement.focus();
      this.ip_s = this.searched_products[this.selected_entries].product_name;
      this.pr_sl = this.searched_products[this.selected_entries];
      console.log(this.pr_sl.product_name);
      return;
    }
    this.show_option_product = true;
    const fd = new FormData();
    fd.append('key',txtKeyword);
    this.productService.getFromDB(fd).subscribe(res=>{
        var r:any = res;
        this.allProducts.next(r.products);
    });
    this.allProducts.subscribe(res=>{
      this.searched_products=res;
    });
    this.selected_entries=0;
  }

  moveDown(){
    if(this.selected_entries<this.searched_products.length-1){
      this.selected_entries+=1;
      this.ip_s = this.searched_products[this.selected_entries].product_name;
    }
  }
  moveUp(){
    if(this.selected_entries>0){
      this.selected_entries-=1;
      this.ip_s = this.searched_products[this.selected_entries].product_name;
    }
  }
  enterNumber(){
    if(this.amount_element==''){
      return;
    }
    this.priceProductElement.nativeElement.focus();
  }
  enterPrice(){
    if(!this.validateAddElement()){
      return;
    }else{
      var b:Detailballotimport = new Detailballotimport;
      b.product = this.pr_sl;
      b.price = this.price_element;
      b.amount = this.amount_element;
      this.product_selected.push(b);
      this.pr_sl = new Product;
      this.ip_s = "";
      this.amount_element = "";
      this.price_element = "";
      this.changeSumAmount();
      this.txtKeyword.nativeElement.focus();
    }
  }
  findIndexToUpdate(newItem) { 
    return newItem.id === this;
  }
  validateAddElement(){
    if(!this.validateName()||!this.validateAmount()||!this.validatePrice()){
      return false;
    }
    return true;
  }
  validateName(){
    this.same_product = false;
    for(var i = 0; i < this.product_selected.length; i++){
      if(this.pr_sl.product_id == this.product_selected[i].product.product_id){
        this.same_product = true;
        return false;
      }
    }
    if(this.ip_s==""){
      this.txtKeyword.nativeElement.style.borderColor =  'red';
      return false;
    }else{
      this.txtKeyword.nativeElement.style.borderColor =  '#ced4da';
      return true;
    }
    return true;
  }
  validateAmount(){
    if(this.amount_element==""||this.amount_element==null){
      this.numberProductElement.nativeElement.style.borderColor =  'red';
      return false;
    }else{
      this.numberProductElement.nativeElement.style.borderColor =  '#ced4da';
      return true;
    }
  }
  validatePrice(){
    if(this.price_element==""||this.price_element==null){
      this.priceProductElement.nativeElement.style.borderColor =  'red';
      return false;
    }else{
      this.priceProductElement.nativeElement.style.borderColor =  '#ced4da';
      return true;
    }
  }
  changeAmount(id){
    for(var i = 0; i < this.product_selected.length; i++){
      if(this.product_selected[i].product.product_id==id){
        if(this.product_selected[i].amount <= 0){
          this.product_selected[i].amount = 1;
        }
      }
    }
    this.changeSumAmount();
  }
  changeSumAmount(){
    var sum = 0;
    for(var i = 0; i < this.product_selected.length; i++){
      sum += this.product_selected[i].amount*this.product_selected[i].product.product_price;
    }
    // var formatter = new Intl.NumberFormat('vi', {
    //   style: 'currency',
    //   currency: 'VND'
    // });
    this.am = sum;
  }
  dateFormat(dt:Date, f:string){
    var y:string = '';
    var m:string = '';
    var d:string = '';
    if(dt.getMonth() < 10){
      m = '0'+(dt.getMonth()+1);
    }else{
      m = ''+(dt.getMonth()+1);
    }
    if(dt.getDate() < 10){
      d = '0'+(dt.getDate());
    }else{
      d = ''+(dt.getDate());
    }
    y = '' + dt.getFullYear();
    switch(f){
      case 'YYYY-MM-DD':
        return y + '-' + m + '-'+d;
      case 'DD-MM-YYYY':
        return d + '-' + m + '-'+y;
      default:
        return y + '-' + m + '-'+d;
    }
  }
  getAllBI(){
    this.warehouseservies.getAllBI().subscribe(res=>{
      var r:any = res;
      this.allBI.next(r.bis);
    });
    this.allBI.subscribe(res=>{
      this.ballotImports=res;
    });
  }
  getAllBDIByBIID(bi_id_dt){
    this.warehouseservies.getAllBDIByBIID(bi_id_dt).subscribe(res=>{
      var r:any = res;
      this.allDBI.next(r.dbis);
    });
    this.allDBI.subscribe(res=>{
      this.detailBallotImports=res;
    });
  }
}
