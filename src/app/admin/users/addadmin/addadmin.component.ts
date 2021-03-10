import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
declare function showSwal(type,message):any;

@Component({
  selector: 'app-addadmin',
  templateUrl: './addadmin.component.html',
  styleUrls: ['./addadmin.component.css']
})
export class AddadminComponent implements OnInit {

  public user_name = '';
  public user_email = '';
  public user_phone = '';
  public user_level = '1';
  public checksameu = '';
  public checksamee = '';
  public checkerrorp = false;
  public user_password = '';
  public user_repassword = '';
  public loading = false;
  public checksamep = 'notsame';

  constructor(private authService:AuthService,private location:Location) { }

  ngOnInit(): void {

  }
  addAdmin(){
    this.loading = true;
    const fd = new FormData();
    fd.append('user_name',this.user_name);
    fd.append('user_password',this.user_password);
    fd.append('user_email',this.user_email);
    fd.append('user_phone',this.user_phone);
    fd.append('user_level',this.user_level);
    this.authService.dangky(fd).subscribe(
      res=>{
        this.loading = false;
        this.location.back();
        showSwal('auto-close','Thêm Admin thành công!');
      },
      error=>{
        showSwal('auto-close','Có lỗi trong quá trình xử lý thông tin!');
      }
    );
  }
  checksameemail(){
    if(this.user_email==''){
      this.checksamee = 'notsame';
      return;
    }
    this.authService.checsameemail(this.user_email).subscribe(
      res=>{
        if(res['error']=='same'){
          this.checksamee = 'same';
        }else{
          this.checksamee = 'notsame';
        }
      },
      error=>{
      }
    );
  }

  checksamename(){
    this.authService.checsameusername(this.user_name).subscribe(
      res=>{
        if(res['error']=='same'){
          this.checksameu = 'same';
        }else{
          this.checksameu = 'notsame';
        }
      },
      error=>{
      }
    );
  }
  checksamepass(){
    if(this.user_password==this.user_repassword){
      this.checksamep = 'same';
    }else{
      this.checksamep = 'notsame';
    }
  }
  checkphone(){
    if(this.user_phone==''){
      this.checkerrorp = false;
      return;
    }
    this.user_phone = this.user_phone.replace(/[^0-9]/g, '');
    this.checkerrorp = false;
    if(this.user_phone.length<10||this.user_phone.length>12){
      this.checkerrorp = true;
    }
  }

}
