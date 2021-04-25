import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart } from 'src/app/models/cart.model';
import { Product } from 'src/app/models/product.model';
import { Promotion } from 'src/app/models/promotion.model';
import { Store } from 'src/app/models/store.model';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { PromotionService } from 'src/app/services/promotion.service';
import { ShareService } from 'src/app/services/share.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public prod_num:number[] = new Array();
  public cartProductList:Cart[]=null;
  public thanhtien:number[]= new Array();
  public tongthanhtoan = 0;
  public tonghang = 0;
  public old_num:number[] = new Array();
  public promotion_infors:number[] = new Array();
  public empty = true;
  configcart: any;
  amount:number = 0;
  labelnext = 'Sau';
  labelprevious = 'Trước';
  public selectedStore = '';
  public allStores = new BehaviorSubject<Store[]>(null);
  public stores : Store[];
  public resCheckCart:String[] = [];
  public condition = true;
  public resMax:number[]=[];

  constructor(private productService:ProductService,private cartService:CartService,private shareService:ShareService, private promotionService:PromotionService
    ,private storeService:StoreService) { }

  ngOnInit(): void {
    if(localStorage.getItem('cart')){
      this.empty = false;
    }else{
      this.empty = true;
    }
    this.showcart();
    this.configcart = {
      itemsPerPage: 7,
      currentPage: 1,
      totalItems: this.amount
    };
    this.getAllStore();
  }

  getAllStore(){
    this.storeService.showStore().subscribe(
      res=>{
        var r:any = res;
        this.allStores.next(r.stores);
      },error=>{
        alert('Có lỗi trong quá trình truy xuất dữ liệu!');
      }
    );
    this.allStores.subscribe(
      res=>{
        this.stores = res;
        if(this.stores!=null){
          if(localStorage.getItem('store_id')!=null){
            this.selectedStore=localStorage.getItem('store_id');
          }else{
            this.selectedStore = this.stores[0].store_id;
          }
        }
        if(res!=null){
          this.checkChangeStore();
        }
      }
    );
  }

  pageChangedCart(event){
    this.configcart.currentPage = event;
  }

  showcart(){
    this.tongthanhtoan = 0;
    this.tonghang = 0;
    this.cartProductList = this.cartService.showcart();
    if(this.cartProductList==null){
      return;
    }
    for(var i = 0; i < this.cartProductList.length; i++){
      var promotion_infor = 0;
      // this.promotionService.getedit(this.cartProductList[i].promotion).subscribe(
      //   res=>{
      //     var r : Promotion = res['promotion'];
      //     promotion_infor = r.promotion_infor;
      //     this.promotion_infors.push(promotion_infor);
      //     console.log(this.cartProductList[i].product['promotion']);
      //   }
      // );
      promotion_infor = this.cartProductList[i].promotion;
      this.promotion_infors.push(promotion_infor);
      this.thanhtien[i] = this.cartProductList[i].product.product_price*this.cartProductList[i].num*(100- this.cartProductList[i].promotion)/100;
      this.prod_num[i] = this.cartProductList[i].num;
      this.tongthanhtoan += this.thanhtien[i];
      this.tonghang += this.prod_num[i];
      this.old_num[i] = this.prod_num[i];
    }
    this.cartService.luutongtien(this.tongthanhtoan);
    this.cartService.luutonghang(this.tonghang);
  }
  xacnhan(){
    // sessionStorage.setItem('promotion',JSON.stringify(this.promotion_infors));
  }
  tinhthanhtien(i,p){
    if(this.prod_num[i]<1){
      this.prod_num[i] = 1;
    }
    var currentproduct:Product = null;
    const fd = new FormData();
    fd.append('id',p.product_id);
    fd.append('store_id',this.selectedStore);
    this.productService.getInforProduct(fd).subscribe(
      res=>{
        // var r:any = res;
        currentproduct = res['product'];
        // console.log(res['product'].product_amount);
        // if(this.prod_num[i]>currentproduct.product_amount){
        //   this.prod_num[i]=currentproduct.product_amount;
        // }
        // if(this.prod_num[i]>res['amountmax']){
          this.resMax[i] = res['amountmax'];
        // }
        this.tongthanhtoan = 0;
        this.tonghang = 0;
        this.thanhtien[i] = this.cartService.tinhthanhtien(i,this.cartProductList[i].product.product_price,this.prod_num[i])*(100-this.cartProductList[i].promotion)/100;
        this.cartService.changenumberproductincart(this.cartProductList[i].product,this.prod_num[i]);
        for(var l = 0; l < this.cartProductList.length; l++){
          this.tongthanhtoan += this.thanhtien[l];
          this.tonghang += this.prod_num[l];
        }
        this.cartService.luutongtien(this.tongthanhtoan);
        this.cartService.luutonghang(this.tonghang);
        this.shareService.emitChange(this.tonghang);
        this.checkChangeStore();
      },error=>{
        console.log('Fail');
      }
    );
  }

  xoagiohang(){
    if(confirm('Bạn chắc chắn xóa chứ!')){
      this.cartService.xoagiohang();
      this.showcart();
      this.empty = true;
    }
  }

  removeProduct(i){
    if(confirm('Bạn chắc chắn xóa chứ!')){
      this.tongthanhtoan = 0;
      this.tonghang = 0;
      this.cartService.removeProduct(this.cartProductList[i].product);
      this.cartProductList = this.cartService.showcart();
      for(var l = 0; l < this.cartProductList.length; l++){
        this.tongthanhtoan += this.thanhtien[l];
        this.tonghang += this.prod_num[l];
      }
      this.cartService.luutongtien(this.tongthanhtoan);
      this.cartService.luutonghang(this.tonghang);
      this.shareService.emitChange(this.tonghang);
      this.cartProductList = this.cartService.showcart();
      this.checkChangeStore();
    }

    if(this.cartProductList.toString()==''){
      this.cartService.xoagiohang();
      this.showcart();
      this.empty = true;
      this.showcart();
    }
  }
  checkChangeStore(){
    localStorage.setItem('store_id', this.selectedStore);
    const fd = new FormData();
    fd.append('cart', localStorage.getItem('cart'));
    fd.append('store_id', this.selectedStore);
    this.cartService.checkChangeStore(fd).subscribe(
      res=>{
        this.resCheckCart = [];
        this.resCheckCart = res['message'];
        this.resMax = res['max'];
        if(res['message']!=null){
          this.checkCondition();
        }
      }, error=>{

      }
    );
  }
  checkCondition(){
    this.condition = true;
    for(var i = 0; i < this.resCheckCart.length; i++){
      if(this.resCheckCart[i]=='false'){
        this.condition = false;
        return;
      }
    }
  }

}
