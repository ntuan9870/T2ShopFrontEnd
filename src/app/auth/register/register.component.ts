import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
declare function showSwal(type,message):any;
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public username = "";
  public password = "";
  public repassword = "";
  public email = "";
  public phone = null;
  public checksamepass="";
  public checksameu="";
  public checksamee="";
  public checkpmin="";
  public xoayxoay:string[]=new Array(4);
  public checkerrorp = false;
  public siteKey:string = '';
  public captcha = false;
  public loading = false;

  constructor(private authService:AuthService,private router:Router) { }

  ngOnInit(): void {
    this.siteKey = '6LfA2NkZAAAAAEL3YAclo_5tv58ouFCkrsitmE9z';
  }


  checkrepass(){
    if(this.repassword!=this.password){
      this.checksamepass='error';
    }else{
      this.checksamepass='';
    }
  }

  dangky(){
    this.loading = true;
    const fd = new FormData();
    fd.append('user_name',this.username);
    fd.append('user_password',this.password);
    fd.append('user_email',this.email);
    fd.append('user_phone',this.phone);
    this.authService.dangky(fd).subscribe(
      res=>{
        this.loading = false;
        this.router.navigate(['../auth/login']);
        showSwal('auto-close','Đăng ký thành công');
      },
      error=>{
        showSwal('auto-close','Có lỗi trong quá trình xử lý thông tin!');
      }
    );
  }
  checkphonemin(){
    if(this.phone==''){
      this.checkerrorp = false;
      return;
    }
    this.phone = this.phone.replace(/[^0-9]/g, '');
    this.checkerrorp = false;
    if(this.phone.length<10||this.phone.length>12){
      this.checkerrorp = true;
    }
  }

  checksameusername(){
    this.xoayxoay[0] ='xoay';
    if(this.username.length<4){
      this.checksameu = 'notsame';
      this.xoayxoay[0]='fail';
      return;
    }
    this.authService.checsameusername(this.username).subscribe(
      res=>{
        if(res['error']=='same'){
          this.checksameu = 'same';
          this.xoayxoay[0]='fail';
        }else{
          this.checksameu = 'notsame';
          this.xoayxoay[0]='ok';
        }
      },
      error=>{
        showSwal('auto-close','Có lỗi trong quá trình xử lý thông tin!');
      }
    );
  }
  checksameemail(){
    this.checksamee='wait';
    this.authService.checsameemail(this.email).subscribe(
      res=>{
        if(res['error']=='same'){
          this.checksamee = 'same';
        }
        if(res['success']=='notsame'){
          this.checksamee = 'notsame';
        }
      },
      error=>{
        showSwal('auto-close','Có lỗi trong quá trình xử lý thông tin!');
      }
    );
  }
  handleSuccess(event){
    this.captcha = true;
  }

}
