import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountdownComponent } from 'ngx-countdown';
import { AuthService } from 'src/app/services/auth.service';
import { ShareService } from 'src/app/services/share.service';
declare function showSwal(type,message):any;

@Component({
  selector: 'app-entercode',
  templateUrl: './entercode.component.html',
  styleUrls: ['./entercode.component.css']
})
export class EntercodeComponent implements OnInit {

  public correctcode = '';
  public code = '';
  public email = '';
  public time:any = 180;
  @ViewChild('cd', { static: false })
  private countdown: CountdownComponent;

  constructor(private router:Router,private shareService:ShareService,private activatedRoute:ActivatedRoute,private authService:AuthService) {
    console.log(shareService.changeEmitted$);
    shareService.changeEmitted$.subscribe(
      text=>{
        this.correctcode = text;
      }
    );
  }

  ngOnInit(): void {
    this.email = this.activatedRoute.snapshot.params['email'];
    this.authService.getcode(this.email).subscribe(
      res=>{
        if(res['message']=='success'){
          this.time = res['time'];
          this.correctcode = res['code'];
        }
        if(res['message']=='wait'){
          this.time = 0;
          alert('Bạn cần đợi thêm 3 phút kể từ thời điểm kết thúc thời gian nhập mã cũ!');
        }
        if(res['message']=='error'){
          this.time = 0;
          alert('Có lỗi!');
        }
      },error=>{
        alert('Co loi');
      }
    );
  }

  xacNhan(){
    if(this.correctcode==this.code){
      alert('Xác nhận thành công!');
      this.router.navigate(['auth/forgotpassword/enternewpass/'+this.email]);
    }else{
      alert('Mã xác nhận không trùng khớp!');
    }
  }

  public handleEvent(event){
    if(event.action=='done'){
      alert('Hết phiên làm việc vui lòng thử lại sau 3 phút');
      this.router.navigate(['']);
    }
  }

}
