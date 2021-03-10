import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
declare function showSwal(type,message):any;

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {

  allUser = new BehaviorSubject<User[]>(null);
  users:User[];
  config: any;
  amount:number = 0;
  labelnext = 'Sau';
  labelprevious = 'Trước';
  public user_level:number = 2;
  public user_id = '';

  constructor(private userService:UserService) { }
  ngOnInit(): void {
    this.show();
    this.config = {
      itemsPerPage: 7,
      currentPage: 1,
      totalItems: this.amount
    };
    if(localStorage.getItem('user_id')){
      this.user_level = parseInt(localStorage.getItem('user_level'));
      this.user_id = localStorage.getItem('user_id');
    }
    if(sessionStorage.getItem('user_id')){
      this.user_level = parseInt(sessionStorage.getItem('user_level'));
      this.user_id = sessionStorage.getItem('user_id');
    }
  }
  pageChanged(event){
    this.config.currentPage = event;
  }
  show(){
    this.userService.show().subscribe(
      res=>{
        var r:any = res;
        this.allUser.next(r.users);
      }
    );
    this.allUser.subscribe(
      res=>{
        this.users = res;
        if(this.users!=null){
          this.amount = this.users.length;
        console.log(this.amount);
        }
      }
    );
  }

  removeUser(u:User){
    if(confirm('Bạn chắc chắn muốn xóa chứ!')){
      this.userService.removeUser(u.user_id).subscribe(
        res=>{
          this.show();
          showSwal('auto-close','Xóa thành công!');
        },error=>{
          showSwal('auto-close','Có lỗi trong quá trình xử lý thông tin!');
        }
      );
    }
  }

}
