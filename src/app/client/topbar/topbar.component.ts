import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Voucher } from 'src/app/models/voucher.model';
import { CartService } from 'src/app/services/cart.service';
import { ShareService } from 'src/app/services/share.service';
import { VoucherService } from 'src/app/services/voucher.service';
import { BehaviorSubject } from 'rxjs';
import { RecommenedService } from 'src/app/services/recommened.service';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category.model';
declare function showSwal(type,message):any;

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
  
  categories:Category[];
  category:Category[];
  public user_id='';
  public user_name = '';
  public user_email = '';
  public user_phone = '';
  public user_level = '';
  public checklogin = false;
  public shown = true;
  public key = '';
  public totalamount = '';
  public allVouchers = new BehaviorSubject<Voucher[]>(null);
  public vouchers:Voucher[];
  constructor(private categoryService:CategoryService, private recommendservice:RecommenedService , private router:Router,private cartService:CartService,private shareService:ShareService,private voucherService:VoucherService) {
    shareService.changeEmitted$.subscribe(
      text=>{
        this.totalamount = text;
      }
    );
  }

  ngOnInit(): void {
    this.getAllCategory();
    if(sessionStorage.getItem('user_name')){
      this.user_name = sessionStorage.getItem('user_name');
      this.user_id = sessionStorage.getItem('user_id');
      this.checklogin = true;
    }else{
      if(localStorage.getItem('user_name')){
        this.user_name = localStorage.getItem('user_name');
        this.user_id = localStorage.getItem('user_id');
        this.checklogin = true;
      }else{
        this.checklogin = false;
      }
    }
    this.totalamount = this.cartService.tonghang();
    if(this.user_name!=''){
      this.voucherService.getallvoucherforuser(this.user_id).subscribe(
        res=>{
          var r:any = res;
          this.allVouchers.next(r.vouchers);
        }
      );
      this.allVouchers.subscribe(
        res=>{
          this.vouchers = res;
        }
      );
    }
  }
  logout(){
    if(localStorage.getItem('user_name')){
      localStorage.clear();
    }
    if(sessionStorage.getItem('user_name')){
      sessionStorage.clear();
    }
    this.checklogin = false;
    this.router.navigate(['']);
  }

  getAllCategory(){
    this.categoryService.show();
    this.categoryService.allCategory.subscribe(
      res=>{
        this.categories = res;
      },
      error=>{
        alert('Có lỗi trong quá trình xử lý thông tin!');
      }
    );
  }

  
  search(){
    this.key = this.key.replace(/[^a-zA-Z0-9' ']/g, '');
    this.router.navigate(['search/'+this.key]);
    // for(var i=0; i<=this.categories.length;i++){
    //   console.log(this.categories[i].category_name);
    //   if(this.key==this.categories[i].category_name){
    //     alert("bang nhau");
    //   }
    // }
   
  }
  timkiem(){
    if(this.user_id != ''){
        const fd = new FormData();
      fd.append('product_id',this.key);
      fd.append('user_id',this.user_id);
      this.recommendservice.add(fd).subscribe(
        res=>{
         console.log(res['message']);
        },error=>{
          alert('Có lỗi trong quá trình xử lý dữ liệu!');
        }
      );
    }
    
  }
  shownotification(){
    this.shown = !this.shown;
  }
  select_voucher(voucher_id){
    if(localStorage.getItem('cart')==null){
      showSwal('auto-close','Giỏ hàng rỗng!');
    }
    this.router.navigate(['/cart/thanhtoan/'+voucher_id]);
  }

}
