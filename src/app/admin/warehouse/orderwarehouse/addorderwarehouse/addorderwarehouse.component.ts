import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import * as XLSX from 'xlsx'; 
import { Subject } from 'rxjs/Subject';
import {WarehouseService} from 'src/app/services/warehouse.service';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
declare function showSwal(type,message):any;

@Component({
  selector: 'app-addorderwarehouse',
  templateUrl: './addorderwarehouse.component.html',
  styleUrls: ['./addorderwarehouse.component.css']
})
export class AddorderwarehouseComponent implements OnInit {

  spinnerEnabled = false;
  keys: string[];
  dataSheet = new Subject();
  @ViewChild('inputFile') inputFile: ElementRef;
  isExcelFile: boolean;
  public user_name = "";
  public user_id = '';
  public cost=0;
  public money=0;
  public time;
  public Data_table;
  public Sum_money;
  public debt=0;
  public supplier;
  public SP=4;
  public loading:boolean=false;
  selectedOption: string;
  itemOrderWarehouse=[];
  public excel:boolean=false;
  amount:number = 0;
  config: any;
  labelnext = 'Sau';
  labelprevious = 'Trước';
  public products;
  public allproducts=[];
  public product_price=[];
  public product_amount=[];
  public table:boolean=false;

  constructor(private warehouseservies:WarehouseService,private location:Location,private http:HttpClient) { }

  ngOnInit(): void {
    if(localStorage.getItem('user_name')){
      this.user_name=localStorage.getItem('user_name');
      this.user_id=localStorage.getItem('user_id');
    }
    if(sessionStorage.getItem('user_name')){
      this.user_name=sessionStorage.getItem('user_name');
      this.user_id=sessionStorage.getItem('user_id');
    }
    this.getAllSupplier();
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: this.amount 
    };
  }
 
  getAllSupplier(){
    this.http.get('http://localhost:8000/api/warehouse/getSupplier').subscribe(
  		res=>{
  			// var r : any = res;
        this.supplier=res['supplier'];
       
  		}, error=>{
	        showSwal('auto-close','Có lỗi trong quá trình xử lý thông tin!');
	      }
  		);
  }
  add(produtcs,amount,price){
    this.allproducts.push(produtcs);
    this.product_amount.push(amount);
    this.product_price.push(price);
    this.cost+=price;
    console.log(this.cost);
    var pos = this.products.indexOf(produtcs);
    this.products.splice(pos,1);
    showSwal('auto-close','Ok!');
    this.excel=false;
  }
  remove(products){
    var pos = this.allproducts.indexOf(products);
    this.cost-=this.product_price[pos];
    this.allproducts.splice(pos,1);
    this.product_amount.splice(pos,1);
    this.product_price.splice(pos,1);
  }
  
  search(keyword){
    this.warehouseservies.search(keyword).subscribe(
      res=>{
        this.products=res['product'];
        // this.inventory=res['inventory'];
        console.log( this.products);
      },
      error=>{
        showSwal('auto-close','Có lỗi trong quá trình xử lý thông tin!');
      }
    );
  }
  openexcel(){
    this.excel=true;
  }
  sum(){
    this.Sum_money=new Array();
    for(var prop in this.Data_table){
      this.itemOrderWarehouse.push(this.Data_table[prop]);
      localStorage.setItem('itemOrderWareHouse',JSON.stringify(this.itemOrderWarehouse));
      for(var i in this.Data_table[prop]){
        // console.log( this.Data_table[prop]['Thành tiền']);
        if(i=='Thành tiền'){
          this.Sum_money.push(this.Data_table[prop]['Thành tiền']);
        }
        // console.log( this.Sum_money);
      }
    }
  }
  tongtien(){
    for(var i in this.Sum_money ){
      this.cost+=this.Sum_money[i];
    }
  }
  inputmoney(){
    if(this.money>this.cost){
      this.playAudioError();
      document.getElementById('money_error').innerText="Bạn đang nhập quá tiền trả!";
      // showSwal('auto-close','Bạn đang nhập quá tiền trả!');
    }
    else{
      document.getElementById('money_error').innerText="";
      this.debt=this.cost-this.money;
    }
  }
  onChange(evt) {
    let data, header;
    const target: DataTransfer = <DataTransfer>(evt.target);
    this.isExcelFile = !!target.files[0].name.match(/(.xls|.xlsx)/);
    if (target.files.length > 1) {
      this.inputFile.nativeElement.value = '';
    }
    if (this.isExcelFile) {
      this.spinnerEnabled = true;
      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {
        /* read workbook */
        const bstr: string = e.target.result;
        const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

        /* grab first sheet */
        const wsname: string = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];

        /* save data */
        data = XLSX.utils.sheet_to_json(ws);
        this.Data_table=data;
        // console.log(data);
        
        this.sum();
        this.tongtien();
      };

      reader.readAsBinaryString(target.files[0]);

      reader.onloadend = (e) => {
        this.spinnerEnabled = false;
        this.keys = Object.keys(data[0]);
        this.dataSheet.next(data)
      }
    } else {
      this.inputFile.nativeElement.value = '';
    }
  }
  removeData() {
    this.inputFile.nativeElement.value = '';
    this.dataSheet.next(null);
    this.keys = null;
    localStorage.removeItem('itemOrderWareHouse');
    this.cost=0;
  }
  addOrderWarehouse1(){
    this.loading = true;
    const fd = new FormData();
    fd.append('user_id',this.user_id);
    fd.append('supplier_id',this.selectedOption.toString());
    fd.append('cost',this.cost.toString());
    fd.append('money',this.money.toString());
    fd.append('debt',this.debt.toString());
    fd.append('time',this.time);
    fd.append('item',JSON.stringify(this.allproducts));
    fd.append('amount',JSON.stringify(this.product_amount));
    fd.append('product_price',JSON.stringify(this.product_price));
    this.warehouseservies.addorder1(fd).subscribe(
      res=>{
        console.log(res['data']);
        this.loading = false;
        this.location.back();
        this.playAudioSuccess();
        // localStorage.removeItem('itemOrderWareHouse');
        showSwal('auto-close','Gửi phiếu đặt hàng thành công!');
      },
      error=>{
        this.loading = false;
        this.playAudioError();
        showSwal('auto-close','Có lỗi trong quá trình xử lý thông tin!');
      }
    );
  }
  addOrderWarehouse(){
    // this.SP=this.selectedOption;
    console.log(this.selectedOption);
    console.log(localStorage.getItem('itemOrderWareHouse'));
    this.loading = true;
    const fd = new FormData();
    fd.append('user_id',this.user_id);
    fd.append('supplier_id',this.selectedOption.toString());
    fd.append('cost',this.cost.toString());
    fd.append('money',this.money.toString());
    fd.append('debt',this.debt.toString());
    fd.append('time',this.time);
    fd.append('item',localStorage.getItem('itemOrderWareHouse'));
    this.warehouseservies.addorder(fd).subscribe(
      res=>{
        console.log(res['message']);
        this.loading = false;
        this.location.back();
        this.playAudioSuccess();
        localStorage.removeItem('itemOrderWareHouse');
        showSwal('auto-close','Gửi phiếu đặt hàng thành công!');
      },
      error=>{
        this.loading = false;
        this.playAudioError();
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
 
  playAudioError(){
    let audio = new Audio();
    audio.src = "../../../assets/sound/error.mp3";
    audio.load();
    audio.play();
  }
  playAudioSuccess(){
    let audio = new Audio();
    audio.src = "../../../assets/sound/success.mp3";
    audio.load();
    audio.play();
  }
}
