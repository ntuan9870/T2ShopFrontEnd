import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
declare function showSwal(type,message):any;
@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent implements OnInit {

  public user_name = '';
  public user_email = '';
  public user_phone = '';
  public user_level = '1';
  public checksameu = '';
  public checksamee = '';
  public oldname = '';
  public oldUser:User;
  public id = '';
  public checksamep = 'notsame';
  public checkerrorp = false;
  public user_level_a = '1';

  constructor(private authService:AuthService, private userService:UserService, private activatedRoute:ActivatedRoute, private router:Router, private location:Location) { }

  ngOnInit(): void {
    if(localStorage.getItem('user_level')){
      this.user_level_a = localStorage.getItem('user_level');
    }else if(sessionStorage.getItem('user_level')){
      this.user_level_a = sessionStorage.getItem('user_level');
    }
    this.id = this.activatedRoute.snapshot.params['id'];
    this.userService.getUser(this.id).subscribe(
      res=>{
        var r : any = res;
        this.oldUser = r;
        this.user_name = this.oldUser.user_name;
        this.user_phone = this.oldUser.user_phone;
        this.user_email = this.oldUser.user_email;
        this.user_level = this.oldUser.user_level;
        if(this.user_phone=='null'){
          this.user_phone = '';
          this.oldUser.user_phone = '';
        }
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
      &&this.oldUser.user_level == this.user_level){
        this.location.back();
        showSwal('auto-close','Bạn không thay đổi gì cả?');
    }else{
      const fd = new FormData();
      fd.append('user_id',this.oldUser.user_id);
      fd.append('user_name',this.user_name);
      fd.append('user_email',this.user_email);
      fd.append('user_phone',this.user_phone);
      fd.append('user_level',this.user_level);
      this.userService.postEdit(fd).subscribe(
        res=>{
          if(res['success']!=null){
            this.location.back();
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
    if(this.user_email==''){
      this.checksamee = 'notsame';
      return;
    }
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
