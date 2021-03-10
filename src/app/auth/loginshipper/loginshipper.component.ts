import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NgModule } from '@angular/core';
import { Shipper } from 'src/app/models/shipper.models';
import { Router } from '@angular/router';
declare function showSwal(type,message):any;

@Component({
  selector: 'app-loginshipper',
  templateUrl: './loginshipper.component.html',
  styleUrls: ['./loginshipper.component.css']
})
export class LoginshipperComponent implements OnInit {

  public phone = '';
  public password = '';
  public check = false;
  public siteKey:string = '';
  public captcha = false;
  public wrongacc = '';
  public shipper:Shipper = null;
  public phone_forgot='';

  constructor(private authService:AuthService,private router:Router) { }

  ngOnInit(): void {
    this.siteKey = '6LfA2NkZAAAAAEL3YAclo_5tv58ouFCkrsitmE9z';
  }
  
  login(){
    const fd = new FormData();
    fd.append('phone',this.phone);
    fd.append('password',this.password);
    this.authService.dangnhapshipper(fd).subscribe(
      res=>{
        if(res['result']=='success'){
          // if(!sessionStorage.getItem('wrong')){
          //   sessionStorage.removeItem('wrong');
          // }
          // this.wrongacc = '';
          this.shipper=res['shipper'];
          this.router.navigate(['../shipper']);
          if(this.check){
            this.saveLocal();
          }else{
            this.saveSession();
          }
          showSwal('auto-close','Đăng nhập thành công!');
        }
        // }else{
        //   this.dangnhapsai();
        // }
      },error=>{
        alert('Có lỗi trong quá trình xử lý thông tin!');
      }
    );
  }
  SendPhone(){
    const fd = new FormData();
    fd.append('phone_forgot',this.phone_forgot);
    this.authService.forgotPhone(fd).subscribe(
      res=>{
        showSwal('auto-close','Gửi mã thành công!');
      },error=>{
        alert('Có lỗi trong quá trình xử lý thông tin!');
      }
    );
  }
  saveLocal(){
    if (typeof(Storage) !== 'undefined') {
      localStorage.setItem('shipper_phone', this.shipper.shipper_phone);
      localStorage.setItem('shipper_name', this.shipper.shipper_name);
      localStorage.setItem('shipper_password', this.shipper.shipper_password);
      localStorage.setItem('shipper_address', this.shipper.shipper_address);
      localStorage.setItem('points', this.shipper.points);
      // localStorage.getItem('key');
    } else {
      showSwal('auto-close','Trình duyệt của bạn không hỗ trợ Storage');
    }
  }

  saveSession(){
    if ( typeof(Storage) !== 'undefined') {
      sessionStorage.setItem('shipper_phone', this.shipper.shipper_phone);
      sessionStorage.setItem('shipper_name', this.shipper.shipper_name);
      sessionStorage.setItem('shipper_password', this.shipper.shipper_password);
      sessionStorage.setItem('shipper_address', this.shipper.shipper_address);
      sessionStorage.setItem('points', this.shipper.points);
    } else {
      showSwal('auto-close','Trình duyệt của bạn không hỗ trợ Storage');
    }
  }
  handleSuccess(event){
    this.captcha = true;
  }

}
