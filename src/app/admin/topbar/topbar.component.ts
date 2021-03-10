import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  public user_name = "";
  public user_id = '';

  constructor() { }

  ngOnInit(): void {
    if(localStorage.getItem('user_name')==null&&sessionStorage.getItem('user_name')==null){
      this.user_name="Admin";
    }
    if(localStorage.getItem('user_name')){
      this.user_name=localStorage.getItem('user_name');
      this.user_id=localStorage.getItem('user_id');
    }
    if(sessionStorage.getItem('user_name')){
      this.user_name=sessionStorage.getItem('user_name');
      this.user_id=sessionStorage.getItem('user_id');
    }
  }
  logout(){
    if(localStorage.getItem('user_name')){
      localStorage.clear();
    }
    if(sessionStorage.getItem('user_name')){
      sessionStorage.clear();
    }
  }

}
