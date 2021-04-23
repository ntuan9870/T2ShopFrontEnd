import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { District } from 'src/app/models/district.model';
import { Store } from 'src/app/models/store.model';
import { Ward } from 'src/app/models/ward.model';
import { StoreService } from 'src/app/services/store.service';
import  *  as  district  from  './district.json';
import  *  as  ward  from  './ward.json'
declare function showSwal(type,message):any;

@Component({
  selector: 'app-editstore',
  templateUrl: './editstore.component.html',
  styleUrls: ['./editstore.component.css']
})
export class EditstoreComponent implements OnInit {

  public loading = false;
  public allDistrict = new BehaviorSubject<District[]>(null);
  public districts:District[] = new Array();
  public wards:Ward[] = new Array();
  public ws:Ward[] = new Array();
  public store_district = 'Quận 1';
  public store_ward = 'Phường 01';
  public checkerrorp = false;
  public store_name = '';
  public storesaddress = '';
  public checksames = '';
  public store_address='';
  public checksamea = '';
  public store_id = '';
  public store_status = true;
  public old_store:Store = new Store();
  // public wh_capacity:number = 0;

  constructor(public location:Location, private storeService:StoreService, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.store_id = this.activatedRoute.snapshot.params['id'];
    this.getAllDistrict();
    this.getStore();
    // this.ws = new Array();
    // for(var i = 0; i < this.wards.length; i++){
    //   if(this.wards[i].QuanHuyenTitle=='Quận 1'){
    //     this.ws.push(this.wards[i]);
    //   }
    // }
  }
  getStore(){
    this.storeService.getStore(this.store_id).subscribe(
      res=>{
        if(res['message']=='success'){
          this.old_store = res['store'];
          this.store_name = res['store'].store_name;
          this.store_address = res['store'].store_address;
          this.store_district = res['store'].store_district;
          this.store_ward = res['store'].store_ward;
          // this.wh_capacity = res['store'].wh_capacity;
          if(res['store'].store_status == '1'){
            this.store_status = true;
          }else{
            this.store_status = false;
          }
        }
      },error=>{
        alert('Có lỗi truy xuất dữ liệu!');
      }
    );
  }
  getAllDistrict(){
    var vd:any  = (district  as  any).default;
    this.districts = vd;
    var vw:any  = (ward  as  any).default;
    this.wards = vw;
    this.ws = this.wards;
  }
  selectDistrict(){
    this.ws = new Array();
    for(var i = 0; i < this.wards.length; i++){
      if(this.wards[i].QuanHuyenTitle==this.store_district){
        this.ws.push(this.wards[i]);
      }
    }
    this.checkSameAddress();
  }

  checkSameName(){
    this.storeService.checkSameName(this.store_name).subscribe(
      res=>{
        if(res['message']=='same'&&this.store_name!=this.old_store.store_name){
          this.checksames = 'same';
        }else{
          this.checksames = 'notsame';
        }
      }
    );
  }
  checkSameAddress(){
    const fd = new FormData();
    fd.append('store_address',this.store_address);
    fd.append('store_ward',this.store_ward);
    fd.append('store_district',this.store_district);
    this.storeService.checkSameAddress(fd).subscribe(
      res=>{
        if(res['message']=='same'&&this.store_address!=this.old_store.store_address
        &&this.store_ward!=this.old_store.store_ward&&this.store_district!=this.old_store.store_district){
          this.checksamea = 'same';
        }else{
          this.checksamea = 'notsame';
        }
      }
    );
  }
  editStore(){
    if(this.old_store.store_name == this.store_name
      &&this.old_store.store_address == this.store_address
      &&this.old_store.store_ward == this.store_ward
      &&this.old_store.store_district == this.store_district){
        this.location.back();
        showSwal('auto-close', 'Bạn không thay đổi gì cả!');
    }else{
      const fd = new FormData();
      fd.append('store_id',this.store_id);
      fd.append('store_name',this.store_name);
      fd.append('store_address',this.store_address);
      fd.append('store_ward',this.store_ward);
      fd.append('store_district',this.store_district);
      fd.append('store_status',this.store_status.toString());
      this.storeService.editStore(fd).subscribe(
        res=>{
          if(res['message']=='success'){
            this.location.back();
            showSwal('auto-close', 'Cập nhật thành công!');
          }
        }, error=>{
          alert('Có lỗi truy xuất dữ liệu!');
        }
      );
    }
  }
  changeStatus(){

  }

}
