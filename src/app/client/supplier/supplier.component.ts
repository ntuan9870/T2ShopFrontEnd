import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { from } from 'rxjs';
import {WarehouseService} from 'src/app/services/warehouse.service';
declare function showSwal(type,message):any;

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit {

  public status;
  public id;

  constructor(private activatedRoute:ActivatedRoute,private warehouseService:WarehouseService) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
  }
  submit(){
    const fd = new FormData();
    fd.append('orderWh_id',this.id);
    fd.append('status',this.status);
    this.warehouseService.postStatus(fd).subscribe(
      res=>{
        showSwal('auto-close','Cảm ơn đối tác!');
      },
      error=>{
        // this.loading = false;
        alert('Có lỗi trong quá trình xử lý dữ liệu!');
      }
    );
  }

}
