import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Ballotexport } from 'src/app/models/ballotexport.models';
import { Ballotimport } from 'src/app/models/ballotimport.model';
import { CtpxLn } from 'src/app/models/ctpx-ln.models';
import { DetailBallotExport } from 'src/app/models/detail-ballot-export.model';
import { Detailballotimport } from 'src/app/models/detailballotimport.model';
import { Product } from 'src/app/models/product.model';
import { WarehouseService } from 'src/app/services/warehouse.service';
declare function showSwal(type,message):any;
declare var $;

@Component({
  selector: 'app-deliverybill',
  templateUrl: './deliverybill.component.html',
  styleUrls: ['./deliverybill.component.css']
})
export class DeliverybillComponent implements OnInit {
  @ViewChild('txtKeyword2') txtKeyword:ElementRef;

  amount:number = 0;
  config: any;
  labelnext = 'Sau';
  labelprevious = 'Trước';
  public deliverybill;
  public  deliverybill_id;
  public  date;
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
  public ngaylapphieu = "";
  public am = 0;
  public user_name = "";
  public user_id = "";
  public ip_s = "";
  public selected_entries = 0;
  public allProducts = new BehaviorSubject<Product[]>(null);
  public searched_products : Product[];
  public show_option_product = false;
  public warehouses = [];
  public selectedWH;
  public same_product = false;
  public product_selected : Detailballotimport[] = [];
  public pr_sl:Product = new Product;
  public ctpx_lns : CtpxLn[] = [];
  public selectedBI;
  public allBIS= new BehaviorSubject<Ballotimport[]>(null);
  public bis : Ballotimport[];
  public ae = "";
  public out_of_product = false;
  public dbes:DetailBallotExport[] = [];
  public price_product:number = 0;
  public total_price:number = 0;
  public allBES= new BehaviorSubject<Ballotexport[]>(null);
  public bes:Ballotexport[] = [];
  public allDBES= new BehaviorSubject<DetailBallotExport[]>(null);
  public dbeshome:DetailBallotExport[] = [];
  public all_see_ctpx_lns= new BehaviorSubject<CtpxLn[]>(null);
  public see_ctpx_lns:CtpxLn[] = [];
  
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
    this.ngaylapphieu = this.dateFormat(new Date(),'YYYY-MM-DD');
    this.getwarehouse();
    this.getBallotExport();
  }
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
      this.ip_s = this.searched_products[this.selected_entries].product_name;
      this.pr_sl = this.searched_products[this.selected_entries];
      this.getAllBI();
      this.price_product = this.pr_sl.product_price;
      return;
    }
    this.show_option_product = true;
    const fd = new FormData();
    fd.append('key',txtKeyword);
    fd.append('warehouse_id',this.selectedWH.toString());
    this.warehouseservies.search2(fd).subscribe(res=>{
        var r:any = res;
        this.allProducts.next(r.products);
    });
    this.allProducts.subscribe(res=>{
      this.searched_products=res;
    });
    this.selected_entries=0;
  }
  getwarehouse(){
    this.warehouseservies.getwarehouse().subscribe(
      res=>{
        this.warehouses=res['warehouses'];
        this.selectedWH = this.warehouses[0].warehouse_id;
      },
      error=>{
        showSwal('auto-close','Có lỗi trong quá trình xử lý thông tin!');
      }
    );
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
  getAllBI(){
    const fd = new FormData();
    fd.append('wh_id',this.selectedWH);
    fd.append('product_id',this.pr_sl.product_id);
    this.warehouseservies.getAllBIEligible(fd).subscribe(res=>{
      var r:any = res;
      console.log(res);
      this.allBIS.next(r.bis);
    });
    this.allBIS.subscribe(res=>{
      this.bis=res;
      if(this.bis!=null){
        this.selectedBI = this.bis[0].bi_id;
      }
    });
  }
  checkOutOfProduct(){
    if(parseInt(this.ae)<1){
      this.ae = '1';
    }
    const fd = new FormData();
    fd.append('ae',this.ae);
    fd.append('bi_id',this.selectedBI);
    fd.append('product_id',this.pr_sl.product_id.toString());
    this.warehouseservies.checkOutOfProduct(fd).subscribe(res=>{
      if(res['message']=='fail'){
        this.out_of_product = true;
      }else{
        this.out_of_product = false;
      }
    });
  }
  addCTPX_LN(){
    var ct:CtpxLn = new CtpxLn;
    ct.bi_id = this.selectedBI;
    for(var i = 0; i < this.ctpx_lns.length; i++){
      if(this.ctpx_lns[i].bi_id==this.selectedBI){
        alert('Bạn đã thêm ở lô này rồi, hãy đổi số lượng ở bên dưới nếu bạn muốn tăng thêm!');
        return;
      }
    }
    ct.amount = this.ae;
    this.ctpx_lns.push(ct);
  }
  changeAmountElement(id){
    if(this.ctpx_lns[id].amount<1){
      this.ctpx_lns[id].amount = 1;
      return;
    }
    const fd = new FormData();
    fd.append('ae',this.ctpx_lns[id].amount);
    fd.append('bi_id',this.ctpx_lns[id].bi_id);
    fd.append('product_id',this.pr_sl.product_id.toString());
    this.warehouseservies.changeAmountElement(fd).subscribe(res=>{
      if(res['message']=='fail'){
        this.ctpx_lns[id].amount=res['max'];
      }
    });
  }
  removeElement(id){
    var tmpArr: CtpxLn[] = this.ctpx_lns;
    this.ctpx_lns = [];
    for (let i = 0; i < tmpArr.length; i++) {
      if(i!=id){
        this.ctpx_lns.push(tmpArr[i]);
      }
    } 
  }
  addDBE(){
    for(var i = 0; i < this.dbes.length; i++){
      if(this.pr_sl.product_id == this.dbes[i].product_id){
        $('#ctpx_ln_Modal').modal('hide');
        showSwal('auto-close','Sản phẩm đã tồn tại!');
      }
    }
    var dbe:DetailBallotExport = new DetailBallotExport;
    dbe.product_id = this.pr_sl.product_id;
    var sum = 0;
    for(var i = 0; i < this.ctpx_lns.length; i++){
      sum+=this.ctpx_lns[i].amount;
    }
    dbe.amount = sum;
    dbe.price = this.price_product;
    dbe.ctpx_ln = this.ctpx_lns;
    this.dbes.push(dbe);
    $('#ctpx_ln_Modal').modal('hide');
    this.total_price = 0;
    for(var i = 0; i < this.dbes.length; i++){
      this.total_price+=this.dbes[i].price;
    }
    this.ctpx_lns = [];
    this.pr_sl = new Product;
    this.ae = "";
    this.ip_s = "";
    this.price_product = 0;
  }
  removeDBEElement(id){
    var tmpArr: DetailBallotExport[] = this.dbes;
    this.dbes = [];
    for (let i = 0; i < tmpArr.length; i++) {
      if(i!=id){
        this.dbes.push(tmpArr[i]);
      }
    } 
    this.total_price = 0;
    for(var i = 0; i < this.dbes.length; i++){
      this.total_price+=this.dbes[i].price;
    }
  }
  checkPrice(){
    if(this.price_product < 0){
      this.price_product = 0;
    }
  }
  addBE(){
    const fd = new FormData();
    var s = JSON.stringify(this.dbes); 
    fd.append('user_id', this.user_id.toString());
    fd.append('wh_id', this.selectedWH.toString());
    fd.append('sum_amount', this.total_price.toString());
    fd.append('dbes', s);
    this.warehouseservies.addBE(fd).subscribe(
      res=>{
        if(res['message']=='success'){
          $('#beModal').modal('hide');
          showSwal('auto-close','Thêm phiếu xuất thành công!');
        }
      },error=>{
        alert("Có lỗi trong quá trình xử lý thông tin!");
      }
    );
  }
  getBallotExport(){
    this.warehouseservies.getBallotExport().subscribe(
      res=>{
        var r:any = res;
        this.allBES.next(r.bes)
      },error=>{
        showSwal('auto-close','Có lỗi truy xuất dữ liệu!');
      }
    );
    this.allBES.subscribe(res=>{
      this.bes=res;
    });
  }
  getAllDBEByBEID(id){
    this.warehouseservies.getAllDBEByBEID(id).subscribe(
      res=>{
        var r:any = res;
        this.allDBES.next(r.dbes)
      },error=>{
        showSwal('auto-close','Có lỗi truy xuất dữ liệu!');
      }
    );
    this.allDBES.subscribe(res=>{
      this.dbeshome=res;
    });
  }
  getAllCTPXLN(dbe_id){
    alert(dbe_id);
    this.warehouseservies.getAllCTPXLN(dbe_id).subscribe(
      res=>{
        var r:any = res;
        this.all_see_ctpx_lns.next(r.dbes)
      },error=>{
        showSwal('auto-close','Có lỗi truy xuất dữ liệu!');
      }
    );
    this.all_see_ctpx_lns.subscribe(res=>{
      this.see_ctpx_lns=res;
    });
  }
  changeAmountCTPXLNElement(){
    
  }
}
