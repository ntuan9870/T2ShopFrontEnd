import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
declare function showSwal(type,message):any;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public user_name = '';
  public user_email = '';
  public user_phone = '';
  public checksameu = '';
  public checksamee = '';
  public oldname = '';
  public oldUser:User;
  public id = '';
  public checkerrorp = false;
  public birthday = '';

  constructor(private authService:AuthService, private userService:UserService,private location:Location) { }

  ngOnInit(): void {
    if(localStorage.getItem('user_id')){
      this.id = localStorage.getItem('user_id');
    }else if(sessionStorage.getItem('user_id')){
      this.id = sessionStorage.getItem('user_id');
    }
    this.userService.getUser(this.id).subscribe(
      res=>{
        var r : any = res;
        this.oldUser = r;
        this.user_name = this.oldUser.user_name;
        if(this.oldUser.user_phone!='null'){
          this.user_phone = this.oldUser.user_phone;
        }else{
          this.oldUser.user_phone='';
          this.user_phone = '';
        }
        this.user_email = this.oldUser.user_email;
        this.birthday=this.oldUser.birthday;
      },
      error=>{
        showSwal('auto-close','Có lỗi trong quá trình xử lý thông tin!');
      }
    );
  }

  postEditUser(){
    if(this.oldUser.user_name == this.user_name
      &&this.oldUser.user_email == this.user_email
      &&this.oldUser.user_phone == this.user_phone
      &&this.oldUser.birthday == this.birthday){
        this.location.back();
        showSwal('auto-close','Bạn không thay đổi gì cả?');
    }else{
      const fd = new FormData();
      fd.append('user_id',this.oldUser.user_id);
      fd.append('user_name',this.user_name);
      fd.append('user_email',this.user_email);
      fd.append('user_phone',this.user_phone);
      fd.append('birthday',this.birthday);
      this.userService.Edit(fd).subscribe(
        res=>{
          if(res['success']!=null){
            // this.location.back();
            if(sessionStorage.getItem('user_id')){
              sessionStorage.setItem('user_name',this.user_name);
              sessionStorage.setItem('user_email',this.user_email);
              sessionStorage.setItem('user_phone',this.user_phone);
              // sessionStorage.setItem('birthday',this.birthday);
            }
            if(localStorage.getItem('user_id')){
              localStorage.setItem('user_name',this.user_name);
              localStorage.setItem('user_email',this.user_email);
              localStorage.setItem('user_phone',this.user_phone);
              // localStorage.setItem('birthday',this.birthday);
            }
            this.oldUser.user_name = this.user_name;
            this.oldUser.user_email = this.user_email;
            this.oldUser.user_phone = this.user_phone;
            this.oldUser.birthday = this.birthday;
            showSwal('auto-close',res['success']);
          }
          if(res['error']!=null){
            alert(res['error']);
          }
        },
        error=>{
          showSwal('auto-close','Có lỗi trong quá trình xử lý thông tin!');
        }
      );
    }
  }
  checksameemail(){
    this.authService.checsameemail(this.user_email).subscribe(
      res=>{
        if(res['error']=='same'){
          if(this.oldUser.user_email!=this.user_email){
            this.checksamee = 'same';
          }
        }else{
          this.checksamee = 'notsame';
        }
      },
      error=>{
        showSwal('auto-close','Có lỗi trong quá trình xử lý thông tin!');
      }
    );
  }

  checksamename(){
    this.authService.checsameusername(this.user_name).subscribe(
      res=>{
        if(res['error']=='same'){
          if(this.oldUser.user_name!=this.user_name){
            this.checksameu = 'same';
          }
        }else{
          this.checksameu = 'notsame';
        }
      },
      error=>{
        showSwal('auto-close','Có lỗi trong quá trình xử lý thông tin!');
      }
    );
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
