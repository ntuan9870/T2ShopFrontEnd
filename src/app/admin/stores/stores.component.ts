import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Store } from 'src/app/models/store.model';
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

  constructor(private storeService:StoreService) { }

  ngOnInit(): void {
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: this.amount
    };
    this.show();
  }

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

  changeStatus(store_id){
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
  }

}
