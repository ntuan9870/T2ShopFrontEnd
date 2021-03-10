import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { timeStamp } from 'console';
import { AuthService } from 'src/app/services/auth.service';
declare function showSwal(type,message):any;
@Component({
  selector: 'app-changepass',
  templateUrl: './changepass.component.html',
  styleUrls: ['./changepass.component.css']
})
export class ChangepassComponent implements OnInit {

  public email = '';
  public user_password = '';
  public user_repassword = '';
  public checksamep = 'notsame';

  constructor(private authService:AuthService,private route:Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('user_email')){
      this.email = localStorage.getItem('user_email');
    }else if(sessionStorage.getItem('user_email')){
      this.email = sessionStorage.getItem('user_email');
    }
  }

  postChangePass(){
    const fd = new FormData();
    fd.append('email',this.email);
    fd.append('user_password',this.user_password);
    this.authService.sendnewpass(fd).subscribe(
      res=>{
        if(res['message']=='success'){
          this.route.navigate(['']);
          showSwal('auto-close','Thay đổi mật khẩu thành công!');
        }else if(res['message']=='error'){
          showSwal('auto-close','Thay đổi mật khẩu thất bại!');
        }
      },error=>{
        showSwal('auto-close','Có lỗi trong quá trình truy xuất dữ liệu!');
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

}
