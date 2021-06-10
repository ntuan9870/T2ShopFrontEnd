import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CountdownComponent } from 'ngx-countdown';
import { AuthService } from 'src/app/services/auth.service';
import { ShareService } from 'src/app/services/share.service';
declare function showSwal(type,message):any;
@Component({
  selector: 'app-sendemail',
  templateUrl: './sendemail.component.html',
  styleUrls: ['./sendemail.component.css']
})
export class SendemailComponent implements OnInit {

  public email = '';
  public message = '';
  public loading = false;

  constructor(private authService:AuthService,private router:Router,private shareService:ShareService) { }

  ngOnInit(): void {
  }

  public checkEmail(){
    this.authService.checsameemail(this.email).subscribe(
      res=>{
        if(res['error']=='same'){
          this.message = 'error';
        }
        if(res['success']=='notsame'){
          this.message = 'success';
        }
      },
      error=>{
        // showSwal('auto-close','Có lỗi trong quá trình truy xuất dữ liệu!');
      }
    );
  }
  public sendEmail(){
    this.loading = true;
    this.authService.sendEmail(this.email).subscribe(
      res=>{
        if(res['message']=='success'){
          this.loading = false;
          this.shareService.emitChange('hello');
          this.router.navigate(['auth/forgotpassword/entercode/'+this.email]);
        }else{
          if(res['message']=='fail'){
            showSwal('auto-close','Email không tồn tại trong hệ thống!');
          }else{
            if(res['message']=='fail2'){
              this.router.navigate(['auth/forgotpassword/entercode/'+this.email]);
              showSwal('auto-close','Email đã được gửi mã rồi');
            }
            if(res['message']=='fail3'){
              showSwal('auto-close','Vui lòng chờ đủ 3 phút sau khi bạn không kịp gửi mã!');
            }
          }
        }
      },
      error=>{
        showSwal('auto-close','Có lỗi trong quá trình truy xuất dữ liệu!');
      }
    );
  }

}
