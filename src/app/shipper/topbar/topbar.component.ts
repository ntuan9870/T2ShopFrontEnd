import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  public shipper_name='';
  public shipper_phone='';
  public checklogin = false;

  constructor(private router:Router) { }

  ngOnInit(): void {
    if(sessionStorage.getItem('shipper_name')){
      this.shipper_name = sessionStorage.getItem('shipper_name');
      this.shipper_phone = sessionStorage.getItem('shipper_phone');
      this.checklogin = true;
    }else{
      if(localStorage.getItem('shipper_name')){
        this.shipper_name = localStorage.getItem('shipper_name');
        this.shipper_phone = sessionStorage.getItem('shipper_phone');
        this.checklogin = true;
      }else{
        this.checklogin = false;
      }
    }
  }

  logout(){
    if(localStorage.getItem('shipper_phone')){
      localStorage.clear();
    }
    if(sessionStorage.getItem('shipper_phone')){
      sessionStorage.clear();
    }
    this.checklogin = false;
    this.router.navigate(['']);
  }
}
