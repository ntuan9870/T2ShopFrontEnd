import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { Store } from 'src/app/models/store.model';
import { User } from 'src/app/models/user.model';
import { StoreService } from 'src/app/services/store.service';
declare function showSwal(type,message):any;

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.css']
})
export class StoresComponent implements OnInit {

  config: any;
  amount:number = 0;
  labelnext = 'Sau';
  labelprevious = 'Trước';
  allStores = new BehaviorSubject<Store[]>(null);
  stores:Store[];
  public allP = new BehaviorSubject<Product[]>(null);
  public ps:Product[] = [];
  public selectedStore = '';
  public user_name = "";
  public user_id = '';
  public user_level;

  constructor(private storeService:StoreService,private router:Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('user_name')==null&&sessionStorage.getItem('user_name')==null){
      this.user_name="Admin";
    }
    if(localStorage.getItem('user_name')){
      this.user_name=localStorage.getItem('user_name');
      this.user_id=localStorage.getItem('user_id');
      this.user_level=localStorage.getItem('user_level');
    }
    if(sessionStorage.getItem('user_name')){
      this.user_name=sessionStorage.getItem('user_name');
      this.user_id=sessionStorage.getItem('user_id');
      this.user_level=sessionStorage.getItem('user_level');
    }

    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: this.amount
    };
    this.show();
  }
  // edit(admin_id,store_id){
  //   if(this.user_level==1 || admin_id==this.user_id){
  //     this.router.navigate(['edit/'+store_id]);
  //   }
  //   else{
  //     alert("bạn không đủ quyền để thực hiện chức năng này");
  //   }
  // }

  show(){
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
      }
    );
  }

  pageChanged(event){
    this.config.currentPage = event;
  }

  changeStatus(admin_id,store_id){
    if(this.user_level==1 || admin_id==this.user_id){
      this.storeService.changeStatus(store_id).subscribe(
        res=>{
          if(res['message']=='success'){
            this.show();
            showSwal('auto-close', 'Thay đổi trạng thái thành công!');
          }
        },error=>{
          alert('Có lỗi trong quá trình truy xuất dữ liệu!');
        }
      );
    }else{
      alert("bạn không đủ quyền để thực hiện chức năng này");
    }
    
  }

  getAllProductInWH(store_id){
    this.storeService.getAllProductInWH(store_id).subscribe(res=>{
      var r:any = res;
      this.allP.next(r.hts);
    });
    this.allP.subscribe(res=>{
      this.ps=res;
    });
  }

}
