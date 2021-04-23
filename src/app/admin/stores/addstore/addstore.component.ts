import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { District } from 'src/app/models/district.model';
import { Ward } from 'src/app/models/ward.model';
import { StoreService } from 'src/app/services/store.service';
import  *  as  district  from  './district.json';
import  *  as  ward  from  './ward.json'
declare function showSwal(type,message):any;

@Component({
  selector: 'app-addstore',
  templateUrl: './addstore.component.html',
  styleUrls: ['./addstore.component.css']
})
export class AddstoreComponent implements OnInit {

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
  // public wh_capacity:number = 1;

  constructor(public location:Location, private storeService:StoreService) { }

  ngOnInit(): void {
    this.getAllDistrict();
    this.ws = new Array();
    for(var i = 0; i < this.wards.length; i++){
      if(this.wards[i].QuanHuyenTitle=='Quận 1'){
        this.ws.push(this.wards[i]);
      }
    }
  }

  getAllDistrict(){
    var vd:any  = (district  as  any).default;
    this.districts = vd;
    var vw:any  = (ward  as  any).default;
    this.wards = vw;
    this.ws = this.wards;
  }
  addStore(){
    const fd = new FormData();
    fd.append('store_name', this.store_name);
    fd.append('store_ward', this.store_ward);
    fd.append('store_district', this.store_district);
    fd.append('store_address', this.store_address);
    // fd.append('wh_capacity', this.wh_capacity.toString());
    this.storeService.addStore(fd).subscribe(
      res=>{
        if(res['message']=='success'){
          this.location.back();
          showSwal('auto-close', 'Thêm cửa hàng thành công!');
        }
      },error=>{
        alert('Có lỗi trong quá trình truy xuất dữ liệu!');
      }
    );
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
        if(res['message']=='same'){
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
        if(res['message']=='same'){
          this.checksamea = 'same';
        }else{
          this.checksamea = 'notsame';
        }
      }
    );
  }
  // checkCapacity(){
  //   if(this.wh_capacity<1&&this.wh_capacity.toString()!=''){
  //     this.wh_capacity=1;
  //   }
  // }
}
