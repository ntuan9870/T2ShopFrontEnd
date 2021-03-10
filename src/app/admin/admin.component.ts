import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('user_level')=='3'||sessionStorage.getItem('user_level')=='3'||sessionStorage.getItem('user_level')=='null'){
      this.router.navigate(['/auth/loginadmin']);
    }
  }

}
