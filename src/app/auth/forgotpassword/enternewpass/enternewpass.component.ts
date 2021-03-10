import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-enternewpass',
  templateUrl: './enternewpass.component.html',
  styleUrls: ['./enternewpass.component.css']
})
export class EnternewpassComponent implements OnInit {

  public pass = '';
  public email = '';
  constructor(private authService:AuthService,private activatedRoute:ActivatedRoute,private route:Router) { }

  ngOnInit(): void {
    this.email = this.activatedRoute.snapshot.params['email'];
  }

  xacNhan(){
    const fd = new FormData();
    fd.append('email',this.email);
    fd.append('user_password',this.pass);
    this.authService.sendnewpass(fd).subscribe(
      res=>{
        if(res['message']=='success'){
          alert('Đổi mật khẩu thành công!');
          this.route.navigate(['auth/login']);
        }
        if(res['message']=='error'){
          alert('Có lỗi trong quá trình truy xuất dữ liệu!');
        }
      }
    );
  }

}
