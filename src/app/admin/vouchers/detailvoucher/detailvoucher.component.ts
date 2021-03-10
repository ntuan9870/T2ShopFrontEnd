import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { UserVoucher } from 'src/app/models/user-voucher.model';
import { User } from 'src/app/models/user.model';
import { Voucher } from 'src/app/models/voucher.model';
import { UserService } from 'src/app/services/user.service';
import { VoucherService } from 'src/app/services/voucher.service';
declare function showSwal(type,message):any;
declare var $;

@Component({
  selector: 'app-detailvoucher',
  templateUrl: './detailvoucher.component.html',
  styleUrls: ['./detailvoucher.component.css']
})
export class DetailvoucherComponent implements OnInit {

  public voucher_id = '';
  public voucher:Voucher;
  public allUsers = new BehaviorSubject<UserVoucher[]>(null);
  public user_vouchers:UserVoucher[];
  public allUser2 = new BehaviorSubject<User[]>(null);
  public users:User[];
  public selecte:boolean[] = [];
  public amount:number[] = [];
  public user_edit_id = '';
  public checksameu = 'notsame';
  public voucher_score = 0;
  public ok = 'no';
  public userEdit:User = new User();
  public numberofvoucher = 1;
  public oldnumberofvoucher = 1;
  config: any;
  labelnext = 'Sau';
  labelprevious = 'Trước';

  constructor(private voucherService:VoucherService, private activatedRoute:ActivatedRoute, private userService:UserService, public location:Location) { }

  ngOnInit(): void {
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: this.amount
    };
    this.voucher_id = this.activatedRoute.snapshot.params['id'];
    this.show();
  }
  pageChanged(event){
    this.config.currentPage = event;
  }

  show(){
    this.voucherService.getVoucherByID(this.voucher_id).subscribe(
      res=>{
        if(res['voucher']!=null){
          this.voucher = res['voucher'];
          this.voucher_score = parseInt(res['voucher'].voucher_score);
        }
      }
    );
    this.voucherService.getAllUserVoucher(this.voucher_id).subscribe(
      res=>{
        var r:any = res;
        this.allUsers.next(r.users);
      }
    );
    this.allUsers.subscribe(
      res=>{
        this.user_vouchers = res;
      }
    );
    this.voucherService.getpotentialcustomers(this.voucher_id).subscribe(
      res=>{
        var r:any = res;
        this.allUser2.next(r.users);
      }
    );
    this.allUser2.subscribe(
      res=>{
        if(res!=null){
          this.users = res;
          for(let i = 0; i < this.users.length; i++){
            this.selecte[i] = false;
            this.amount[i] = 1;
          }
        }
      }
    );
  }

  add(){
    var us = [];
    var am = [];
    for(let i = 0; i < this.users.length; i++){
      if(this.selecte[i]==true){
        us.push(this.users[i]);
        am.push(this.amount[i]);
      }
    }
    const fd = new FormData();
    fd.append('users', JSON.stringify(us));
    fd.append('amounts', JSON.stringify(am));
    fd.append('voucher_id', this.voucher_id);
    this.voucherService.addVoucherForMember(fd).subscribe(
      res=>{
        if(res['message']=='success'){
          this.show();
          $('#addModal').modal('hide')
          showSwal('auto-close','Thêm Voucher cho khách thành công!');
        }else{
          showSwal('auto-close','Có lỗi trong quá trình truy xuất dữ liệu!');
        }
      }
    );
  }

  checkChangeNumber(i){
    if(this.amount[i]<1){
      this.amount[i] = 1;
    }
    if(this.amount[i]>parseInt(this.users[i].voucher_user_score)/this.voucher.voucher_score){
      this.amount[i] = parseInt(this.users[i].voucher_user_score)/this.voucher.voucher_score;
    }
    alert(this.amount[i]);
    var t:number = 0;
    for(let k = 0; k < this.user_vouchers.length; k++){
      t+=this.user_vouchers[k].amount_voucher;
    }
    var t2:number = t;
    t+=this.amount[i];
    if(t>this.voucher.voucher_total){
      this.amount[i]=this.voucher.voucher_total-t2;
    }
  }

  changeApply(){
    for(let i = 0; i < this.selecte.length; i++){
      if(this.selecte[i]){
        this.ok = 'yes';
        return;
      }
    }
    this.ok = 'no';
  }

  editvoucherforuser(user_id,i){
    this.numberofvoucher = this.user_vouchers[i].amount_voucher;
    this.oldnumberofvoucher = this.numberofvoucher;
    this.user_edit_id = user_id;
    this.userService.getUser(user_id).subscribe(
      res=>{
        var r : any = res;
        this.userEdit = r;
      },
      error=>{
        showSwal('auto-close','Có lỗi trong quá trình xử lý thông tin!');
      }
    );
  }

  checkChangeNumberEdit(){
    if(this.numberofvoucher<1){
      this.numberofvoucher = 1;
    }
    if(this.numberofvoucher>parseInt(this.userEdit.voucher_user_score)/this.voucher_score){
      this.numberofvoucher = Math.floor(parseInt(this.userEdit.voucher_user_score)/this.voucher_score);
    }
    var t:number = 0;
    for(let k = 0; k < this.user_vouchers.length; k++){
      t+=this.user_vouchers[k].amount_voucher;
    }
    t-=this.oldnumberofvoucher;
    var t2:number = t;
    t+=this.numberofvoucher;
    if(t>this.voucher.voucher_total){
      this.numberofvoucher=this.voucher.voucher_total-t2;
    }
  }

  postEditVoucherForUser(){
    var fd = new FormData();
    fd.append('user_id', this.user_edit_id);
    fd.append('voucher_id', this.voucher_id);
    fd.append('amount_voucher', this.numberofvoucher.toString());
    this.voucherService.postEditVoucherForUser(fd).subscribe(
      res=>{
        if(res['message']=='success'){
          this.show();
          $('#editModal').modal('hide')
          showSwal('auto-close','Sửa thông tin thành công!');
        }
      },error=>{
        alert('Lỗi rồi!');
      }
    );
  }

  removeUserFromVoucher(uv_id){
    if(confirm('Bạn chắc chắn muốn xóa à?')){
      this.voucherService.removeUserFromVoucher(uv_id).subscribe(
        res=>{
          if(res['message']=='success'){
            this.show();
            showSwal('auto-close','Xóa thành công!');
          }
        },error=>{
          alert('Có lỗi!');
        }
      );
    }
  }

}
