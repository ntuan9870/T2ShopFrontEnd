import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
declare function showSwal(type,message):any;

@Component({
  selector: 'app-loginadmin',
  templateUrl: './loginadmin.component.html',
  styleUrls: ['./loginadmin.component.css']
})
export class LoginadminComponent implements OnInit {

  public email = '';
  public password = '';
  public check = false;
  public user:User = null;
  public wrongacc = '';
  public siteKey:string = '';
  public captcha = false;

  constructor(private authService:AuthService,private router:Router,private location:Location) { }

  ngOnInit(): void {
    this.siteKey = '6LfA2NkZAAAAAEL3YAclo_5tv58ouFCkrsitmE9z';
    if(localStorage.getItem('user_level')||sessionStorage.getItem('user_level')){
      this.router.navigate(['../']);
    }
  }

  login(){
    const fd = new FormData();
    fd.append('user_email',this.email);
    fd.append('user_password',this.password);
    this.authService.dangnhap(fd).subscribe(
      res=>{
        if(res['result']=='success'){
          if(!sessionStorage.getItem('wrong')){
            sessionStorage.removeItem('wrong');
          }
          this.wrongacc = '';
          this.user=res['user'];
          if(this.user.user_level==3){
            this.dangnhapsai();
          }else{
            this.router.navigate(['../admin']);
          }
          if(this.check){
            this.saveLocal();
          }else{
            this.saveSession();
          }
          showSwal('auto-close','Đăng nhập thành công!');
        }else{
          this.dangnhapsai();
        }
      },error=>{
        alert('Có lỗi trong quá trình xử lý thông tin!');
      }
    );
  }

  dangnhapsai(){
    if(!sessionStorage.getItem('wrong')){
      sessionStorage.setItem('wrong','0');
    }
    var k:number = parseInt(sessionStorage.getItem('wrong'))+1;
    if(k>3){
      this.router.navigate(['/auth/forgotpassword/sendemail']);
      showSwal('auto-close','Bạn đã đăng nhập sai quá 3 lần!');
    }
    sessionStorage.setItem('wrong', k.toString());
    this.wrongacc = 'Sai lần ' + k +'! (Nếu nhập sai quá 3 lần hệ thống sẽ chuyển qua trang quên mật khẩu!)';
    showSwal('auto-close','Tên đăng nhập hoặc mật khẩu không đúng!');
  }

  saveLocal(){
    if (typeof(Storage) !== 'undefined') {
      localStorage.setItem('user_id', this.user.user_id);
      localStorage.setItem('user_name', this.user.user_name);
      localStorage.setItem('user_email', this.user.user_email);
      localStorage.setItem('user_phone', this.user.user_phone);
      localStorage.setItem('user_level', this.user.user_level);
      // localStorage.getItem('key');
    } else {
      showSwal('auto-close','Trình duyệt của bạn không hỗ trợ Storage');
    }
  }

  saveSession(){
    if ( typeof(Storage) !== 'undefined') {
      sessionStorage.setItem('user_id', this.user.user_id);
      sessionStorage.setItem('user_name', this.user.user_name);
      sessionStorage.setItem('user_email', this.user.user_email);
      sessionStorage.setItem('user_phone', this.user.user_phone);
      sessionStorage.setItem('user_level', this.user.user_level);
    } else {
      showSwal('auto-close','Trình duyệt của bạn không hỗ trợ Storage');
    }
  }
  handleSuccess(event){
    this.captcha = true;
  }

}
